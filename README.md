# Personal website

A one-page personal site built with React and Vite, hosted free on GitHub Pages.

## Change the words
Edit `src/content.js`. Everything on the page (name, title, bio, jobs, projects, contact) comes from there.
Also update the `<title>` and description lines in `index.html`.

## Change the look
Colors and fonts are at the top of `src/index.css`.

## See it on your computer
```
npm run dev
```
Then open http://localhost:5173

## Put it online (one-time setup)
1. Create a free GitHub account and an empty repository (for example `personal-website`).
2. From this folder: `git init`, commit, add the repo as `origin`, and push to `main`.
3. On GitHub: repo **Settings → Pages → Source: GitHub Actions**.
   Every push to `main` now rebuilds and publishes the site automatically.
4. Custom domain: buy one (e.g. on Cloudflare), add a `public/CNAME` file containing just
   the domain (e.g. `yourname.com`), then follow GitHub's "Managing a custom domain" guide
   to add the DNS records. Tick **Enforce HTTPS** once it's verified.
