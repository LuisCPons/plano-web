"use client";

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { ClipboardCheck, Inbox, Settings, Building2, Menu, X } from 'lucide-react';
import { useState, useEffect } from 'react';

export default function Sidebar() {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    setIsOpen(false);
  }, [pathname]);

  const getLinkClasses = (path: string) => {
    const isActive = pathname === path || (path !== '/' && pathname?.startsWith(path));
    if (isActive) {
      return "flex items-center gap-3 px-4 py-3 rounded-xl bg-gradient-to-r from-blue-600/10 to-indigo-600/10 text-blue-400 border border-blue-500/20 font-semibold transition-all shadow-sm";
    }
    return "flex items-center gap-3 px-4 py-3 rounded-xl text-slate-400 font-medium transition-all hover:bg-zinc-800/50 hover:text-slate-200";
  };

  return (
    <>
      {/* Mobile Top Header */}
      <div className="md:hidden fixed top-0 inset-x-0 h-16 bg-zinc-950/80 backdrop-blur-xl border-b border-slate-800 flex items-center justify-between px-4 z-40">
        <div className="flex items-center gap-3">
          <div className="p-1.5 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-lg shadow-lg shadow-indigo-500/20">
            <Building2 size={20} className="text-white" />
          </div>
          <span className="font-bold text-lg tracking-tight text-slate-100">ComplianceIQ</span>
        </div>
        <button onClick={() => setIsOpen(!isOpen)} className="text-slate-300 p-2">
          {isOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Sidebar Overlay */}
      {isOpen && (
        <div className="md:hidden fixed inset-0 bg-black/60 backdrop-blur-sm z-40" onClick={() => setIsOpen(false)} />
      )}

      {/* Sidebar Container */}
      <div className={`fixed inset-y-0 left-0 z-50 w-64 bg-zinc-950/60 backdrop-blur-2xl border-r border-slate-800 text-slate-100 flex flex-col h-screen transform transition-transform duration-300 ease-in-out md:translate-x-0 ${isOpen ? 'translate-x-0' : '-translate-x-full'}`}>
        <div className="p-6 flex items-center gap-3 border-b border-slate-800/60 h-16 md:h-auto">
          <div className="p-2 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-xl shadow-lg shadow-indigo-500/20">
            <Building2 size={24} className="text-white" />
          </div>
          <span className="font-bold text-xl tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-white to-slate-400">ComplianceIQ</span>
        </div>
        <nav className="flex-1 py-8 px-4 space-y-2 overflow-y-auto">
          <Link href="/audit" className={getLinkClasses('/audit')}>
            <ClipboardCheck size={20} />
            Legal Audit
          </Link>
          <Link href="/leads" className={getLinkClasses('/leads')}>
            <Inbox size={20} />
            Lead Inbox
          </Link>
          <Link href="/settings" className={getLinkClasses('/settings')}>
            <Settings size={20} />
            Settings
          </Link>
        </nav>
        <div className="p-6 border-t border-slate-800/60 text-xs text-slate-500 font-medium">
          &copy; 2026 ComplianceIQ
        </div>
      </div>
    </>
  );
}
