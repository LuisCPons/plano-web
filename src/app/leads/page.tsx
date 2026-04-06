"use client";

import { useState, useEffect } from 'react';
import { Search, Bot, MessageCircle, MapPin, ShieldCheck, Check, Loader2, User } from 'lucide-react';

type Lead = {
  id: string;
  name: string;
  source: string;
  property: string;
  aiInsight: string;
  score: number;
  timestamp: string;
};

const mockLeads: Lead[] = [
  { id: "L-201", name: "Javier M.", source: "Idealista", property: "Calle Fuencarral 120", aiInsight: "Ready to sign immediately. Mentioned stable tech job.", score: 9, timestamp: "10m" },
  { id: "L-202", name: "Elena R.", source: "Fotocasa", property: "Calle de Almagro 14", aiInsight: "Has a pet. Solid income history. Needs landlord approval.", score: 6, timestamp: "1h" },
  { id: "L-203", name: "Carlos T.", source: "Idealista", property: "Av. Menéndez Pelayo", aiInsight: "Student without domestic guarantor. Move-in flexible.", score: 3, timestamp: "3h" },
  { id: "L-204", name: "Maria L.", source: "Direct", property: "Calle Fuencarral 120", aiInsight: "Executive looking for 2+ year lease. Excellent fit.", score: 10, timestamp: "5h" },
  { id: "L-205", name: "Luis C.", source: "Idealista", property: "Calle Goya 55", aiInsight: "Couple, dual income. No pets. Perfect credit history.", score: 8, timestamp: "6h" },
  { id: "L-206", name: "Ana S.", source: "Fotocasa", property: "Paseo del Prado 12", aiInsight: "Single professional, highly responsive.", score: 9, timestamp: "1d" },
  { id: "L-207", name: "David M.", source: "Direct", property: "Calle Serrano 10", aiInsight: "Needs short-term 3 month lease. Potentially invalid.", score: 4, timestamp: "1d" },
  { id: "L-208", name: "Laura P.", source: "Idealista", property: "Calle de Alcalá 140", aiInsight: "Family of 4, looking to move in next week urgently.", score: 7, timestamp: "2d" },
];

const ScoreBadge = ({ score }: { score: number }) => {
  let colorStyles = "bg-emerald-950/40 text-emerald-300 border-emerald-800/60"; // Soft Green
  if (score <= 4) colorStyles = "bg-rose-950/40 text-rose-300 border-rose-800/60"; // Soft Rose
  else if (score <= 7) colorStyles = "bg-amber-950/40 text-amber-300 border-amber-800/60"; // Soft Amber

  return (
    <div className={`w-10 h-10 rounded-full flex items-center justify-center border-2 font-black text-sm shrink-0 shadow-lg ${colorStyles}`}>
      {score}
    </div>
  );
};

export default function LeadsPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [whatsappModal, setWhatsappModal] = useState<{ isOpen: boolean; leadName: string } | null>(null);
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const [auditingLead, setAuditingLead] = useState<string | null>(null);

  // Filter 
  const filteredLeads = mockLeads.filter(lead => 
    lead.property.toLowerCase().includes(searchQuery.toLowerCase()) || 
    lead.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleWhatsapp = (name: string) => {
    setWhatsappModal({ isOpen: true, leadName: name });
    setTimeout(() => {
      setWhatsappModal(null);
      setToastMessage(`WhatsApp connection established with ${name}.`);
      setTimeout(() => setToastMessage(null), 3000);
    }, 1500);
  };

  const handleAudit = (id: string) => {
    setAuditingLead(id);
    setTimeout(() => {
      setAuditingLead(null);
    }, 2000);
  };

  return (
    <div className="flex-1 w-full bg-zinc-950 min-h-screen text-slate-200 font-sans p-4 pt-20 md:p-8 lg:p-10 mx-auto flex flex-col gap-6">
      
      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 animate-in slide-in-from-bottom-5 fade-in duration-300 bg-zinc-800 text-white px-5 py-3 rounded-2xl shadow-2xl border border-zinc-700 flex items-center gap-3 text-sm font-semibold">
          <div className="w-6 h-6 bg-emerald-500/20 text-emerald-400 rounded-full flex items-center justify-center shrink-0">
            <Check size={14} />
          </div>
          {toastMessage}
        </div>
      )}

      {/* WhatsApp Modal */}
      {whatsappModal?.isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-black/40 backdrop-blur-sm" />
          <div className="relative z-10 bg-zinc-900 border border-zinc-800 p-6 rounded-3xl shadow-[0_20px_40px_rgba(0,0,0,0.7)] flex flex-col items-center gap-4 animate-in zoom-in-95 duration-200 min-w-[280px]">
            <Loader2 size={32} className="text-[#25D366] animate-spin" />
            <p className="text-zinc-300 font-medium text-sm text-center">
              Connecting to <span className="font-bold text-white">{whatsappModal.leadName}</span>...
            </p>
          </div>
        </div>
      )}

      {/* Header section */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 max-w-7xl mx-auto w-full">
        <div>
          <h1 className="text-2xl font-bold text-white tracking-tight shrink-0">Lead Intelligence</h1>
        </div>
        
        {/* Search Bar - Dense */}
        <div className="relative w-full md:max-w-xs">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <Search size={16} className="text-zinc-500" />
          </div>
          <input
            type="text"
            className="block w-full pl-10 pr-3 py-2 border border-zinc-800 rounded-lg text-sm bg-zinc-900 text-zinc-300 placeholder-zinc-500 focus:outline-none focus:border-blue-500/50 focus:ring-1 focus:ring-blue-500/50 transition-all shadow-sm"
            placeholder="Filter by property or name..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
      </div>

      {/* Dense Lead Feed */}
      <div className="flex flex-col gap-3 max-w-7xl mx-auto w-full pb-10">
        {filteredLeads.length === 0 ? (
          <div className="text-center py-8 p-6 border border-zinc-800 border-dashed rounded-2xl bg-zinc-900/30">
            <p className="text-zinc-500 text-sm">No leads match your search.</p>
          </div>
        ) : (
          filteredLeads.map((lead) => {
            const isHighPriority = lead.score >= 8;
            return (
              <div 
                key={lead.id} 
                className={`relative bg-zinc-900 border border-zinc-800 hover:border-zinc-700 transition-all rounded-xl p-3 md:p-4 shadow-2xl flex flex-col lg:flex-row gap-4 items-start lg:items-center ${isHighPriority ? 'shadow-[0_0_15px_rgba(52,211,153,0.05)] overflow-hidden' : ''}`}
              >
                {/* Subtle sheen highlight for High Priority */}
                {isHighPriority && (
                  <div className="absolute top-0 left-0 w-[50px] h-full bg-gradient-to-r from-transparent via-emerald-500/10 to-transparent -skew-x-12 animate-pulse pointer-events-none" />
                )}

                {/* Left: Contact Info (Avatar, Name, Source, Property) */}
                <div className="flex items-center gap-3 lg:w-3/12 shrink-0">
                  <div className="w-10 h-10 rounded-full bg-gradient-to-br from-zinc-700 to-zinc-800 flex items-center justify-center shrink-0 border border-zinc-700 shadow-inner">
                    <User size={18} className="text-zinc-400" />
                  </div>
                  <div className="flex flex-col overflow-hidden">
                    <div className="flex items-center gap-2">
                      <span className="text-sm font-bold text-zinc-100 truncate">{lead.name}</span>
                      <span className="text-[10px] uppercase font-bold text-zinc-500 bg-zinc-800/80 px-1.5 py-0.5 rounded border border-zinc-700 shrink-0">
                        {lead.source}
                      </span>
                    </div>
                    <div className="flex items-center gap-1.5 text-xs text-zinc-500 mt-1 truncate">
                      <MapPin size={12} className="shrink-0" />
                      <span className="truncate">{lead.property}</span>
                    </div>
                  </div>
                </div>

                {/* Middle: AI Insight */}
                <div className="flex-1 w-full bg-zinc-950/40 rounded-lg p-2.5 border border-zinc-800/60 flex items-center gap-2.5">
                  <Bot size={16} className={`shrink-0 ${isHighPriority ? 'text-emerald-500' : 'text-blue-500'}`} />
                  <p className="text-xs text-zinc-400 leading-tight line-clamp-2">
                    {lead.aiInsight}
                  </p>
                </div>

                {/* Right: Score & Actions */}
                <div className="flex sm:flex-row flex-col items-center gap-4 lg:w-auto shrink-0 w-full sm:w-auto justify-between lg:justify-end">
                  
                  {/* Dense Score view */}
                  <div className="flex items-center gap-3 w-full sm:w-auto">
                    <ScoreBadge score={lead.score} />
                    
                    <div className="flex flex-col lg:hidden text-xs text-zinc-500 font-medium">
                      Priority <span className="font-bold text-zinc-300">{lead.timestamp}</span>
                    </div>
                  </div>

                  <div className="flex items-center gap-2 w-full sm:w-auto">
                    <span className="hidden lg:block text-xs font-semibold text-zinc-600 w-10 text-right mr-2">{lead.timestamp}</span>
                    
                    {/* Primary Button: Audit */}
                    <button 
                      onClick={() => handleAudit(lead.id)}
                      disabled={auditingLead === lead.id}
                      className="flex-1 sm:flex-none flex items-center justify-center gap-2 px-4 py-2 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white text-xs font-bold rounded-lg shadow-lg shadow-blue-900/20 transition-all border border-blue-500 min-w-[90px]"
                    >
                      {auditingLead === lead.id ? (
                        <Loader2 size={14} className="animate-spin text-blue-200" />
                      ) : (
                        <>
                          <ShieldCheck size={14} />
                          Audit
                        </>
                      )}
                    </button>

                    {/* Secondary Button: WhatsApp */}
                    <button 
                      onClick={() => handleWhatsapp(lead.name)}
                      className="flex-1 sm:flex-none flex items-center justify-center gap-1.5 px-3 py-2 bg-[#25D366]/10 hover:bg-[#25D366]/20 text-[#25D366] text-xs font-bold rounded-lg border border-[#25D366]/20 transition-colors tooltip tooltip-top"
                      title="WhatsApp Lead"
                    >
                      <MessageCircle size={16} />
                    </button>
                  </div>

                </div>
              </div>
            );
          })
        )}
      </div>
    </div>
  );
}
