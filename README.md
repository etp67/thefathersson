# The Father's Son Handy Works — website

A simple, static, read-only site (plain HTML/CSS/JS, no build step).

## Editing content

Almost everything you'll want to change lives in **`js/config.js`**:

- **`links`** — Google Business Profile, Google review link, Facebook page, and booking.
  Empty links hide their buttons.
- **`reviews`** — copy real reviews from Google/Facebook into the list.
- **`gallery`** — drop photos into `assets/gallery/` and list them (supports before/after pairs).

Prices and service descriptions are in `index.html`.

## Online booking (Google Calendar appointment schedule)

The "Book" section embeds a Google Calendar booking page, so customers pick an open
slot and it lands straight on Zach's calendar (busy times are blocked automatically).
Set up once, signed in to Zach's Google account (thefatherssonhandy@gmail.com):

1. Open [Google Calendar](https://calendar.google.com) → **Create** → **Appointment schedule**.
2. Name it (e.g. "Estimate / Job Visit"), set the length (e.g. 1 hour) and the
   hours he's available. Under **Booking form**, add a required question like
   "Address and what you need done".
3. **Save** → **Share** → **Website embed** → **Inline schedule** and copy the `src="…"`
   URL from the code (it looks like
   `https://calendar.google.com/calendar/appointments/schedules/XXXX?gv=true`).
4. Paste that URL into `bookingCalendar` in `js/config.js`.

Until it's set, the section shows Call / Text / Email buttons instead.
The same booking page link can also be added to the Google Business Profile
(Edit profile → Contact → Booking links) so the "Book" button on Google works too.

## Preview locally

```sh
python3 -m http.server 8000   # then open http://localhost:8000
```

## Publishing (GitHub Pages)

The site is served straight from the `main` branch — no build step.

1. GitHub Pages on a **private** repo needs a paid GitHub plan. On a free plan,
   make the repo public first (Settings → General → Danger Zone → Change visibility).
2. Settings → **Pages** → Source: **Deploy from a branch** → `main` / `(root)` → Save.
3. After a minute the site is live at `https://etp67.github.io/thefathersson/`.

Every push to `main` republishes the site. To use a custom domain, enter it under
Settings → Pages and point the domain's DNS at GitHub.
