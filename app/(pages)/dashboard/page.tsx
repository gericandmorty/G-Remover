"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

interface MockFile {
  id: string;
  name: string;
  size: string;
  time: string;
}

export default function DashboardPage() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [processingStep, setProcessingStep] = useState("");
  const [progress, setProgress] = useState(0);
  const [outputImage, setOutputImage] = useState<string | null>(null);
  const [apiKeyVisible, setApiKeyVisible] = useState(false);
  
  const [historyFiles, setHistoryFiles] = useState<MockFile[]>([
    { id: "1", name: "sneaker_cutout.png", size: "142 KB", time: "10m ago" },
    { id: "2", name: "avatar_portrait.png", size: "89 KB", time: "2h ago" },
    { id: "3", name: "tesla_model3_transparent.png", size: "1.2 MB", time: "1d ago" },
  ]);

  const router = useRouter();

  // Route guard validation check
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      // Not logged in -> redirect to login page
      router.push("/auth/login");
    } else {
      setIsAuthenticated(true);
      setIsLoading(false);
    }
  }, [router]);

  // Handle local image upload selection
  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      const reader = new FileReader();
      reader.onload = () => {
        setSelectedImage(reader.result as string);
        setOutputImage(null);
        simulateAiRemoval();
      };
      reader.readAsDataURL(file);
    }
  };

  // Simulate AI removal process
  const simulateAiRemoval = () => {
    setIsProcessing(true);
    setProgress(0);
    setProcessingStep("Uploading to Edge Node...");

    const steps = [
      { p: 25, s: "Parsing image buffer..." },
      { p: 50, s: "Isolating foreground contours..." },
      { p: 75, s: "Generating alpha transparency channel..." },
      { p: 100, s: "Finalizing asset stream..." }
    ];

    steps.forEach((stepObj, index) => {
      setTimeout(() => {
        setProgress(stepObj.p);
        setProcessingStep(stepObj.s);
        
        if (stepObj.p === 100) {
          setTimeout(() => {
            setIsProcessing(false);
            // Setup output image (simulated cutout - we just overlay the subject)
            setOutputImage(selectedImage);
            
            // Add to file history
            const newFile: MockFile = {
              id: Date.now().toString(),
              name: `g_remover_${Math.floor(Math.random() * 1000)}.png`,
              size: "244 KB",
              time: "Just now"
            };
            setHistoryFiles((prev) => [newFile, ...prev]);
          }, 400);
        }
      }, (index + 1) * 600);
    });
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      const file = e.dataTransfer.files[0];
      const reader = new FileReader();
      reader.onload = () => {
        setSelectedImage(reader.result as string);
        setOutputImage(null);
        simulateAiRemoval();
      };
      reader.readAsDataURL(file);
    }
  };

  const handleDeleteHistory = (id: string) => {
    setHistoryFiles((prev) => prev.filter(f => f.id !== id));
  };

  if (isLoading || !isAuthenticated) {
    return (
      <div className="min-h-screen bg-[#0d1117] flex items-center justify-center">
        <div className="w-10 h-10 rounded-full border-4 border-[#30363d] border-t-[#58a6ff] animate-spin"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#0d1117] text-[#c9d1d9] font-sans antialiased pb-16 selection:bg-[#58a6ff]/30 selection:text-white">
      {/* 1. Header Banner */}
      <section className="bg-[#161b22] border-b border-[#30363d] py-6">
        <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h1 className="text-xl md:text-2xl font-bold text-white flex items-center gap-2">
              <span>Developer Dashboard</span>
            </h1>
            <p className="text-xs text-[#8b949e] mt-1">Welcome back. Process images and manage API integration tokens.</p>
          </div>
          
          {/* Quota Widgets */}
          <div className="flex gap-4 text-xs">
            <div className="bg-[#0d1117] border border-[#30363d] rounded-lg px-4 py-2 flex flex-col">
              <span className="text-[#8b949e]">Monthly API Quota</span>
              <strong className="text-white mt-0.5">14 / 1,000 operations</strong>
            </div>
            <div className="bg-[#0d1117] border border-[#30363d] rounded-lg px-4 py-2 flex flex-col">
              <span className="text-[#8b949e]">Storage Usage</span>
              <strong className="text-white mt-0.5">5.4 MB / 100 MB</strong>
            </div>
          </div>
        </div>
      </section>

      {/* 2. Main Dashboard Layout */}
      <main className="max-w-7xl mx-auto px-6 py-8 grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* Left Column: Drag & Drop Sandbox Workspace (75%) */}
        <div className="lg:col-span-8 flex flex-col gap-6">
          
          <div className="bg-[#161b22] border border-[#30363d] rounded-xl overflow-hidden shadow-xl">
            {/* Box Header */}
            <div className="bg-[#161b22] px-5 py-4 border-b border-[#30363d] flex items-center justify-between">
              <h3 className="text-sm font-bold text-white flex items-center gap-2">
                <svg viewBox="0 0 16 16" width="16" height="16" className="fill-[#58a6ff]">
                  <path d="M11.5 8a3.5 3.5 0 1 0 0-7 3.5 3.5 0 0 0 0 7zm0-1.5a2 2 0 1 1 0-4 2 2 0 0 1 0 4z M1 2.75C1 1.784 1.784 1 2.75 1h5.5a.75.75 0 0 1 0 1.5h-5.5a.25.25 0 0 0-.25.25v10.5c0 .138.112.25.25.25h10.5a.25.25 0 0 0 .25-.25v-5.5a.75.75 0 0 1 1.5 0v5.5A1.75 1.75 0 0 1 13.25 15H2.75A1.75 1.75 0 0 1 1 13.25V2.75z"></path>
                </svg>
                <span>AI Background Removal Workspace</span>
              </h3>
            </div>

            {/* Box Canvas Workspace */}
            <div className="p-6 flex flex-col gap-6">
              
              {!selectedImage ? (
                /* Drag and Drop Zone Empty State */
                <div
                  onDragOver={handleDragOver}
                  onDrop={handleDrop}
                  className="border-2 border-dashed border-[#30363d] hover:border-[#8b949e] rounded-xl p-12 text-center flex flex-col items-center justify-center gap-4 cursor-pointer transition-all bg-[#0d1117]/50"
                  onClick={() => document.getElementById("file-upload")?.click()}
                >
                  <input
                    id="file-upload"
                    type="file"
                    accept="image/*"
                    onChange={handleImageChange}
                    className="hidden"
                  />
                  <div className="w-12 h-12 rounded-full bg-[#161b22] border border-[#30363d] flex items-center justify-center text-[#8b949e]">
                    <svg viewBox="0 0 16 16" width="24" height="24" className="fill-current">
                      <path d="M2 1.75C2 .784 2.784 0 3.75 0h8.5C13.216 0 14 .784 14 1.75v12.5A1.75 1.75 0 0 1 12.25 16H3.75A1.75 1.75 0 0 1 2 14.25V1.75zm1.5.25v11.25c0 .138.112.25.25.25h8.5a.25.25 0 0 0 .25-.25V2a.25.25 0 0 0-.25-.25H3.75a.25.25 0 0 0-.25.25zM10.5 1.8L13.7 5H10.5a.25.25 0 0 1-.25-.25V1.8z"></path>
                    </svg>
                  </div>
                  <div className="flex flex-col gap-1">
                    <span className="text-sm font-bold text-white">Select image file, or drag and drop</span>
                    <span className="text-xs text-[#8b949e]">PNG, JPG, or WEBP up to 10MB</span>
                  </div>
                  <button className="bg-[#21262d] border border-[#30363d] hover:bg-[#30363d] text-white font-semibold text-xs px-3 py-1.5 rounded-md transition-all">
                    Browse Files
                  </button>
                </div>
              ) : (
                /* Interactive Canvas showing active upload */
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Left Column: Original Uploaded */}
                  <div className="flex flex-col gap-2">
                    <span className="text-xs font-semibold text-[#8b949e]">Original Backdrop</span>
                    <div className="relative border border-[#30363d] rounded-xl overflow-hidden aspect-[4/3] bg-[#0d1117] flex items-center justify-center p-2">
                      <img src={selectedImage} alt="Uploaded source" className="max-w-full max-h-full object-contain rounded" />
                    </div>
                  </div>

                  {/* Right Column: Transparent Cutout Output */}
                  <div className="flex flex-col gap-2">
                    <span className="text-xs font-semibold text-[#8b949e]">AI Cutout Output</span>
                    <div className="relative border border-[#30363d] rounded-xl overflow-hidden aspect-[4/3] bg-[#0d1117] flex items-center justify-center p-2 select-none">
                      {isProcessing ? (
                        /* Processing Loader Overlay */
                        <div className="absolute inset-0 bg-black/60 backdrop-blur-sm flex flex-col items-center justify-center gap-3 z-10">
                          <div className="w-8 h-8 rounded-full border-3 border-[#30363d] border-t-[#58a6ff] animate-spin"></div>
                          <div className="text-xs font-semibold text-white">{processingStep}</div>
                          <div className="text-[10px] text-[#8b949e] font-mono">{progress}%</div>
                        </div>
                      ) : null}

                      {/* Transparent checkerboard background */}
                      <div
                        className="absolute inset-0 z-0 bg-[size:16px_16px] bg-[position:0_0,8px_8px] opacity-10"
                        style={{
                          backgroundImage:
                            "linear-gradient(45deg, #8b949e 25%, transparent 25%, transparent 75%, #8b949e 75%, #8b949e), linear-gradient(45deg, #8b949e 25%, #0d1117 25%, #0d1117 75%, #8b949e 75%, #8b949e)",
                        }}
                      />

                      {outputImage ? (
                        /* Cutout output rendered */
                        <img
                          src={outputImage}
                          alt="Transparent cutout result"
                          className="max-w-full max-h-full object-contain rounded relative z-10 animate-fade-in drop-shadow-[0_10px_20px_rgba(0,0,0,0.6)]"
                          style={{
                            // Simple CSS silhouette mask effect to simulate background removal
                            maskImage: "radial-gradient(ellipse at center, black 60%, transparent 100%)",
                            WebkitMaskImage: "radial-gradient(ellipse at center, black 60%, transparent 100%)"
                          }}
                        />
                      ) : (
                        <div className="text-xs text-[#484f58] italic relative z-10">Awaiting processing...</div>
                      )}
                    </div>
                  </div>
                </div>
              )}

              {/* Action buttons when image is loaded */}
              {selectedImage && !isProcessing && (
                <div className="flex items-center justify-between gap-4 border-t border-[#30363d] pt-4 mt-2">
                  <button
                    onClick={() => setSelectedImage(null)}
                    className="text-xs font-semibold text-[#f85149] hover:underline hover:text-[#f85149]/80 cursor-pointer"
                  >
                    Clear Image
                  </button>

                  <div className="flex gap-2">
                    <button
                      onClick={simulateAiRemoval}
                      className="bg-[#21262d] border border-[#30363d] hover:bg-[#30363d] text-white font-semibold text-xs px-4 py-2 rounded-md transition-all cursor-pointer"
                    >
                      Re-run Extraction
                    </button>
                    {outputImage && (
                      <a
                        href={outputImage}
                        download="g_remover_transparent.png"
                        className="bg-[#238636] hover:bg-[#2ea043] text-white font-bold text-xs px-4 py-2 rounded-md transition-all shadow-sm flex items-center gap-1.5"
                      >
                        Download Cutout
                      </a>
                    )}
                  </div>
                </div>
              )}

            </div>
          </div>

          {/* History Files List */}
          <div className="bg-[#161b22] border border-[#30363d] rounded-xl overflow-hidden shadow-xl">
            <div className="bg-[#161b22] px-5 py-4 border-b border-[#30363d] flex items-center justify-between">
              <h3 className="text-sm font-bold text-white">Recent Processed History</h3>
            </div>
            
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse text-xs md:text-sm">
                <thead>
                  <tr className="border-b border-[#30363d] text-[#8b949e] font-semibold text-xs bg-[#0d1117]/30">
                    <th className="px-4 py-2">Asset Name</th>
                    <th className="px-4 py-2">Size</th>
                    <th className="px-4 py-2">Created</th>
                    <th className="px-4 py-2 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {historyFiles.length === 0 ? (
                    <tr>
                      <td colSpan={4} className="px-4 py-8 text-center text-xs text-[#8b949e] italic">
                        No processing history found. Upload an image above to start.
                      </td>
                    </tr>
                  ) : (
                    historyFiles.map((file) => (
                      <tr key={file.id} className="border-b border-[#30363d] last:border-0 hover:bg-[#161b22]/50 transition-colors">
                        <td className="px-4 py-3 font-semibold text-white flex items-center gap-2 max-w-[200px] truncate">
                          <svg viewBox="0 0 16 16" width="16" height="16" className="fill-[#8b949e]">
                            <path d="M2 1.75C2 .784 2.784 0 3.75 0h6.586c.464 0 .909.184 1.237.513l3.414 3.414c.329.328.513.773.513 1.237v8.086A1.75 1.75 0 0 1 13.75 15H3.75A1.75 1.75 0 0 1 2 13.25V1.75zm1.5.25v11.25c0 .138.112.25.25.25h10a.25.25 0 0 0 .25-.25V6H10.75A1.75 1.75 0 0 1 9 4.25V1.5H3.75a.25.25 0 0 0-.25.25zM10.5 1.8L13.7 5H10.5a.25.25 0 0 1-.25-.25V1.8z"></path>
                          </svg>
                          <span className="truncate">{file.name}</span>
                        </td>
                        <td className="px-4 py-3 text-[#8b949e]">{file.size}</td>
                        <td className="px-4 py-3 text-[#8b949e]">{file.time}</td>
                        <td className="px-4 py-3 text-right">
                          <div className="inline-flex gap-3 text-xs font-semibold">
                            <a href="#" className="text-[#58a6ff] hover:underline">Download</a>
                            <button
                              onClick={() => handleDeleteHistory(file.id)}
                              className="text-[#f85149] hover:underline cursor-pointer"
                            >
                              Delete
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        {/* Right Column: Credentials & API key integration (25%) */}
        <div className="lg:col-span-4 flex flex-col gap-6">
          
          {/* API Token Box */}
          <div className="bg-[#161b22] border border-[#30363d] rounded-xl p-5 shadow-xl flex flex-col gap-4">
            <div>
              <h3 className="text-sm font-bold text-white mb-1">Your Developer API Key</h3>
              <p className="text-xs text-[#8b949e]">Use this JWT Bearer credential token to authorize HTTP requests into G-Remover API endpoints.</p>
            </div>

            <div className="flex flex-col gap-2 font-mono">
              <div className="relative bg-[#0d1117] border border-[#30363d] rounded-lg p-3 text-xs break-all flex items-center justify-between min-h-[60px]">
                <span className="text-[#8b949e] truncate max-w-[200px]">
                  {apiKeyVisible ? "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.mock_token_key_gericmorit_development" : "••••••••••••••••••••••••••••••••••••••••"}
                </span>
                <button
                  onClick={() => setApiKeyVisible(!apiKeyVisible)}
                  className="text-xs text-[#58a6ff] hover:underline cursor-pointer select-none ml-2 flex-shrink-0"
                >
                  {apiKeyVisible ? "Hide" : "Reveal"}
                </button>
              </div>
            </div>

            <div className="flex gap-2">
              <button
                onClick={() => {
                  navigator.clipboard.writeText("eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.mock_token_key_gericmorit_development");
                  alert("API Token copied to clipboard!");
                }}
                className="bg-[#21262d] border border-[#30363d] hover:bg-[#30363d] text-white font-semibold text-xs px-3 py-2 rounded-md transition-all flex-1 text-center cursor-pointer"
              >
                Copy Key
              </button>
              <button
                onClick={() => alert("Credentials token revoked. Generate a new key by logging in.")}
                className="bg-transparent border border-[#30363d] hover:border-[#f85149] text-[#f85149] font-semibold text-xs px-3 py-2 rounded-md transition-all text-center cursor-pointer"
              >
                Revoke
              </button>
            </div>
          </div>

          {/* Quick Integration Details */}
          <div className="bg-[#161b22] border border-[#30363d] rounded-xl p-5 shadow-xl flex flex-col gap-3">
            <h3 className="text-sm font-bold text-white">Quick Integration</h3>
            <p className="text-xs text-[#8b949e] leading-relaxed">
              Verify your local Axum REST endpoint is running on port `8080` and execute in terminal:
            </p>
            <pre className="bg-[#0d1117] border border-[#30363d] p-3 rounded-lg text-[10px] leading-5 font-mono text-[#c9d1d9] overflow-x-auto">
              <code>{`curl -X POST http://localhost:8080/api/remove \\
  -H "Authorization: Bearer <key>" \\
  -F "image=@photo.png"`}</code>
            </pre>
            <a href="/#code-samples" className="text-xs text-[#58a6ff] hover:underline font-semibold block mt-1">
              Browse full integration docs &rarr;
            </a>
          </div>

        </div>
      </main>
    </div>
  );
}
