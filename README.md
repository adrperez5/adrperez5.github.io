# Portfolio Website

> Personal portfolio showcasing my projects and technical experience

**Live Site:** [https://adrperez5.github.io](https://adrperez5.github.io)

## Tech Stack

- **Framework:** Next.js 16 (Pages Router)
- **Language:** TypeScript
- **Styling:** CSS Modules
- **Deployment:** GitHub Pages
- **Libraries:** React 19

## Features

- Responsive design optimized for mobile and desktop
- Dynamic project routing with detailed case studies
- Data-driven content management using JSON
- Modular component architecture
- Optimized for performance and SEO

## Local Development

```bash
# Install dependencies
npm install

# Run development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to view in your browser.

## Project Structure

```
├── src/
│   ├── components/     # Reusable UI components (Layout, etc.)
│   ├── pages/          # Next.js pages and routing
│   ├── data/           # Static content (JSON files)
│   └── styles/         # CSS Modules and global styles
├── public/             # Static assets (images, favicon)
└── .github/
    └── workflows/      # GitHub Actions for deployment
```

## Deployment

This site is automatically deployed to GitHub Pages via GitHub Actions on push to the `main` branch.

To deploy manually:
```bash
npm run build
```

## License

This project is open source and available for reference.
