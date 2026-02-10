import { motion } from "framer-motion";
import { AlertTriangle, GitPullRequest, ArrowRight, ShieldAlert, XOctagon } from "lucide-react";
import { Button } from "@/components/ui/button";

export function SmokingGunPanel() {
  return (
    <motion.div 
        initial={{ opacity: 0, y: 100 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, type: "spring", bounce: 0.3 }}
        className="flex-1 relative rounded-t-2xl border-t border-red-500/30 bg-gradient-to-b from-red-950/40 to-slate-950/90 backdrop-blur-2xl overflow-hidden flex flex-col"
    >
      {/* Red Alert Gradient Line */}
      <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-red-500 to-transparent opacity-50" />
      
      <div className="p-8 flex-1 flex gap-12">
         {/* Left: The Verdict */}
         <div className="w-1/3 space-y-6">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-red-500/10 border border-red-500/20 text-red-400 text-xs font-bold tracking-widest uppercase animate-pulse">
                <AlertTriangle className="h-3 w-3" />
                Critical Finding
            </div>
            
            <h2 className="font-display font-bold text-4xl text-white leading-tight">
                Race Condition Detected in <span className="text-red-400">auth_controller.py</span>
            </h2>
            
            <p className="text-slate-400 leading-relaxed">
                Deployment #3847 introduced a non-atomic database transaction during the session refresh cycle. High concurrency caused 45% of login attempts to deadlock.
            </p>

            <div className="flex gap-4 pt-4">
                <Button className="bg-gradient-to-r from-red-600 to-orange-600 hover:from-red-500 hover:to-orange-500 text-white font-bold border-0 h-12 px-6 shadow-[0_0_20px_rgba(220,38,38,0.4)] transition-all hover:scale-105">
                    <XOctagon className="mr-2 h-4 w-4" />
                    INITIATE ROLLBACK
                </Button>
                <Button variant="outline" className="h-12 border-white/10 bg-white/5 hover:bg-white/10 text-slate-300">
                    Mute Alert & Monitor
                </Button>
            </div>
         </div>

         {/* Right: The Evidence Timeline */}
         <div className="flex-1 relative">
            <h3 className="text-sm font-bold text-slate-500 uppercase tracking-widest mb-6">Evidence Chain</h3>
            
            {/* Vertical Line */}
            <div className="absolute left-[19px] top-10 bottom-0 w-0.5 bg-gradient-to-b from-white/20 to-transparent" />
            
            <div className="space-y-8 relative">
                {/* Node 1 */}
                <div className="flex gap-6 items-start group">
                    <div className="relative z-10 h-10 w-10 rounded-full bg-slate-900 border border-orange-500/50 flex items-center justify-center text-orange-500 shadow-[0_0_15px_rgba(249,115,22,0.2)]">
                        <ShieldAlert className="h-5 w-5" />
                    </div>
                    <div className="flex-1 p-4 rounded-lg bg-white/5 border border-white/5 group-hover:border-orange-500/30 transition-colors">
                        <div className="flex justify-between items-start mb-2">
                            <span className="font-display font-bold text-orange-400 text-lg">Latency Spike Detected</span>
                            <span className="font-mono text-xs text-slate-500">02:47:12 AM</span>
                        </div>
                        <p className="text-slate-400 text-sm">AWS CloudWatch reported 4000ms latency on /api/auth/refresh.</p>
                    </div>
                </div>

                {/* Node 2 */}
                <div className="flex gap-6 items-start group">
                    <div className="relative z-10 h-10 w-10 rounded-full bg-slate-900 border border-purple-500/50 flex items-center justify-center text-purple-500 shadow-[0_0_15px_rgba(168,85,247,0.2)]">
                        <GitPullRequest className="h-5 w-5" />
                    </div>
                    <div className="flex-1 p-4 rounded-lg bg-white/5 border border-white/5 group-hover:border-purple-500/30 transition-colors">
                        <div className="flex justify-between items-start mb-2">
                            <span className="font-display font-bold text-purple-400 text-lg">PR #12 Merged</span>
                            <span className="font-mono text-xs text-slate-500">02:45:00 AM</span>
                        </div>
                        <p className="text-slate-400 text-sm">"feat: optimize session handling" merged by jsmith. Contains blocking DB call.</p>
                        <div className="mt-3 p-3 bg-black/30 rounded border border-white/5 font-mono text-xs text-slate-300">
                           <span className="text-red-400">- await db.transaction(async (tx) ={">"} ...</span><br/>
                           <span className="text-emerald-400">+ await db.transaction(async (tx) ={">"} ... // Missing isolation level</span>
                        </div>
                    </div>
                </div>
            </div>
         </div>
      </div>
    </motion.div>
  );
}
