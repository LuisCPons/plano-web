"use client";

import { Search, Loader2, ShieldCheck, AlertCircle } from 'lucide-react';
import { useState } from 'react';

export default function Hero() {
  const [url, setUrl] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [showResult, setShowResult] = useState(false);

  const handleAudit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!url) return;
    
    setIsLoading(true);
    setShowResult(false);
    
    setTimeout(() => {
      setIsLoading(false);
      setShowResult(true);
    }, 2000);
  };

  return (
    <div className="flex flex-col gap-6 pt-16 md:pt-0">
      <div className="bg-zinc-900/40 backdrop-blur-2xl rounded-3xl p-8 md:p-12 shadow-[0_8px_30px_rgb(0,0,0,0.4)] relative overflow-hidden border border-slate-800">
        <div className="absolute top-0 right-0 -mr-20 -mt-20 w-96 h-96 bg-blue-600 rounded-full blur-[128px] opacity-20 pointer-events-none"></div>
        <div className="absolute bottom-0 left-0 -ml-20 -mb-20 w-64 h-64 bg-indigo-600 rounded-full blur-[100px] opacity-10 pointer-events-none"></div>
        
        <h1 className="text-3xl md:text-5xl font-extrabold text-white mb-4 tracking-tight leading-tight">
          Real Estate Compliance <br className="hidden md:block"/> Check
        </h1>
        <p className="text-slate-300 mb-10 max-w-xl text-lg md:text-xl relative z-10 font-light leading-relaxed">
          Paste a property URL to instantly run our automated compliance audit. We verify zoning, title history, environmental risks, and local ordinances.
        </p>
        
        <form onSubmit={handleAudit} className="relative max-w-2xl group z-10">
          <div className="absolute inset-y-0 left-0 pl-5 flex items-center pointer-events-none text-slate-500 group-focus-within:text-blue-400 transition-colors">
            {isLoading ? <Loader2 size={24} className="animate-spin text-blue-400" /> : <Search size={24} />}
          </div>
          <input 
            type="text" 
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            placeholder="https://zillow.com/homedetails/..." 
            className="w-full bg-zinc-950/50 backdrop-blur-md border border-slate-700 text-slate-100 rounded-2xl py-4 md:py-5 pl-14 pr-36 focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500 transition-all text-base md:text-lg shadow-inner placeholder:text-slate-600"
            disabled={isLoading}
          />
          <button 
            disabled={isLoading || !url}
            type="submit"
            className="absolute inset-y-2 right-2 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 disabled:from-slate-800 disabled:to-slate-800 disabled:text-slate-500 text-white font-semibold px-6 md:px-8 rounded-xl transition-all shadow-lg shadow-blue-900/30 flex items-center gap-2"
          >
            {isLoading ? "Analyzing" : "Audit"}
          </button>
        </form>
      </div>

      {showResult && (
        <div className="bg-zinc-900/50 backdrop-blur-2xl border border-slate-800 rounded-3xl p-8 shadow-2xl animate-in slide-in-from-bottom-4 fade-in duration-500">
          <div className="flex flex-col md:flex-row md:items-start justify-between gap-6">
            <div className="flex items-center md:items-start gap-4">
              <div className="p-3 bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 rounded-xl shadow-inner">
                <ShieldCheck size={28} />
              </div>
              <div>
                <h3 className="text-xl font-bold text-white tracking-tight">Compliance Result</h3>
                <p className="text-sm text-slate-400 mt-1 break-all">{url}</p>
              </div>
            </div>
            <div className="text-left md:text-right bg-zinc-950/50 px-6 py-4 rounded-2xl border border-slate-800">
              <span className="text-3xl font-extrabold bg-clip-text text-transparent bg-gradient-to-r from-emerald-400 to-emerald-200">85<span className="text-lg text-slate-500">/100</span></span>
              <p className="text-xs text-slate-400 uppercase tracking-widest font-semibold mt-1">Trust Score</p>
            </div>
          </div>
          
          <div className="mt-8 border-t border-slate-800 pt-8">
            <h4 className="text-sm font-semibold text-white mb-4 flex items-center gap-2 uppercase tracking-wide">
              <AlertCircle size={18} className="text-amber-400" />
              Identified Legal Risks
            </h4>
            <div className="grid gap-4 md:grid-cols-1">
              <div className="group flex items-start gap-4 bg-zinc-950/40 p-4 md:p-5 rounded-2xl border border-slate-800/80 hover:border-amber-500/30 transition-colors">
                <span className="flex-shrink-0 w-8 h-8 rounded-full bg-amber-500/10 border border-amber-500/20 flex items-center justify-center text-amber-400 font-bold text-sm">1</span>
                <div>
                  <h5 className="text-slate-200 font-medium mb-1">Zoning Discrepancy</h5>
                  <p className="text-sm text-slate-400 leading-relaxed">Property is listed as multi-family commercial, but recent local ordinances restricted area to single-family residential. Status needs verification.</p>
                </div>
              </div>
              
              <div className="group flex items-start gap-4 bg-zinc-950/40 p-4 md:p-5 rounded-2xl border border-slate-800/80 hover:border-emerald-500/30 transition-colors">
                <span className="flex-shrink-0 w-8 h-8 rounded-full bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-400 font-bold text-sm">2</span>
                <div>
                  <h5 className="text-slate-200 font-medium mb-1">Title History Check</h5>
                  <p className="text-sm text-slate-400 leading-relaxed">Clear chain of title. No outstanding liens discovered in the past 10 years of public records.</p>
                </div>
              </div>
              
              <div className="group flex items-start gap-4 bg-zinc-950/40 p-4 md:p-5 rounded-2xl border border-slate-800/80 hover:border-rose-500/30 transition-colors">
                <span className="flex-shrink-0 w-8 h-8 rounded-full bg-rose-500/10 border border-rose-500/20 flex items-center justify-center text-rose-400 font-bold text-sm">3</span>
                <div>
                  <h5 className="text-slate-200 font-medium mb-1">Environmental Risk Warning</h5>
                  <p className="text-sm text-slate-400 leading-relaxed">Property borders a recognized flood zone (Zone AE). Flood insurance mandatory for federally backed mortgages.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
