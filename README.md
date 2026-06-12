# G-Remover Frontend Portal

A premium, modern web interface for G-Remover—a high-performance, automatic background removal platform. Built with Next.js and styled using Tailwind CSS v4, G-Remover provides a sleek, responsive, and interactive experience for uploading images and removing their backgrounds in real-time.

---

## Tech Stack and Features

- **Frontend**: Next.js (App Router) & Tailwind CSS v4
- **Backend API**: Powered by a high-performance Rust Axum server running a hybrid **Two-Phase Background Removal Pipeline**:
  - **Phase 1 (Coarse Cut)**: Uses a lightweight `u2netp` model (320×320) to generate a quick, rough foreground mask and isolate the content from the background.
  - **Phase 2 (Refinement)**: Passes the pre-cleaned intermediate image to `BRIA RMBG-1.4` (1024×1024) to execute precise alpha matting, detail polishing, and edge smoothing.
- **Database**: MongoDB for user account storage (Optional)
- **Authentication**: JWT (JSON Web Token) saved locally, featuring strict real-time password complexity validation checks (Optional)
- **User Dashboard**: Simplified, modern glassmorphic workspace:
  - Interactive file dropzones (drag-and-drop support)
  - Real-time visual progress overlay representing both Phase 1 (Rough Cut) and Phase 2 (Refinement) pipeline states
  - Optional login support to allow seamless anonymous image processing
- **Developer / About Page**: Showcase page featuring the developer **Geric Morit** and detailing the project's tech stack categories.
- **Interactive Documentation**: Interactive API reference page detailing pipeline mechanics and providing implementation scripts for `cURL`, `Node.js`, and `Rust`.

---

## Getting Started

### 1. Prerequisites

Ensure you have Node.js (v18+) and npm installed.

### 2. Installation

Navigate to the frontend directory and install the dependencies:

```bash
cd frontend
npm install
```

### 3. Environment Variables Setup

Create a `.env.local` file in the `frontend` root directory to map your API backend server:

```env
NEXT_PUBLIC_API_URL=http://localhost:8080
```

### 4. Running the Development Server

Start the Next.js dev server:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser to see the landing page.

---

## Project Structure

```text
frontend/
├── app/
│   ├── (pages)/
│   │   ├── (landing)/   # Beautiful landing page with direct access to try out the tool
│   │   ├── about/       # Developer spotlight & stack overview
│   │   ├── dashboard/   # Glassmorphic AI workspace for image uploads & background removal
│   │   └── docs/        # Interactive API endpoints guide (cURL, Node.js, Rust tabs)
│   ├── auth/
│   │   ├── login/       # User sign-in with optional redirect flows
│   │   └── register/    # Sign-up with real-time password requirement checklists
│   ├── components/      # Shared components (Navbar, Footer, etc.)
│   ├── layout.tsx       # Root layout configuration
│   └── globals.css      # Core global stylesheet
├── public/              # Static media, profiles, and assets
├── package.json         # Scripts and project dependencies
└── README.md            # Frontend documentation
```
