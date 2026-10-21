# Huzaifa Zuberi — Portfolio & Resume

A responsive, single-page portfolio website plus an ATS-optimized resume/CV.

## Live Site

| Page | URL |
| --- | --- |
| Portfolio | `https://huzaifa-zuberi.github.io/portfolio/` |
| Resume (HTML) | `https://huzaifa-zuberi.github.io/portfolio/resume.html` |
| Resume (PDF) | `https://huzaifa-zuberi.github.io/portfolio/HuzaifaZuberi_CV.pdf` |

## Tech

- Vanilla HTML / CSS / JavaScript (no build step)
- Font Awesome icons
- Google Fonts (Inter, JetBrains Mono)

## Pages

- **`index.html`** — Portfolio: hero, about, technical skills, featured projects,
  experience, and contact. Dark/light theme toggle and mobile menu.
- **`resume.html`** — ATS-optimized resume for Flutter Developer roles.
  Single-column layout, standard ATS section headings, and job-description keywords
  embedded in the summary, core competencies, and skills sections.
- **`resume.css`** — Resume styling. Print rules target A4 with a compact,
  ATS-safe layout (2 pages, no columns, no tables).
- **`HuzaifaZuberi_CV.pdf`** — Generated from `resume.html`. Regenerate with:

```bash
chrome --headless --no-pdf-header-footer --virtual-time-budget=15000 \
  --print-to-pdf=./HuzaifaZuberi_CV.pdf "file:///<abs-path>/resume.html"
```

The PDF is plain ASCII with no raster images so applicant tracking systems can
extract the text reliably.

## Local Preview

Open `index.html` directly in a browser, or run a local server:

```bash
python -m http.server 8000
# visit http://localhost:8000
```

## Deploy

GitHub Actions (`.github/workflows/deploy.yml`) publishes the `master` branch to
GitHub Pages on every push. Edit the files, commit, and push.
