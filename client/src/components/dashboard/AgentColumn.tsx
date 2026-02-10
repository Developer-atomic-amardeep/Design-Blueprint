import { useRef, useEffect, useState } from "react";
import { GitBranch, Server, MessageSquare, Lock, ChevronUp, Search, Terminal } from "lucide-react";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";

export type AgentType = "github" | "aws" | "slack";

interface LogEntry {
  id: string;
  timestamp: string;
  level: "info" | "warn" | "error" | "success";
  message: string;
}

interface AgentColumnProps {
  type: AgentType;
  isPhase2: boolean;
  logs: LogEntry[];
}

const AGENT_CONFIG = {
  github: {
    icon: GitBranch,
    name: "GITHUB AGENT",
    color: "var(--color-agent-github)", // Purple
    borderColor: "border-[hsl(270,95%,65%)]",
    glowColor: "shadow-[0_0_20px_rgba(168,85,247,0.15)]",
    textColor: "text-[hsl(270,95%,65%)]",
    bgColor: "bg-[hsl(270,95%,65%,0.05)]",
  },
  aws: {
    icon: Server,
    name: "AWS INFRA AGENT",
    color: "var(--color-agent-aws)", // Orange
    borderColor: "border-[hsl(25,95%,55%)]",
    glowColor: "shadow-[0_0_20px_rgba(249,115,22,0.15)]",
    textColor: "text-[hsl(25,95%,55%)]",
    bgColor: "bg-[hsl(25,95%,55%,0.05)]",
  },
  slack: {
    icon: MessageSquare,
    name: "COMMS AGENT",
    color: "var(--color-agent-slack)", // Green
    borderColor: "border-[hsl(150,70%,45%)]",
    glowColor: "shadow-[0_0_20px_rgba(16,185,129,0.15)]",
    textColor: "text-[hsl(150,70%,45%)]",
    bgColor: "bg-[hsl(150,70%,45%,0.05)]",
  },
};

export function AgentColumn({ type, isPhase2, logs }: AgentColumnProps) {
  const config = AGENT_CONFIG[type];
  const Icon = config.icon;
  const scrollRef = useRef<HTMLDivElement>(null);
  const [autoScroll, setAutoScroll] = useState(true);
  const [isHovering, setIsHovering] = useState(false);

  // Auto-scroll logic
  useEffect(() => {
    if (autoScroll && scrollRef.current) {
      const scrollElement = scrollRef.current.querySelector('[data-radix-scroll-area-viewport]');
      if (scrollElement) {
        scrollElement.scrollTop = scrollElement.scrollHeight;
      }
    }
  }, [logs, autoScroll]);

  // Detect manual scroll
  const handleScroll = (e: React.UIEvent) => {
    const target = e.currentTarget;
    const isAtBottom = Math.abs(target.scrollHeight - target.scrollTop - target.clientHeight) < 10;
    
    if (!isAtBottom && autoScroll) {
      setAutoScroll(false);
    } else if (isAtBottom && !autoScroll) {
      setAutoScroll(true);
    }
  };

  return (
    <div 
      className={cn(
        "relative flex flex-col h-full transition-all duration-700 ease-[cubic-bezier(0.25,1,0.5,1)]",
        "border rounded-xl overflow-hidden glass-card",
        config.borderColor,
        config.glowColor,
        isPhase2 ? "min-h-[140px]" : "flex-1" // Compact in Phase 2
      )}
      onMouseEnter={() => setIsHovering(true)}
      onMouseLeave={() => setIsHovering(false)}
    >
      {/* Header */}
      <div className={cn("p-4 border-b flex items-center justify-between bg-slate-950/40", config.borderColor)}>
        <div className="flex items-center gap-3">
          <div className={cn("p-2 rounded-lg", config.bgColor)}>
            <Icon className={cn("h-5 w-5", config.textColor)} />
          </div>
          <div>
            <h3 className={cn("font-display font-bold tracking-widest text-sm", config.textColor)}>
              {config.name}
            </h3>
            <div className="flex items-center gap-2 mt-0.5">
               <span className="relative flex h-2 w-2">
                  <span className={cn("animate-ping absolute inline-flex h-full w-full rounded-full opacity-75", config.bgColor)}></span>
                  <span className={cn("relative inline-flex rounded-full h-2 w-2", config.textColor.replace('text-', 'bg-'))}></span>
                </span>
                <span className="text-[10px] text-slate-400 font-mono">ACTIVE_STREAM</span>
            </div>
          </div>
        </div>
        
        {!isPhase2 && (
          <Sheet>
            <SheetTrigger asChild>
              <Button 
                variant="outline" 
                size="sm" 
                className={cn(
                  "h-7 text-[10px] font-mono border-white/10 hover:border-white/20 bg-transparent transition-all opacity-0 translate-y-2",
                  isHovering && "opacity-100 translate-y-0"
                )}
              >
                <Search className="h-3 w-3 mr-1.5" />
                GET_LOGS
              </Button>
            </SheetTrigger>
            <SheetContent className="w-[400px] border-l border-white/10 bg-slate-950/95 backdrop-blur-xl">
               <SheetHeader>
                 <SheetTitle className="font-display tracking-widest text-white">AGENT TOOLKIT</SheetTitle>
               </SheetHeader>
               <div className="mt-8 space-y-4">
                 <div className="p-4 rounded-lg border border-white/10 bg-white/5 space-y-2">
                    <div className="text-xs font-mono text-slate-400">Run Diagnostic</div>
                    <Button className="w-full justify-start font-mono text-xs bg-black/40 border border-white/10 hover:bg-white/5">
                        <Terminal className="h-3 w-3 mr-2" />
                        grep -r "error" /var/log
                    </Button>
                    <Button className="w-full justify-start font-mono text-xs bg-black/40 border border-white/10 hover:bg-white/5">
                        <Terminal className="h-3 w-3 mr-2" />
                        tail -f access.log
                    </Button>
                 </div>
               </div>
            </SheetContent>
          </Sheet>
        )}
      </div>

      {/* Stream Area */}
      {isPhase2 ? (
         // Compact View for Phase 2
         <div className="flex-1 p-4 flex items-center gap-4">
             <div className="flex-1 space-y-1">
                <div className="h-1.5 w-full bg-white/5 rounded overflow-hidden">
                    <div className={cn("h-full w-full animate-progress-indeterminate", config.textColor.replace('text-', 'bg-'))} />
                </div>
                <div className="text-[10px] font-mono text-slate-500 flex justify-between">
                    <span>INDEXING_RESULTS...</span>
                    <span>98%</span>
                </div>
             </div>
             <div className="text-2xl font-display font-bold text-white">
                {logs.length} <span className="text-sm font-normal text-slate-500">evts</span>
             </div>
         </div>
      ) : (
        // Full Stream View for Phase 1
        <div className="flex-1 relative bg-black/20">
            <ScrollArea 
                ref={scrollRef} 
                className="h-full w-full"
                onScrollCapture={handleScroll}
            >
                <div className="p-4 space-y-3 font-mono text-xs">
                    {logs.map((log) => (
                        <div key={log.id} className="flex gap-3 animate-in fade-in slide-in-from-bottom-2 duration-300">
                            <span className="text-slate-600 shrink-0 select-none">{log.timestamp}</span>
                            <span className={cn(
                                "break-all",
                                log.level === "error" ? "text-red-400" :
                                log.level === "warn" ? "text-orange-400" :
                                log.level === "success" ? "text-emerald-400" :
                                "text-slate-300"
                            )}>
                                {log.level === "error" && <span className="font-bold text-red-500 mr-2">[ERR]</span>}
                                {log.message}
                            </span>
                        </div>
                    ))}
                    <div className="h-4" /> {/* Spacer */}
                </div>
            </ScrollArea>

            {/* Scroll Lock Indicator */}
            <div className={cn(
                "absolute bottom-4 right-4 transition-all duration-300 transform",
                autoScroll ? "opacity-0 translate-y-4" : "opacity-100 translate-y-0"
            )}>
                 <Button 
                    size="sm" 
                    variant="secondary" 
                    className="h-7 text-[10px] gap-1.5 bg-amber-500/10 text-amber-500 border border-amber-500/20 hover:bg-amber-500/20"
                    onClick={() => setAutoScroll(true)}
                 >
                    <Lock className="h-3 w-3" />
                    PAUSED
                    <ChevronUp className="h-3 w-3" />
                 </Button>
            </div>
        </div>
      )}
    </div>
  );
}
