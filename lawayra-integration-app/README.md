# LaWayra — Community & Integration App (Prototype)

A clickable, mobile-first prototype of the LaWayra Community & Integration app. Built as vanilla HTML/CSS/JS — no build step, no dependencies, deployable to GitHub Pages.

## What this is

A validated-concept prototype to share with Sam, Monica, Sarah, and Kevin before investing in a native build. The structure mirrors the existing **LaWayra Family Circle community** (lawayra-family.circle.so) so the app feels like a natural evolution — not a parallel product.

### 5 tabs (Circle-native)

- **Feed 💬** — community posts with pinned Monica content, composer ("Start a post"), like/comment counts, team badges (LaWayra Team, Admin, Community Team), pulsing "Go Live" FAB. Directly inspired by the Circle home feed.
- **Course 📚** — Preparation (3 modules) + Integration (Monica's 6-week series). Social proof banner pulled from real Circle data: **695 students · 64% completion · 4.8★**. Modules open to a detail view with video placeholder, summary, interactive checklist, and "mark complete".
- **Me 🌱** — Greeting + cohort badge (March / April / May 2026 with dates + member count) + streak / points + **gamified garden** (seed → sprout → young plant → flowering → butterflies → sacred grove) + daily prompt + today's check-ins + full habit tracker + upcoming event + premium teaser.
- **Events 📅** — 14-day calendar strip, Sunday Community Call, Monica's integration weeks, Taita AMA, Sam's AMA, cacao ceremonies, workshops. RSVP + add-to-calendar mock. Premium-gated events show lock.
- **Library 🌿** — Meditations, Cacao Ceremonies, Yoga, Breathwork, Workshops, Book List, Tool Templates (interactive Wheel of Life SVG), Past Event Recordings, 1:1 Coaching.

### Onboarding

- Splash with "connect · heal · grow"
- 2 intro slides
- Role selector: Joining a retreat soon / Just returned / Exploring
- **If "joining"** → cohort picker (March / April / May 2026 or undecided) — cohort appears as a badge on the Me tab
- Retreat guests auto-granted Premium

### Gamification

- Each habit check-in: +5 pts
- Each module complete: +15 pts
- Each module checklist tick: +2 pts
- Each RSVP: +3 pts
- Each like on a post: +1 pt
- New post: +5 pts
- Wheel of Life reflection: +10 pts

State persists to `localStorage` under key `lw-integration-app-v1`. Tap the "LW" chip 5× on the Me tab to reset.

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
4. **Circle migration strategy** — If we ship this app, does Circle stay as the "desktop" community and the app becomes the mobile face, or do we migrate everything? Either way, the data shape (spaces, posts, cohorts, courses) maps cleanly.
5. **Cohort-specific content** — Each cohort has its own space in Circle. In the app, should we let users switch cohort context, or keep it tied to the one they joined?

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
