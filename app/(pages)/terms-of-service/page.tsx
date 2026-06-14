"use client";

import Link from "next/link";

export default function TermsOfServicePage() {
  const lastUpdated = "June 14, 2026";

  const sections = [
    {
      title: "1. Acceptance of Terms",
      content: (
        <>
          By accessing or using the G-Remover application, dashboard, or backend API (collectively, the "Service"), you agree to be bound by these Terms of Service ("Terms"). If you do not agree to these Terms, you may not access or use the Service.
        </>
      ),
    },
    {
      title: "2. Description of Service",
      content: (
        <>
          G-Remover is a high-speed, local-first background removal tool that uses deep learning (ONNX Runtime) to isolate foreground subjects from uploaded images. The Service is provided both via a browser-based dashboard and a public developer API.
        </>
      ),
    },
    {
      title: "3. API Usage, Performance & Abuse Prevention",
      content: (
        <>
          <p className="mb-3">
            To ensure service stability and prevent abuse on our hosting infrastructure, the following conditions apply:
          </p>
          <ul className="list-disc pl-5 flex flex-col gap-2">
            <li>
              <strong>Rate Limits:</strong> API requests to the background removal endpoint are limited to 10 requests per minute per IP address. Exceeding this will return a 429 Too Many Requests response.
            </li>
            <li>
              <strong>File Limitations:</strong> The Service only accepts PNG, JPEG, and WebP files. Uploads are strictly limited to a maximum file size of <strong>10 MB</strong> and maximum dimensions of <strong>2048×2048 pixels</strong>.
            </li>
            <li>
              <strong>Malicious Content:</strong> You must not upload corrupted files, decompression bombs, or file payloads containing malicious code. Doing so will result in an immediate IP and account ban.
            </li>
          </ul>
        </>
      ),
    },
    {
      title: "4. Intellectual Property & User Content",
      content: (
        <>
          <p className="mb-3">
            Your content remains yours. We claim no ownership over the images you upload:
          </p>
          <ul className="list-disc pl-5 flex flex-col gap-2">
            <li>
              <strong>Ownership:</strong> You retain all ownership, copyright, and intellectual property rights in the images you upload to G-Remover.
            </li>
            <li>
              <strong>Licensing:</strong> You grant us a limited, temporary license to load, resize, crop, and composite your image solely to perform background extraction. This data is held in volatile RAM and is never written to persistent disk.
            </li>
            <li>
              <strong>Service Rights:</strong> G-Remover owns all code, logos, visual designs, assets, and trademarks associated with the Service.
            </li>
          </ul>
        </>
      ),
    },
    {
      title: "5. Availability & Free-Tier Disclaimers",
      content: (
        <>
          G-Remover is hosted on a free-tier hosting platform (Render). The Service is subject to automatic sleeping (cold starts) after periods of inactivity. We do not guarantee 100% uptime, nor do we provide any Service Level Agreement (SLA). We reserve the right to modify, suspend, or terminate the Service at any time without notice.
        </>
      ),
    },
    {
      title: "6. Disclaimer of Warranties",
      content: (
        <>
          THE SERVICE IS PROVIDED "AS IS" AND "AS AVAILABLE" WITHOUT WARRANTIES OF ANY KIND, EITHER EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE, OR NON-INFRINGEMENT. WE DO NOT WARRANT THAT THE SERVICE WILL BE ERROR-FREE, ACCURATE, OR UNINTERRUPTED.
        </>
      ),
    },
    {
      title: "7. Limitation of Liability",
      content: (
        <>
          IN NO EVENT SHALL G-REMOVER OR ITS DEVELOPERS BE LIABLE FOR ANY INDIRECT, INCIDENTAL, SPECIAL, CONSEQUENTIAL, OR PUNITIVE DAMAGES (INCLUDING LOSS OF DATA, REVENUE, OR PROFIT) ARISING OUT OF OR IN CONNECTION WITH YOUR USE OF OR INABILITY TO USE THE SERVICE.
        </>
      ),
    },
  ];

  return (
    <div className="flex-1 bg-[#040d21] text-[#c9d1d9] font-sans antialiased flex flex-col relative overflow-hidden">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-[#0d2b5c]/30 via-transparent to-transparent pointer-events-none z-0" />

      <main className="relative z-10 max-w-4xl mx-auto w-full px-4 sm:px-6 py-10 sm:py-16 flex flex-col gap-10 animate-fade-in">
        
        {/* Header */}
        <div className="text-center">
          <h1 className="text-2xl sm:text-4xl font-extrabold text-white tracking-tight bg-gradient-to-r from-white via-[#e2e8f0] to-[#8b949e] bg-clip-text text-transparent">
            Terms of Service
          </h1>
          <p className="mt-3 text-sm text-[#8b949e] max-w-md mx-auto">
            Last updated: {lastUpdated} · Please read these terms carefully before using our platform.
          </p>
        </div>

        {/* Content Card */}
        <div className="bg-[#161b22] border border-[#30363d] rounded-2xl p-6 sm:p-10 shadow-2xl flex flex-col gap-8">
          <div className="text-sm text-[#8b949e] leading-relaxed pb-4 border-b border-[#30363d]/60">
            Welcome to G-Remover. These Terms govern your access to the application and developer API. By uploading files or creating an account, you signify your agreement to these rules.
          </div>

          <div className="flex flex-col gap-8">
            {sections.map((section, idx) => (
              <section key={idx} className="flex flex-col gap-3">
                <h2 className="text-base sm:text-lg font-bold text-white flex items-center gap-2">
                  {section.title}
                </h2>
                <div className="text-sm text-[#8b949e] leading-relaxed">
                  {section.content}
                </div>
              </section>
            ))}
          </div>

          {/* Bottom Back Button */}
          <div className="border-t border-[#30363d] pt-6 flex justify-between items-center text-xs">
            <Link href="/" className="text-[#58a6ff] hover:underline font-semibold flex items-center gap-1">
              ← Back to Home
            </Link>
            <Link href="/privacy-policy" className="text-[#8b949e] hover:text-white transition-colors">
              Privacy Policy →
            </Link>
          </div>
        </div>

      </main>
    </div>
  );
}
