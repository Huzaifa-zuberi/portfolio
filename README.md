# Huzaifa Zuberi — Portfolio & Resume

A responsive, single-page portfolio website plus an ATS-optimized resume/CV.

## Live Site

| Page | URL |
| --- | --- |
| Portfolio | `https://huzaifa-zuberi.github.io/portfolio/` |
| Resume (HTML) | `https://huzaifa-zuberi.github.io/portfolio/resume.html` |
| Resume (Word source) | `https://huzaifa-zuberi.github.io/portfolio/Huzaifa_Zuberi_CV.docx` |

Use **Download as PDF** on the resume page and choose **Save as PDF**. The browser suggests
`HuzaifaZuberiResume.pdf` as the filename.

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
- The resume page's **Download as PDF** button opens the browser print dialog so visitors
  can save an A4 PDF as `HuzaifaZuberiResume.pdf`.

## Local Preview

Open `index.html` directly in a browser, or run a local server:

```bash
python -m http.server 8000
# visit http://localhost:8000
```

## Deploy

GitHub Actions (`.github/workflows/deploy.yml`) publishes the `master` branch to
GitHub Pages on every push. Edit the files, commit, and push.
