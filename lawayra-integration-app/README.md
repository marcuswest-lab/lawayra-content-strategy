# LaWayra — Community & Integration App (Prototype)

A clickable, mobile-first prototype of the LaWayra Community & Integration app. Built as vanilla HTML/CSS/JS — no build step, no dependencies, deployable to GitHub Pages.

## What this is

A validated-concept prototype we can share with Sam, Monica, and Kevin before investing in a native build. It demonstrates:

- **Onboarding** — splash, 3-card intro, role selector (joining / post-retreat / exploring)
- **Home / Dashboard** — greeting, streak + points, **gamified garden** (seed → sprout → flowering → butterflies → sacred grove), daily prompt, quick habit tiles, upcoming event, premium teaser
- **Preparation + Integration Course** — 3 preparation modules + Monica's 6-week integration series, module detail with video placeholder, summary, interactive checklist, mark complete
- **Habit tracker** — 5 default habits + custom habit creation with emoji picker, 7-day streak grid, daily notification mockup
- **Resource library** — meditations, cacao ceremonies, yoga, breathwork, workshops, book list, tool templates (interactive Wheel of Life), past recordings, 1:1 coaching
- **Events calendar** — 14-day strip, Sunday community calls, Monica's integration weeks, Taita AMA, Sam's AMA, cacao ceremonies, workshops; RSVP + add-to-calendar mock
- **Premium tier modal** — Taita AMAs, virtual cleanse, Taita Talks, Sam's monthly AMA, early retreat access; retreat guests auto-premium

All state persists to `localStorage`. Tap the "LW" chip 5× on Home to reset.

## Run locally

```bash
# From the repo root
cd lawayra-integration-app
python3 -m http.server 8000
# Open http://localhost:8000 in Chrome
```

To test on your phone on the same Wi-Fi:

```bash
# Find your LAN IP
ipconfig getifaddr en0     # macOS
# Visit http://<your-ip>:8000 from your phone
```

## Deploy to GitHub Pages

```bash
# From the repo root
git add lawayra-integration-app
git commit -m "Add Community & Integration app prototype"
git push

# On GitHub: Settings → Pages → Deploy from branch → main → /(root)
# URL: https://<username>.github.io/<repo>/lawayra-integration-app/
```

Or push to its own repo (matches `lawayra-wellness-prototype` pattern):

```bash
cd lawayra-integration-app
git init
git remote add origin https://github.com/marcuswest-lab/lawayra-integration-app.git
git add . && git commit -m "Initial prototype"
git push -u origin main
```

## Tech

- No framework — vanilla HTML / CSS / JS
- Poppins via Google Fonts CDN
- CSS custom properties match `lawayra-prototype/css/style.css` brand tokens
- `localStorage` persistence under key `lw-integration-app-v1`
- BEM-style class naming
- Desktop: rendered inside a 390×844 iPhone frame
- Mobile (< 500px): frame strips, app fills full viewport
- Works offline after first load

## File layout

```
lawayra-integration-app/
├── index.html              # Shell + all screens inline
├── css/
│   ├── style.css          # Brand tokens, phone frame, components
│   └── screens.css        # Per-screen styling
├── js/
│   ├── data.js            # Mock content (modules, events, resources, prompts)
│   ├── garden.js          # Garden stage logic + render
│   ├── habits.js          # Check-in, streak, rendering
│   └── app.js             # State, routing, all screen handlers
└── README.md
```

## Open questions surfaced in the prototype

1. **YouTube vs. in-app course** — The Course tab has a design note asking whether the Preparation course stays public on YouTube (community-subscription model) or moves inside the app.
2. **Garden metaphor** — We chose garden growth. Alternatives that match the brand symbols (mountain, river, tree, flower of life) are worth exploring in v2.
3. **Premium pricing** — Placeholder `$19/month`. Decide post-feedback.

## What's NOT in the prototype (by design)

- Real authentication, backend, or database
- Real payments (Stripe) — "Start trial" is a mock
- Actual video/audio hosting — placeholders only
- Push notifications — the notif strip in the Habits tab is a mock
- Circle / Zoom / Drip / GHL integrations
- Production accessibility audit — will revisit for the native build

## Next steps after feedback

1. Share the GitHub Pages URL with Sam, Monica, Kevin for feedback
2. Test with 3–5 existing community members on their phones
3. Decide on: garden vs. alternative metaphor, YouTube vs. in-app course, premium price
4. If validated, scope the native React Native (Expo) build — same data model, same screens, real backend
