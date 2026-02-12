import { motion } from "framer-motion";
import { AlertTriangle, XOctagon } from "lucide-react";
import { Button } from "@/components/ui/button";

export function SmokingGunPanel() {
  return (
    <motion.div 
        initial={{ opacity: 0, y: 100 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, type: "spring", bounce: 0.3 }}
        className="flex-1 relative rounded-t-2xl border-t border-red-500/30 bg-gradient-to-b from-red-950/40 to-slate-950/90 backdrop-blur-2xl overflow-hidden flex flex-col"
    >
      <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-red-500 to-transparent opacity-50" />
      
      <div className="p-8 flex-1 flex flex-col items-center justify-center text-center max-w-4xl mx-auto space-y-8">
         <div className="space-y-6">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-red-500/10 border border-red-500/20 text-red-400 text-xs font-bold tracking-widest uppercase animate-pulse">
                <AlertTriangle className="h-3 w-3" />
                Critical Finding
            </div>
            
            <h2 className="font-display font-bold text-5xl text-white leading-tight">
                Race Condition Detected in <span className="text-red-400">auth_controller.py</span>
            </h2>
            
            <div className="p-6 rounded-xl bg-white/5 border border-white/10 text-left space-y-4">
                <p className="text-slate-300 text-lg leading-relaxed">
                    Deployment #3847 introduced a non-atomic database transaction during the session refresh cycle. High concurrency caused 45% of login attempts to deadlock.
                </p>
                <div className="p-4 bg-black/40 rounded border border-red-500/20 font-mono text-sm text-red-300">
                    ERROR: deadlock detected <br/>
                    DETAIL: Process 8372 waits for ShareLock on transaction 1029; blocked by process 8371.
                </div>
            </div>

            <div className="flex gap-4 justify-center pt-4">
                <Button className="bg-gradient-to-r from-red-600 to-orange-600 hover:from-red-500 hover:to-orange-500 text-white font-bold border-0 h-14 px-10 text-lg shadow-[0_0_30px_rgba(220,38,38,0.4)] transition-all hover:scale-105">
                    <XOctagon className="mr-2 h-5 w-5" />
                    INITIATE ROLLBACK
                </Button>
                <Button variant="outline" className="h-14 px-8 border-white/10 bg-white/5 hover:bg-white/10 text-slate-300">
                    Mute Alert & Monitor
                </Button>
            </div>
         </div>
      </div>
    </motion.div>
  );
}
