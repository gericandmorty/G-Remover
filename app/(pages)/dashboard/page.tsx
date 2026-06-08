"use client";

import { useEffect, useRef, useState } from "react";
import { getCookie } from "../../components/cookies";

const API_BASE = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8080";

type HealthStatus = "checking" | "online" | "offline";

export default function DashboardPage() {
  const [token, setToken] = useState<string>("");

  // Health polling state
  const [healthStatus, setHealthStatus] = useState<HealthStatus>("checking");
  const [lastChecked, setLastChecked] = useState<string>("");
  const [isWakingUp, setIsWakingUp] = useState(false);
  const [cooldown, setCooldown] = useState(0);

  // Upload / processing state
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [processingStep, setProcessingStep] = useState("");
  const [progress, setProgress] = useState(0);
  const [outputUrl, setOutputUrl] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const dragRef = useRef<HTMLDivElement>(null);

  // Check health once on mount only — the wake-up button handles subsequent checks
  useEffect(() => {
    const checkHealth = async () => {
      try {
        const res = await fetch(`${API_BASE}/api/health`, {
          method: "GET",
          signal: AbortSignal.timeout(5000),
        });
        setHealthStatus(res.ok ? "online" : "offline");
      } catch {
        setHealthStatus("offline");
      }
      setLastChecked(new Date().toLocaleTimeString());
    };

    checkHealth();
  }, []);

  // Load token from cookie on mount
  useEffect(() => {
    const t = getCookie("token");
    if (t) setToken(t);
  }, []);

  // Manually ping /api/health to wake the free-tier backend
  const wakeUp = async () => {
    if (isWakingUp || cooldown > 0) return;
    setIsWakingUp(true);
    setHealthStatus("checking");
    try {
      const res = await fetch(`${API_BASE}/api/health`, {
        method: "GET",
        signal: AbortSignal.timeout(15000),
      });
      setHealthStatus(res.ok ? "online" : "offline");
    } catch {
      setHealthStatus("offline");
    }
    setLastChecked(new Date().toLocaleTimeString());
    setIsWakingUp(false);

    // Start 10-second cooldown
    setCooldown(10);
    const timer = setInterval(() => {
      setCooldown((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
  };

  const startProgressTicker = () => {
    setProgress(0);
    const steps = [
      { p: 15, s: "Uploading image..." },
      { p: 35, s: "Parsing image buffer..." },
      { p: 55, s: "Isolating foreground contours..." },
      { p: 90, s: "Generating transparency channel..." },
    ];
    steps.forEach((step, i) => {
      setTimeout(() => {
        setProgress(step.p);
        setProcessingStep(step.s);
      }, (i + 1) * 400);
    });
  };

  const runRemoval = async (file: File) => {
    setIsProcessing(true);
    setOutputUrl(null);
    setError(null);
    startProgressTicker();

    try {
      const formData = new FormData();
      formData.append("image", file);

      const headers: Record<string, string> = {};
      if (token && token !== "undefined" && token !== "null") {
        headers["Authorization"] = `Bearer ${token}`;
      }

      const res = await fetch(`${API_BASE}/api/v1/remove-background`, {
        method: "POST",
        headers,
        body: formData,
      });

      if (!res.ok) {
        let errorBody: { message?: string } = {};
        try {
          errorBody = await res.json();
        } catch {
          // non-JSON response
        }
        throw new Error(
          errorBody.message || `Request failed with status ${res.status}.`
        );
      }

      const blob = await res.blob();
      const url = URL.createObjectURL(blob);

      setProgress(100);
      setProcessingStep("Done!");

      setTimeout(() => {
        setOutputUrl(url);
        setIsProcessing(false);
      }, 400);
    } catch (err: unknown) {
      setIsProcessing(false);
      setProgress(0);
      setError(err instanceof Error ? err.message : "Unknown error occurred.");
    }
  };

  const handleFileSelect = (file: File) => {
    if (previewUrl) URL.revokeObjectURL(previewUrl);
    if (outputUrl) URL.revokeObjectURL(outputUrl);
    setSelectedFile(file);
    setPreviewUrl(URL.createObjectURL(file));
    setOutputUrl(null);
    setError(null);
    runRemoval(file);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files?.[0]) handleFileSelect(e.target.files[0]);
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    dragRef.current?.classList.add("border-[#58a6ff]", "bg-[#58a6ff]/5");
  };

  const handleDragLeave = () => {
    dragRef.current?.classList.remove("border-[#58a6ff]", "bg-[#58a6ff]/5");
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    dragRef.current?.classList.remove("border-[#58a6ff]", "bg-[#58a6ff]/5");
    if (e.dataTransfer.files?.[0]) handleFileSelect(e.dataTransfer.files[0]);
  };

  const handleClear = () => {
    if (previewUrl) URL.revokeObjectURL(previewUrl);
    if (outputUrl) URL.revokeObjectURL(outputUrl);
    setSelectedFile(null);
    setPreviewUrl(null);
    setOutputUrl(null);
    setError(null);
  };

  return (
    <div className="flex-1 bg-[#0d1117] text-[#c9d1d9] font-sans antialiased flex flex-col relative overflow-hidden selection:bg-[#58a6ff]/30 selection:text-white">
      {/* Subtle background glow */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-[#58a6ff]/5 via-transparent to-transparent pointer-events-none z-0" />
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[300px] bg-[#58a6ff]/5 rounded-full blur-3xl pointer-events-none z-0" />

      <div className="relative z-10 flex-1 flex flex-col items-center justify-center px-4 sm:px-6 py-8 sm:py-12">
        <div className="w-full max-w-4xl flex flex-col gap-8 animate-fade-in">

          {/* Header */}
          <div className="text-center">
            <h1 className="text-2xl sm:text-4xl font-extrabold text-white tracking-tight">
              Remove Image{" "}
              <span className="bg-gradient-to-r from-[#58a6ff] via-[#bc85ff] to-[#ff7b72] bg-clip-text text-transparent">
                Background
              </span>
            </h1>
            <p className="mt-2 text-sm text-[#8b949e] max-w-sm mx-auto leading-relaxed">
              Upload an image and the background disappears instantly — powered by neural inference on ONNX Runtime.
            </p>
          </div>

          {/* Workspace Card */}
          <div className="bg-[#161b22] border border-[#30363d] rounded-2xl overflow-hidden shadow-2xl shadow-black/40 ring-1 ring-white/5">

            {/* Card Header */}
            <div className="px-4 sm:px-6 py-3 border-b border-[#30363d] flex items-center justify-between bg-[#161b22]/80 backdrop-blur-sm">
              <h3 className="text-xs sm:text-sm font-bold text-white flex items-center gap-2">
                <svg viewBox="0 0 16 16" width="14" height="14" className="fill-[#58a6ff] flex-shrink-0">
                  <path d="M2 1.75C2 .784 2.784 0 3.75 0h8.5C13.216 0 14 .784 14 1.75v12.5A1.75 1.75 0 0 1 12.25 16H3.75A1.75 1.75 0 0 1 2 14.25V1.75zm1.5.25v11.25c0 .138.112.25.25.25h8.5a.25.25 0 0 0 .25-.25V2a.25.25 0 0 0-.25-.25H3.75a.25.25 0 0 0-.25.25z" />
                </svg>
                <span className="hidden sm:inline">AI Background Removal Workspace</span>
                <span className="sm:hidden">Workspace</span>
              </h3>

              {/* Health badge */}
              <div className="flex items-center gap-2">
                {healthStatus === "checking" && (
                  <span className="flex items-center gap-1.5 text-[10px] font-semibold text-[#8b949e] bg-[#21262d] border border-[#30363d] px-2.5 py-0.5 rounded-full">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#8b949e] animate-pulse" />
                    Checking...
                  </span>
                )}
                {healthStatus === "online" && (
                  <span className="flex items-center gap-1.5 text-[10px] font-semibold text-[#3fb950] bg-[#3fb950]/10 border border-[#3fb950]/20 px-2.5 py-0.5 rounded-full" title={`Last checked: ${lastChecked}`}>
                    <span className="w-1.5 h-1.5 rounded-full bg-[#3fb950] animate-pulse" />
                    API Online
                  </span>
                )}
                {healthStatus === "offline" && (
                  <span className="flex items-center gap-1.5 text-[10px] font-semibold text-[#f85149] bg-[#f85149]/10 border border-[#f85149]/20 px-2.5 py-0.5 rounded-full" title={`Last checked: ${lastChecked}`}>
                    <span className="w-1.5 h-1.5 rounded-full bg-[#f85149]" />
                    API Offline
                  </span>
                )}
                {lastChecked && (
                  <span className="text-[9px] text-[#484f58] hidden md:block">{lastChecked}</span>
                )}
              </div>
            </div>

            <div className="p-4 sm:p-6 md:p-8 flex flex-col gap-6">

              {/* Free-tier wake-up notice — shown when offline */}
              {(healthStatus === "offline" || healthStatus === "checking") && (
                <div className="bg-[#d29922]/10 border border-[#d29922]/30 rounded-xl px-4 py-3.5 flex flex-col sm:flex-row sm:items-center gap-3">
                  <div className="flex items-start gap-2.5 flex-1">
                    <svg viewBox="0 0 16 16" width="15" height="15" className="fill-[#d29922] flex-shrink-0 mt-0.5">
                      <path d="M6.457 1.047c.659-1.234 2.427-1.234 3.086 0l6.082 11.378A1.75 1.75 0 0 1 14.082 15H1.918a1.75 1.75 0 0 1-1.543-2.575Zm1.763.707a.25.25 0 0 0-.44 0L1.698 13.132a.25.25 0 0 0 .22.368h12.164a.25.25 0 0 0 .22-.368Zm.53 3.996v2.5a.75.75 0 0 1-1.5 0v-2.5a.75.75 0 0 1 1.5 0ZM9 11a1 1 0 1 1-2 0 1 1 0 0 1 2 0Z" />
                    </svg>
                    <div className="flex flex-col gap-0.5">
                      <span className="text-xs font-bold text-[#d29922]">Backend is sleeping</span>
                      <span className="text-xs text-[#8b949e] leading-relaxed">
                        Due to the free backend service, the server needs to wake up before you can remove backgrounds. Click the button to wake it up — this usually takes 10–30 seconds.
                      </span>
                    </div>
                  </div>
                  <button
                    onClick={wakeUp}
                    disabled={isWakingUp || cooldown > 0}
                    className="flex-shrink-0 flex items-center gap-2 bg-[#d29922]/20 hover:bg-[#d29922]/30 disabled:opacity-60 border border-[#d29922]/40 text-[#d29922] font-semibold text-xs px-4 py-2 rounded-xl transition-all cursor-pointer disabled:cursor-not-allowed whitespace-nowrap"
                  >
                    {isWakingUp ? (
                      <>
                        <span className="w-3 h-3 rounded-full border-2 border-[#d29922]/40 border-t-[#d29922] animate-spin" />
                        Waking up...
                      </>
                    ) : cooldown > 0 ? (
                      <>
                        <svg viewBox="0 0 16 16" width="12" height="12" className="fill-current">
                          <path d="M8 0a8 8 0 1 1 0 16A8 8 0 0 1 8 0ZM1.5 8a6.5 6.5 0 1 0 13 0 6.5 6.5 0 0 0-13 0Zm7-3.25v2.992l2.028.812a.75.75 0 0 1-.557 1.392l-2.5-1A.751.751 0 0 1 7 8.25v-3.5a.75.75 0 0 1 1.5 0Z" />
                        </svg>
                        Retry in {cooldown}s
                      </>
                    ) : (
                      <>
                        <svg viewBox="0 0 16 16" width="12" height="12" className="fill-current">
                          <path d="M1.705 8.005a.75.75 0 0 1 .834.656 5.5 5.5 0 0 0 9.592 2.97l-1.204-1.204a.25.25 0 0 1 .177-.427h3.646a.25.25 0 0 1 .25.25v3.646a.25.25 0 0 1-.427.177l-1.38-1.38A7.002 7.002 0 0 1 1.05 8.84a.75.75 0 0 1 .656-.834ZM8 2.5a5.487 5.487 0 0 0-4.131 1.869l1.204 1.204A.25.25 0 0 1 4.896 6H1.25A.25.25 0 0 1 1 5.75V2.104a.25.25 0 0 1 .427-.177l1.38 1.38A7.002 7.002 0 0 1 14.95 7.16a.75.75 0 0 1-1.49.178A5.5 5.5 0 0 0 8 2.5Z" />
                        </svg>
                        Wake up backend
                      </>
                    )}
                  </button>
                </div>
              )}

              {/* Error Banner */}
              {error && (
                <div className="bg-[#f85149]/10 border border-[#f85149]/30 rounded-xl px-4 py-3 text-xs text-[#f85149] flex items-start gap-2.5">
                  <svg viewBox="0 0 16 16" width="14" height="14" className="fill-[#f85149] flex-shrink-0 mt-0.5">
                    <path d="M8 1a7 7 0 1 0 0 14A7 7 0 0 0 8 1zM0 8a8 8 0 1 1 16 0A8 8 0 0 1 0 8zm7.25-3.25a.75.75 0 0 1 1.5 0V8a.75.75 0 0 1-1.5 0V4.75zm.75 5.5a1 1 0 1 1 0 2 1 1 0 0 1 0-2z" />
                  </svg>
                  <span><strong>API Error:</strong> {error}</span>
                </div>
              )}

              {!selectedFile ? (
                /* Drop Zone */
                <div
                  ref={dragRef}
                  onDragOver={handleDragOver}
                  onDragLeave={handleDragLeave}
                  onDrop={handleDrop}
                  onClick={() => document.getElementById("file-upload")?.click()}
                  className="border-2 border-dashed border-[#30363d] hover:border-[#58a6ff]/60 rounded-2xl py-14 sm:py-20 px-6 text-center flex flex-col items-center justify-center gap-5 cursor-pointer transition-all duration-300 bg-[#0d1117]/40 hover:bg-[#58a6ff]/5 group relative overflow-hidden"
                >
                  {/* Subtle grid pattern */}
                  <div className="absolute inset-0 opacity-[0.03] pointer-events-none"
                    style={{
                      backgroundImage: "linear-gradient(#8b949e 1px, transparent 1px), linear-gradient(90deg, #8b949e 1px, transparent 1px)",
                      backgroundSize: "32px 32px",
                    }}
                  />

                  <input
                    id="file-upload"
                    type="file"
                    accept="image/png,image/jpeg,image/webp"
                    onChange={handleInputChange}
                    className="hidden"
                  />

                  <div className="relative w-16 h-16 rounded-2xl bg-gradient-to-br from-[#21262d] to-[#161b22] border border-[#30363d] flex items-center justify-center text-[#8b949e] group-hover:text-[#58a6ff] group-hover:border-[#58a6ff]/40 group-hover:scale-105 transition-all duration-300 shadow-lg">
                    <svg viewBox="0 0 24 24" width="28" height="28" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                      <polyline points="17 8 12 3 7 8" />
                      <line x1="12" y1="3" x2="12" y2="15" />
                    </svg>
                  </div>

                  <div className="flex flex-col gap-1.5 relative">
                    <span className="text-sm font-bold text-white group-hover:text-[#58a6ff] transition-colors">
                      Drop image here, or click to browse
                    </span>
                    <span className="text-xs text-[#8b949e]">PNG, JPG, or WEBP — max 10 MB</span>
                  </div>

                  <button className="relative bg-[#21262d] border border-[#30363d] hover:bg-[#30363d] hover:border-[#58a6ff]/30 text-white font-semibold text-xs px-5 py-2.5 rounded-xl transition-all">
                    Browse Files
                  </button>
                </div>
              ) : (
                /* Before / After Preview */
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
                  {/* Original */}
                  <div className="flex flex-col gap-2">
                    <div className="flex items-center gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#8b949e]" />
                      <span className="text-xs font-semibold text-[#8b949e]">Original</span>
                    </div>
                    <div className="relative border border-[#30363d] rounded-xl overflow-hidden aspect-[4/3] bg-[#0d1117] flex items-center justify-center p-2">
                      {previewUrl && (
                        <img src={previewUrl} alt="Original" className="max-w-full max-h-full object-contain rounded" />
                      )}
                    </div>
                  </div>

                  {/* Output */}
                  <div className="flex flex-col gap-2">
                    <div className="flex items-center gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#3fb950]" />
                      <span className="text-xs font-semibold text-[#8b949e]">Background Removed</span>
                    </div>
                    <div className="relative border border-[#30363d] rounded-xl overflow-hidden aspect-[4/3] bg-[#0d1117] flex items-center justify-center p-2 select-none">
                      {/* Checkerboard */}
                      <div
                        className="absolute inset-0 z-0 opacity-[0.07]"
                        style={{
                          backgroundImage:
                            "linear-gradient(45deg, #8b949e 25%, transparent 25%, transparent 75%, #8b949e 75%, #8b949e), linear-gradient(45deg, #8b949e 25%, #0d1117 25%, #0d1117 75%, #8b949e 75%, #8b949e)",
                          backgroundSize: "16px 16px",
                          backgroundPosition: "0 0, 8px 8px",
                        }}
                      />

                      {isProcessing && (
                        <div className="absolute inset-0 bg-[#0d1117]/80 backdrop-blur-sm flex flex-col items-center justify-center gap-3.5 z-20">
                          <div className="w-8 h-8 rounded-full border-[3px] border-[#30363d] border-t-[#58a6ff] animate-spin" />
                          <div className="text-xs font-semibold text-white">{processingStep}</div>
                          <div className="w-40 h-1 bg-[#21262d] rounded-full overflow-hidden">
                            <div
                              className="h-full bg-gradient-to-r from-[#58a6ff] to-[#bc85ff] rounded-full transition-all duration-500"
                              style={{ width: `${progress}%` }}
                            />
                          </div>
                          <div className="text-[10px] text-[#8b949e] font-mono">{progress}%</div>
                        </div>
                      )}

                      {outputUrl ? (
                        <img
                          src={outputUrl}
                          alt="Processed output"
                          className="max-w-full max-h-full object-contain rounded relative z-10 drop-shadow-[0_10px_25px_rgba(0,0,0,0.6)]"
                        />
                      ) : !isProcessing ? (
                        <div className="text-xs text-[#484f58] italic relative z-10">Awaiting processing...</div>
                      ) : null}
                    </div>
                  </div>
                </div>
              )}

              {/* Action Buttons */}
              {selectedFile && !isProcessing && (
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 border-t border-[#30363d] pt-4">
                  <button
                    onClick={handleClear}
                    className="text-xs font-semibold text-[#f85149] hover:text-red-400 transition-colors cursor-pointer text-left"
                  >
                    ✕ Clear Image
                  </button>

                  <div className="flex flex-col sm:flex-row gap-2.5">
                    <button
                      onClick={() => selectedFile && runRemoval(selectedFile)}
                      className="bg-[#21262d] border border-[#30363d] hover:bg-[#30363d] text-white font-semibold text-xs px-4 py-2.5 rounded-xl transition-all cursor-pointer"
                    >
                      ↺ Re-run Extraction
                    </button>
                    {outputUrl && (
                      <a
                        href={outputUrl}
                        download={`g_remover_${selectedFile.name.replace(/\.[^.]+$/, "")}.png`}
                        className="bg-gradient-to-r from-[#238636] to-[#2ea043] hover:from-[#2ea043] hover:to-[#3fb950] text-white font-bold text-xs px-4 py-2.5 rounded-xl transition-all flex items-center justify-center gap-1.5 shadow-md shadow-[#2ea043]/20 text-center"
                      >
                        ↓ Download PNG
                      </a>
                    )}
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Footer hint */}
          <p className="text-center text-[10px] text-[#484f58]">
            Rate limited to 10 requests/min · Auth optional · PNG · JPEG · WEBP supported
          </p>
        </div>
      </div>
    </div>
  );
}
