# Sunnapu Vamshi Krishna — Portfolio

A dark, futuristic personal portfolio built with React, Tailwind CSS, Framer Motion, and Lucide React.

## Run it locally

```bash
npm install
npm run dev
```

Open the URL Vite prints (usually `http://localhost:5173`).

## Build for production

```bash
npm run build
npm run preview
```

The production build is output to `dist/`. Deploy that folder to Vercel, Netlify, GitHub Pages, or any static host.

## Project structure

```
vamshi-portfolio/
├── index.html
├── package.json
├── postcss.config.js
├── tailwind.config.js
├── vite.config.js
└── src/
    ├── App.jsx        # Entire app: Navbar, Hero, About, Skills, Education, Projects, Photography, Contact
    ├── main.jsx        # React entry point
    └── index.css       # Tailwind directives + custom scrollbar
```

## Things to swap before deploying

1. **Resume**: Replace the placeholder `href="data:application/pdf;base64,"` in the Hero "Download Resume" button with a real path, e.g. place `resume.pdf` inside a `public/` folder and link to `/resume.pdf`.
2. **Profile photo**: Swap the Unsplash placeholder URL in `Hero` for your own photo (ideally a square portrait, at least 600x600px).
3. **Photography gallery**: The 12 gallery images currently use `picsum.photos` placeholders. Replace each `seed` URL in the `PHOTOS` array in `App.jsx` with your own photo paths (e.g. `/photos/portrait-1.jpg` after adding images to `public/photos/`).
4. **Project links**: Update the `href="#"` GitHub and Live Demo links in the `PROJECTS` array section with your real repository and deployment URLs.
5. **Contact details**: Update the email, GitHub, LinkedIn, and Instagram links in the `Contact` component with your real handles.
6. **Contact form backend**: The form currently only shows a "Message sent" confirmation locally — it does not send anything anywhere. Wire it up to a service like Formspree, EmailJS, or your own API route to actually receive submissions.

## Notes

- Tailwind's `backdrop-blur` (glassmorphism) requires a modern browser; it degrades gracefully to a solid panel on older browsers.
- The mouse-tracking glow uses Framer Motion's `useSpring` for smooth easing — adjust `damping`/`stiffness` in `CursorGlow` inside `App.jsx` to make it feel snappier or lazier.
- Reduce motion: if you want to respect `prefers-reduced-motion`, wrap the `CursorGlow` component and entrance animations in a media-query check before deploying publicly.
