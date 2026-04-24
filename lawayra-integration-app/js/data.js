/* ============================================
   LaWayra Integration App — Mock Data
   ============================================ */

window.APP_DATA = {
  // --- Course modules: 3 Preparation + 6 Integration (Monica's series)
  course: [
    {
      id: 'prep-1',
      phase: 'Preparation',
      num: 'Prep 1',
      title: 'Setting Your Intention',
      theme: 'Why are you called to this work?',
      duration: '8 min',
      summary:
        'A clear, honest intention is the seed of a meaningful ceremony. This module guides you through a reflective practice to name what you are truly seeking — and what you are ready to release.',
      checklist: [
        'Write 3 sentences on why you are coming',
        'Record a voice memo to your future self',
        'Share your intention with one trusted person'
      ]
    },
    {
      id: 'prep-2',
      phase: 'Preparation',
      num: 'Prep 2',
      title: 'Dieta & Body Prep',
      theme: 'Arriving clean in body and spirit',
      duration: '10 min',
      summary:
        'Two weeks before your retreat, the dieta begins. No meat, salt, sugar, or alcohol. We walk through the why behind each guideline and how to make the transition feel nourishing rather than restrictive.',
      checklist: [
        'Remove alcohol from your home',
        'Plan 5 plant-forward meals',
        'Book any medical checks your doctor recommends'
      ]
    },
    {
      id: 'prep-3',
      phase: 'Preparation',
      num: 'Prep 3',
      title: 'What to Expect in Ceremony',
      theme: 'Trust the medicine, trust yourself',
      duration: '12 min',
      summary:
        'Fear is often just anticipation of the unknown. This module walks through the arc of a ceremony — the arrival, the medicine, the sounds of the maloca, the shaman\'s songs — so nothing catches you off guard.',
      checklist: [
        'Watch the ceremony walkthrough',
        'Prepare one question for your facilitator',
        'Practice 10 minutes of breath awareness'
      ]
    },
    // Integration modules (Monica's 6-week series)
    {
      id: 'int-1',
      phase: 'Integration',
      num: 'Week 1',
      title: 'Landing the Experience',
      theme: 'Making space for the experience to settle',
      duration: '15 min',
      summary:
        'The days after ceremony are tender. Before you make meaning, we make space. This week is about somatic grounding — returning to your body, your breath, your daily rhythm — so the medicine can continue its quiet work.',
      checklist: [
        'Integration vs. interpretation',
        'Somatic grounding exercise',
        'Why insights often unfold slowly',
        'Stabilizing after expanded states',
        'Daily rhythm reset (sleep, food, movement)'
      ]
    },
    {
      id: 'int-2',
      phase: 'Integration',
      num: 'Week 2',
      title: 'Finding the Thread of Meaning',
      theme: 'Honoring your truth without over-analysis',
      duration: '14 min',
      summary:
        'Symbols, visions, and sensations are a language. This week we learn to read them without forcing them into a story — to hold what came with both reverence and discernment.',
      checklist: [
        'Personal myth journaling',
        'Symbol mapping from ceremony',
        'Self-trust after mystical experiences',
        'Working with doubt and skepticism',
        'Writing your "medicine message"'
      ]
    },
    {
      id: 'int-3',
      phase: 'Integration',
      num: 'Week 3',
      title: 'Compassion for the Inner Landscape',
      theme: 'Allowing difficult emotions to flow',
      duration: '16 min',
      summary:
        'Sometimes the medicine opens what we have been holding quietly for years. This week is about meeting grief, anger, or fear not as enemies, but as messengers asking to be heard.',
      checklist: [
        'Self-compassion meditation',
        'Emotional body scan',
        'Working with grief, anger, or fear',
        'Acceptance and commitment principles',
        'Writing a letter to the part of yourself that surfaced'
      ]
    },
    {
      id: 'int-4',
      phase: 'Integration',
      num: 'Week 4',
      title: 'Aligning My Life With My Truth',
      theme: 'Applying insights to real life',
      duration: '18 min',
      summary:
        'Insight without application is just a memory. This week we take what you saw and make it livable — in your relationships, your work, your boundaries, your days.',
      checklist: [
        'Core values mapping',
        'Boundary reflection and role play',
        'Recognizing unhealthy patterns',
        'Relationship reflection journaling',
        'Integrating spiritual insight into ordinary life'
      ]
    },
    {
      id: 'int-5',
      phase: 'Integration',
      num: 'Week 5',
      title: 'Embodiment Rituals to Sustain Change',
      theme: 'Integrating change without isolating yourself',
      duration: '14 min',
      summary:
        'Change is a practice, not an event. This week we design rituals small enough to actually do — daily, weekly, seasonally — so your integration becomes part of how you live.',
      checklist: [
        'Designing a daily integration ritual',
        'Habit stacking and behavioral change',
        'Identity mapping exercise',
        'Community mapping',
        'Vision journaling: "The life that feels aligned"'
      ]
    },
    {
      id: 'int-6',
      phase: 'Integration',
      num: 'Week 6',
      title: 'Living the Transformation',
      theme: 'Turning insight into lived practice',
      duration: '17 min',
      summary:
        'A 3–6 month integration plan, a personal manifesto, and a gratitude ritual to close the arc. You will leave this week with a clear commitment to yourself and a community to walk it with.',
      checklist: [
        'Personal integration plan (3–6 months)',
        'Gratitude and dedication ritual',
        'Long-term spiritual practice',
        'Closing reflection and manifesto',
        'Continuing the journey forward'
      ]
    }
  ],

  // --- Predefined habits
  defaultHabits: [
    { id: 'h-meditate', name: 'Meditate 10 min', icon: '🧘', custom: false },
    { id: 'h-journal', name: 'Journal', icon: '📓', custom: false },
    { id: 'h-breathwork', name: 'Breathwork', icon: '💨', custom: false },
    { id: 'h-hydrate', name: 'Drink 2L water', icon: '💧', custom: false },
    { id: 'h-movement', name: 'Movement / walk', icon: '🚶', custom: false }
  ],

  // --- Daily prompts (4 categories, rotate)
  prompts: [
    { type: 'mindfulness', text: 'Take three conscious breaths before your next task. Notice the gap between them.' },
    { type: 'quote', text: '"The wound is the place where the Light enters you." — Rumi' },
    { type: 'gratitude', text: 'Name one person, one place, and one small thing you are grateful for today.' },
    { type: 'challenge', text: 'Today, say no to one thing that drains you — without explaining why.' },
    { type: 'mindfulness', text: 'Eat one meal today without your phone. Taste each bite.' },
    { type: 'quote', text: '"You cannot heal in the same environment that made you sick."' },
    { type: 'gratitude', text: 'Write a short message of thanks to someone from your ceremony group.' },
    { type: 'challenge', text: 'Do one thing today that your future self will thank you for.' },
    { type: 'mindfulness', text: 'Walk for 10 minutes without any destination. Let the path choose itself.' },
    { type: 'quote', text: '"Integration is not what happens after — it is the whole thing." — Monica' }
  ],

  // --- Events / Community calendar (next ~14 days, relative offsets)
  events: [
    { id: 'ev-1', title: 'Sunday Community Call', host: 'Marcus + community', type: 'Community', dayOffset: 0, time: '2:00 PM COT', duration: '60 min',
      description: 'Our weekly open circle. Share where you are in your journey, hear from others, breakout rooms for deeper connection. All are welcome — alumni and friends.',
      link: 'https://zoom.us/j/lawayra-community' },
    { id: 'ev-1b', title: 'Live Yoga at LaWayra', host: 'Kevin', type: 'Ceremony', dayOffset: 0, time: '4:00 PM COT', duration: '45 min',
      description: 'Livestreamed yoga from the maloca. Sunset flow, gentle and grounding.',
      link: 'https://zoom.us/j/lawayra-yoga' },
    { id: 'ev-2', title: 'Morning Meditation', host: 'Monica Kronstain', type: 'Community', dayOffset: 1, time: '7:00 AM COT', duration: '25 min',
      description: 'A short grounding meditation to start your week. Open to all — turn your camera on or off.',
      link: 'https://zoom.us/j/morning-med' },
    { id: 'ev-2b', title: 'Integration Series — Week 2', host: 'Monica Kronstain', type: 'Integration', dayOffset: 2, time: '2:30 PM COT', duration: '90 min',
      description: 'Week 2: Finding the Thread of Meaning. Live facilitation + breakout practice.',
      link: 'https://zoom.us/j/monica-integration' },
    { id: 'ev-2c', title: 'Book Club — Radical Acceptance', host: 'Aliyah Pettitt', type: 'Community', dayOffset: 2, time: '6:00 PM COT', duration: '60 min',
      description: 'Chapters 3–5 this week. BYO book, BYO tea. Discussion in small groups.',
      link: 'https://zoom.us/j/book-club' },
    { id: 'ev-3', title: 'Somatic Workshop with Dan', host: 'Dan', type: 'Workshop', dayOffset: 4, time: '10:00 AM COT', duration: '75 min',
      description: 'Trauma-informed somatic meditation. Gentle movement, nervous system regulation, and a guided body scan. No experience required.',
      link: 'https://zoom.us/j/dan-somatic' },
    { id: 'ev-3b', title: 'Journaling Circle', host: 'Juliana Herrera', type: 'Community', dayOffset: 4, time: '7:30 PM COT', duration: '45 min',
      description: 'Guided prompts from the integration workbook. Silent writing with a shared closing.',
      link: 'https://zoom.us/j/journal' },
    { id: 'ev-4', title: 'Cacao Ceremony (Live)', host: 'Kevin + LaWayra team', type: 'Ceremony', dayOffset: 6, time: '8:00 AM COT', duration: '45 min',
      description: 'Livestreamed from the maloca. Brew your own cacao, join us in heart-opening meditation and song.',
      link: 'https://zoom.us/j/lawayra-cacao', premium: true },
    { id: 'ev-4b', title: 'Breathwork — Coherent Breathing', host: 'Dan', type: 'Workshop', dayOffset: 6, time: '6:00 PM COT', duration: '45 min',
      description: '5-5 breath rhythm for nervous system regulation. Gentle, grounding, bring a blanket.',
      link: 'https://zoom.us/j/breath' },
    { id: 'ev-5x', title: 'Sunday Community Call', host: 'Marcus + community', type: 'Community', dayOffset: 7, time: '2:00 PM COT', duration: '60 min',
      description: 'Weekly open circle. Same format as always — share, listen, connect.',
      link: 'https://zoom.us/j/lawayra-community' },
    { id: 'ev-5y', title: 'New Moon Ceremony', host: 'Monica Kronstain', type: 'Ceremony', dayOffset: 8, time: '7:00 PM COT', duration: '60 min',
      description: 'Setting intentions for the lunar cycle. Candles, cacao, and a shared song.',
      link: 'https://zoom.us/j/new-moon' },
    { id: 'ev-5', title: 'Taita AMA — Ask the Shaman', host: 'Taita + Sam', type: 'Premium', dayOffset: 9, time: '4:00 PM COT', duration: '60 min',
      description: 'Premium members only. Translated live Q&A with Taita. Ask questions about the medicine, the tradition, and your own experience.',
      link: 'https://zoom.us/j/taita-ama', premium: true },
    { id: 'ev-5z', title: 'Integration Series — Week 3', host: 'Monica Kronstain', type: 'Integration', dayOffset: 9, time: '2:30 PM COT', duration: '90 min',
      description: 'Week 3: Compassion for the Inner Landscape. Emotional body scan + small group share.',
      link: 'https://zoom.us/j/monica-integration' },
    { id: 'ev-denver', title: 'Denver Meetup', host: 'Aliyah Pettitt', type: 'Community', dayOffset: 10, time: '7:00 PM MDT', duration: '2 hrs',
      description: 'In-person gathering for Denver-based community members. Food, fire, and a shared circle. Address sent upon RSVP.',
      link: 'https://lawayra.com/denver' },
    { id: 'ev-yoga2', title: 'Restorative Yoga', host: 'Kevin', type: 'Workshop', dayOffset: 11, time: '10:00 AM COT', duration: '60 min',
      description: 'Long-held postures with bolsters and blankets. Deeply parasympathetic. Great for processing.',
      link: 'https://zoom.us/j/yoga-rest' },
    { id: 'ev-dubai', title: 'Dubai Meetup', host: 'Aliyah + friends', type: 'Community', dayOffset: 12, time: '6:00 PM GST', duration: '2 hrs',
      description: 'First Dubai gathering. Tea and stories at a cafe in JLT. Open to alumni and friends.',
      link: 'https://lawayra.com/dubai' },
    { id: 'ev-6', title: 'Monthly AMA with Sam', host: 'Sam (Founder)', type: 'Premium', dayOffset: 13, time: '3:00 PM COT', duration: '60 min',
      description: 'Premium members only. Sam opens the floor — retreat questions, integration, the path, whatever is alive for you.',
      link: 'https://zoom.us/j/sam-ama', premium: true },
    { id: 'ev-dan2', title: 'Somatic Trauma Release', host: 'Dan', type: 'Workshop', dayOffset: 13, time: '11:00 AM COT', duration: '90 min',
      description: 'Deeper dive into nervous system release work. Intended for those who have already attended Dan\'s intro.',
      link: 'https://zoom.us/j/dan-somatic-2' }
  ],

  // --- Resource category meta (icon, color accent, action verb)
  resourceMeta: {
    'Meditations':           { emoji: '🧘',  color: '#8d6b94', action: 'play',   actionIcon: '▶', verb: 'Play' },
    'Cacao Ceremonies':      { emoji: '🍫',  color: '#8b4513', action: 'play',   actionIcon: '▶', verb: 'Play' },
    'Yoga':                  { emoji: '🕉️', color: '#d98a4f', action: 'play',   actionIcon: '▶', verb: 'Start' },
    'Breathwork':            { emoji: '💨',  color: '#5c8fb3', action: 'play',   actionIcon: '▶', verb: 'Begin' },
    'Workshops':             { emoji: '🎥',  color: '#b34100', action: 'play',   actionIcon: '▶', verb: 'Watch' },
    'Book List':             { emoji: '📖',  color: '#623e2a', action: 'read',   actionIcon: '📖', verb: 'Read' },
    'Tool Templates':        { emoji: '🧭',  color: '#e4a017', action: 'open',   actionIcon: '✦', verb: 'Open' },
    'Past Event Recordings': { emoji: '📼',  color: '#3f4021', action: 'play',   actionIcon: '▶', verb: 'Replay' },
    '1:1 Coaching':          { emoji: '💬',  color: '#aeac92', action: 'book',   actionIcon: '→', verb: 'Book' }
  },

  // --- Resource library
  resources: {
    Meditations: [
      { title: 'Grounding After Ceremony', length: '12 min', desc: 'A body scan to help you land back into daily life.' },
      { title: 'Heart Opening', length: '18 min', desc: 'Gentle practice for working with grief and tenderness.' },
      { title: 'Sleep Integration', length: '22 min', desc: 'Wind-down practice for the nights after a ceremony.' },
      { title: 'Loving-Kindness (Metta)', length: '15 min', desc: 'Cultivate compassion for yourself and others — essential post-ceremony work.' },
      { title: 'Inner Child Dialogue', length: '28 min', desc: 'Guided journey to meet a younger part of yourself with tenderness.' },
      { title: 'Morning Presence', length: '8 min', desc: 'A short start-of-day practice — arrive in your body before the noise starts.' },
      { title: 'Forgiveness Practice', length: '20 min', desc: 'Working with resentment and release. Go slow with this one.' },
      { title: 'Ancestral Connection', length: '35 min', desc: 'A lineage meditation — feel the strength and love of those who came before.' },
      { title: 'Cord Cutting', length: '14 min', desc: 'Energetic closure for relationships that no longer serve you.' },
      { title: 'Walking Meditation', length: '20 min', desc: 'Bring presence into movement. Can be done anywhere.' }
    ],
    'Cacao Ceremonies': [
      { title: 'Solo Cacao Ritual Guide', length: 'Read 6 min', desc: 'How to hold your own cacao ceremony at home — step by step.' },
      { title: 'Group Cacao Recording', length: '45 min', desc: 'Replay of our last community cacao circle.' },
      { title: 'Ceremonial Cacao Sources', length: 'Read 4 min', desc: 'Where we source our cacao, and vetted brands we recommend.' },
      { title: 'Cacao & Grief', length: '38 min', desc: 'A recorded ceremony focused on holding grief with the medicine.' },
      { title: 'Morning Cacao Ritual', length: '15 min', desc: 'A shorter daily ritual — not a full ceremony, more of a sacred pause.' },
      { title: 'Full Moon Cacao Ceremony', length: '52 min', desc: 'Replay: Kevin + Monica\'s last full moon livestream.' }
    ],
    Yoga: [
      { title: 'Morning Flow for Integration', length: '25 min', desc: 'Gentle sequence to move stuck energy.' },
      { title: 'Restorative Evening Practice', length: '30 min', desc: 'Slow, nervous-system-calming postures.' },
      { title: 'Yin Yoga for Release', length: '45 min', desc: 'Long holds, deep connective tissue work. Excellent for emotional processing.' },
      { title: 'Heart Opening Flow', length: '35 min', desc: 'Backbends and hip openers — vulnerable and powerful.' },
      { title: 'Chair Yoga (Accessible)', length: '20 min', desc: 'For bodies that need a gentler entry point. No floor required.' },
      { title: 'Kundalini Kriya for Clarity', length: '22 min', desc: 'Breath + movement sequence from Dan. Energizing and clarifying.' },
      { title: '5-Minute Desk Reset', length: '5 min', desc: 'A mini-sequence you can do between meetings.' }
    ],
    Breathwork: [
      { title: 'Coherent Breathing Intro', length: '10 min', desc: 'Simple 5–5 breath rhythm for regulation.' },
      { title: 'Holotropic Practice (Advanced)', length: '35 min', desc: 'Deep breathwork — only with a friend nearby.' },
      { title: 'Box Breathing for Anxiety', length: '8 min', desc: '4-4-4-4 rhythm used by Navy SEALs. Calms the nervous system quickly.' },
      { title: 'Wim Hof Method', length: '18 min', desc: 'Three rounds of 30-breath cycles with retention. Energizing.' },
      { title: '4-7-8 for Sleep', length: '7 min', desc: 'A simple evening technique to drop you into rest.' },
      { title: 'Nadi Shodhana (Alternate Nostril)', length: '12 min', desc: 'Balancing breath for clarity and calm.' },
      { title: 'Emotional Release Breathwork', length: '42 min', desc: 'Circular breathing session — best with a journal nearby after.' }
    ],
    Workshops: [
      { title: 'Somatic Trauma Release', length: '60 min', desc: 'Replay of Dan\'s introductory workshop.' },
      { title: 'Writing Your Medicine Message', length: '50 min', desc: 'Journaling workshop with Samuel Araya.' },
      { title: 'Integrating Difficult Experiences', length: '75 min', desc: 'Monica on working with ceremony content that didn\'t feel good.' },
      { title: 'Boundaries After the Medicine', length: '55 min', desc: 'How to hold new truths in old relationships.' },
      { title: 'Shadow Work Basics', length: '65 min', desc: 'A gentle intro to IFS / parts work for integration.' },
      { title: 'Relational Healing Panel', length: '90 min', desc: 'Three alumni share how integration reshaped their relationships.' },
      { title: 'Q&A: First-Time Retreat Concerns', length: '48 min', desc: 'Sam and Sarah field common questions from first-timers.' }
    ],
    'Book List': [
      { title: 'When the Body Says No', length: 'Book · Gabor Maté', desc: 'Stress, emotion, the body. Essential reading for integration.' },
      { title: 'The Way of the Shaman', length: 'Book · Michael Harner', desc: 'A classic introduction to cross-cultural shamanic practice.' },
      { title: 'Radical Acceptance', length: 'Book · Tara Brach', desc: 'Self-compassion foundation. A gentle but transformative read.' },
      { title: 'The Myth of Normal', length: 'Book · Gabor Maté', desc: 'Trauma, illness, and healing in a toxic culture.' },
      { title: 'No Bad Parts', length: 'Book · Richard Schwartz', desc: 'Founder of IFS. The most useful framework we\'ve found for integration.' },
      { title: 'Food of the Gods', length: 'Book · Terence McKenna', desc: 'The botanical and cultural history of entheogenic plants.' },
      { title: 'Sacred Knowledge', length: 'Book · William Richards', desc: 'Decades of research on psychedelic therapy. Reverent and careful.' },
      { title: 'The Body Keeps the Score', length: 'Book · Bessel van der Kolk', desc: 'How trauma lives in the body. The most-cited trauma book of our time.' },
      { title: 'How to Change Your Mind', length: 'Book · Michael Pollan', desc: 'A journalistic and personal exploration of psychedelic renaissance.' }
    ],
    'Tool Templates': [
      { title: 'Wheel of Life', length: 'Interactive', desc: 'Rate 8 areas of your life on a 10-point scale.', tool: 'wheel' },
      { title: 'SMART Goals', length: 'Template', desc: 'Turn a vision into a concrete next step you can actually take this week.' },
      { title: 'Values Audit', length: 'Template', desc: 'Clarify what matters most to you, right now — and what\'s been running on autopilot.' },
      { title: 'Integration Plan (3-month)', length: 'Worksheet', desc: 'A Monica-designed template for mapping your post-retreat commitments.' },
      { title: 'Morning Pages Template', length: 'Daily', desc: 'Julia Cameron\'s 3 longhand pages. The simplest, most powerful journaling practice.' },
      { title: 'Resistance Map', length: 'Worksheet', desc: 'Identify where you\'re avoiding — and what the avoidance is protecting.' },
      { title: 'Boundary Script Builder', length: 'Worksheet', desc: 'Fill-in-the-blank prompts to draft a boundary conversation.' },
      { title: 'Gratitude + Grief Log', length: 'Daily', desc: 'Two prompts a day. Holds the full range of the post-ceremony experience.' }
    ],
    'Past Event Recordings': [
      { title: 'Sunday Call — April 2026', length: '58 min', desc: 'Community reflection on fear and trust.' },
      { title: 'Monica — Integration Q&A', length: '42 min', desc: 'Highlights from last cohort\'s closing call.' },
      { title: 'Taita Teaching — Session 1', length: '38 min', desc: 'On humility, patience, and the plant\'s timing (translated).' },
      { title: 'Sam\'s Founder AMA — March', length: '66 min', desc: 'Q&A covering everything from dieta to cost to post-retreat support.' },
      { title: 'Dan — Somatic Workshop', length: '72 min', desc: 'The full introductory session. Great if you missed it live.' },
      { title: 'Full Moon Ceremony — March', length: '48 min', desc: 'Replay of the March full moon virtual circle.' },
      { title: 'Panel: Coming Home from Ceremony', length: '85 min', desc: 'Three alumni on reentry — the good, the hard, the surprising.' },
      { title: 'Kevin — Breathwork Intro', length: '40 min', desc: 'Walkthrough of the 5-5 practice plus a guided session.' }
    ],
    '1:1 Coaching': [
      { title: 'Coaching with Monica', length: '60 min / session', desc: 'Private integration support from our lead facilitator. Sliding scale available.' },
      { title: 'Coaching with Dan', length: '50 min / session', desc: 'Somatic + trauma-informed support. Good fit if you\'re working with intense material.' },
      { title: 'Book a Discovery Call', length: '20 min · free', desc: 'Decide together if 1:1 is right for you. No pressure, no pitch.' },
      { title: 'Emergency Integration Support', length: '30 min · on-demand', desc: 'For urgent moments — destabilization, re-emergence, or crisis.' }
    ]
  },

  // --- Premium tier benefits
  premium: {
    price: '$19 / month',
    trial: '14-day free trial',
    benefits: [
      { icon: '🌿', title: 'Taita AMAs', desc: 'Monthly live Q&A with the shaman — translated in real time.' },
      { icon: '🔥', title: 'Virtual Cleanse', desc: 'Seasonal 7-day guided cleanse, held in community.' },
      { icon: '🗣️', title: 'Taita Talks', desc: 'Archived teachings from the lineage — audio + transcripts.' },
      { icon: '✨', title: "Sam's Monthly AMA", desc: 'Hour-long open Q&A with our founder.' },
      { icon: '🌅', title: 'Early Retreat Access', desc: 'First to book new retreat dates and special pricing.' },
      { icon: '🧘', title: 'Full Resource Library', desc: 'Unlock all meditations, workshops, and tool templates.' }
    ],
    autoNote: 'Retreat guests receive Premium free for 6 months after their stay.'
  },

  // --- Cohorts (retreat groups, like Circle spaces)
  cohorts: [
    { id: 'mar-2026', name: 'March Cohort 2026', emoji: '🗓️', members: 18, dates: 'Mar 15 – Mar 22, 2026' },
    { id: 'apr-2026', name: 'April Cohort 2026', emoji: '🗓️', members: 22, dates: 'Apr 12 – Apr 19, 2026' },
    { id: 'may-2026', name: 'May Cohort 2026', emoji: '🗓️', members: 15, dates: 'May 10 – May 17, 2026' }
  ],

  // --- Community feed posts
  posts: [
    {
      id: 'post-1',
      author: 'Monica Kronstain',
      avatar: '👩🏻',
      badges: ['LaWayra Team'],
      space: 'Integration Resources',
      timeAgo: '1d',
      pinned: true,
      title: 'Integration Series May 2026',
      body: 'I hope you\'re all doing well! I want to warmly invite you into a 6-week integration series we\'re offering next month!\n\nAt LaWayra, integration and community are at the heart of the work, because what happens after ceremony is just as important as the ceremony itself.',
      likes: 4,
      likedByMe: false,
      comments: 0
    },
    {
      id: 'post-2',
      author: 'La Wayra Team',
      avatar: 'LT',
      avatarInitials: true,
      badges: ['Admin', 'LaWayra Team'],
      space: 'Events',
      timeAgo: '2d',
      pinned: false,
      title: '',
      body: 'Join us live from LaWayra for a heart-opening cacao ceremony rooted in intention, connection, and presence. This is a space to slow down, turn inward, and share in a ritual that has been used for generations to support clarity, emotional openness, and deeper connection.\n\nTogether, we\'ll sit in ceremony, set intentions, and connect as a community — no matter where you are in the world.',
      likes: 12,
      likedByMe: true,
      comments: 3
    },
    {
      id: 'post-3',
      author: 'Aliyah Pettitt',
      avatar: '👩🏽',
      badges: [],
      space: 'Integration Resources',
      timeAgo: '3d',
      pinned: false,
      title: 'Lately, I\'ve been questioning where my energy really goes...',
      body: 'Coming back from ceremony I\'ve been paying attention to where my energy actually leaves me during the week. It\'s not the big things — it\'s the small "yes-es" I\'ve been giving out of habit. Anyone else noticing this shift?',
      likes: 8,
      likedByMe: false,
      comments: 5
    },
    {
      id: 'post-4',
      author: 'Juliana Herrera',
      avatar: '👩🏻',
      badges: ['Community Team'],
      space: 'May Cohort 2026',
      timeAgo: '4d',
      pinned: false,
      title: 'Welcome May Cohort 2026',
      body: 'So excited to meet all of you. We\'ve just added your cohort space — please introduce yourself here and share one intention you\'re bringing to this work. No pressure to be polished. We just want to know who you are.',
      likes: 15,
      likedByMe: false,
      comments: 11
    }
  ],

  // --- Course stats for social proof (from real Circle data)
  courseStats: {
    'prep': { students: 695, completion: 64 },
    'integration': { students: 142, completion: 48 }
  },

  // --- Garden stages (points thresholds)
  gardenStages: [
    { stage: 0, name: 'Seed',          threshold: 0,   emoji: '🌰', caption: 'A seed in the soil. Unseen, but alive.' },
    { stage: 1, name: 'Sprout',        threshold: 20,  emoji: '🌱', caption: 'First leaves. The direction is chosen.' },
    { stage: 2, name: 'Young Plant',   threshold: 60,  emoji: '🌿', caption: 'Roots deepen. You are becoming steady.' },
    { stage: 3, name: 'Flowering',     threshold: 120, emoji: '🌸', caption: 'Bloom. What you tended is visible.' },
    { stage: 4, name: 'Butterflies',   threshold: 200, emoji: '🦋', caption: 'The garden attracts life. Others arrive.' },
    { stage: 5, name: 'Sacred Grove',  threshold: 320, emoji: '🌳', caption: 'A living sanctuary. Rooted, open, home.' }
  ]
};
