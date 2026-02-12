import { Shield, Check, Loader2, Link as LinkIcon, Activity } from "lucide-react";
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";

interface HeaderProps {
  onTrigger: () => void;
  isPhase2: boolean;
}

export function Header({ onTrigger, isPhase2 }: HeaderProps) {
  const [status, setStatus] = useState<"idle" | "loading" | "success">("idle");
  const [showOptimal, setShowOptimal] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowOptimal(true);
      // Run "automatic trigger" feel
      const interval = setInterval(() => {
        setShowOptimal(false);
        setTimeout(() => setShowOptimal(true), 2000);
      }, 60000);
      return () => clearInterval(interval);
    }, 60000);
    return () => clearTimeout(timer);
  }, []);

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
          <span>INCIDENT<span className="text-white">IQ</span></span>
        </div>

        {/* Command & Control Inputs */}
        <div className="flex-1 flex items-center gap-3">
          <div className="relative flex-1 group">
            <LinkIcon className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-500 group-focus-within:text-primary transition-colors" />
            <Input 
              defaultValue="INC-3928: Latency Spike" 
              className="pl-9 text-right bg-slate-900/50 border-white/10 focus:border-primary/50 font-mono text-sm h-9" 
            />
          </div>
          
          {/* Animated Spike Graph */}
          <div className="w-32 h-9 flex items-end gap-[2px] px-2 py-1 bg-slate-900/50 border border-white/10 rounded-md overflow-hidden">
             {[...Array(12)].map((_, i) => (
               <div 
                key={i} 
                className="flex-1 bg-primary/40 animate-pulse" 
                style={{ 
                  height: `${Math.random() * 100}%`,
                  animationDelay: `${i * 0.1}s`,
                  animationDuration: '0.5s'
                }} 
               />
             ))}
          </div>
        </div>
      </div>

      <div className="flex items-center gap-4">
        {/* Health Badge Pulse - Shown after 1 minute */}
        {showOptimal && (
          <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/20 animate-in fade-in duration-500">
            <div className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse-ring" />
            <span className="text-xs font-medium text-emerald-400 tracking-wider">SYSTEM OPTIMAL</span>
          </div>
        )}

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
