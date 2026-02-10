import { Shield, Check, Loader2, Link as LinkIcon, Activity } from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

interface HeaderProps {
  onTrigger: () => void;
  isPhase2: boolean;
}

export function Header({ onTrigger, isPhase2 }: HeaderProps) {
  const [status, setStatus] = useState<"idle" | "loading" | "success">("idle");

  const handleTrigger = () => {
    if (status !== "idle") return;
    setStatus("loading");
    setTimeout(() => {
      setStatus("success");
      setTimeout(() => {
        setStatus("idle");
        onTrigger();
      }, 1000);
    }, 2000);
  };

  return (
    <header className="h-16 border-b border-white/10 bg-slate-950/50 backdrop-blur-md flex items-center justify-between px-6 shrink-0 z-50 relative">
      <div className="flex items-center gap-6 w-full max-w-4xl">
        <div className="flex items-center gap-2 text-primary font-display font-bold text-xl tracking-wider">
          <Shield className="h-6 w-6" />
          <span>INCIDENT<span className="text-white">COMMAND</span></span>
        </div>

        {/* Command & Control Inputs */}
        <div className="flex-1 flex items-center gap-3">
          <div className="relative flex-1 group">
            <LinkIcon className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-500 group-focus-within:text-primary transition-colors" />
            <Input 
              defaultValue="INC-3928: Latency Spike" 
              className="pl-9 bg-slate-900/50 border-white/10 focus:border-primary/50 font-mono text-sm h-9" 
            />
          </div>
          <div className="relative w-32 group">
            <Activity className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-500 group-focus-within:text-orange-500 transition-colors" />
            <Input 
              defaultValue="SEV-1" 
              className="pl-9 bg-slate-900/50 border-white/10 focus:border-orange-500/50 text-orange-400 font-mono text-sm h-9 font-bold" 
            />
          </div>
          <div className="relative w-48 group">
             <div className="absolute left-3 top-1/2 -translate-y-1/2 h-2 w-2 rounded-full bg-emerald-500 shadow-[0_0_8px_rgba(16,185,129,0.5)] animate-pulse" />
            <Input 
              defaultValue="Cmdr. Sarah Connor" 
              className="pl-8 bg-slate-900/50 border-white/10 focus:border-emerald-500/50 font-mono text-sm h-9" 
            />
          </div>
        </div>
      </div>

      <div className="flex items-center gap-4">
        {/* Health Badge Pulse */}
        <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/20">
          <div className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse-ring" />
          <span className="text-xs font-medium text-emerald-400 tracking-wider">SYSTEM OPTIMAL</span>
        </div>

        <div className="h-6 w-px bg-white/10 mx-2" />

        <Button 
          onClick={handleTrigger}
          disabled={status !== "idle" || isPhase2}
          className={cn(
            "min-w-[140px] font-display font-bold tracking-widest transition-all duration-500",
            status === "success" ? "bg-emerald-600 hover:bg-emerald-600" : "bg-blue-600 hover:bg-blue-500"
          )}
        >
          {status === "idle" && (
            <>
              <Shield className="mr-2 h-4 w-4" />
              ANALYZE
            </>
          )}
          {status === "loading" && (
             <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              PARSING...
             </>
          )}
           {status === "success" && (
             <>
              <Check className="mr-2 h-4 w-4" />
              COMPLETE
             </>
          )}
        </Button>
      </div>
    </header>
  );
}
