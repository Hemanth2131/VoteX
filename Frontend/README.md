# VoteX Frontend

This is a minimal React + Vite + Tailwind frontend for the VoteX application. It expects the backend to be available at `http://localhost:3000` by default.

Quick start:

```powershell
cd Frontend
npm install
npm run dev
```

If your backend runs on a different host/port, set the environment variable `VITE_API_BASE_URL` when running Vite, e.g.:

```powershell
$env:VITE_API_BASE_URL="http://localhost:3000/api"; npm run dev
```
