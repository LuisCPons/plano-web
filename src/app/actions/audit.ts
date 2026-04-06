"use server";

import { GoogleGenAI, Type, Schema } from '@google/genai';

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

const responseSchema: Schema = {
  type: Type.OBJECT,
  properties: {
    status: {
      type: Type.STRING,
      description: "The overall compliance status. Must be one of: 'Compliant', 'Non-Compliant', or 'Needs Review'.",
    },
    score: {
      type: Type.INTEGER,
      description: "A trust score out of 100 based on the compliance findings.",
    },
    findings: {
      type: Type.ARRAY,
      items: {
        type: Type.STRING,
      },
      description: "An array of detailed string findings regarding the specific compliance parameters.",
    },
  },
  required: ["status", "score", "findings"],
};

export async function analyzePropertyCompliance(propertyText: string) {
  if (!process.env.GEMINI_API_KEY) {
    return {
      status: 'Error',
      score: 0,
      findings: ['Error: GEMINI_API_KEY environment variable is missing in .env.local'],
    };
  }

  try {
    const prompt = `
      You are an expert Spanish Real Estate Compliance Auditor.
      Analyze the provided property description text to look for compliance with the following specific rules:
      1. Illegal agency fees paid by the tenant instead of the landlord (Ley de Vivienda 2026).
      2. Price consistency with the Madrid Reference Index.
      3. Mandatory mentions or omissions of the energy performance certificate (Certificado de Eficiencia Energética).

      Property Text:
      "${propertyText}"
    `;

    const response = await ai.models.generateContent({
      model: 'gemini-3.1-pro',
      contents: prompt,
      config: {
        responseMimeType: 'application/json',
        responseSchema: responseSchema,
        temperature: 0.1,
      },
    });

    if (response.text) {
      const parsed = JSON.parse(response.text);
      return parsed;
    } else {
      throw new Error("No text returned from Gemini API");
    }
  } catch (error) {
    console.error("Gemini API Error:", error);
    return {
      status: 'Error',
      score: 0,
      findings: ['An error occurred while analyzing the property compliance.', error instanceof Error ? error.message : String(error)],
    };
  }
}
