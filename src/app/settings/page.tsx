import { Mail, ArrowRight, Forward, CheckCircle } from 'lucide-react';

export default function SettingsPage() {
  return (
    <div className="flex-1 w-full p-4 pt-20 md:p-12 lg:p-16 max-w-7xl mx-auto flex flex-col gap-8 md:gap-12 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div>
        <h1 className="text-3xl font-extrabold text-white mb-2">Settings & API</h1>
        <p className="text-slate-400">Connect your tools, handle your email ingestion, and manage API keys.</p>
      </div>
      
      <div className="grid gap-6">
        {/* Core Integrations */}
        <div className="p-6 md:p-8 border border-slate-800 bg-zinc-900/40 backdrop-blur-md rounded-3xl shadow-xl">
          <h2 className="text-lg font-bold text-white mb-4">Core Integrations</h2>
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between p-4 bg-zinc-950/50 border border-slate-800/80 rounded-2xl max-w-3xl gap-4">
            <div className="flex items-center gap-4">
              <div className="p-3 bg-zinc-800 text-slate-300 rounded-xl shrink-0">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path><polyline points="22,6 12,13 2,6"></polyline></svg>
              </div>
              <div>
                <h3 className="font-semibold text-slate-200">System Inbox Configuration</h3>
                <p className="text-xs text-slate-500 mt-1 line-clamp-1">Route direct emails into the platform for real-time auto-parsing.</p>
              </div>
            </div>
            <div className="flex items-center gap-2 w-full md:w-auto">
              <input type="text" value="inbound_19x7b@complianceiq.app" disabled className="bg-zinc-900 border border-slate-700 text-slate-300 px-4 py-2 rounded-lg flex-1 md:w-64 font-mono text-xs shadow-inner" />
              <button className="px-4 py-2 text-sm font-semibold bg-zinc-800 hover:bg-zinc-700 text-slate-200 rounded-lg transition-colors border border-slate-700">Copy</button>
            </div>
          </div>
        </div>

        {/* Technical Guide: Idealista Automation */}
        <div className="p-6 md:p-8 border border-blue-900/30 bg-gradient-to-b from-blue-950/10 to-transparent backdrop-blur-md rounded-3xl shadow-xl relative overflow-hidden">
          <div className="absolute top-0 right-0 -mr-16 -mt-16 w-64 h-64 bg-blue-600 rounded-full blur-[100px] opacity-10 pointer-events-none"></div>
          
          <div className="flex items-center gap-3 mb-6">
            <div className="p-2 bg-blue-500/20 text-blue-400 rounded-lg">
              <Forward size={24} />
            </div>
            <h2 className="text-xl font-bold text-white tracking-tight">Setup Guide: Automate Idealista Leads</h2>
          </div>
          
          <p className="text-slate-300 mb-8 max-w-3xl leading-relaxed">
            By setting up a simple auto-forwarding rule within your primary email provider, ComplianceIQ can instantly intercept, read, and qualify your incoming portal leads directly into your Lead Inbox using our AI engine.
          </p>

          <div className="grid md:grid-cols-3 gap-6 max-w-5xl relative z-10">
            {/* Step 1 */}
            <div className="bg-zinc-950/60 p-6 border border-slate-800 rounded-2xl flex flex-col items-start gap-4">
              <div className="w-8 h-8 rounded-full bg-blue-500/10 border border-blue-500/20 flex items-center justify-center text-blue-400 font-bold text-sm">1</div>
              <div>
                <h3 className="font-semibold text-slate-200 mb-2">Copy Inbound Address</h3>
                <p className="text-sm text-slate-400 leading-relaxed">
                  First, copy your unique systemic inbound address located in the configuration box above (e.g., <span className="font-mono text-slate-300 bg-zinc-800 px-1 py-0.5 rounded">inbound_19...</span>).
                </p>
              </div>
            </div>

            {/* Step 2 */}
            <div className="bg-zinc-950/60 p-6 border border-slate-800 rounded-2xl flex flex-col items-start gap-4">
              <div className="w-8 h-8 rounded-full bg-blue-500/10 border border-blue-500/20 flex items-center justify-center text-blue-400 font-bold text-sm">2</div>
              <div>
                <h3 className="font-semibold text-slate-200 mb-2">Create Filter Rule</h3>
                <p className="text-sm text-slate-400 leading-relaxed">
                  Open your Gmail or Outlook filter settings. Create a rule that triggers whenever an email is received from <span className="font-mono text-slate-300 bg-zinc-800 px-1 py-0.5 rounded text-xs">no-reply@idealista.com</span> or <span className="font-mono text-slate-300 bg-zinc-800 px-1 py-0.5 rounded text-xs">leads@fotocasa.es</span>.
                </p>
              </div>
            </div>

            {/* Step 3 */}
            <div className="bg-zinc-950/60 p-6 border border-blue-900/30 rounded-2xl flex flex-col items-start gap-4 shadow-[0_0_15px_rgba(37,99,235,0.1)]">
              <div className="w-8 h-8 rounded-full bg-blue-600 flex items-center justify-center text-white font-bold text-sm shadow-lg shadow-blue-600/30">3</div>
              <div>
                <h3 className="font-semibold text-white mb-2 flex items-center gap-2">Enable AI Autopilot <CheckCircle size={14} className="text-emerald-400"/></h3>
                <p className="text-sm text-slate-300 leading-relaxed">
                  Set the filter action to strictly "Forward it to" and paste your inbound address. Our system instantly catches the payload and runs your leads through the <span className="text-blue-400 font-semibold">AI Lead Classifier</span>.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* API Config Box */}
        <div className="p-6 md:p-8 border border-slate-800 bg-zinc-900/40 backdrop-blur-md rounded-3xl shadow-xl mt-4">
          <h2 className="text-lg font-bold text-white mb-4">API Configuration</h2>
          <div className="p-5 bg-zinc-950/50 border border-slate-800/80 rounded-2xl flex flex-col gap-3 max-w-3xl">
            <p className="text-sm text-slate-400">Your secure webhook key for programmatic ingestion:</p>
            <div className="flex items-center gap-2">
              <input type="password" value="secret_live_pk_19x7b_compliance_20442" disabled className="bg-zinc-900 border border-slate-800 text-slate-400 px-4 py-2 rounded-lg flex-1 font-mono text-sm shadow-inner" />
              <button className="px-5 py-2 bg-zinc-800 hover:bg-zinc-700 text-slate-300 rounded-lg text-sm font-semibold transition-colors border border-slate-700">Reveal</button>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
