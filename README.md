<div align="center">
<img width="1200" height="475" alt="GHBanner" src="https://github.com/user-attachments/assets/0aa67016-6eaf-458a-adb2-6e31a0763ed6" />
</div>

# Run and deploy your AI Studio app

This contains everything you need to run your app locally.

View your app in AI Studio: https://ai.studio/apps/d28d0fa2-9290-4e99-adeb-f5f25d8db061

## Run Locally

**Prerequisites:**  Node.js


1. Install dependencies:
   `npm install`
2. Set the `GEMINI_API_KEY` in [.env.local](.env.local) to your Gemini API key
3. Run the app:
   `npm run dev`

## Deploy to Vercel

This project is configured for Vercel with:
- Static frontend build output from Vite (`dist`)
- Serverless API routes in `api/` for:
   - `/api/experience`
   - `/api/skills`
   - `/api/projects`

Steps:
1. Push this repository to GitHub (including `portfolio.db`)
2. Import the project in Vercel
3. Keep the default build command: `npm run build`
4. Deploy

Notes:
- The API routes read from `portfolio.db` when available.
- If `portfolio.db` is missing, the API returns built-in fallback data.
- `POST /api/projects` is disabled in Vercel serverless mode because local SQLite writes/uploads are not persistent there.
