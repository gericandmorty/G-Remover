"use client";

import { useEffect, useRef, useState } from "react";
import { getCookie } from "../../components/cookies";

const API_BASE = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8080";

export default function DashboardPage() {
  const [isLoading, setIsLoading] = useState(true);
  const [token, setToken] = useState<string>("");

  // Upload / processing state
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [processingStep, setProcessingStep] = useState("");
  const [progress, setProgress] = useState(0);
  const [outputUrl, setOutputUrl] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const dragRef = useRef<HTMLDivElement>(null);

  // Optional token loading on mount
  useEffect(() => {
    const t = getCookie("token");
    if (t) {
      setToken(t);
    }
    setIsLoading(false);
  }, []);

  // Fake progress ticker while waiting for the backend
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

  // Call the real backend API
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
        const text = await res.text();
        throw new Error(text || `Server error ${res.status}`);
      }

      // Backend returns raw PNG bytes with content-type image/png
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
    // Revoke old preview URL to avoid memory leaks
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
    dragRef.current?.classList.add("border-[#58a6ff]");
  };

  const handleDragLeave = () => {
    dragRef.current?.classList.remove("border-[#58a6ff]");
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    dragRef.current?.classList.remove("border-[#58a6ff]");
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

  if (isLoading) {
    return (
      <div className="flex-1 bg-[#0d1117] flex items-center justify-center">
        <div className="w-10 h-10 rounded-full border-4 border-[#30363d] border-t-[#58a6ff] animate-spin" />
      </div>
    );
  }

  return (
    <div className="flex-1 bg-[#0d1117] text-[#c9d1d9] font-sans antialiased flex flex-col items-center justify-center p-6 selection:bg-[#58a6ff]/30 selection:text-white">
      <div className="w-full max-w-4xl flex flex-col gap-8 py-8 animate-fade-in">
        
        {/* Title / Description */}
        <div className="text-center">
          <h1 className="text-4xl font-extrabold text-white tracking-tight bg-gradient-to-r from-white via-[#e2e8f0] to-[#8b949e] bg-clip-text text-transparent">
            Remove Image Background
          </h1>
          <p className="mt-3 text-sm text-[#8b949e] max-w-md mx-auto leading-relaxed">
            Upload an image and watch the background disappear instantly. Powered by ONNX Runtime.
          </p>
        </div>

        {/* AI Background Removal Workspace Card */}
        <div className="bg-[#161b22] border border-[#30363d] rounded-2xl overflow-hidden shadow-2xl transition-all duration-300">
          
          {/* Card Header */}
          <div className="px-6 py-4 border-b border-[#30363d] flex items-center justify-between bg-[#161b22]">
            <h3 className="text-sm font-bold text-white flex items-center gap-2.5">
              <svg viewBox="0 0 16 16" width="16" height="16" className="fill-[#58a6ff]">
                <path d="M11.5 8a3.5 3.5 0 1 0 0-7 3.5 3.5 0 0 0 0 7zm0-1.5a2 2 0 1 1 0-4 2 2 0 0 1 0 4z M1 2.75C1 1.784 1.784 1 2.75 1h5.5a.75.75 0 0 1 0 1.5h-5.5a.25.25 0 0 0-.25.25v10.5c0 .138.112.25.25.25h10.5a.25.25 0 0 0 .25-.25v-5.5a.75.75 0 0 1 1.5 0v5.5A1.75 1.75 0 0 1 13.25 15H2.75A1.75 1.75 0 0 1 1 13.25V2.75z" />
              </svg>
              AI Background Removal Workspace
            </h3>
            <span className="text-[10px] bg-[#3fb950]/10 text-[#3fb950] border border-[#3fb950]/20 px-2.5 py-0.5 rounded-full font-semibold">
              Live API
            </span>
          </div>

          <div className="p-6 md:p-8 flex flex-col gap-6">
            
            {/* Error Banner */}
            {error && (
              <div className="bg-[#f85149]/10 border border-[#f85149]/30 rounded-lg px-4 py-3 text-xs text-[#f85149] flex items-start gap-2.5 animate-fadeIn">
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
                className="border-2 border-dashed border-[#30363d] hover:border-[#8b949e] rounded-xl p-16 text-center flex flex-col items-center justify-center gap-5 cursor-pointer transition-all duration-300 bg-[#0d1117]/50 hover:bg-[#161b22]/30 group"
              >
                <input
                  id="file-upload"
                  type="file"
                  accept="image/png,image/jpeg,image/webp"
                  onChange={handleInputChange}
                  className="hidden"
                />
                <div className="w-16 h-16 rounded-full bg-[#161b22] border border-[#30363d] flex items-center justify-center text-[#8b949e] group-hover:scale-105 group-hover:border-[#8b949e] transition-all duration-300">
                  <svg viewBox="0 0 16 16" width="28" height="28" className="fill-current">
                    <path d="M2 1.75C2 .784 2.784 0 3.75 0h8.5C13.216 0 14 .784 14 1.75v12.5A1.75 1.75 0 0 1 12.25 16H3.75A1.75 1.75 0 0 1 2 14.25V1.75zm1.5.25v11.25c0 .138.112.25.25.25h8.5a.25.25 0 0 0 .25-.25V2a.25.25 0 0 0-.25-.25H3.75a.25.25 0 0 0-.25.25z" />
                  </svg>
                </div>
                <div className="flex flex-col gap-1.5">
                  <span className="text-sm font-bold text-white group-hover:text-[#58a6ff] transition-colors">
                    Drop image here, or click to browse
                  </span>
                  <span className="text-xs text-[#8b949e]">PNG, JPG, or WEBP — max 10 MB</span>
                </div>
                <button className="bg-[#21262d] border border-[#30363d] hover:bg-[#30363d] text-white font-semibold text-xs px-4 py-2.5 rounded-lg transition-all">
                  Browse Files
                </button>
              </div>
            ) : (
              /* Before / After Preview */
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Original */}
                <div className="flex flex-col gap-2 animate-fade-in">
                  <span className="text-xs font-semibold text-[#8b949e]">Original</span>
                  <div className="relative border border-[#30363d] rounded-xl overflow-hidden aspect-[4/3] bg-[#0d1117] flex items-center justify-center p-2">
                    {previewUrl && (
                      <img src={previewUrl} alt="Original" className="max-w-full max-h-full object-contain rounded" />
                    )}
                  </div>
                </div>

                {/* Output */}
                <div className="flex flex-col gap-2 animate-fade-in">
                  <span className="text-xs font-semibold text-[#8b949e]">Background Removed</span>
                  <div className="relative border border-[#30363d] rounded-xl overflow-hidden aspect-[4/3] bg-[#0d1117] flex items-center justify-center p-2 select-none">
                    
                    {/* Checkerboard background */}
                    <div
                      className="absolute inset-0 z-0 opacity-10"
                      style={{
                        backgroundImage:
                          "linear-gradient(45deg, #8b949e 25%, transparent 25%, transparent 75%, #8b949e 75%, #8b949e), linear-gradient(45deg, #8b949e 25%, #0d1117 25%, #0d1117 75%, #8b949e 75%, #8b949e)",
                        backgroundSize: "16px 16px",
                        backgroundPosition: "0 0, 8px 8px",
                      }}
                    />

                    {isProcessing && (
                      <div className="absolute inset-0 bg-black/70 backdrop-blur-sm flex flex-col items-center justify-center gap-3.5 z-20">
                        <div className="w-8 h-8 rounded-full border-[3px] border-[#30363d] border-t-[#58a6ff] animate-spin" />
                        <div className="text-xs font-semibold text-white">{processingStep}</div>
                        
                        {/* Progress bar */}
                        <div className="w-40 h-1.5 bg-[#30363d] rounded-full overflow-hidden">
                          <div
                            className="h-full bg-[#58a6ff] rounded-full transition-all duration-500"
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
              <div className="flex items-center justify-between gap-4 border-t border-[#30363d] pt-5">
                <button
                  onClick={handleClear}
                  className="text-xs font-semibold text-[#f85149] hover:underline cursor-pointer"
                >
                  Clear Image
                </button>

                <div className="flex gap-2.5">
                  <button
                    onClick={() => selectedFile && runRemoval(selectedFile)}
                    className="bg-[#21262d] border border-[#30363d] hover:bg-[#30363d] text-white font-semibold text-xs px-4 py-2.5 rounded-lg transition-all cursor-pointer"
                  >
                    Re-run Extraction
                  </button>
                  {outputUrl && (
                    <a
                      href={outputUrl}
                      download={`g_remover_${selectedFile.name.replace(/\.[^.]+$/, "")}.png`}
                      className="bg-[#238636] hover:bg-[#2ea043] text-white font-bold text-xs px-4 py-2.5 rounded-lg transition-all flex items-center gap-1.5 shadow-md shadow-[#2ea043]/10"
                    >
                      Download PNG
                    </a>
                  )}
                </div>
              </div>
            )}
          </div>
        </div>

      </div>
    </div>
  );
}
