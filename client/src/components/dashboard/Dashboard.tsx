import { useState, useEffect } from "react";
import { Header } from "./Header";
import { Sidebar } from "./Sidebar";
import { AgentColumn, AgentType } from "./AgentColumn";
import { SmokingGunPanel } from "./Phase2Layout";
import { cn } from "@/lib/utils";

// Mock Data Generators
const MESSAGES = {
  github: ["Checking recent commits...", "Analyzing diffs for PR #392...", "Scanning for unauthorized secrets...", "Validating CI/CD pipelines...", "Commit 8a2b9c verified clean.", "Checking dependency graph...", "Fetching blame for auth.ts"],
  aws: [" querying CloudWatch metrics...", "Analyzing Lambda concurrency...", "Checking RDS connection pool...", "VPC Flow Logs analysis...", "Detected high latency in us-east-1", "Auto-scaling group health check: OK", "S3 Bucket permissions verified."],
  slack: ["Scanning #ops-general...", "Parsing user reports...", "Sentiment analysis: NEGATIVE", "User @dave reported '500 error'...", "Cross-referencing timestamps...", "Searching for 'downtime' keywords...", "extracting trace IDs from chat"]
};

const LEVELS = ["info", "info", "info", "success", "warn", "info", "info"] as const;

export function Dashboard() {
  const [phase, setPhase] = useState<1 | 2>(1);
  const [logs, setLogs] = useState<Record<AgentType, any[]>>({
    github: [],
    aws: [],
    slack: []
  });
  const [progress, setProgress] = useState(0);

  // Simulation Effect
  useEffect(() => {
    const interval = setInterval(() => {
      // Add random logs
      (["github", "aws", "slack"] as AgentType[]).forEach(type => {
        if (Math.random() > 0.7) {
          const msg = MESSAGES[type][Math.floor(Math.random() * MESSAGES[type].length)];
          const level = LEVELS[Math.floor(Math.random() * LEVELS.length)];
          const newLog = {
            id: Math.random().toString(36),
            timestamp: new Date().toLocaleTimeString('en-US', { hour12: false, hour: "2-digit", minute: "2-digit", second: "2-digit" }) + "." + Math.floor(Math.random() * 999),
            level,
            message: msg
          };
          
          setLogs(prev => ({
            ...prev,
            [type]: [...prev[type].slice(-20), newLog]
          }));
        }
      });
      
      // Update Progress
      setProgress(p => Math.min(p + (phase === 1 ? 0.2 : 0), 100));

    }, 800);

    return () => clearInterval(interval);
  }, [phase]);

  // Handle Phase Transition
  const handleTrigger = () => {
    setPhase(2);
    setProgress(100);
  };

  return (
    <div className="flex flex-col h-screen bg-[url('/grid-pattern.svg')] bg-cover">
      <div className="absolute inset-0 bg-slate-950/90 pointer-events-none" />
      
      <Header onTrigger={handleTrigger} isPhase2={phase === 2} />

      <div className="flex flex-1 overflow-hidden relative z-10">
        {/* Main Content Area */}
        <main className="flex-1 flex flex-col p-6 gap-6 overflow-hidden transition-all duration-700">
          
          {/* Agent Columns Container */}
          <div 
            className={cn(
              "grid grid-cols-3 gap-6 transition-all duration-700 ease-[cubic-bezier(0.25,1,0.5,1)]",
              phase === 2 ? "h-[30%] shrink-0" : "h-full"
            )}
          >
            <AgentColumn type="github" isPhase2={phase === 2} logs={logs.github} />
            <AgentColumn type="aws" isPhase2={phase === 2} logs={logs.aws} />
            <AgentColumn type="slack" isPhase2={phase === 2} logs={logs.slack} />
          </div>

          {/* Phase 2: Smoking Gun Panel */}
          {phase === 2 && <SmokingGunPanel />}
          
        </main>

        <Sidebar progress={Math.floor(progress)} />
      </div>
    </div>
  );
}
