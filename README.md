# Vilhelm Martinsson Web Applications — Blog

Static site with a Pelican-generated blog published to `/blog/`.

## Prerequisites
- Python 3.10+
- Windows PowerShell (or any shell)

## One-time setup
```powershell
py -m venv .venv
. .\.venv\Scripts\Activate.ps1
pip install -r requirements.txt
```

If not using `requirements.txt`:
```powershell
pip install "pelican>=4.9,<5" "markdown>=3,<4" "typogrify>=2,<3"
```

## Develop locally
- Edit or add articles in `content/articles/` (Markdown).
- Build the blog:
```powershell
pelican content -s pelicanconf.py
```
- Serve with auto-reload:
```powershell
pelican -r -s pelicanconf.py --listen
# Open http://localhost:8000
```

## Add a post
Create a new file in `content/articles/`, e.g. `my-post.md`:
```markdown
Title: My post title
Date: 2025-01-12
Slug: my-post
Summary: One-line summary of the post.

Your content here in Markdown.
```

Rebuild:
```powershell
pelican content -s pelicanconf.py
```

## Deploy (GitHub Pages)
We commit the generated blog output in `/blog/` to the main branch.
1. Build locally: `pelican content -s pelicanconf.py`
2. Commit and push:
```powershell
git add blog
git commit -m "Build blog"
git push
```
3. Ensure GitHub Pages is set to deploy from `main` → `/` (root). The blog will be available at `/blog/`.

## Repository layout
- `index.html`: main landing page
- `static/`: shared CSS, JS, images
- `content/`: Pelican content (Markdown articles)
- `themes/vmwa/`: minimal Pelican theme reusing site CSS
- `blog/`: generated blog output (committed)
- `pelicanconf.py`: Pelican configuration

## Troubleshooting
- Blog not visible: check `blog/index.html` exists after build.
- Broken styles: theme uses `../static/css/styles.css` (relative to `/blog/`).
- 404 on GitHub Pages: verify Pages is deploying from `main` and `CNAME` matches your domain.

## Optional (CI)
You can keep building locally and committing `/blog/`. CI deploy is optional and not required.