# G-Remover Frontend Portal

A premium, modern web interface for G-Remover—a high-performance, automatic background removal platform. Built with Next.js and styled using Tailwind CSS v4, G-Remover provides a sleek, responsive, and interactive experience for managing and processing photo backgrounds.

> [!WARNING]
> **Status: Coming Soon / Under Active Development**
> G-Remover is currently in development. The landing portal, user authentication flow, and interactive dashboard workspace mockup are completed. Integration with production AI background-removal models is coming soon!

---

## Tech Stack and Features

- **Frontend**: Next.js 16 (App Router) & Tailwind CSS v4
- **Backend API**: Powered by a lightning-fast Rust Axum server
- **Database**: MongoDB for secure user account storage
- **Authentication**: JWT (JSON Web Token) saved locally, featuring strict real-time password complexity validation checks (length, case, numbers, special characters)
- **User Dashboard**: Modern glassmorphic user workspace with:
  - Interactive file dropzones (drag-and-drop support)
  - Simulated AI pipeline step-by-step progress tracking
  - Token-based usage indicators
  - Mock processing history logs

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

Open http://localhost:3000 in your browser to see the landing page.

---

## Project Structure

```text
frontend/
├── app/
│   ├── (pages)/
│   │   ├── (landing)/   # Beautiful GitHub-themed landing page
│   │   └── dashboard/   # Secure user dashboard & AI workspace
│   ├── auth/
│   │   ├── login/       # User sign-in with redirect flows
│   │   └── register/    # Sign-up with real-time password requirement checklists
│   ├── components/      # Shared components (NavBar, etc.)
│   ├── layout.tsx       # Root layout configuration
│   └── globals.css      # Core global stylesheet
├── public/              # Static media and assets
├── package.json         # Scripts and project dependencies
└── README.md            # Frontend documentation
```
