"use client";

import { ExternalLink, CheckCircle2, AlertTriangle, XCircle, ChevronRight, X, FileText } from 'lucide-react';
import Link from 'next/link';
import { useState } from 'react';

type Audit = {
  id: string;
  property: string;
  date: string;
  status: string;
  riskLevel: string;
  actionRequired: string;
};

const audits: Audit[] = [
  {
    id: 'AUD-0019',
    property: '1040 4th St, San Francisco, CA',
    date: 'Oct 24, 2026',
    status: 'Completed',
    riskLevel: 'Low',
    actionRequired: 'None',
  },
  {
    id: 'AUD-0018',
    property: '1200 Westlake Ave N, Seattle, WA',
    date: 'Oct 22, 2026',
    status: 'Completed',
    riskLevel: 'High',
    actionRequired: 'Review Zoning Violations',
  },
  {
    id: 'AUD-0017',
    property: '350 5th Ave, New York, NY',
    date: 'Oct 21, 2026',
    status: 'In Progress',
    riskLevel: 'Medium',
    actionRequired: 'Pending Env. Request',
  },
  {
    id: 'AUD-0016',
    property: '1111 S Figueroa St, Los Angeles, CA',
    date: 'Oct 19, 2026',
    status: 'Completed',
    riskLevel: 'Low',
    actionRequired: 'None',
  }
];

const RiskBadge = ({ level }: { level: string }) => {
  const styles: Record<string, string> = {
    Low: 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20',
    Medium: 'bg-amber-500/10 text-amber-400 border-amber-500/20',
    High: 'bg-rose-500/10 text-rose-400 border-rose-500/20',
  };

  const Icons: Record<string, any> = {
    Low: CheckCircle2,
    Medium: AlertTriangle,
    High: XCircle,
  };

  const badgeStyle = styles[level] || 'bg-zinc-800 text-slate-200 border-slate-700';
  const IconComponent = Icons[level] || CheckCircle2;

  return (
    <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold border shadow-sm ${badgeStyle}`}>
      <IconComponent size={14} />
      {level}
    </span>
  );
};

export default function AuditsTable() {
  const [selectedAudit, setSelectedAudit] = useState<Audit | null>(null);

  const closeModal = () => setSelectedAudit(null);

  return (
    <>
      <div className="bg-zinc-900/40 backdrop-blur-xl border border-slate-800 rounded-3xl shadow-xl overflow-hidden mt-10">
        <div className="p-6 md:p-8 border-b border-slate-800 flex justify-between items-center bg-zinc-950/30">
          <h2 className="text-xl md:text-2xl font-bold text-white tracking-tight">Recent Audits</h2>
          <Link href="/audit" className="text-sm text-blue-400 hover:text-blue-300 font-semibold transition-colors px-4 py-2 hover:bg-blue-500/10 rounded-lg">
            View all
          </Link>
        </div>
        
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse whitespace-nowrap">
            <thead>
              <tr className="bg-zinc-950/50 text-slate-400 text-xs border-b border-slate-800 uppercase tracking-widest font-bold">
                <th className="px-6 md:px-8 py-5">Audit ID</th>
                <th className="px-6 md:px-8 py-5">Property Address</th>
                <th className="px-6 md:px-8 py-5">Date</th>
                <th className="px-6 md:px-8 py-5">Status</th>
                <th className="px-6 md:px-8 py-5">Risk Level</th>
                <th className="px-6 md:px-8 py-5">Action Required</th>
                <th className="px-6 md:px-8 py-5 text-right">Target</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/60 text-slate-300">
              {audits.map((audit) => (
                <tr 
                  key={audit.id} 
                  onClick={() => setSelectedAudit(audit)}
                  className="hover:bg-zinc-800/40 transition-all duration-200 group cursor-pointer"
                >
                  <td className="px-6 md:px-8 py-5 text-sm font-semibold text-blue-400">{audit.id}</td>
                  <td className="px-6 md:px-8 py-5 text-sm font-medium text-slate-100 group-hover:text-blue-300 transition-colors flex items-center gap-2">
                    {audit.property}
                    <ExternalLink size={14} className="opacity-0 group-hover:opacity-100 transition-opacity text-blue-400" />
                  </td>
                  <td className="px-6 md:px-8 py-5 text-sm text-slate-400">{audit.date}</td>
                  <td className="px-6 md:px-8 py-5">
                    <span className={`inline-flex items-center px-2.5 py-1 rounded-md text-xs font-semibold ${
                      audit.status === 'Completed' ? 'bg-zinc-800 text-slate-300 border border-slate-700' : 'bg-blue-500/10 text-blue-400 border border-blue-500/20'
                    }`}>
                      {audit.status}
                    </span>
                  </td>
                  <td className="px-6 md:px-8 py-5">
                    <RiskBadge level={audit.riskLevel} />
                  </td>
                  <td className={`px-6 md:px-8 py-5 text-sm ${audit.actionRequired !== 'None' ? 'text-amber-400 font-semibold' : 'text-slate-500 font-medium'}`}>
                    {audit.actionRequired}
                  </td>
                  <td className="px-6 md:px-8 py-5 text-right">
                    <button className="p-2 text-slate-500 hover:text-white bg-transparent group-hover:bg-zinc-800 rounded-lg transition-all">
                      <ChevronRight size={18} />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Modal for Audit Details */}
      {selectedAudit && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-black/80 backdrop-blur-md" onClick={closeModal}></div>
          <div className="bg-zinc-950/80 backdrop-blur-2xl border border-slate-800 rounded-3xl shadow-[0_8px_30px_rgb(0,0,0,0.6)] w-full max-w-xl overflow-hidden relative z-10 animate-in zoom-in-95 duration-200">
            <div className="p-6 md:p-8 border-b border-slate-800 flex justify-between items-center bg-zinc-900/30">
              <h3 className="text-xl font-bold text-white flex items-center gap-3">
                <div className="p-2 bg-gradient-to-br from-blue-500/20 to-indigo-600/20 rounded-xl">
                  <FileText size={20} className="text-blue-400" />
                </div>
                Audit Details: {selectedAudit.id}
              </h3>
              <button onClick={closeModal} className="text-slate-500 hover:bg-zinc-800 p-2 rounded-xl transition-colors">
                <X size={20} />
              </button>
            </div>
            <div className="p-6 md:p-8 space-y-8">
              <div>
                <span className="text-xs text-slate-500 uppercase tracking-widest font-bold">Property Addressed</span>
                <p className="text-white font-semibold text-lg md:text-xl mt-2">{selectedAudit.property}</p>
              </div>
              <div className="grid grid-cols-2 gap-8 bg-zinc-900/40 p-6 rounded-2xl border border-slate-800/80 shadow-inner">
                <div>
                  <span className="text-xs text-slate-500 uppercase tracking-widest font-bold">Audit Date</span>
                  <p className="text-slate-200 mt-2 font-medium">{selectedAudit.date}</p>
                </div>
                <div>
                  <span className="text-xs text-slate-500 uppercase tracking-widest font-bold">Overall Status</span>
                  <p className="text-slate-200 mt-2 font-medium">{selectedAudit.status}</p>
                </div>
                <div>
                  <span className="text-xs text-slate-500 uppercase tracking-widest font-bold">Severity Level</span>
                  <div className="mt-3">
                    <RiskBadge level={selectedAudit.riskLevel} />
                  </div>
                </div>
                <div>
                  <span className="text-xs text-slate-500 uppercase tracking-widest font-bold">Action Recommended</span>
                  <p className={`mt-2 font-semibold ${selectedAudit.actionRequired !== 'None' ? 'text-amber-400' : 'text-slate-400'}`}>
                    {selectedAudit.actionRequired}
                  </p>
                </div>
              </div>
            </div>
            <div className="p-6 border-t border-slate-800 bg-zinc-950/50 flex justify-end gap-4 rounded-b-3xl">
              <button className="px-6 py-2.5 text-blue-400 hover:bg-blue-500/10 rounded-xl transition-colors text-sm font-semibold inline-flex items-center gap-2">
                Download PDF
              </button>
              <button onClick={closeModal} className="px-8 py-2.5 bg-gradient-to-r from-zinc-800 to-zinc-700 hover:from-zinc-700 hover:to-zinc-600 border border-slate-700 text-white rounded-xl transition-all shadow-md text-sm font-semibold">
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
