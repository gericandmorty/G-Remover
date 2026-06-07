"use client";

import { useState, useRef, useEffect } from "react";

// Types for templates
type TemplateId = "shoe" | "portrait" | "car";

interface Template {
  id: TemplateId;
  label: string;
  desc: string;
  originalBg: string; // Tailwind class
  subjectSvg: React.ReactNode;
}

export default function GRemoverProductLanding() {
  const [activeTemplate, setActiveTemplate] = useState<TemplateId>("shoe");
  const [isProcessing, setIsProcessing] = useState(false);
  const [progress, setProgress] = useState(0);
  const [removedState, setRemovedState] = useState(false);
  const [sliderPosition, setSliderPosition] = useState(50);
  const [codeTab, setCodeTab] = useState<"curl" | "js" | "rust">("curl");
  const [emailInput, setEmailInput] = useState("");
  const [passwordInput, setPasswordInput] = useState("");
  const [isRegistered, setIsRegistered] = useState(false);
  const [regError, setRegError] = useState("");
  
  const sliderRef = useRef<HTMLDivElement>(null);
  const isDragging = useRef(false);

  // Trigger processing simulation on template change
  useEffect(() => {
    setIsProcessing(true);
    setRemovedState(false);
    setProgress(0);
    
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          setIsProcessing(false);
          setRemovedState(true);
          return 100;
        }
        return prev + 10;
      });
    }, 80);

    return () => clearInterval(interval);
  }, [activeTemplate]);

  // Handle Drag/Move logic for the Comparison Slider
  const handleSliderMove = (clientX: number) => {
    if (!sliderRef.current) return;
    const rect = sliderRef.current.getBoundingClientRect();
    const x = clientX - rect.left;
    const percentage = Math.max(0, Math.min(100, (x / rect.width) * 100));
    setSliderPosition(percentage);
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (e.touches[0]) {
      handleSliderMove(e.touches[0].clientX);
    }
  };

  const handleMouseDown = () => {
    isDragging.current = true;
  };

  const handleMouseUp = () => {
    isDragging.current = false;
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (e.buttons === 1 || isDragging.current) {
      handleSliderMove(e.clientX);
    }
  };

  // Mock form registration connection to backend (simulated)
  const handleMockRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setRegError("");
    if (!emailInput || !passwordInput) {
      setRegError("Please fill in all credentials");
      return;
    }
    if (passwordInput.length < 6) {
      setRegError("Password must be at least 6 characters");
      return;
    }
    setIsRegistered(true);
  };

  // Preset SVGs to represent original/removed subject cutouts
  const templates: Record<TemplateId, Template> = {
    shoe: {
      id: "shoe",
      label: "Product Shot",
      desc: "Neon running shoe, clean edges",
      originalBg: "bg-gradient-to-tr from-[#ff453a] via-[#ff9f0a] to-[#ffd60a]",
      subjectSvg: (
        <svg viewBox="0 0 100 100" className="w-full h-full p-8 drop-shadow-[0_10px_20px_rgba(0,0,0,0.5)]">
          {/* Shoe body outline */}
          <path
            d="M10 60 C15 50, 25 45, 35 48 C45 50, 55 35, 68 35 C75 35, 85 45, 90 52 C95 58, 92 65, 85 68 C75 72, 30 72, 15 70 C10 68, 8 64, 10 60 Z"
            fill="#10b981"
            stroke="#ffffff"
            strokeWidth="1.5"
          />
          {/* Shoe laces */}
          <path d="M48 45 L54 38 M52 47 L58 40 M56 49 L62 42" stroke="#ffffff" strokeWidth="2" strokeLinecap="round" />
          {/* Sole details */}
          <path d="M12 68 C25 70, 70 70, 88 66" stroke="#047857" strokeWidth="3" fill="none" />
          <path d="M15 71 L85 68" stroke="#ffffff" strokeWidth="1" />
          {/* Swoosh/branding */}
          <path d="M35 55 Q50 50 65 42 Q52 58 38 61 Z" fill="#ffffff" opacity="0.9" />
        </svg>
      ),
    },
    portrait: {
      id: "portrait",
      label: "Model Portrait",
      desc: "Detailed hair silhouette matching",
      originalBg: "bg-gradient-to-br from-[#bf5af2] via-[#e55c30] to-[#0a84ff]",
      subjectSvg: (
        <svg viewBox="0 0 100 100" className="w-full h-full p-8 drop-shadow-[0_10px_20px_rgba(0,0,0,0.5)]">
          {/* Face profile / head */}
          <path
            d="M50 20 C62 20, 70 28, 70 40 C70 45, 68 50, 72 55 C75 60, 73 63, 68 64 C64 65, 60 72, 58 78 C56 82, 44 82, 42 78 C40 72, 36 65, 32 64 C27 63, 25 60, 28 55 C32 50, 30 45, 30 40 C30 28, 38 20, 50 20 Z"
            fill="#f59e0b"
            stroke="#ffffff"
            strokeWidth="1.5"
          />
          {/* Glasses */}
          <rect x="42" y="36" width="16" height="6" rx="2" fill="#111827" stroke="#ffffff" strokeWidth="1" />
          {/* Hair spikes / details */}
          <path
            d="M32 35 Q20 30 28 42 Q15 45 28 52 M68 35 Q80 30 72 42 Q85 45 72 52 M50 18 Q50 8 45 18 Q40 5 40 18"
            stroke="#ffffff"
            strokeWidth="1.5"
            fill="none"
            strokeLinecap="round"
          />
        </svg>
      ),
    },
    car: {
      id: "car",
      label: "Sports Car",
      desc: "Complex reflections and windshields",
      originalBg: "bg-gradient-to-r from-[#0a84ff] via-[#30d158] to-[#5e5ce6]",
      subjectSvg: (
        <svg viewBox="0 0 100 100" className="w-full h-full p-6 drop-shadow-[0_10px_20px_rgba(0,0,0,0.5)]">
          {/* Car body */}
          <path
            d="M10 58 L15 50 C18 45, 30 40, 40 38 L65 38 C75 38, 85 48, 90 54 L92 62 C92 65, 88 66, 85 66 L15 66 C12 66, 10 63, 10 58 Z"
            fill="#ef4444"
            stroke="#ffffff"
            strokeWidth="1.5"
          />
          {/* Windshield */}
          <path d="M42 41 L62 41 L58 48 L44 48 Z" fill="#1f2937" stroke="#ffffff" strokeWidth="1" />
          {/* Wheels */}
          <circle cx="28" cy="66" r="10" fill="#111827" stroke="#ffffff" strokeWidth="2" />
          <circle cx="28" cy="66" r="4" fill="#6b7280" />
          <circle cx="72" cy="66" r="10" fill="#111827" stroke="#ffffff" strokeWidth="2" />
          <circle cx="72" cy="66" r="4" fill="#6b7280" />
          {/* Wing spoiler */}
          <path d="M12 48 L8 45 L15 45 Z" fill="#ffffff" />
        </svg>
      ),
    },
  };

  return (
    <div className="min-h-screen bg-[#040d21] text-[#c9d1d9] font-sans antialiased selection:bg-[#58a6ff]/30 selection:text-white">
      {/* Background Star Overlay */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-[#0d2b5c]/30 via-transparent to-transparent pointer-events-none z-0"></div>


      {/* 2. Hero Section */}
      <section className="relative z-10 max-w-7xl mx-auto px-6 pt-16 pb-20 grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
        {/* Left Headline */}
        <div className="lg:col-span-7 flex flex-col gap-6">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-[#161b22] border border-[#30363d] rounded-full text-xs text-[#58a6ff] font-semibold w-fit">
            <span className="w-1.5 h-1.5 bg-[#10b981] rounded-full animate-ping"></span>
            AI Powered Edge Removal
          </span>
          
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-extrabold tracking-tight text-white leading-tight">
            Delete backgrounds. <br />
            <span className="bg-gradient-to-r from-[#58a6ff] via-[#bc85ff] to-[#ff7b72] bg-clip-text text-transparent">
              From here.
            </span>
          </h1>

          <p className="text-[#8b949e] text-base md:text-lg max-w-xl leading-relaxed">
            The developer-first, cloud-native background extractor. Remove photo backdrops in milliseconds using high-fidelity deep learning algorithms, controlled via a secure Rust Axum API.
          </p>

          <div className="flex flex-wrap items-center gap-4 mt-2">
            <a
              href="#playground"
              className="bg-[#238636] hover:bg-[#2ea043] text-white font-bold text-sm px-6 py-3 rounded-md shadow-md hover:shadow-[#238636]/20 transition-all flex items-center gap-2"
            >
              Start extracting free
            </a>
            <a
              href="#code-samples"
              className="bg-transparent border border-[#30363d] hover:border-[#8b949e] text-[#58a6ff] font-bold text-sm px-6 py-3 rounded-md transition-all"
            >
              Read API Docs
            </a>
          </div>
        </div>

        {/* Right Call-to-action Register Form Card */}
        <div id="register" className="lg:col-span-5 relative">
          <div className="absolute inset-0 bg-gradient-to-tr from-[#58a6ff]/10 to-[#bc85ff]/10 rounded-2xl blur-2xl z-0"></div>
          <div className="relative z-10 bg-[#161b22] border border-[#30363d] rounded-2xl p-6 md:p-8 shadow-2xl flex flex-col gap-6">
            <div>
              <h3 className="text-lg font-bold text-white mb-1">Create developer token</h3>
              <p className="text-xs text-[#8b949e]">Sign up to fetch your secure JWT credential key for our Axum API backend.</p>
            </div>

            {isRegistered ? (
              <div className="bg-[#163020] border border-[#238636] rounded-lg p-4 text-center text-[#3fb950] flex flex-col gap-2">
                <svg viewBox="0 0 16 16" width="32" height="32" className="fill-current mx-auto">
                  <path d="M13.78 4.22a.75.75 0 0 1 0 1.06l-7.25 7.25a.75.75 0 0 1-1.06 0L2.22 9.28a.75.75 0 1 1 1.06-1.06L6 10.94l6.72-6.72a.75.75 0 0 1 1.06 0z"></path>
                </svg>
                <div className="font-bold">Credential Register Token Generated!</div>
                <div className="text-xs text-[#8b949e] mt-1 font-mono break-all bg-[#0d1117] p-2 rounded border border-[#30363d]">
                  Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.gericmorit...
                </div>
              </div>
            ) : (
              <form onSubmit={handleMockRegister} className="flex flex-col gap-4">
                {regError && <div className="text-xs text-[#f85149] bg-[#301614] border border-[#f85149] rounded p-2">{regError}</div>}
                
                <div className="flex flex-col gap-1.5">
                  <label className="text-xs font-semibold text-[#8b949e]">Work Email</label>
                  <input
                    type="email"
                    value={emailInput}
                    onChange={(e) => setEmailInput(e.target.value)}
                    placeholder="you@domain.com"
                    className="bg-[#0d1117] border border-[#30363d] focus:border-[#58a6ff] rounded-md px-3 py-2 text-sm text-white focus:outline-none transition-all placeholder-[#484f58]"
                  />
                </div>

                <div className="flex flex-col gap-1.5">
                  <label className="text-xs font-semibold text-[#8b949e]">API Password</label>
                  <input
                    type="password"
                    value={passwordInput}
                    onChange={(e) => setPasswordInput(e.target.value)}
                    placeholder="At least 6 characters"
                    className="bg-[#0d1117] border border-[#30363d] focus:border-[#58a6ff] rounded-md px-3 py-2 text-sm text-white focus:outline-none transition-all placeholder-[#484f58]"
                  />
                </div>

                <button
                  type="submit"
                  className="bg-[#238636] hover:bg-[#2ea043] text-white font-semibold text-sm py-2 px-4 rounded-md shadow transition-all mt-2 cursor-pointer text-center"
                >
                  Generate Token Credentials
                </button>
              </form>
            )}
            
            <span className="text-[10px] text-[#8b949e] text-center">
              Protected by bcrypt SHA-256 server-side encryption. View our <a href="#" className="text-[#58a6ff] hover:underline">Privacy Statement</a>.
            </span>
          </div>
        </div>
      </section>

      {/* 3. AI Playground Comparison Slider */}
      <section id="playground" className="relative z-10 max-w-7xl mx-auto px-6 py-16 border-t border-[#30363d]">
        <div className="text-center max-w-2xl mx-auto mb-12 flex flex-col gap-3">
          <h2 className="text-2xl md:text-4xl font-extrabold text-white">Experience High-Fidelity Edge Detailing</h2>
          <p className="text-sm md:text-base text-[#8b949e]">
            Our AI model isolates fine strands of hair, complex product contours, and detailed car wheel arches. Try our preset templates or upload your own to test.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          {/* Playground Left: Preset Selection & Stats */}
          <div className="lg:col-span-4 flex flex-col justify-between gap-6">
            <div className="flex flex-col gap-3">
              <span className="text-xs font-bold text-[#8b949e] uppercase tracking-wider">Select Preset Template</span>
              
              <div className="flex flex-col gap-3">
                {(Object.keys(templates) as TemplateId[]).map((key) => {
                  const item = templates[key];
                  return (
                    <button
                      key={item.id}
                      onClick={() => setActiveTemplate(item.id)}
                      className={`text-left p-4 rounded-xl border transition-all flex items-center justify-between cursor-pointer ${
                        activeTemplate === item.id
                          ? "bg-[#161b22] border-[#58a6ff] shadow-lg shadow-[#58a6ff]/5"
                          : "bg-transparent border-[#30363d] hover:border-[#8b949e] hover:bg-[#161b22]/50"
                      }`}
                    >
                      <div>
                        <div className="font-semibold text-white text-sm">{item.label}</div>
                        <div className="text-xs text-[#8b949e] mt-0.5">{item.desc}</div>
                      </div>
                      <div className="w-8 h-8 rounded-lg bg-[#21262d] border border-[#30363d] overflow-hidden flex items-center justify-center p-1">
                        <div className={`w-full h-full rounded ${item.originalBg}`} />
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Simulated Speed Statistics */}
            <div className="bg-[#161b22] border border-[#30363d] rounded-xl p-5 flex flex-col gap-3">
              <div className="text-xs font-bold text-[#8b949e] uppercase tracking-wider">Edge API Benchmarks</div>
              
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <div className="text-xs text-[#8b949e]">Execution Latency</div>
                  <div className="text-xl md:text-2xl font-black text-white mt-1">112ms</div>
                </div>
                <div>
                  <div className="text-xs text-[#8b949e]">Precision Rate</div>
                  <div className="text-xl md:text-2xl font-black text-[#10b981] mt-1">99.8%</div>
                </div>
              </div>
              
              <div className="text-[11px] text-[#8b949e] mt-1">
                Benchmarks compiled using rust-tokio multi-core threads under Axum servers.
              </div>
            </div>
          </div>

          {/* Playground Right: The Interactive Comparison Slider Container */}
          <div className="lg:col-span-8 flex flex-col gap-4">
            <div
              ref={sliderRef}
              onMouseMove={handleMouseMove}
              onTouchMove={handleTouchMove}
              onMouseDown={handleMouseDown}
              onMouseUp={handleMouseUp}
              onMouseLeave={handleMouseUp}
              className="relative w-full aspect-[4/3] max-h-[460px] rounded-2xl border border-[#30363d] overflow-hidden bg-[#0d1117] select-none cursor-ew-resize group"
            >
              {/* Checkerboard pattern background for transparent side */}
              <div
                className="absolute inset-0 z-0 bg-[size:16px_16px] bg-[position:0_0,8px_8px] opacity-15"
                style={{
                  backgroundImage:
                    "linear-gradient(45deg, #8b949e 25%, transparent 25%, transparent 75%, #8b949e 75%, #8b949e), linear-gradient(45deg, #8b949e 25%, #0d1117 25%, #0d1117 75%, #8b949e 75%, #8b949e)",
                }}
              ></div>

              {isProcessing ? (
                /* 1. Loading/Processing Animation overlay */
                <div className="absolute inset-0 z-20 bg-black/60 backdrop-blur-sm flex flex-col items-center justify-center gap-4">
                  <div className="w-12 h-12 rounded-full border-4 border-[#30363d] border-t-[#58a6ff] animate-spin"></div>
                  <div className="flex flex-col gap-1 text-center">
                    <span className="text-sm font-bold text-white">Extracting Subject Outline...</span>
                    <span className="text-xs text-[#8b949e] font-mono">Axum API running: {progress}%</span>
                  </div>
                  {/* Progress bar */}
                  <div className="w-48 h-1.5 bg-[#21262d] rounded-full overflow-hidden border border-[#30363d]">
                    <div className="bg-[#58a6ff] h-full transition-all duration-100" style={{ width: `${progress}%` }}></div>
                  </div>
                </div>
              ) : null}

              {/* 2. Before (Original image with color gradient bg) */}
              <div className="absolute inset-0 z-10 w-full h-full">
                <div className={`w-full h-full flex items-center justify-center ${templates[activeTemplate].originalBg}`}>
                  {templates[activeTemplate].subjectSvg}
                </div>
                {/* Before Label */}
                <span className="absolute bottom-4 left-4 z-20 bg-black/60 border border-[#30363d] text-white text-[11px] font-bold px-2 py-1 rounded">
                  Original Backdrop
                </span>
              </div>

              {/* 3. After (Removed cutout overlay) */}
              <div
                className="absolute inset-0 z-10 w-full h-full overflow-hidden select-none pointer-events-none transition-all duration-75"
                style={{ clipPath: `polygon(${sliderPosition}% 0, 100% 0, 100% 100%, ${sliderPosition}% 100%)` }}
              >
                {/* Centered transparent cutout subject */}
                <div className="w-full h-full flex items-center justify-center bg-transparent">
                  {templates[activeTemplate].subjectSvg}
                </div>
                {/* After Label */}
                <span className="absolute bottom-4 right-4 z-20 bg-[#238636] border border-transparent text-white text-[11px] font-bold px-2 py-1 rounded">
                  Background Removed
                </span>
              </div>

              {/* 4. Sliding divider bar handler */}
              <div
                className="absolute top-0 bottom-0 z-20 w-[2px] bg-white pointer-events-none"
                style={{ left: `${sliderPosition}%` }}
              >
                {/* Central circular drag indicator */}
                <div className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2 w-8 h-8 rounded-full bg-white border border-[#30363d] shadow-2xl flex items-center justify-center text-xs text-[#161b22] font-black group-hover:scale-110 transition-transform">
                  &harr;
                </div>
              </div>
            </div>
            
            {/* Slider hint */}
            <div className="text-center text-xs text-[#8b949e] italic">
              Hover & Drag your cursor across the container to compare boundaries.
            </div>
          </div>
        </div>
      </section>

      {/* 4. Tabbed API Code Integration Panel */}
      <section id="code-samples" className="relative z-10 max-w-7xl mx-auto px-6 py-16 border-t border-[#30363d]">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Code Left */}
          <div className="lg:col-span-5 flex flex-col gap-6">
            <div className="flex flex-col gap-2">
              <span className="text-xs font-bold text-[#58a6ff] uppercase tracking-wider">REST API Integration</span>
              <h2 className="text-3xl font-extrabold text-white">Built for developers</h2>
            </div>
            
            <p className="text-[#8b949e] leading-relaxed">
              Orchestrate photo workflows using simple POST payloads. Integrate credentials directly, connect with JWT Bearer header values, and stream transparent files straight into storage.
            </p>

            <ul className="flex flex-col gap-3 text-xs md:text-sm">
              <li className="flex items-center gap-3">
                <svg viewBox="0 0 16 16" width="16" height="16" className="fill-[#10b981]">
                  <path d="M13.78 4.22a.75.75 0 0 1 0 1.06l-7.25 7.25a.75.75 0 0 1-1.06 0L2.22 9.28a.75.75 0 1 1 1.06-1.06L6 10.94l6.72-6.72a.75.75 0 0 1 1.06 0z"></path>
                </svg>
                <span>Automated file streaming buffers</span>
              </li>
              <li className="flex items-center gap-3">
                <svg viewBox="0 0 16 16" width="16" height="16" className="fill-[#10b981]">
                  <path d="M13.78 4.22a.75.75 0 0 1 0 1.06l-7.25 7.25a.75.75 0 0 1-1.06 0L2.22 9.28a.75.75 0 1 1 1.06-1.06L6 10.94l6.72-6.72a.75.75 0 0 1 1.06 0z"></path>
                </svg>
                <span>Axum multithreaded non-blocking task handlers</span>
              </li>
              <li className="flex items-center gap-3">
                <svg viewBox="0 0 16 16" width="16" height="16" className="fill-[#10b981]">
                  <path d="M13.78 4.22a.75.75 0 0 1 0 1.06l-7.25 7.25a.75.75 0 0 1-1.06 0L2.22 9.28a.75.75 0 1 1 1.06-1.06L6 10.94l6.72-6.72a.75.75 0 0 1 1.06 0z"></path>
                </svg>
                <span>MongoDB asset metadata storage</span>
              </li>
            </ul>
          </div>

          {/* Code Right: Interactive Terminal Code Block */}
          <div className="lg:col-span-7">
            <div className="border border-[#30363d] rounded-xl bg-[#161b22] shadow-2xl overflow-hidden font-mono">
              {/* Header tabs bar */}
              <div className="bg-[#161b22] px-4 py-2 border-b border-[#30363d] flex items-center justify-between text-xs">
                <div className="flex gap-2">
                  <button
                    onClick={() => setCodeTab("curl")}
                    className={`px-3 py-1.5 rounded-md font-semibold ${
                      codeTab === "curl" ? "bg-[#21262d] text-[#58a6ff]" : "text-[#8b949e] hover:text-white"
                    }`}
                  >
                    cURL
                  </button>
                  <button
                    onClick={() => setCodeTab("js")}
                    className={`px-3 py-1.5 rounded-md font-semibold ${
                      codeTab === "js" ? "bg-[#21262d] text-[#58a6ff]" : "text-[#8b949e] hover:text-white"
                    }`}
                  >
                    Node.js
                  </button>
                  <button
                    onClick={() => setCodeTab("rust")}
                    className={`px-3 py-1.5 rounded-md font-semibold ${
                      codeTab === "rust" ? "bg-[#21262d] text-[#58a6ff]" : "text-[#8b949e] hover:text-white"
                    }`}
                  >
                    Rust
                  </button>
                </div>
                <div className="w-3 h-3 rounded-full bg-[#30363d]" />
              </div>

              {/* Terminal content window */}
              <div className="p-5 overflow-x-auto text-xs leading-6 text-[#c9d1d9] bg-[#0d1117] min-h-[220px]">
                {codeTab === "curl" && (
                  <pre>
                    <span className="text-[#8b949e]"># Execute API post request to Axum server</span>
                    <br />
                    <span className="text-[#ff7b72]">curl</span> -X POST http://localhost:8080/api/remove \<br />
                    &nbsp;&nbsp;-H <span className="text-[#a5d6ff]">&quot;Authorization: Bearer &lt;token_jwt&gt;&quot;</span> \<br />
                    &nbsp;&nbsp;-F <span className="text-[#a5d6ff]">&quot;image=@photo.png&quot;</span> \<br />
                    &nbsp;&nbsp;--output transparent.png
                  </pre>
                )}

                {codeTab === "js" && (
                  <pre>
                    <span className="text-[#ff7b72]">const</span> formData = <span className="text-[#ff7b72]">new</span> <span className="text-[#ffd866]">FormData</span>();<br />
                    formData.append(<span className="text-[#a5d6ff]">&apos;image&apos;</span>, fileStream);<br />
                    <br />
                    <span className="text-[#ff7b72]">const</span> response = <span className="text-[#ff7b72]">await</span> fetch(<span className="text-[#a5d6ff]">&apos;http://localhost:8080/api/remove&apos;</span>, &#123;<br />
                    &nbsp;&nbsp;method: <span className="text-[#a5d6ff]">&apos;POST&apos;</span>,<br />
                    &nbsp;&nbsp;headers: &#123;<br />
                    &nbsp;&nbsp;&nbsp;&nbsp;Authorization: <span className="text-[#a5d6ff]">&apos;Bearer &lt;token_jwt&gt;&apos;</span><br />
                    &nbsp;&nbsp;&#125;,<br />
                    &nbsp;&nbsp;body: formData<br />
                    &#125;);
                  </pre>
                )}

                {codeTab === "rust" && (
                  <pre>
                    <span className="text-[#ff7b72]">let</span> client = reqwest::Client::new();<br />
                    <span className="text-[#ff7b72]">let</span> form = reqwest::multipart::Form::new()<br />
                    &nbsp;&nbsp;.file(<span className="text-[#a5d6ff]">&quot;image&quot;</span>, <span className="text-[#a5d6ff]">&quot;/path/to/photo.png&quot;</span>).await?;<br />
                    <br />
                    <span className="text-[#ff7b72]">let</span> res = client.post(<span className="text-[#a5d6ff]">&quot;http://localhost:8080/api/remove&quot;</span>)<br />
                    &nbsp;&nbsp;.bearer_auth(jwt_token)<br />
                    &nbsp;&nbsp;.multipart(form)<br />
                    &nbsp;&nbsp;.send().await?;
                  </pre>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 5. Features Grid Section */}
      <section id="features" className="relative z-10 max-w-7xl mx-auto px-6 py-16 border-t border-[#30363d]">
        <div className="text-center max-w-2xl mx-auto mb-16 flex flex-col gap-3">
          <h2 className="text-2xl md:text-4xl font-extrabold text-white">Engineered with a high-performance stack</h2>
          <p className="text-sm md:text-base text-[#8b949e]">
            Built using technologies designed for speed, scaling, security, and developer ergonomics.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Card 1 */}
          <div className="bg-[#161b22] border border-[#30363d] rounded-2xl p-6 flex flex-col gap-4">
            <div className="w-10 h-10 rounded-lg bg-[#58a6ff]/10 flex items-center justify-center text-[#58a6ff]">
              {/* Rust Logo visual */}
              <span className="font-mono font-bold text-sm">Fe</span>
            </div>
            <div>
              <h3 className="text-lg font-bold text-white mb-2">Axum API Engine</h3>
              <p className="text-sm text-[#8b949e] leading-6">
                Rust Axum web framework provides blazing fast routing speeds, running inside Tokio multi-threaded loops with zero-cost abstractions.
              </p>
            </div>
          </div>

          {/* Card 2 */}
          <div className="bg-[#161b22] border border-[#30363d] rounded-2xl p-6 flex flex-col gap-4">
            <div className="w-10 h-10 rounded-lg bg-[#bc85ff]/10 flex items-center justify-center text-[#bc85ff]">
              <span className="font-mono font-bold text-sm">Au</span>
            </div>
            <div>
              <h3 className="text-lg font-bold text-white mb-2">Bcrypt & JWT Auth</h3>
              <p className="text-sm text-[#8b949e] leading-6">
                Cryptographically secure password hashing using bcrypt salts, coupled with signed JSON Web Tokens (JWT) for secure authentication.
              </p>
            </div>
          </div>

          {/* Card 3 */}
          <div className="bg-[#161b22] border border-[#30363d] rounded-2xl p-6 flex flex-col gap-4">
            <div className="w-10 h-10 rounded-lg bg-[#3fb950]/10 flex items-center justify-center text-[#3fb950]">
              <span className="font-mono font-bold text-sm">Db</span>
            </div>
            <div>
              <h3 className="text-lg font-bold text-white mb-2">MongoDB Cluster</h3>
              <p className="text-sm text-[#8b949e] leading-6">
                Direct connections to MongoDB Atlas cloud database. Stores user structures, assets schemas, and records activities logs reliably.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 6. Footer Section */}
      <footer className="relative z-10 border-t border-[#30363d] bg-[#0d1117] py-12 px-6">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6 text-xs text-[#8b949e]">
          <div className="flex items-center gap-2">
            <svg height="24" viewBox="0 0 16 16" version="1.1" width="24" className="fill-[#30363d]">
              <path d="M8 0c4.42 0 8 3.58 8 8a8.013 8.013 0 0 1-5.45 7.59c-.4.08-.55-.17-.55-.38 0-.27.01-1.13.01-2.2 0-.75-.25-1.23-.54-1.48 1.78-.2 3.65-.88 3.65-3.95 0-.88-.31-1.59-.82-2.15.08-.2.36-1.02-.08-2.12 0 0-.67-.22-2.2.82-.64-.18-1.32-.27-2-.27-.68 0-1.36.09-2 .27-1.53-1.03-2.2-.82-2.2-.82-.44 1.1-.16 1.92-.08 2.12-.51.56-.82 1.28-.82 2.15 0 3.06 1.86 3.75 3.64 3.95-.23.2-.44.55-.51 1.07-.46.21-1.61.55-2.33-.66-.15-.24-.6-.83-1.23-.82-.67.01-.27.38.01.53.34.19.73.9.82 1.13.16.45.68 1.35 3.12.88.01.64.01 1.25.01 1.42 0 .21-.15.46-.55.38A8.013 8.013 0 0 1 0 8c0-4.42 3.58-8 8-8z"></path>
            </svg>
            <span>&copy; 2026 G-Remover Systems, Inc. Porting GitHub Home page style.</span>
          </div>

          <div className="flex gap-4 font-semibold">
            <a href="#" className="hover:text-white transition-colors">Terms</a>
            <a href="#" className="hover:text-white transition-colors">Privacy</a>
            <a href="#" className="hover:text-white transition-colors">API Docs</a>
            <a href="http://127.0.0.1:8080/" className="hover:text-white transition-colors">Backend REST</a>
          </div>
        </div>
      </footer>
    </div>
  );
}
