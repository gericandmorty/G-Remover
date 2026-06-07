"use client";

import { useState } from "react";

type TabId = "curl" | "node" | "rust";

export default function DocsPage() {
  const [activeTab, setActiveTab] = useState<TabId>("curl");

  const codeSnippets = {
    curl: `curl -X POST http://localhost:8080/api/v1/remove-background \\
  -H "Authorization: Bearer <your_token>" \\
  -F "image=@photo.jpg" \\
  --output result.png`,
    node: `const formData = new FormData();
formData.append("image", fileBlob);

const res = await fetch("http://localhost:8080/api/v1/remove-background", {
  method: "POST",
  headers: {
    Authorization: "Bearer <your_token>",
  },
  body: formData,
});

const imageBlob = await res.blob();
const imageUrl = URL.createObjectURL(imageBlob);`,
    rust: `let client = reqwest::Client::new();
let form = reqwest::multipart::Form::new()
    .file("image", "/path/to/photo.jpg").await?;

let response = client
    .post("http://localhost:8080/api/v1/remove-background")
    .bearer_auth(jwt_token)
    .multipart(form)
    .send()
    .await?;

let bytes = response.bytes().await?;
std::fs::write("result.png", bytes)?;`,
  };

  const toolsUsed = [
    {
      name: "Rust",
      role: "Core Language",
      desc: "The entire backend is written in Rust, providing memory safety without garbage collection, zero-cost abstractions, and fearless concurrency. Rust compiles to native machine code, making it one of the fastest languages available for server-side workloads.",
    },
    {
      name: "Axum (v0.7)",
      role: "Web Framework",
      desc: "Axum is an ergonomic, modular web framework built on top of Tokio, Tower, and Hyper. It provides type-safe extractors, middleware composition, and shared state management with zero boilerplate routing.",
    },
    {
      name: "Tokio",
      role: "Async Runtime",
      desc: "Tokio is a multi-threaded async runtime for Rust. It powers all asynchronous I/O operations including HTTP request handling, database queries, and file operations using a work-stealing thread pool scheduler.",
    },
    {
      name: "ONNX Runtime (ort v2.0.0-rc.12)",
      role: "AI Inference Engine",
      desc: "ONNX Runtime is a cross-platform, high-performance inference engine developed by Microsoft. The Rust ort crate provides native bindings to execute ONNX-format deep learning models without Python dependencies.",
    },
    {
      name: "U2-Net (u2netp)",
      role: "Background Removal Model",
      desc: "U2-Net is a two-level nested U-structure architecture designed for salient object detection. The lightweight variant (u2netp) provides highly accurate foreground/background segmentation with a compact model size, ideal for real-time inference.",
    },
    {
      name: "MongoDB",
      role: "Database",
      desc: "MongoDB Atlas is used as the primary document store for user credentials, session management, and activity logging. The official mongodb Rust driver provides async-native query execution with connection pooling.",
    },
    {
      name: "Next.js 16",
      role: "Frontend Framework",
      desc: "Next.js powers the frontend dashboard with server-side rendering, automatic code splitting, file-system routing, and optimized static generation. The App Router architecture enables clean layout composition.",
    },
    {
      name: "TailwindCSS v4",
      role: "Styling System",
      desc: "TailwindCSS provides the utility-first CSS framework powering the dark-mode, glassmorphic design system. All components are styled using composable utility classes for maximum design consistency.",
    },
    {
      name: "Bcrypt + JWT",
      role: "Authentication",
      desc: "Passwords are hashed server-side using bcrypt with configurable salt rounds. Authentication tokens are issued as signed JWTs (HMAC-SHA256) with configurable expiration, enabling stateless API authorization.",
    },
    {
      name: "ndarray + image",
      role: "Tensor & Image Processing",
      desc: "The ndarray crate handles N-dimensional array operations for preprocessing image tensors (resize, normalize, reshape). The image crate handles decoding input files (PNG, JPEG, WebP) and encoding the final transparent PNG output.",
    },
  ];

  return (
    <div className="flex-1 bg-[#040d21] text-[#c9d1d9] font-sans antialiased flex flex-col relative overflow-hidden">
      {/* Background Star Overlay */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-[#0d2b5c]/30 via-transparent to-transparent pointer-events-none z-0"></div>

      <main className="relative z-10 max-w-4xl mx-auto px-6 py-16 flex flex-col gap-12 animate-fade-in">
        
        {/* Header */}
        <div>
          <h1 className="text-4xl font-extrabold text-white tracking-tight bg-gradient-to-r from-white via-[#e2e8f0] to-[#8b949e] bg-clip-text text-transparent">
            Developer Documentation
          </h1>
          <p className="mt-2 text-sm text-[#8b949e]">
            Integrate high-speed neural background removal directly into your application.
          </p>
        </div>

        {/* API Endpoint Section */}
        <section className="bg-[#161b22] border border-[#30363d] rounded-2xl p-6 md:p-8 flex flex-col gap-6 shadow-2xl">
          <div className="flex flex-col gap-2">
            <h2 className="text-lg font-bold text-white flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-[#58a6ff]" />
              Remove Background
            </h2>
            <div className="flex items-center gap-3 mt-1 font-mono text-xs">
              <span className="bg-[#238636]/10 text-[#2ea043] border border-[#238636]/20 px-2 py-0.5 rounded font-bold">POST</span>
              <span className="text-white font-semibold">/api/v1/remove-background</span>
            </div>
          </div>

          <div className="text-sm text-[#8b949e] leading-relaxed flex flex-col gap-3">
            <p>
              This endpoint accepts any standard image file (PNG, JPEG, WebP up to 10MB), preprocesses it to 320×320 pixels with ImageNet normalization, runs neural inference via the <strong className="text-white">u2netp</strong> model on ONNX Runtime, and returns the transparent foreground cutout as a PNG.
            </p>
            <p>
              Authentication is <strong className="text-white">optional</strong> — you can send requests without any credentials, or include a JWT Bearer token to link usage to your account.
            </p>
          </div>

          {/* Table Parameters */}
          <div className="border border-[#30363d] rounded-xl overflow-hidden text-xs">
            <div className="bg-[#0d1117] px-4 py-2 text-[#8b949e] font-semibold border-b border-[#30363d] grid grid-cols-3">
              <span>Header / Field</span>
              <span>Type</span>
              <span>Description</span>
            </div>
            <div className="p-4 grid grid-cols-3 gap-2 border-b border-[#30363d]/60">
              <span className="font-mono text-white">Authorization</span>
              <span className="text-[#8b949e]">Header (Optional)</span>
              <span className="text-[#8b949e] leading-relaxed">JWT Bearer credential token: <code className="text-[#e2e8f0] font-mono bg-[#0d1117] px-1 py-0.5 rounded">Bearer &lt;token&gt;</code></span>
            </div>
            <div className="p-4 grid grid-cols-3 gap-2 border-b border-[#30363d]/60">
              <span className="font-mono text-white">image</span>
              <span className="text-[#8b949e]">Form data (Required)</span>
              <span className="text-[#8b949e] leading-relaxed">Raw image file binary. Max size: <strong className="text-white">10MB</strong>. Accepted: PNG, JPEG, WebP.</span>
            </div>
            <div className="p-4 grid grid-cols-3 gap-2">
              <span className="font-mono text-white">Response</span>
              <span className="text-[#8b949e]">Body</span>
              <span className="text-[#8b949e] leading-relaxed">Raw PNG bytes with <code className="text-[#e2e8f0] font-mono bg-[#0d1117] px-1 py-0.5 rounded">Content-Type: image/png</code></span>
            </div>
          </div>
        </section>

        {/* Code samples block */}
        <section className="flex flex-col gap-4">
          <h2 className="text-lg font-bold text-white border-b border-[#30363d] pb-2">Code Integrations</h2>
          
          <div className="border border-[#30363d] rounded-2xl overflow-hidden bg-[#161b22] shadow-2xl flex flex-col">
            {/* Tabs bar */}
            <div className="bg-[#161b22] px-4 py-2 border-b border-[#30363d] flex items-center justify-between text-xs">
              <div className="flex gap-2">
                {(["curl", "node", "rust"] as TabId[]).map((tab) => (
                  <button
                    key={tab}
                    onClick={() => setActiveTab(tab)}
                    className={`px-3 py-1.5 rounded-lg font-semibold cursor-pointer transition-all ${
                      activeTab === tab ? "bg-[#21262d] text-[#58a6ff] border border-[#30363d]" : "text-[#8b949e] hover:text-white"
                    }`}
                  >
                    {tab === "curl" ? "cURL" : tab === "node" ? "Node.js" : "Rust"}
                  </button>
                ))}
              </div>
              <div className="w-3 h-3 rounded-full bg-[#30363d]" />
            </div>

            {/* Code pane */}
            <div className="p-5 overflow-x-auto text-xs leading-6 text-[#c9d1d9] bg-[#0d1117] font-mono min-h-[180px]">
              <pre className="whitespace-pre">
                <code>{codeSnippets[activeTab]}</code>
              </pre>
            </div>
          </div>
        </section>

        {/* Tools Used Section */}
        <section className="flex flex-col gap-6">
          <h2 className="text-lg font-bold text-white border-b border-[#30363d] pb-2">Tools & Technologies</h2>
          <p className="text-sm text-[#8b949e] leading-relaxed -mt-2">
            Every component of G-Remover was chosen for performance, reliability, and developer ergonomics. Here is a detailed breakdown of each tool in the stack.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {toolsUsed.map((tool, idx) => (
              <div
                key={idx}
                className="bg-[#161b22] border border-[#30363d] rounded-xl p-5 flex flex-col gap-2 hover:border-[#8b949e] transition-all group"
              >
                <div className="flex items-center justify-between">
                  <h3 className="font-bold text-white text-sm group-hover:text-[#58a6ff] transition-colors">{tool.name}</h3>
                  <span className="text-[10px] font-semibold text-[#8b949e] bg-[#21262d] border border-[#30363d] px-2 py-0.5 rounded-full">{tool.role}</span>
                </div>
                <p className="text-xs text-[#8b949e] leading-relaxed">{tool.desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Inference Pipeline Section */}
        <section className="flex flex-col gap-4">
          <h2 className="text-lg font-bold text-white border-b border-[#30363d] pb-2">Inference Pipeline</h2>

          <div className="bg-[#161b22] border border-[#30363d] rounded-2xl p-6 md:p-8 shadow-2xl flex flex-col gap-5">
            <div className="flex flex-col gap-4 text-sm text-[#8b949e]">
              <div className="flex gap-4 items-start">
                <div className="w-8 h-8 rounded-lg bg-[#58a6ff]/10 flex items-center justify-center flex-shrink-0 text-[#58a6ff] font-bold text-xs">1</div>
                <div>
                  <h4 className="font-bold text-white mb-1">Preprocessing</h4>
                  <p className="text-xs leading-relaxed">The uploaded image is decoded, resized to 320×320 pixels using bilinear interpolation, and normalized using ImageNet mean <code className="text-[#e2e8f0] font-mono bg-[#0d1117] px-1 py-0.5 rounded">[0.485, 0.456, 0.406]</code> and std <code className="text-[#e2e8f0] font-mono bg-[#0d1117] px-1 py-0.5 rounded">[0.229, 0.224, 0.225]</code>. The result is a 1×3×320×320 float tensor.</p>
                </div>
              </div>

              <div className="flex gap-4 items-start">
                <div className="w-8 h-8 rounded-lg bg-[#bc85ff]/10 flex items-center justify-center flex-shrink-0 text-[#bc85ff] font-bold text-xs">2</div>
                <div>
                  <h4 className="font-bold text-white mb-1">ONNX Execution</h4>
                  <p className="text-xs leading-relaxed">The tensor is passed through the u2netp model via a multi-threaded ONNX Runtime session with Level 3 graph optimizations enabled. The model outputs a probability map representing foreground confidence per pixel.</p>
                </div>
              </div>

              <div className="flex gap-4 items-start">
                <div className="w-8 h-8 rounded-lg bg-[#3fb950]/10 flex items-center justify-center flex-shrink-0 text-[#3fb950] font-bold text-xs">3</div>
                <div>
                  <h4 className="font-bold text-white mb-1">Postprocessing</h4>
                  <p className="text-xs leading-relaxed">The 320×320 probability mask is clamped to [0,1], scaled to 8-bit grayscale, resized back to the original image dimensions, and mapped onto the alpha channel of the original RGBA image. The result is encoded as a transparent PNG.</p>
                </div>
              </div>
            </div>
          </div>
        </section>

      </main>
    </div>
  );
}
