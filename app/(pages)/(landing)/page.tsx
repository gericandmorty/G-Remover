"use client";

import Link from "next/link";

export default function GRemoverProductLanding() {
  return (
    <div className="flex-1 bg-[#040d21] text-[#c9d1d9] font-sans antialiased flex flex-col selection:bg-[#58a6ff]/30 selection:text-white relative overflow-hidden">
      {/* Background Star Overlay */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-[#0d2b5c]/30 via-transparent to-transparent pointer-events-none z-0"></div>

      {/* Main Hero Container */}
      <section className="relative z-10 flex-1 flex flex-col items-center justify-center text-center px-6 py-20 max-w-4xl mx-auto">
        <div className="flex flex-col items-center gap-8 animate-fade-in">
          
          {/* Heading */}
          <h1 className="text-4xl sm:text-6xl md:text-7xl font-extrabold tracking-tight text-white leading-tight">
            Delete backgrounds.<br />
            <span className="bg-gradient-to-r from-[#58a6ff] via-[#bc85ff] to-[#ff7b72] bg-clip-text text-transparent">
              In milliseconds.
            </span>
          </h1>

          {/* Subheading */}
          <p className="text-[#8b949e] text-base sm:text-lg max-w-2xl leading-relaxed">
            The developer-first background extractor. Remove image backdrops automatically using high-fidelity deep learning models. Completely free, no registration required.
          </p>

          {/* Call to Actions */}
          <div className="flex flex-col sm:flex-row items-center gap-4 mt-4 w-full sm:w-auto">
            <Link
              href="/dashboard"
              className="w-full sm:w-auto bg-gradient-to-r from-[#238636] to-[#2ea043] hover:from-[#2ea043] hover:to-[#3fb950] text-white font-bold text-base px-8 py-4 rounded-xl shadow-lg shadow-[#238636]/20 transition-all transform hover:-translate-y-0.5 active:translate-y-0 text-center cursor-pointer"
            >
              Try it now
            </Link>
            <Link
              href="/auth/login"
              className="w-full sm:w-auto bg-[#161b22] hover:bg-[#21262d] border border-[#30363d] text-white font-bold text-base px-8 py-4 rounded-xl transition-all text-center cursor-pointer"
            >
              Developer Sign in
            </Link>
          </div>

        </div>
      </section>
    </div>
  );
}
