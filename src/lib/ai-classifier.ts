import { GoogleGenAI, Type, Schema } from '@google/genai';

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

const leadSchema: Schema = {
  type: Type.OBJECT,
  properties: {
    financialStability: {
      type: Type.STRING,
      description: "Detailed evaluation of financial stability based on mentioned income, job role, or contract type.",
    },
    urgency: {
      type: Type.STRING,
      description: "Assessment of urgency indicating exactly when they need to move or their expected timeframe.",
    },
    profileFit: {
      type: Type.STRING,
      description: "Analysis of the profile fit specifically summarizing the number of occupants, relationship, and pet ownership.",
    },
    qualificationScore: {
      type: Type.INTEGER,
      description: "An overall Qualification Score from 1 to 10 based on how ideal this tenant is for a premium long-term lease. 1 is terrible, 10 is perfect.",
    },
  },
  required: ["financialStability", "urgency", "profileFit", "qualificationScore"],
};

export async function classifyLeadEmail(emailText: string) {
  if (!process.env.GEMINI_API_KEY) {
    throw new Error('GEMINI_API_KEY environment variable is missing.');
  }

  try {
    const prompt = `
      You are an expert real estate AI assistant assigned to qualify incoming tenant leads.
      Your job is to read an inbound email from a prospective tenant and strictly extract classification details.
      Provide a highly critical, concise, and structured analysis of the following categories:
      
      1. Financial Stability (Income mentioned? Stable job?)
      2. Urgency (When exactly do they want to move in?)
      3. Profile Fit (Do they mention pets? How many people?)
      
      Finally, output a 'qualificationScore' objectively scoring the tenant from 1 to 10 on pure reliability (10 being the absolute highest standard).

      Incoming Email Text:
      "${emailText}"
    `;

    const response = await ai.models.generateContent({
      model: 'gemini-3.1-pro',
      contents: prompt,
      config: {
        responseMimeType: 'application/json',
        responseSchema: leadSchema,
        temperature: 0.2, // Low temperature for standard logical mapping
      },
    });

    if (response.text) {
      return JSON.parse(response.text);
    } else {
      throw new Error("No text returned from Gemini API");
    }
  } catch (error) {
    console.error("Gemini Classification Error:", error);
    throw error;
  }
}
