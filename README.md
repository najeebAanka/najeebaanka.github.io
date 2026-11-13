# Najeeb Anka — Portfolio

A static portfolio built with HTML, CSS, and vanilla JavaScript for GitHub Pages. No build step, database, or backend is required.

Live website: [najeebaanka.github.io](https://najeebaanka.github.io)

## Local preview

From the repository root, run:

```sh
python -m http.server 8765 --bind 127.0.0.1
```

Open `http://127.0.0.1:8765/`. Stop the server with Ctrl+C. A local server also enables the copy-email interaction, which requires a secure context (localhost or HTTPS).

## Editing

- `index.html`: homepage, selected projects, services, and grouped skills.
- `about/`, `projects/`, `blogs/`, `contact/`: existing public page URLs.
- `css/style.css`: shared responsive design and motion preferences.
- `js/script.js`: navigation, scroll reveals, project filters, and copy-email feedback.
- `assets/`: existing screenshots, images, and CV.

Project cards and article content are rendered in HTML. Links and FAQ remain usable without JavaScript; filters and clipboard controls appear when supported. Contact actions use email, phone, WhatsApp, and LinkedIn directly.

## Redesign checkpoint and rollback

The original website is saved at tag `backup/pre-redesign-2026-11-13` (commit `ecbe4df`). The redesign is on branch `redesign/portfolio-refresh`. The `main` branch and hosted website have not been changed by this local redesign.

Once local changes are committed, return to the original version with:

```sh
git switch main
```

To inspect the exact original checkpoint independently:

```sh
git switch --detach backup/pre-redesign-2026-11-13
```

Return to the redesign with `git switch redesign/portfolio-refresh`. Publishing to GitHub Pages is a separate step.
