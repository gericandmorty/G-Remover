"use client";

import Link from "next/link";

export default function AboutPage() {
  const tools = [
    {
      category: "Frontend Stack",
      items: [
        { name: "Next.js 16", desc: "React framework powering the dashboard with App Router, server-side rendering, and optimized static generation." },
        { name: "TypeScript", desc: "Strong static typing across every component for reliability and IDE-level safety." },
        { name: "TailwindCSS v4", desc: "Utility-first CSS framework behind the dark-mode glassmorphic design system." },
      ],
    },
    {
      category: "Backend Engine",
      items: [
        { name: "Rust (Edition 2024)", desc: "Core language providing memory safety without GC, zero-cost abstractions, and native machine-code performance." },
        { name: "Axum v0.7", desc: "Type-safe async web framework built on Tokio and Tower. Powers all REST endpoints with multipart upload support." },
        { name: "Tokio", desc: "Multi-threaded async runtime with work-stealing scheduler. Handles all non-blocking I/O, timers, and signal handling." },
        { name: "MongoDB (v3.1)", desc: "Document store for user credentials and session data via the official async Rust driver with connection pooling." },
      ],
    },
    {
      category: "AI & Image Processing",
      items: [
        { name: "ONNX Runtime (ort v2)", desc: "Microsoft's cross-platform inference engine running the U2-Net model natively in Rust with Level 3 graph optimizations." },
        { name: "U2-Net (u2netp)", desc: "Lightweight salient object detection model. Input is normalized to 320×320, output is a per-pixel foreground probability map." },
        { name: "ndarray v0.17", desc: "N-dimensional array library for tensor construction. Handles the 1×3×320×320 float tensor fed into ONNX Runtime." },
        { name: "image crate v0.25", desc: "Handles decoding PNG, JPEG, and WebP uploads, bilinear resize, RGBA compositing, and final PNG encoding." },
      ],
    },
    {
      category: "Security & Middleware",
      items: [
        { name: "Bcrypt", desc: "Adaptive password hashing with configurable salt rounds. Used in the register endpoint before storing credentials." },
        { name: "JWT (HMAC-SHA256)", desc: "Stateless auth tokens with 24-hour expiry. The remove-background endpoint optionally validates Bearer tokens." },
        { name: "IP Rate Limiter", desc: "Custom Tower middleware using a token bucket algorithm (10 req/min, burst 20). Applied only to the unauthenticated remove endpoint." },
        { name: "CORS (tower-http)", desc: "Configurable cross-origin policy allowing all origins, GET/POST/PUT/DELETE methods, and Content-Type/Authorization headers." },
      ],
    },
  ];

  const endpoints = [
    { method: "GET",  path: "/api/health",               desc: "Liveness probe — returns status, timestamp, and service name." },
    { method: "GET",  path: "/api/info",                  desc: "Returns app version, framework, runtime, and all registered routes." },
    { method: "POST", path: "/api/auth/register",         desc: "Creates a new user. Validates email, enforces password rules (8+ chars, uppercase, number, special char), hashes with bcrypt." },
    { method: "POST", path: "/api/auth/login",            desc: "Verifies credentials, checks bcrypt hash, and returns a signed JWT valid for 24 hours." },
    { method: "POST", path: "/api/v1/remove-background",  desc: "Accepts PNG/JPEG/WebP up to 10MB. Runs U2-Net inference via ONNX Runtime. Returns transparent PNG. Auth is optional. Rate-limited to 10 req/min." },
  ];

  const methodColor: Record<string, string> = {
    GET:  "text-[#58a6ff] bg-[#58a6ff]/10 border-[#58a6ff]/20",
    POST: "text-[#2ea043] bg-[#238636]/10 border-[#238636]/20",
  };

  return (
    <div className="flex-1 bg-[#040d21] text-[#c9d1d9] font-sans antialiased flex flex-col relative overflow-hidden">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-[#0d2b5c]/30 via-transparent to-transparent pointer-events-none z-0" />

      <main className="relative z-10 max-w-4xl mx-auto w-full px-4 sm:px-6 py-10 sm:py-16 flex flex-col gap-12 animate-fade-in">

        {/* Title */}
        <div className="text-center">
          <h1 className="text-2xl sm:text-4xl font-extrabold text-white tracking-tight bg-gradient-to-r from-white via-[#e2e8f0] to-[#8b949e] bg-clip-text text-transparent">
            About G-Remover
          </h1>
          <p className="mt-3 text-sm text-[#8b949e] max-w-2xl mx-auto leading-relaxed">
            A high-speed, local-first background extraction service built with a Rust API backend and a Next.js dashboard.
          </p>
        </div>

        {/* Developer Info Card */}
        <div className="bg-[#161b22] border border-[#30363d] rounded-2xl p-5 sm:p-8 shadow-2xl flex flex-col sm:flex-row gap-6 items-center">
          <img
            src="/profile/rick-sanchez-1.jpg"
            alt="Geric Morit"
            className="w-20 h-20 sm:w-24 sm:h-24 rounded-full object-cover border-2 border-[#30363d] shadow-xl shadow-[#58a6ff]/10 flex-shrink-0"
          />
          <div className="flex-1 text-center sm:text-left flex flex-col gap-3">
            <div>
              <h3 className="text-lg sm:text-xl font-bold text-white">Geric Morit</h3>
              <p className="text-xs text-[#8b949e] uppercase tracking-wider font-semibold mt-0.5">Lead Developer & Systems Architect</p>
            </div>
            <p className="text-sm text-[#8b949e] leading-relaxed">
              G-Remover showcases high-performance Rust web service architecture. Neural network inference runs directly in native Rust threads via ONNX Runtime — no Python, no overhead — achieving sub-200ms background extraction with extreme system efficiency.
            </p>
            <div className="flex items-center gap-4 mt-1 justify-center sm:justify-start">
              <a
                href="https://github.com/gericandmorty"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-xs font-semibold text-[#58a6ff] hover:text-white transition-colors"
              >
                <svg viewBox="0 0 16 16" width="16" height="16" className="fill-current">
                  <path d="M8 0c4.42 0 8 3.58 8 8a8.013 8.013 0 0 1-5.45 7.59c-.4.08-.55-.17-.55-.38 0-.27.01-1.13.01-2.2 0-.75-.25-1.23-.54-1.48 1.78-.2 3.65-.88 3.65-3.95 0-.88-.31-1.59-.82-2.15.08-.2.36-1.02-.08-2.12 0 0-.67-.22-2.2.82-.64-.18-1.32-.27-2-.27-.68 0-1.36.09-2 .27-1.53-1.03-2.2-.82-2.2-.82-.44 1.1-.16 1.92-.08 2.12-.51.56-.82 1.28-.82 2.15 0 3.06 1.86 3.75 3.64 3.95-.23.2-.44.55-.51 1.07-.46.21-1.61.55-2.33-.66-.15-.24-.6-.83-1.23-.82-.67.01-.27.38.01.53.34.19.73.9.82 1.13.16.45.68 1.35 3.12.88.01.64.01 1.25.01 1.42 0 .21-.15.46-.55.38A8.013 8.013 0 0 1 0 8c0-4.42 3.58-8 8-8z" />
                </svg>
                GitHub
              </a>
              <a
                href="https://www.gericandmorty.codes/"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-xs font-semibold text-[#58a6ff] hover:text-white transition-colors"
              >
                <svg viewBox="0 0 16 16" width="16" height="16" className="fill-current">
                  <path d="M0 8a8 8 0 1 1 16 0A8 8 0 0 1 0 8zm7.5-6.923c-.67.204-1.335.82-1.887 1.855A8 8 0 0 0 5.145 4H7.5V1.077zM4.09 4a9.3 9.3 0 0 1 .64-1.539 7 7 0 0 1 .597-.933A7.03 7.03 0 0 0 2.255 4H4.09zm-.582 3.5c.03-.877.138-1.718.312-2.5H1.674a7 7 0 0 0-.656 2.5h2.49zM4.847 5a12.5 12.5 0 0 0-.338 2.5H7.5V5H4.847zM8.5 5v2.5h2.99a12.5 12.5 0 0 0-.337-2.5H8.5zM4.51 8.5a12.5 12.5 0 0 0 .337 2.5H7.5V8.5H4.51zm3.99 0V11h2.653c.187-.765.306-1.608.338-2.5H8.5zM5.145 12c.138.386.295.744.468 1.068.552 1.035 1.218 1.65 1.887 1.855V12H5.145zm.182 2.472a7 7 0 0 1-.597-.933A9.3 9.3 0 0 1 4.09 12H2.255a7.02 7.02 0 0 0 3.072 2.472zM3.82 11a13.7 13.7 0 0 1-.312-2.5h-2.49a7 7 0 0 0 .656 2.5H3.82zm6.853 3.472A7.02 7.02 0 0 0 13.745 12H11.91a9.3 9.3 0 0 1-.64 1.539 7 7 0 0 1-.597.933zM8.5 12v2.923c.67-.204 1.335-.82 1.887-1.855.173-.324.33-.682.468-1.068H8.5zm3.68-1h2.146c.365-.767.594-1.61.656-2.5h-2.49a13.7 13.7 0 0 1-.312 2.5zm2.802-3.5a7 7 0 0 0-.656-2.5H12.18c.174.782.282 1.623.312 2.5h2.49zM11.27 2.461c.247.464.462.98.64 1.539h1.835a7.02 7.02 0 0 0-3.072-2.472c.218.284.418.598.597.933zM10.855 4a8 8 0 0 0-.468-1.068C9.835 1.897 9.17 1.282 8.5 1.077V4h2.355z" />
                </svg>
                Website
              </a>
            </div>
          </div>
        </div>

        {/* API Endpoints */}
        <section className="flex flex-col gap-4">
          <h2 className="text-base sm:text-lg font-bold text-white border-b border-[#30363d] pb-2">API Endpoints</h2>
          <div className="flex flex-col gap-2">
            {endpoints.map((ep, i) => (
              <div key={i} className="bg-[#161b22] border border-[#30363d] rounded-xl p-3 sm:p-4 flex flex-col sm:flex-row sm:items-start gap-2 sm:gap-4 hover:border-[#8b949e] transition-all">
                <div className="flex items-center gap-2 flex-shrink-0">
                  <span className={`text-[10px] font-bold border px-2 py-0.5 rounded font-mono w-12 text-center ${methodColor[ep.method]}`}>
                    {ep.method}
                  </span>
                  <code className="text-xs text-white font-mono">{ep.path}</code>
                </div>
                <p className="text-xs text-[#8b949e] leading-relaxed sm:border-l sm:border-[#30363d] sm:pl-4">{ep.desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Tech Stack */}
        <section className="flex flex-col gap-6">
          <h2 className="text-base sm:text-lg font-bold text-white border-b border-[#30363d] pb-2">The Tech Stack</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {tools.map((section, idx) => (
              <div key={idx} className="flex flex-col gap-3">
                <h3 className="text-xs font-bold text-[#58a6ff] uppercase tracking-widest">{section.category}</h3>
                <div className="flex flex-col gap-2">
                  {section.items.map((tool, tIdx) => (
                    <div key={tIdx} className="bg-[#161b22]/50 border border-[#30363d]/60 rounded-xl p-3 sm:p-4 flex flex-col gap-1 hover:border-[#8b949e] transition-all">
                      <span className="font-bold text-white text-sm">{tool.name}</span>
                      <span className="text-xs text-[#8b949e] leading-relaxed">{tool.desc}</span>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* CTA */}
        <div className="text-center mt-2 pb-4">
          <Link
            href="/dashboard"
            className="inline-block bg-gradient-to-r from-[#238636] to-[#2ea043] hover:from-[#2ea043] hover:to-[#3fb950] text-white font-bold text-sm px-8 py-3.5 rounded-xl shadow-lg shadow-[#238636]/10 transition-all transform hover:-translate-y-0.5"
          >
            Launch Workspace
          </Link>
        </div>

      </main>
    </div>
  );
}
