# texashumanoids.org

The Texas Humanoids website: plain HTML, CSS and JS with no build step, hosted on Netlify.

## How deploys work

- Push or merge to `main` → Netlify deploys it to https://texashumanoids.org within a minute or two.
- Open a pull request → Netlify comments a preview link, so you can check changes before they go live.
- No more drag and drop.

## Editing the site

| Page | File |
| --- | --- |
| Home | `index.html` |
| Robots | `robots.html` |
| Team | `team.html` |
| Gallery | `gallery.html` |
| Partners / sponsors | `partners.html` (logos also scroll on the home page in `index.html`) |
| Contact | `contact.html` |

Shared styles are in `styles.css` and shared behavior is in `site.js`.

Put new images in `images/web/`, resized for the web (about 2400px wide at most, under ~500 KB). Keep full-size originals out of the repo.

### Preview locally

```sh
python3 -m http.server 3457
```

Then open http://localhost:3457.

## Adding a sponsor

1. Add the logo to `images/web/`.
2. Add a `logo-cell` to the Sponsors grid in `partners.html`.
3. Add the logo to each of the four marquee rows in `index.html`, and its name to the marquee's `aria-label`.
