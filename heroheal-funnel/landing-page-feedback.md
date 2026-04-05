# Hero Heal Landing Page — Feedback & Recommendations

**Page:** heroheal.org/apply-healing-retreats-scholarships-education/
**Date:** April 5, 2026
**From:** Marcus (LaWayra) + CRO audit

---

## Summary

The landing page has good content and covers the right topics. The main issues are structural — how the content is organized, where CTAs are placed, and how the page flows on both mobile and desktop. These changes should significantly improve the conversion rate once Google Ads are running.

---

## Critical Issues

### 1. Nothing useful above the fold

When someone loads the page, they see the hero image and title ("Apply For Healing") but no description, no value proposition, and no CTA button. The "Start Application" button is buried below a large block of whitespace that requires significant scrolling to get past.

**Fix:** Reduce the hero padding and whitespace. Add a short description paragraph and a CTA button directly inside the hero section so that on both mobile and desktop, a visitor sees:
- Clear headline
- 1-2 sentence description of what they're applying for
- "Start Your Application" button
- Micro-reassurance ("Free to apply. Takes 3-5 minutes.")

All of this should be visible without scrolling.

### 2. The application form links off-site

Clicking "Start Application" opens `form.jotform.com` on a separate page. This adds an entire page redirect as a friction point. Every additional click/redirect is a point where visitors drop off.

**Fix:** Embed the Jotform directly on the page using an iframe. All CTA buttons throughout the page should anchor-scroll down to the embedded form section — not open a new tab or navigate away.

Jotform provides an embed code. In WordPress, this can be added as a Custom HTML block:
```html
<iframe
  id="JotFormIFrame-260787014759063"
  title="Hero Heal Application"
  src="https://form.jotform.com/260787014759063"
  style="width:100%; min-height:600px; border:none;"
  allowfullscreen>
</iframe>
```

### 3. Too much text, not enough structure

The page currently reads as one continuous block of text. There are no visual section breaks, no alternating backgrounds, and no images between sections. On mobile especially, it feels like a wall of text.

**Fix:** Break the page into 5-6 distinct visual sections, each with:
- Its own background color (alternate between white and light gray)
- A clear heading
- Short, focused copy (3-5 sentences max per section)
- A CTA button at the bottom of each section
- Full-width images between sections as visual dividers

### 4. Only 2 CTA buttons on the entire page

The current page has a "Start Application" link near the top and an "Open Application Form" button at the bottom. That's it. A visitor who reads the "How the Process Works" section and is ready to act has no nearby button to click.

**Fix:** Add a CTA button after every major section:
- After "Who This Is For"
- After "How It Works"
- The embedded form section itself
- A final CTA bar at the very bottom of the page

Each button should say something like "Apply for Support" or "Start Your Application" and anchor-scroll to the embedded form.

### 5. Navigation links leak traffic

The full site navigation (Home, About, Programs, Veteran Healing Support, Contact, Donate) is present at the top of the page. On a paid landing page, every nav link is an exit. Similarly, "Contact Us" and "Support Our Mission" links at the bottom compete with the primary CTA.

**Fix:** For this specific page (since it's the Google Ads landing page), strip the navigation down to just the Hero Heal logo and a single "Apply Now" button. Remove or minimize footer links that compete with the application CTA.

### 6. No social proof

There are no testimonials, success stats, partner logos, or any evidence that Hero Heal has helped real people. For a nonprofit asking vulnerable individuals to share personal information, trust is critical.

**Fix (when available):** Add 1-2 short testimonial quotes from veterans who've been through the program. Even a simple stat like "Supporting 500+ veterans and first responders" would help. This can be added later once available — it's not blocking launch.

---

## Recommended Page Structure

The mockup file (`landing-page-mockup.html`) shows this structure in detail with annotations:

| # | Section | Background | CTA? |
|---|---------|-----------|------|
| 1 | **Hero** — Headline + description + CTA | Dark (image overlay) | Yes |
| 2 | **Who This Is For** — Bullet list of who should apply | White | Yes |
| — | *Full-width image divider* | — | — |
| 3 | **How It Works** — 4 numbered steps | Light gray | Yes |
| — | *Full-width image divider* | — | — |
| 4 | **Embedded Application Form** | Dark | The form IS the CTA |
| 5 | **Immediate Support Resources** — 988, SAMHSA, VA links | White | No |
| 6 | **Final CTA bar** — "Ready to take the first step?" | Green | Yes |
| 7 | **Footer** — Minimal: nonprofit info + disclaimer | Dark | No |

---

## Mobile Priority

Most traffic from Google Ads will be on mobile. All changes should be designed mobile-first:

- Hero section should be compact (no 230px top/bottom padding)
- The whitespace between hero and content must be eliminated
- CTA buttons should be full-width on mobile
- The embedded form should be responsive
- Sections should stack naturally without excessive margins

---

## What's NOT Changing

- The actual copy/content is solid and appropriate for nonprofit compliance
- The Jotform application itself doesn't need changes
- The trusted resources section (988, SAMHSA, VA) should stay
- The disclaimer footer should stay
- The images are good — they just need to be distributed throughout the page instead of grouped at the bottom

---

## Files in This Folder

| File | What It Is |
|------|-----------|
| `landing-page-feedback.md` | This document — written feedback and recommendations |
| `landing-page-mockup.html` | Interactive wireframe showing the recommended page structure (open in browser) |
| `heroheal-funnel-map.html` | Complete funnel flow map with all URLs, conversion tracking details, and GTM info |

---

## Next Steps

1. Jen implements the structural changes on the WordPress page
2. Jen embeds the Jotform instead of linking to it
3. We verify the changes on mobile and desktop
4. Andrew builds the Google Ads campaign
5. We're live
