<div align="center">
<img width="1200" height="475" alt="GHBanner" src="https://github.com/user-attachments/assets/0aa67016-6eaf-458a-adb2-6e31a0763ed6" />
</div>

# Run and deploy your AI Studio app

This contains everything you need to run your app locally.

View your app in AI Studio: https://ai.studio/apps/drive/1YXLOVprgd6VqKOUnmWhnCEAcAviGN2sF

## Run Locally

**Prerequisites:**  Node.js


1. Install dependencies:
   `npm install`
2. Set the `GEMINI_API_KEY` in [.env.local](.env.local) to your Gemini API key
3. Run the app:
   `npm run dev`

## Deploy on Netlify

1. Connect the repo to Netlify; build command: `npm run build`, publish: `dist`, functions: `netlify/functions`.
2. In **Site configuration → Environment variables**, add:
   - **Key:** `GEMINI_API_KEY`
   - **Value:** your [Google AI Studio](https://aistudio.google.com/apikey) API key (free tier, no billing).
3. Trigger a new deploy after adding the variable.

## Troubleshooting Gemini features

If Industry Insights or Project Catalyst show an error:

1. **Test the function and API key**  
   On your live site, open DevTools (F12) → Console and run:
   ```js
   fetch('/.netlify/functions/gemini', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ action: 'ping' }) }).then(r => r.json()).then(console.log)
   ```
   - If you see `{ ok: true, keyConfigured: true }`, the function and key are fine; the issue is likely with the Gemini API (quota, model, or key restrictions).
   - If `keyConfigured: false`, add or fix `GEMINI_API_KEY` in Netlify and redeploy.

2. **Check Netlify**  
   Netlify dashboard → your site → **Functions** → **gemini** → **Logs**. Look at the error when you try a search or image.

3. **Key and quotas**  
   Use a key from [Google AI Studio](https://aistudio.google.com/apikey) (no billing). Ensure the key is allowed to use the Gemini API and isn’t over free-tier limits.
