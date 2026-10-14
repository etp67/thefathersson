# The Father's Son Handy Works — website

A simple, static, read-only site (plain HTML/CSS/JS, no build step).

## Editing content

Almost everything you'll want to change lives in **`js/config.js`**:

- **`links`** — paste your Google Business Profile link, Google "ask for reviews" link,
  Facebook page, and (optionally) a booking link. Empty links hide their buttons;
  with no `booking` link, "Book a Job" buttons call the phone number.
- **`reviews`** — copy real reviews from Google/Facebook into the list.
- **`gallery`** — drop photos into `assets/gallery/` and list them (supports before/after pairs).

Prices and service descriptions are in `index.html`.

## Preview locally

```sh
python3 -m http.server 8000   # then open http://localhost:8000
```

## Publishing (GitHub Pages, free)

Repo **Settings → Pages → Source: Deploy from a branch → `main` / root**.
To use a custom domain, add it under Settings → Pages and point your DNS at GitHub.
