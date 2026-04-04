# LaWayra — Sales Tracking & Attribution System

> **Know exactly where every booking comes from.** This document builds a complete sales-by-source tracking system: UTM parameters, conversion tracking, automated data pipelines, and a live dashboard showing bookings and revenue by channel — per day and per month.

---

## Section 1: UTM Parameter Framework

Every link you share — in ads, social posts, DMs, emails, listings — needs UTM parameters so Google Analytics can tell you where traffic came from. Without UTMs, most of your social and referral traffic shows up as "direct" or "unattributed."

### How UTM Parameters Work

A UTM-tagged URL looks like this:
```
https://ayahuascaincolombia.com/?utm_source=instagram&utm_medium=social&utm_campaign=link-in-bio
```

There are 3 required parameters:
- **utm_source** — The platform (instagram, google, reddit, etc.)
- **utm_medium** — The channel type (cpc, social, referral, email)
- **utm_campaign** — The specific campaign name

### Naming Conventions (Follow These Exactly)

| Rule | Example | Why |
|------|---------|-----|
| All lowercase | `instagram` not `Instagram` | GA4 treats these as different sources |
| Hyphens for spaces | `link-in-bio` not `link_in_bio` | Consistent, readable in reports |
| No special characters | `retreat-search` not `retreat+search` | Avoids URL encoding issues |
| Date suffix for time-bound campaigns | `mar2026` | Lets you compare month-over-month |

### Master UTM Table — All Traffic Sources

#### Paid Advertising

| Source | utm_source | utm_medium | utm_campaign (example) | Full URL Example |
|--------|-----------|-----------|----------------------|-----------------|
| Google Search Ads | `google` | `cpc` | `retreat-search-mar2026` | `ayahuascaincolombia.com/?utm_source=google&utm_medium=cpc&utm_campaign=retreat-search-mar2026` |
| Google Display Ads | `google` | `display` | `retreat-display-mar2026` | `ayahuascaincolombia.com/?utm_source=google&utm_medium=display&utm_campaign=retreat-display-mar2026` |
| Meta/Instagram Ads | `meta` | `cpc` | `ig-reel-promo-mar2026` | `ayahuascaincolombia.com/?utm_source=meta&utm_medium=cpc&utm_campaign=ig-reel-promo-mar2026` |
| YouTube Ads | `youtube` | `cpc` | `yt-pre-roll-mar2026` | `ayahuascaincolombia.com/?utm_source=youtube&utm_medium=cpc&utm_campaign=yt-pre-roll-mar2026` |
| TikTok Ads | `tiktok` | `cpc` | `tt-spark-ad-mar2026` | `ayahuascaincolombia.com/?utm_source=tiktok&utm_medium=cpc&utm_campaign=tt-spark-ad-mar2026` |

#### Organic Social

| Source | utm_source | utm_medium | utm_campaign | Full URL Example |
|--------|-----------|-----------|-------------|-----------------|
| Instagram bio link | `instagram` | `social` | `link-in-bio` | `ayahuascaincolombia.com/?utm_source=instagram&utm_medium=social&utm_campaign=link-in-bio` |
| Instagram DM links | `instagram` | `social` | `dm-response` | `ayahuascaincolombia.com/?utm_source=instagram&utm_medium=social&utm_campaign=dm-response` |
| Instagram Story link | `instagram` | `social` | `story-link` | `ayahuascaincolombia.com/?utm_source=instagram&utm_medium=social&utm_campaign=story-link` |
| Reddit posts/comments | `reddit` | `social` | `r-ayahuasca` | `ayahuascaincolombia.com/?utm_source=reddit&utm_medium=social&utm_campaign=r-ayahuasca` |
| TikTok bio link | `tiktok` | `social` | `bio-link` | `ayahuascaincolombia.com/?utm_source=tiktok&utm_medium=social&utm_campaign=bio-link` |
| YouTube video description | `youtube` | `social` | `video-description` | `ayahuascaincolombia.com/?utm_source=youtube&utm_medium=social&utm_campaign=video-description` |
| Facebook group post | `facebook` | `social` | `fb-group-post` | `ayahuascaincolombia.com/?utm_source=facebook&utm_medium=social&utm_campaign=fb-group-post` |

#### Referral & Listings

| Source | utm_source | utm_medium | utm_campaign | Full URL Example |
|--------|-----------|-----------|-------------|-----------------|
| Retreat Guru listing | `retreatguru` | `referral` | `profile-listing` | `ayahuascaincolombia.com/?utm_source=retreatguru&utm_medium=referral&utm_campaign=profile-listing` |
| AyaAdvisors listing | `ayaadvisors` | `referral` | `profile-listing` | `ayahuascaincolombia.com/?utm_source=ayaadvisors&utm_medium=referral&utm_campaign=profile-listing` |
| Psychedelist listing | `psychedelist` | `referral` | `profile-listing` | `ayahuascaincolombia.com/?utm_source=psychedelist&utm_medium=referral&utm_campaign=profile-listing` |
| Podcast mention | `podcast` | `referral` | `[podcast-name]` | `ayahuascaincolombia.com/?utm_source=podcast&utm_medium=referral&utm_campaign=joe-rogan-ep123` |
| Blog/article mention | `blog` | `referral` | `[article-slug]` | `ayahuascaincolombia.com/?utm_source=blog&utm_medium=referral&utm_campaign=best-retreats-2026` |
| Google Maps | `google` | `maps` | `gmb-listing` | (Google Maps links are auto-tagged by Google if auto-tagging is on) |

#### Email & Direct

| Source | utm_source | utm_medium | utm_campaign | Full URL Example |
|--------|-----------|-----------|-------------|-----------------|
| Newsletter | `newsletter` | `email` | `mar2026-issue` | `ayahuascaincolombia.com/?utm_source=newsletter&utm_medium=email&utm_campaign=mar2026-issue` |
| Follow-up email | `email` | `email` | `follow-up-sequence` | `ayahuascaincolombia.com/?utm_source=email&utm_medium=email&utm_campaign=follow-up-sequence` |
| WhatsApp message | `whatsapp` | `message` | `inquiry-response` | `ayahuascaincolombia.com/?utm_source=whatsapp&utm_medium=message&utm_campaign=inquiry-response` |

#### Special: BookingLayer Direct Links

For links that go directly to your BookingLayer booking page (bypassing the main website):

| Source | URL Pattern |
|--------|------------|
| Any source → BookingLayer | Use BookingLayer's `?ref=` parameter for partner tracking: `[bookinglayer-url]?ref=instagram` |
| Website → BookingLayer | UTMs are captured on the website first, then passed via cookie (see Section 3) |

### Rules for the Team

1. **Never share a bare URL externally.** Every link you post, DM, or email gets UTM parameters.
2. **Use the UTM Master List tab** in the tracking spreadsheet — copy-paste, don't type from memory.
3. **For new campaigns,** add the tagged URL to the Master List first, then use it.
4. **Google Ads auto-tagging** is separate from UTMs — leave auto-tagging ON in Google Ads and still add UTMs for backup.
5. **Test your URLs** — click them and check GA4 Realtime report to confirm the source shows correctly.

---

## Section 2: BookingLayer Source Field Improvements

Your current "where did you hear about us" dropdown has 14 options. Here's the recommended update to make it more useful for attribution.

### Current Options (14)

1. Google Search
2. Friend Recommendation
3. Retreat Guru
4. ChatGPT or other AI Chatbots
5. Reddit
6. Instagram
7. Advertisement
8. Podcast
9. YouTube
10. AyaAdvisors
11. TikTok
12. Newsletter
13. Conference or Event
14. Psychedelist

### Problems With Current List

| Issue | Detail |
|-------|--------|
| "Advertisement" is too vague | Doesn't distinguish Google Ads from Meta/Instagram Ads from YouTube Ads — you can't calculate ROI per ad platform |
| Missing key sources | Google Maps, WhatsApp, blogs/articles, word of mouth (distinct from friend recommendation) |
| No catch-all | If someone's source isn't listed, they pick the closest match, corrupting your data |

### Recommended Updated List (19 options)

| # | Option | Notes |
|---|--------|-------|
| 1 | Google Search | Keep as-is |
| 2 | Google Ads | Split from "Advertisement" |
| 3 | Google Maps | New — significant discovery channel |
| 4 | Facebook/Instagram Ads | Split from "Advertisement" |
| 5 | YouTube Ads | Split from "Advertisement" |
| 6 | Instagram | Keep — organic IG (not ads) |
| 7 | Facebook | New — organic FB groups/posts |
| 8 | YouTube | Keep — organic YouTube |
| 9 | TikTok | Keep |
| 10 | Reddit | Keep |
| 11 | Retreat Guru | Keep |
| 12 | AyaAdvisors | Keep |
| 13 | Psychedelist | Keep |
| 14 | ChatGPT or other AI Chatbots | Keep |
| 15 | Podcast | Keep |
| 16 | Newsletter | Keep |
| 17 | Blog or Article | New |
| 18 | Friend Recommendation | Keep |
| 19 | Conference or Event | Keep |
| 20 | Other | New — free text field to catch unlisted sources |

### How to Update in BookingLayer

1. Go to **Settings → General → Custom booking fields**
2. Find the "where did you hear about us" field
3. Edit the dropdown options to match the list above
4. The "Other" option should ideally be a free text field (if BookingLayer supports conditional fields) or a separate text input

### Source-to-Category Mapping

For reporting, group the 20 options into categories:

| Category | Sources |
|----------|---------|
| **Paid Ads** | Google Ads, Facebook/Instagram Ads, YouTube Ads |
| **Organic Search** | Google Search, Google Maps |
| **Organic Social** | Instagram, Facebook, YouTube, TikTok, Reddit |
| **Listing Sites** | Retreat Guru, AyaAdvisors, Psychedelist |
| **Content & Media** | Podcast, Newsletter, Blog or Article, ChatGPT or other AI Chatbots |
| **Word of Mouth** | Friend Recommendation, Conference or Event |
| **Other** | Other |

---

## Section 3: GTM + GA4 Conversion Tracking Setup

You have GTM set up. Here's exactly what to configure to track the full funnel: website visit → checkout start → booking complete.

### Prerequisites

- Google Tag Manager container installed on ayahuascaincolombia.com ✅
- GA4 property connected ✅
- Google Ads account with conversion tracking pixel
- Meta Pixel ID
- BookingLayer GTM integration enabled (see BookingLayer docs: Settings → Integrations → Google Tag Manager)

### Tag 1: UTM Parameter Capture & Storage

**Purpose:** When someone arrives at your website with UTM parameters, capture them in a cookie so they persist through the booking flow.

**GTM Setup:**
- **Tag Type:** Custom HTML
- **Trigger:** All Pages (fires on every page load)
- **Custom HTML Code:**

```html
<script>
(function() {
  var params = ['utm_source', 'utm_medium', 'utm_campaign', 'utm_content', 'utm_term'];
  var search = window.location.search;
  if (search.indexOf('utm_') === -1) return;

  var urlParams = new URLSearchParams(search);
  var utmData = {};
  var hasUTM = false;

  params.forEach(function(param) {
    var val = urlParams.get(param);
    if (val) {
      utmData[param] = val;
      hasUTM = true;
    }
  });

  if (hasUTM) {
    // Store in cookie for 30 days
    var expires = new Date();
    expires.setDate(expires.getDate() + 30);
    document.cookie = 'lw_utm=' + encodeURIComponent(JSON.stringify(utmData)) +
      ';expires=' + expires.toUTCString() + ';path=/;SameSite=Lax';

    // Also store in localStorage as backup
    try { localStorage.setItem('lw_utm', JSON.stringify(utmData)); } catch(e) {}
  }
})();
</script>
```

### Tag 2: GA4 — Begin Checkout Event

**Purpose:** Fires when someone clicks the "Book Now" or equivalent CTA that takes them to BookingLayer.

**GTM Setup:**
- **Tag Type:** GA4 Event
- **Event Name:** `begin_checkout`
- **Trigger:** Click — links that point to your BookingLayer booking URL
  - Trigger Type: Click - Just Links
  - Condition: Click URL contains `bookinglayer.com` OR your specific BookingLayer domain
- **Event Parameters:**
  - `utm_source`: {{UTM Source Cookie}} (create a variable that reads from the `lw_utm` cookie)
  - `utm_medium`: {{UTM Medium Cookie}}
  - `utm_campaign`: {{UTM Campaign Cookie}}

### Tag 3: GA4 — Purchase Event (on BookingLayer)

**Purpose:** Fires when a booking is confirmed on BookingLayer's thank-you/confirmation page.

**Note:** BookingLayer supports GTM on their booking pages. Per their documentation, you can add your GTM container ID in BookingLayer Settings → Integrations → Google Tag Manager. BookingLayer sends a `purchase` event with:
- Order reference
- Transaction value
- Currency
- Products booked
- Referral/coupon code

**GTM Setup (in your GTM container, which BookingLayer loads):**
- **Tag Type:** GA4 Event
- **Event Name:** `purchase`
- **Trigger:** Custom Event — `purchase` (fired by BookingLayer's built-in dataLayer push)
- **Event Parameters:** Map from BookingLayer's dataLayer:
  - `transaction_id`: {{DLV - transaction_id}}
  - `value`: {{DLV - value}}
  - `currency`: {{DLV - currency}}
  - `items`: {{DLV - items}}

### Tag 4: Google Ads Conversion Tag

**Purpose:** Tells Google Ads when a booking (conversion) happens, so it can optimize ad delivery.

**GTM Setup:**
- **Tag Type:** Google Ads Conversion Tracking
- **Conversion ID:** (from your Google Ads account → Tools → Conversions)
- **Conversion Label:** (from same location)
- **Conversion Value:** {{DLV - value}}
- **Currency Code:** USD
- **Trigger:** Same as Tag 3 — `purchase` event on BookingLayer confirmation page

### Tag 5: Meta Pixel Events

**GTM Setup — InitiateCheckout:**
- **Tag Type:** Custom HTML (Meta Pixel)
- **Trigger:** Same as Tag 2 (click to BookingLayer)
- **Code:** `fbq('track', 'InitiateCheckout');`

**GTM Setup — Purchase:**
- **Tag Type:** Custom HTML (Meta Pixel)
- **Trigger:** Same as Tag 3 (BookingLayer purchase event)
- **Code:** `fbq('track', 'Purchase', {value: {{DLV - value}}, currency: 'USD'});`

### GTM Variables to Create

| Variable Name | Type | Value |
|--------------|------|-------|
| UTM Source Cookie | 1st Party Cookie | Cookie name: `lw_utm`, then parse JSON for `utm_source` |
| UTM Medium Cookie | 1st Party Cookie | Same cookie, parse for `utm_medium` |
| UTM Campaign Cookie | 1st Party Cookie | Same cookie, parse for `utm_campaign` |
| DLV - transaction_id | Data Layer Variable | `ecommerce.transaction_id` |
| DLV - value | Data Layer Variable | `ecommerce.value` |
| DLV - currency | Data Layer Variable | `ecommerce.currency` |
| DLV - items | Data Layer Variable | `ecommerce.items` |

### GA4 Conversion Setup

After the tags are live:
1. Go to GA4 → Admin → Events
2. Find `purchase` event → toggle "Mark as conversion"
3. Find `begin_checkout` → toggle "Mark as key event"
4. Go to GA4 → Admin → Attribution Settings → set to "Data-driven" attribution model

---

## Section 4: Zapier Data Pipeline

BookingLayer webhook → Zapier → Google Sheets. This is the automated pipeline that logs every booking.

### Current State

You already have a BookingLayer webhook connected to Zapier sending to multiple destinations. We're adding/modifying a Zap that sends structured booking data to a new Google Sheets tracking spreadsheet.

### Zapier Flow Design

```
TRIGGER: BookingLayer → Webhook (BookingCreated event)
    ↓
STEP 2: Formatter → Date/Time → Format to "YYYY-MM-DD"
    ↓
STEP 3: Google Sheets → Create Spreadsheet Row
```

### Field Mapping

When the BookingLayer webhook fires, it sends a payload with the booking ID. Since BookingLayer webhooks send minimal data (just the entity ID), you have two options:

**Option A: Zapier's BookingLayer Integration (Recommended)**
If you have the Zapier-BookingLayer integration active (private beta), the trigger gives you full booking fields directly.

**Option B: Webhook + API Lookup**
If using raw webhooks, add a Zapier step: "Webhooks by Zapier → GET" to call BookingLayer's API with the booking ID to fetch full details. (This requires the paid API — evaluate cost vs. convenience.)

**Option C: Webhook with Available Data**
Use whatever fields the webhook currently provides. Check your existing Zap to see what fields are available.

### Google Sheets Field Mapping

Map these columns in the Zapier → Google Sheets step:

| Column | Maps To | Notes |
|--------|---------|-------|
| A: Date | Booking created date | Format: YYYY-MM-DD |
| B: Month | Formula: `=TEXT(A2, "YYYY-MM")` | Auto-calculated, don't map |
| C: Day of Week | Formula: `=TEXT(A2, "dddd")` | Auto-calculated |
| D: Booking Ref | BookingLayer booking reference | |
| E: Guest Name | Booker first + last name | |
| F: Email | Booker email | |
| G: Package | Product/retreat name | |
| H: Amount (USD) | Booking total | Numeric, no currency symbol |
| I: Self-Reported Source | "Where did you hear about us" response | This is the key field |
| J: Source Category | Formula (VLOOKUP from category mapping) | Auto-calculated |
| K: UTM Source | If captured via cookie passthrough | May be blank |
| L: UTM Medium | If captured via cookie passthrough | May be blank |
| M: UTM Campaign | If captured via cookie passthrough | May be blank |
| N: Notes | Empty — for manual notes | |
| O: Status | Booking status (confirmed, cancelled) | If available from webhook |

### Testing the Pipeline

1. Create a test booking on BookingLayer
2. Verify the Zap triggers
3. Check the Google Sheet — confirm all fields populated correctly
4. Check for the "where did you hear about us" field specifically — this is the most important field to confirm

### Handling Missing Fields

If the webhook doesn't include the "where did you hear about us" field:
- **Workaround 1:** Manually fill column I from BookingLayer admin when reviewing new bookings (daily check)
- **Workaround 2:** Export BookingLayer bookings weekly (CSV) and cross-reference
- **Workaround 3:** Upgrade to the BookingLayer API to pull custom field data programmatically

---

## Section 5: Google Sheets Tracking Hub

This is your central command center. Four tabs, auto-populated where possible, with formulas that generate your reports.

### Tab 1: Raw Bookings

This is where Zapier writes data. One row per booking. Columns A-O as defined in Section 4.

**Header row (Row 1):**
```
Date | Month | Day | Booking Ref | Guest Name | Email | Package | Amount (USD) | Self-Reported Source | Source Category | UTM Source | UTM Medium | UTM Campaign | Notes | Status
```

**Auto-calculated formulas (add to row 2 and drag down):**
- **B2 (Month):** `=IF(A2="","",TEXT(A2,"YYYY-MM"))`
- **C2 (Day):** `=IF(A2="","",TEXT(A2,"dddd"))`
- **J2 (Source Category):** `=IF(I2="","",IFERROR(VLOOKUP(I2,'Source Mapping'!A:B,2,FALSE),"Other"))`

### Tab 2: Monthly Dashboard

A summary table showing bookings and revenue by source for each month.

**Structure:**

Row 1: Headers
```
Source | [Month 1] Bookings | [Month 1] Revenue | [Month 2] Bookings | [Month 2] Revenue | ...
```

**Key Formulas (example for cell B3 — March 2026 bookings for "Google Search"):**
```
=COUNTIFS('Raw Bookings'!$B:$B,"2026-03",'Raw Bookings'!$I:$I,A3)
```

**Revenue (cell C3):**
```
=SUMIFS('Raw Bookings'!$H:$H,'Raw Bookings'!$B:$B,"2026-03",'Raw Bookings'!$I:$I,A3)
```

**Row list (column A):** All 20 source options from the updated dropdown, plus a "TOTAL" row at the bottom.

**Additional metrics row at top:**
- Total bookings: `=SUM(B3:B22)`
- Total revenue: `=SUM(C3:C22)`
- Average booking value: `=C23/B23`
- Top source: `=INDEX(A3:A22,MATCH(MAX(B3:B22),B3:B22,0))`

### Tab 3: Daily Tracker

Same concept as Monthly Dashboard but by date.

**Structure:**
```
Date | Total Bookings | Total Revenue | Google Search | Google Ads | Meta Ads | Instagram | Reddit | Retreat Guru | ... (one column per source)
```

**Populate automatically:**
- Column A: Dates (manually add or use a sequence)
- Columns B onward: `=COUNTIFS('Raw Bookings'!$A:$A,A2,'Raw Bookings'!$I:$I,D$1)` (where D$1 is the source name header)

### Tab 4: UTM Master List

A reference table of all UTM-tagged URLs for the team.

**Structure:**
```
Source Name | Where to Use | Full Tagged URL | Short Notes
```

**Pre-populate with all URLs from Section 1's Master UTM Table.** Team members copy-paste from this tab instead of building URLs from scratch.

### Tab 5: Source Mapping (Hidden Helper Tab)

Used by the VLOOKUP in Tab 1 to auto-categorize sources.

| Source (Column A) | Category (Column B) |
|-------------------|-------------------|
| Google Search | Organic Search |
| Google Ads | Paid Ads |
| Google Maps | Organic Search |
| Facebook/Instagram Ads | Paid Ads |
| YouTube Ads | Paid Ads |
| Instagram | Organic Social |
| Facebook | Organic Social |
| YouTube | Organic Social |
| TikTok | Organic Social |
| Reddit | Organic Social |
| Retreat Guru | Listing Sites |
| AyaAdvisors | Listing Sites |
| Psychedelist | Listing Sites |
| ChatGPT or other AI Chatbots | Content & Media |
| Podcast | Content & Media |
| Newsletter | Content & Media |
| Blog or Article | Content & Media |
| Friend Recommendation | Word of Mouth |
| Conference or Event | Word of Mouth |
| Other | Other |

### Conditional Formatting

Apply to the Monthly Dashboard tab:
- **Green background** on the highest value in each column (top performing source)
- **Red background** on any source with 0 bookings in a month
- **Bold** the TOTAL row
- **Currency format** ($#,##0) on all revenue columns
- **Data bars** on booking count columns for visual comparison

---

## Section 6: Looker Studio Dashboard

Google Looker Studio (free) connects to your Google Sheets and GA4 to create a visual, shareable dashboard.

### Why Looker Studio Over Just Sheets

| Feature | Google Sheets | Looker Studio |
|---------|-------------|---------------|
| Auto-refresh | No (manual) | Yes (daily/hourly) |
| Interactive filters | No | Yes (date range, source, etc.) |
| GA4 integration | No | Direct connector |
| Visual charts | Basic | Professional |
| Shareable link | Yes | Yes, with better formatting |
| Cost | Free | Free |

### Data Sources to Connect

1. **Google Sheets** — Your tracking spreadsheet (Raw Bookings tab)
2. **GA4** — Your ayahuascaincolombia.com property

### Dashboard Page 1: Overview

**Scorecards (top row):**
- Total Bookings (this month)
- Total Revenue (this month)
- Average Booking Value
- Booking Conversion Rate (bookings / website sessions)
- vs. Previous Month (% change for each)

**Charts:**
- Bookings Over Time (line chart, daily)
- Revenue Over Time (line chart, daily)
- Bookings by Source Category (donut chart)

**Filter bar:** Date range picker, source category dropdown

### Dashboard Page 2: Source Breakdown

**Table:** All sources with columns:
- Source Name
- Bookings (count)
- Revenue (sum)
- % of Total Bookings
- % of Total Revenue
- Average Booking Value
- Month-over-Month Change

**Bar chart:** Bookings by source (horizontal, sorted descending)
**Bar chart:** Revenue by source (horizontal, sorted descending)

### Dashboard Page 3: Conversion Funnel

This page combines GA4 website data with booking data:

**Funnel visualization:**
1. Website Sessions (GA4)
2. Book Now Clicks / begin_checkout (GA4 event)
3. Completed Bookings (Google Sheets)

**Conversion rates by source:**
- Table showing: Source → Sessions → Checkouts → Bookings → Session-to-Booking Rate

**Note:** This requires joining GA4 data (sessions by source) with Sheets data (bookings by source). In Looker Studio, use a blended data source or create calculated fields.

### Dashboard Page 4: Trends

**Time series:** Bookings by source over time (stacked area chart, by month)
**Heatmap:** Bookings by day-of-week × source
**Sparklines:** Mini trend charts for each top source

### Dashboard Page 5: Dual Attribution

**Side-by-side comparison:**
- Left: Bookings by Self-Reported Source (from BookingLayer dropdown)
- Right: Bookings by UTM Source (from technical tracking)

**Mismatch table:** Cases where self-reported ≠ UTM attribution

### Setup Instructions

1. Go to [lookerstudio.google.com](https://lookerstudio.google.com)
2. Click **Create → Report**
3. Add data source: **Google Sheets** → select your tracking spreadsheet → select "Raw Bookings" tab
4. Add data source: **Google Analytics** → select your GA4 property
5. Build each page using the layouts described above
6. Set auto-refresh to every 12 hours
7. Share the dashboard link with team members (view-only)

---

## Section 7: Dual Attribution System

Self-reported data and technical tracking each have strengths and weaknesses. Using both together gives you the most accurate picture.

### Why Both Matter

| Method | Strength | Weakness |
|--------|----------|----------|
| Self-reported (dropdown) | Captures offline channels (friend, event, podcast) | People forget, guess, or pick the first option |
| UTM/Technical (GA4) | Precise for digital channels | Can't track offline, cookie issues, cross-device gaps |

### How to Cross-Reference

Every booking in your spreadsheet has two source fields:
- **Column I: Self-Reported Source** (what the customer selected in checkout)
- **Column K: UTM Source** (what the technical tracking captured)

### Attribution Scenarios

| Self-Reported | UTM Says | What Happened | How to Count |
|---------------|----------|---------------|-------------|
| Instagram | instagram/social | Match | Instagram (high confidence) |
| Google Search | google/cpc | Mismatch — they Googled but clicked an ad | Count as Google Ads (they actually came through an ad) |
| Friend Recommendation | instagram/social | Friend told them, they found you on IG | Count both: Friend (discovery), Instagram (acquisition) |
| Reddit | (blank) | Came to site directly after reading Reddit | Reddit (trust self-report when UTM is blank) |
| Instagram | google/cpc | Saw you on IG, then Googled and clicked ad | Multi-touch: IG for awareness, Google for conversion |
| (blank or Other) | meta/cpc | Didn't answer or couldn't remember | Count as Meta Ads (trust technical data) |

### Monthly Reconciliation Process

**Every month, review the Raw Bookings tab:**

1. **Filter for mismatches** — Where Self-Reported Source ≠ UTM Source
2. **Count mismatches** — If >30% of bookings have mismatches, your dropdown options may need updating
3. **Identify patterns** — Are people consistently saying "Google Search" when UTMs show "google/cpc" (ads)? They might not distinguish between organic and paid Google results
4. **Reconcile for reporting** — Use this priority:
   - If UTM is available and self-reported matches → use either (high confidence)
   - If UTM is available but self-reported differs → use UTM for digital channels, self-reported for offline
   - If UTM is blank → use self-reported
   - If both are blank → mark as "Unknown"

### Attribution Report Template

Add this summary to your monthly review:

```
Month: [YYYY-MM]
Total Bookings: [X]
Attributed (both match): [X] ([%])
Attributed (UTM only): [X] ([%])
Attributed (self-report only): [X] ([%])
Unattributed: [X] ([%])
Top Mismatch Pattern: [describe]
```

---

## Section 8: Operating Procedures

### Daily (5 minutes)

- [ ] Glance at the Daily Tracker tab — any bookings today? From which source?
- [ ] If Zapier failed (missing rows), manually log from BookingLayer admin

### Weekly (15 minutes)

- [ ] Verify Zapier pipeline is running (check Zap history for errors)
- [ ] Fill in any missing "Self-Reported Source" data from BookingLayer admin
- [ ] Check GA4 Realtime report — are UTMs tracking correctly?
- [ ] Review any bookings with blank attribution and investigate

### Monthly (45 minutes)

- [ ] Run the dual attribution reconciliation (Section 7)
- [ ] Update the Monthly Dashboard tab if formulas need extending
- [ ] Calculate ROI per channel:
  - **Paid channels:** Revenue from source ÷ Ad spend on source = ROAS
  - **Organic channels:** Revenue from source ÷ Time invested = Effective hourly rate
- [ ] Screenshot the Looker Studio dashboard for team discussion
- [ ] Review the source dropdown — any "Other" responses that should become a new option?

### Quarterly (1 hour)

- [ ] Full channel review: Which sources are growing? Which are declining?
- [ ] Reallocate ad budget based on ROAS by channel
- [ ] Update UTM links if any campaigns or URLs changed
- [ ] Review and update BookingLayer dropdown options if needed
- [ ] Test the full funnel: Click a UTM link → land on site → complete a test booking → verify all tracking fired

### Key Metrics to Track Monthly

| Metric | Formula | Target |
|--------|---------|--------|
| Total Bookings | Count all bookings | Trending up |
| Total Revenue | Sum of booking amounts | Trending up |
| Bookings by Source | Count per source | Diversified (no single source >50%) |
| Website Conversion Rate | Bookings ÷ Website sessions | 1-3% (industry benchmark for travel) |
| Cost Per Acquisition (Paid) | Ad spend ÷ Bookings from ads | Track trend, lower is better |
| ROAS (Paid) | Revenue from ads ÷ Ad spend | >3x is good, >5x is great |
| Avg Booking Value | Revenue ÷ Bookings | Stable or increasing |
| Attribution Rate | Bookings with known source ÷ Total | >80% |

### What to Do When a Source Performs Well

1. **Double down** — Increase spend or effort on that channel
2. **Understand why** — Is it the content? The audience? The offer?
3. **Replicate** — Apply the same approach to similar channels

### What to Do When a Source Underperforms

1. **Check tracking first** — Make sure UTMs are correct and the Zapier pipeline isn't dropping data
2. **Give it time** — 30 days minimum before judging organic channels
3. **Experiment** — Change the creative, the message, or the offer before killing the channel
4. **Cut losses** — If a paid channel has <1x ROAS after 60+ days of optimization, reduce or pause

---

## Quick Reference: Implementation Checklist

- [ ] **Update BookingLayer dropdown** — Replace current 14 options with recommended 20 (Section 2)
- [ ] **Set up UTM Master List** — Create tagged URLs for all sources (Section 1)
- [ ] **Configure GTM tags** — Tags 1-5 as described (Section 3)
- [ ] **Mark GA4 conversions** — `purchase` and `begin_checkout` events (Section 3)
- [ ] **Create Google Sheets** — 5 tabs with formulas (Section 5)
- [ ] **Configure Zapier** — BookingLayer webhook → Google Sheets (Section 4)
- [ ] **Test the pipeline** — Run a test booking end-to-end (Section 4)
- [ ] **Build Looker Studio dashboard** — Connect Sheets + GA4 (Section 6)
- [ ] **Start using UTM links** — Update all bio links, listings, and ad URLs immediately
- [ ] **Set weekly review calendar** — 15 min/week for monitoring
