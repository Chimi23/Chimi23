# Chimi — Photography

A fast, dependency-free photography portfolio: full-screen hero slideshow, filterable masonry gallery, keyboard/swipe lightbox, about and contact sections.

## Run it
Open `index.html` in a browser — no build step. To publish, enable **GitHub Pages** (Settings → Pages → deploy from branch, root folder).

## Add your photos
1. Put images in an `images/` folder.
2. Edit `photos.js`: set `src`, `title`, `category`, `location` and the aspect ratio (`w`, `h`). Mark hero images with `featured: true`.
   Categories are generated automatically for the filter bar.

## Customize
- Name, headline and bio: `index.html`
- Colours and fonts: the `:root` variables at the top of `styles.css`
- Contact email: `CONTACT_EMAIL` in `script.js` (the form opens the visitor's email app)

Placeholder images are served by picsum.photos until you replace them.
