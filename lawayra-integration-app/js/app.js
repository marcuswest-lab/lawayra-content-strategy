/* ============================================
   LaWayra Integration App — Main controller
   ============================================ */

(function () {
  const STORAGE_KEY = 'lw-integration-app-v1';
  const DATA = window.APP_DATA;

  // ---------- State ----------
  const defaultState = () => ({
    onboarded: false,
    user: { name: '', role: '', cohort: '', isPremium: false },
    points: 0,
    habits: DATA.defaultHabits.map(h => ({ ...h, checkins: [] })),
    courseCompleted: [],      // module ids
    moduleChecks: {},         // { moduleId: [checklistIndexes] }
    promptIndex: 0,
    promptDateKey: '',
    rsvp: [],                 // event ids user said "Going" to
    likedPosts: []             // post ids the user liked
  });

  let state = loadState();

  function loadState() {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (!raw) return defaultState();
      const parsed = JSON.parse(raw);
      return { ...defaultState(), ...parsed };
    } catch {
      return defaultState();
    }
  }

  function saveState() {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
    } catch {}
  }

  function resetState() {
    localStorage.removeItem(STORAGE_KEY);
    state = defaultState();
    renderAll();
    showOnboard();
  }

  // ---------- Points / feedback ----------
  function awardPoints(n, label) {
    state.points += n;
    saveState();
    showToast(`+${n} pts${label ? ' · ' + label : ''}`);
    renderHome();
  }

  function showToast(msg) {
    const t = document.getElementById('pointsToast');
    if (!t) return;
    t.textContent = msg;
    t.classList.add('show');
    clearTimeout(showToast._t);
    showToast._t = setTimeout(() => t.classList.remove('show'), 1600);
  }

  // ---------- Onboarding ----------
  function showOnboard() {
    document.getElementById('onboard').classList.remove('hidden');
  }
  function hideOnboard() {
    document.getElementById('onboard').classList.add('hidden');
    state.onboarded = true;
    saveState();
  }

  function initOnboard() {
    const slides = document.querySelectorAll('.onboard__slide');
    const dots = document.querySelectorAll('.onboard__dot');
    const backBtn = document.getElementById('onboardBack');
    let idx = 0;

    function goTo(i) {
      idx = Math.max(0, Math.min(slides.length - 1, i));
      slides.forEach((s, n) => s.classList.toggle('active', n === idx));
      dots.forEach((d, n) => d.classList.toggle('active', n === idx));
      if (backBtn) backBtn.style.visibility = idx === 0 ? 'hidden' : 'visible';
    }

    // Tap anywhere on a slide (except interactive controls) advances to next
    document.getElementById('onboardSlides').addEventListener('click', (e) => {
      if (e.target.closest('.onboard__role')) return;
      if (idx < slides.length - 1) goTo(idx + 1);
    });

    // Dots are clickable — jump to any slide
    dots.forEach((d, n) => {
      d.style.cursor = 'pointer';
      d.addEventListener('click', (e) => {
        e.stopPropagation();
        goTo(n);
      });
    });

    // Back button
    if (backBtn) {
      backBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        if (idx > 0) goTo(idx - 1);
      });
    }

    // Role selection (slide 2)
    document.querySelectorAll('#onboardRoles .onboard__role').forEach(btn => {
      btn.addEventListener('click', () => {
        document.querySelectorAll('#onboardRoles .onboard__role').forEach(b => b.classList.remove('selected'));
        btn.classList.add('selected');
        state.user.role = btn.dataset.role;
        // Retreat guests get auto-premium
        if (btn.dataset.role === 'joining' || btn.dataset.role === 'post') {
          state.user.isPremium = true;
        }
        saveState();
        // If joining, advance to cohort picker; otherwise finish
        if (btn.dataset.role === 'joining') {
          setTimeout(() => goTo(3), 300);
        } else {
          setTimeout(hideOnboard, 400);
        }
      });
    });

    // Cohort selection (slide 3)
    document.querySelectorAll('#onboardCohorts .onboard__role').forEach(btn => {
      btn.addEventListener('click', () => {
        document.querySelectorAll('#onboardCohorts .onboard__role').forEach(b => b.classList.remove('selected'));
        btn.classList.add('selected');
        state.user.cohort = btn.dataset.cohort;
        saveState();
        setTimeout(hideOnboard, 400);
      });
    });

    document.getElementById('onboardSkip').addEventListener('click', hideOnboard);

    if (state.onboarded) hideOnboard();
  }

  // ---------- Tab navigation ----------
  function initTabs() {
    document.querySelectorAll('.tab').forEach(tab => {
      tab.addEventListener('click', () => {
        const name = tab.dataset.tab;
        showScreen(name);
      });
    });
  }

  function showScreen(name) {
    document.querySelectorAll('.screen').forEach(s => {
      s.classList.toggle('active', s.dataset.screen === name);
    });
    document.querySelectorAll('.tab').forEach(t => {
      t.classList.toggle('active', t.dataset.tab === name);
    });
    if (name === 'events') renderEvents();
    if (name === 'feed') renderFeed();
    if (name === 'me') renderHome();
  }

  // ---------- Home ----------
  function greetingWord() {
    const h = new Date().getHours();
    if (h < 5) return 'Late night';
    if (h < 12) return 'Good morning';
    if (h < 18) return 'Good afternoon';
    return 'Good evening';
  }

  function roleCopy() {
    const r = state.user.role;
    if (r === 'joining') return 'Preparing for ceremony';
    if (r === 'post') return 'Integrating your experience';
    if (r === 'exploring') return 'Walking the path';
    return 'Welcome back';
  }

  function formatDate(d = new Date()) {
    return d.toLocaleDateString(undefined, { weekday: 'long', month: 'long', day: 'numeric' });
  }

  function rotateDailyPrompt() {
    const today = Habits.todayKey();
    if (state.promptDateKey !== today) {
      state.promptIndex = (state.promptIndex + 1) % DATA.prompts.length;
      state.promptDateKey = today;
      saveState();
    }
    return DATA.prompts[state.promptIndex];
  }

  function renderHome() {
    document.getElementById('greetingName').textContent = `${greetingWord()}.`;
    const greetDate = document.getElementById('greetingDate');
    if (greetDate) greetDate.textContent = `${roleCopy()} · ${formatDate()}`;

    document.getElementById('homePoints').textContent = state.points;
    document.getElementById('homeStreak').innerHTML = `${Habits.calcStreak(state.habits)} <small>days</small>`;

    // Cohort badge
    renderCohortBadge();

    // Garden
    Garden.render(state.points);

    // Daily prompt
    const p = rotateDailyPrompt();
    document.getElementById('promptType').textContent = p.type;
    document.getElementById('promptText').textContent = p.text;

    // Habit tiles + full habit list on Me tab
    Habits.renderHomeTiles(state.habits, onHabitToggle);
    Habits.renderHabitList(state.habits, onHabitToggle);

    // Premium strip
    const strip = document.getElementById('premiumStrip');
    if (strip) strip.style.display = state.user.isPremium ? 'none' : '';

    // Upcoming event
    renderUpcoming();
  }

  function renderCohortBadge() {
    const wrap = document.getElementById('cohortBadge');
    if (!wrap) return;
    const cohortId = state.user.cohort;
    if (!cohortId || cohortId === 'undecided') {
      wrap.innerHTML = '';
      return;
    }
    const cohort = DATA.cohorts.find(c => c.id === cohortId);
    if (!cohort) { wrap.innerHTML = ''; return; }
    wrap.innerHTML = `
      <div class="cohort-badge">
        <div class="cohort-badge__icon">${cohort.emoji}</div>
        <div class="cohort-badge__info">
          <div class="cohort-badge__label">Your Cohort</div>
          <div class="cohort-badge__name">${cohort.name}</div>
          <div class="cohort-badge__dates">${cohort.dates} · ${cohort.members} members</div>
        </div>
      </div>
    `;
  }

  // ---------- Feed (community) ----------
  function renderFeed() {
    const wrap = document.getElementById('feedPosts');
    if (!wrap) return;
    // Pinned posts first, then reverse chronological
    const posts = [...DATA.posts].sort((a, b) => (b.pinned ? 1 : 0) - (a.pinned ? 1 : 0));
    wrap.innerHTML = posts.map(p => postHtml(p)).join('');
    wrap.querySelectorAll('.post__like').forEach(btn => {
      btn.addEventListener('click', (e) => {
        e.stopPropagation();
        togglePostLike(btn.dataset.id);
      });
    });
    wrap.querySelectorAll('.post').forEach(card => {
      card.addEventListener('click', () => {
        const id = card.dataset.id;
        const p = DATA.posts.find(x => x.id === id);
        if (p) openPostDetail(p);
      });
    });
  }

  function postHtml(p) {
    const liked = state.likedPosts.includes(p.id) || p.likedByMe;
    const extraLikes = (state.likedPosts.includes(p.id) && !p.likedByMe) ? 1 : 0;
    const totalLikes = p.likes + extraLikes;
    const avatar = p.avatarInitials
      ? `<div class="post__avatar">${p.avatar}</div>`
      : `<div class="post__avatar" style="background:var(--beige);font-size:1.2rem;">${p.avatar}</div>`;
    const badges = p.badges.map(b => {
      const cls = b === 'Admin' ? 'badge--admin' : (b === 'Community Team' ? 'badge--community' : 'badge--team');
      return `<span class="badge ${cls}">${b}</span>`;
    }).join('');
    return `
      <article class="post ${p.pinned ? 'pinned' : ''}" data-id="${p.id}">
        ${p.pinned ? '<div class="post__pin">📌 Pinned</div>' : ''}
        <div class="post__head">
          ${avatar}
          <div class="post__author">
            <div class="post__name">${p.author} ${badges}</div>
            <div class="post__meta">Posted in <span class="post__space">${p.space}</span> · ${p.timeAgo}</div>
          </div>
        </div>
        ${p.title ? `<div class="post__title">${p.title}</div>` : ''}
        <div class="post__body">${p.body}</div>
        <div class="post__more">See more →</div>
        <div class="post__actions">
          <div class="post__action-group">
            <button class="post__action post__like ${liked ? 'liked' : ''}" data-id="${p.id}">
              <span class="post__action__icon">${liked ? '❤️' : '🤍'}</span>
            </button>
            <span class="post__action">
              <span class="post__action__icon">💬</span>
            </span>
          </div>
          <span class="post__counts">${totalLikes} likes · ${p.comments} comments</span>
        </div>
      </article>
    `;
  }

  function togglePostLike(postId) {
    const i = state.likedPosts.indexOf(postId);
    if (i === -1) {
      state.likedPosts.push(postId);
      awardPoints(1, 'engagement');
    } else {
      state.likedPosts.splice(i, 1);
    }
    saveState();
    renderFeed();
  }

  function openPostDetail(p) {
    const liked = state.likedPosts.includes(p.id) || p.likedByMe;
    openModal(`
      <div style="display:flex;gap:10px;align-items:flex-start;margin-bottom:10px;">
        ${p.avatarInitials
          ? `<div class="post__avatar">${p.avatar}</div>`
          : `<div class="post__avatar" style="background:var(--beige);font-size:1.2rem;">${p.avatar}</div>`}
        <div style="flex:1;">
          <div style="font-weight:600;color:var(--charcoal);font-size:0.95rem;">${p.author}</div>
          <div style="font-size:0.75rem;color:var(--sage);">Posted in ${p.space} · ${p.timeAgo}</div>
        </div>
      </div>
      ${p.title ? `<h2 style="color:var(--charcoal);font-weight:600;font-size:1.2rem;margin-bottom:12px;">${p.title}</h2>` : ''}
      <div style="font-size:0.92rem;color:var(--brown);line-height:1.65;white-space:pre-line;margin-bottom:16px;">${p.body}</div>
      <div style="display:flex;gap:10px;padding-top:12px;border-top:1px solid var(--beige);">
        <button class="btn ${liked ? 'btn--olive' : 'btn--amber'} btn--sm" id="postLikeBtn">${liked ? '❤️ Liked' : '🤍 Like'}</button>
        <button class="btn btn--ghost btn--sm" id="postCommentBtn">💬 Comment</button>
      </div>
    `);
    document.getElementById('postLikeBtn').addEventListener('click', () => {
      togglePostLike(p.id);
      closeModal();
    });
    document.getElementById('postCommentBtn').addEventListener('click', () => {
      showToast('Comments coming in v2');
    });
  }

  function openComposerModal() {
    openModal(`
      <h2 style="color:var(--olive);font-weight:400;margin-bottom:14px;">New Post</h2>
      <select id="composerSpace" style="width:100%;padding:12px 14px;border-radius:10px;border:1.5px solid var(--beige);font-family:inherit;font-size:0.9rem;margin-bottom:10px;background:var(--white);color:var(--charcoal);">
        <option>General Information</option>
        <option>Integration Resources</option>
        <option>Ayahuasca Preparation</option>
        <option>March Cohort 2026</option>
        <option>April Cohort 2026</option>
        <option>May Cohort 2026</option>
        <option>Events</option>
      </select>
      <input type="text" id="composerTitle" placeholder="Title (optional)"
        style="width:100%;padding:12px 14px;border-radius:10px;border:1.5px solid var(--beige);font-family:inherit;font-size:0.95rem;margin-bottom:10px;background:var(--white);color:var(--charcoal);" />
      <textarea id="composerBody" placeholder="Share something with the community…" rows="6"
        style="width:100%;padding:12px 14px;border-radius:10px;border:1.5px solid var(--beige);font-family:inherit;font-size:0.9rem;margin-bottom:16px;background:var(--white);color:var(--charcoal);resize:none;"></textarea>
      <button class="btn btn--amber btn--full" id="composerPublishBtn">Post · +5 pts</button>
    `);
    document.getElementById('composerPublishBtn').addEventListener('click', () => {
      const body = document.getElementById('composerBody').value.trim();
      if (!body) return;
      const title = document.getElementById('composerTitle').value.trim();
      const space = document.getElementById('composerSpace').value;
      DATA.posts.unshift({
        id: 'post-' + Date.now(),
        author: 'You',
        avatar: 'YO',
        avatarInitials: true,
        badges: [],
        space,
        timeAgo: 'just now',
        pinned: false,
        title,
        body,
        likes: 0,
        likedByMe: false,
        comments: 0
      });
      awardPoints(5, 'new post');
      closeModal();
      renderFeed();
    });
  }

  function openGoLiveModal() {
    openModal(`
      <h2 style="color:var(--olive);font-weight:400;margin-bottom:6px;">Start a Live Session</h2>
      <p style="font-size:0.88rem;color:var(--brown);line-height:1.6;margin-bottom:16px;">Go live to the community right now — for a spontaneous check-in, a shared practice, or to hold space.</p>
      <div style="display:flex;flex-direction:column;gap:10px;margin-bottom:18px;">
        <button class="btn btn--amber btn--full">🎤 Audio only</button>
        <button class="btn btn--olive btn--full">🎥 Video live</button>
        <button class="btn btn--ghost btn--full">📝 Schedule for later</button>
      </div>
      <p style="font-size:0.75rem;color:var(--sage);text-align:center;">Premium members only · You have Premium ✓</p>
    `);
  }

  function renderUpcoming() {
    const wrap = document.getElementById('homeUpcoming');
    if (!wrap) return;
    const next = [...DATA.events].sort((a, b) => a.dayOffset - b.dayOffset)[0];
    if (!next) { wrap.innerHTML = ''; return; }
    const date = new Date();
    date.setDate(date.getDate() + next.dayOffset);
    const day = date.getDate();
    const mon = date.toLocaleDateString(undefined, { month: 'short' });
    wrap.innerHTML = `
      <div class="event-preview" data-event="${next.id}">
        <div class="event-preview__date">
          <div class="event-preview__day">${day}</div>
          <div class="event-preview__mon">${mon}</div>
        </div>
        <div class="event-preview__info">
          <div class="event-preview__title">${next.title}</div>
          <div class="event-preview__meta">${next.time} · ${next.host}</div>
        </div>
      </div>
    `;
    wrap.querySelector('.event-preview').addEventListener('click', () => openEventModal(next));
  }

  // ---------- Habits handlers ----------
  function onHabitToggle(habit) {
    const nowDone = Habits.toggleCheckin(habit);
    if (nowDone) {
      awardPoints(Habits.POINTS_PER_CHECKIN, habit.name);
    } else {
      state.points = Math.max(0, state.points - Habits.POINTS_PER_CHECKIN);
      saveState();
    }
    renderHome();
    renderHabitsScreen();
  }

  function renderHabitsScreen() {
    // Habits are now merged into the Me tab — rendered by renderHome().
    // Kept as a stub so any stale callers still work.
    Habits.renderHabitList(state.habits, onHabitToggle);
  }

  function openAddHabitModal() {
    openModal(`
      <h2 style="color: var(--olive); font-weight: 400; margin-bottom: 14px;">Add a Habit</h2>
      <p style="font-size: 0.9rem; color: var(--brown); margin-bottom: 18px;">A small ritual you want to do every day.</p>
      <input type="text" id="newHabitName" placeholder="e.g. Read 10 pages"
        style="width: 100%; padding: 14px 16px; border-radius: 10px; border: 1.5px solid var(--beige); font-family: inherit; font-size: 0.95rem; margin-bottom: 12px; background: var(--white); color: var(--charcoal);" />
      <div style="display: flex; gap: 8px; flex-wrap: wrap; margin-bottom: 20px;">
        ${['🌿','🧘','📓','💧','💨','🚶','🕯️','📖','🎨','💪'].map(e =>
          `<button class="emoji-pick" data-emoji="${e}" style="width:44px;height:44px;border-radius:12px;background:var(--white);border:1.5px solid var(--beige);font-size:1.3rem;">${e}</button>`).join('')}
      </div>
      <button class="btn btn--amber btn--full" id="saveHabitBtn">Add to daily habits</button>
    `);
    let chosenEmoji = '🌿';
    document.querySelectorAll('.emoji-pick').forEach(b => {
      b.addEventListener('click', () => {
        document.querySelectorAll('.emoji-pick').forEach(x => x.style.borderColor = 'var(--beige)');
        b.style.borderColor = 'var(--amber)';
        chosenEmoji = b.dataset.emoji;
      });
    });
    document.getElementById('saveHabitBtn').addEventListener('click', () => {
      const name = document.getElementById('newHabitName').value.trim();
      if (!name) return;
      state.habits.push({
        id: 'custom-' + Date.now(),
        name,
        icon: chosenEmoji,
        custom: true,
        checkins: []
      });
      saveState();
      closeModal();
      renderHabitsScreen();
      renderHome();
    });
  }

  // ---------- Course ----------
  function renderCourse(filter = 'all') {
    const list = document.getElementById('courseModules');
    if (!list) return;
    list.innerHTML = '';
    const mods = DATA.course.filter(m => filter === 'all' || m.phase === filter);

    let lastPhase = null;
    mods.forEach(m => {
      if (m.phase !== lastPhase) {
        const label = document.createElement('div');
        label.className = 'section-label';
        label.textContent = m.phase;
        list.appendChild(label);
        lastPhase = m.phase;
      }
      const done = state.courseCompleted.includes(m.id);
      const el = document.createElement('div');
      el.className = 'module' + (done ? ' completed' : '');
      el.innerHTML = `
        <div class="module__head">
          <span class="module__num">${m.num}</span>
          <span class="module__dur">${m.duration}</span>
        </div>
        <div class="module__title">${m.title}</div>
        <div class="module__theme">${m.theme}</div>
        <span class="module__play">▶ Open</span>
      `;
      el.addEventListener('click', () => openModuleModal(m));
      list.appendChild(el);
    });

    const done = state.courseCompleted.length;
    const total = DATA.course.length;
    document.getElementById('courseProgressNum').textContent = `${done} of ${total} modules`;
    document.getElementById('courseProgressFill').style.width = `${(done / total) * 100}%`;
  }

  function initCourseFilter() {
    document.querySelectorAll('#courseFilter .filter-pill').forEach(p => {
      p.addEventListener('click', () => {
        document.querySelectorAll('#courseFilter .filter-pill').forEach(x => x.classList.remove('active'));
        p.classList.add('active');
        renderCourse(p.dataset.phase);
      });
    });
  }

  function openModuleModal(m) {
    const checks = state.moduleChecks[m.id] || [];
    const done = state.courseCompleted.includes(m.id);
    openModal(`
      <div class="module-detail">
        <div style="display:flex;justify-content:space-between;align-items:baseline;margin-bottom:4px;">
          <span class="chip chip--amber">${m.num}</span>
          <span style="font-size:0.75rem;color:var(--sage);">${m.duration} · ${m.phase}</span>
        </div>
        <h2 style="color:var(--olive);font-weight:400;margin-bottom:4px;">${m.title}</h2>
        <div style="font-style:italic;color:var(--brown);opacity:0.75;font-size:0.85rem;margin-bottom:14px;">${m.theme}</div>
        <div class="module-detail__video">🎬</div>
        <div class="module-detail__summary">${m.summary}</div>
        <div class="section-label" style="margin-top:0;">Practice Checklist</div>
        <div id="checklistWrap">
          ${m.checklist.map((item, i) => `
            <div class="checklist-item ${checks.includes(i) ? 'done' : ''}" data-i="${i}">
              <div class="check ${checks.includes(i) ? 'checked' : ''}">${checks.includes(i) ? '✓' : ''}</div>
              <div class="checklist-item__text">${item}</div>
            </div>
          `).join('')}
        </div>
        <button class="btn btn--amber btn--full" id="completeModuleBtn" style="margin-top:18px;">
          ${done ? '✓ Completed' : 'Mark module complete · +15 pts'}
        </button>
      </div>
    `);

    // Checklist taps
    document.querySelectorAll('#checklistWrap .checklist-item').forEach(el => {
      el.addEventListener('click', () => {
        const i = parseInt(el.dataset.i, 10);
        const list = state.moduleChecks[m.id] || [];
        const pos = list.indexOf(i);
        if (pos === -1) {
          list.push(i);
          awardPoints(2, 'checklist');
        } else {
          list.splice(pos, 1);
        }
        state.moduleChecks[m.id] = list;
        saveState();
        openModuleModal(m); // re-render
      });
    });

    document.getElementById('completeModuleBtn').addEventListener('click', () => {
      if (done) return;
      state.courseCompleted.push(m.id);
      saveState();
      awardPoints(15, 'module complete');
      closeModal();
      renderCourse(getActivePhaseFilter());
    });
  }

  function getActivePhaseFilter() {
    const active = document.querySelector('#courseFilter .filter-pill.active');
    return active ? active.dataset.phase : 'all';
  }

  // ---------- Resources ----------
  function renderResources() {
    const filterRow = document.getElementById('resourceFilter');
    const list = document.getElementById('resourceList');
    if (!filterRow || !list) return;

    const categories = Object.keys(DATA.resources);
    if (!filterRow.dataset.built) {
      filterRow.innerHTML = categories.map((c, i) =>
        `<button class="filter-pill ${i === 0 ? 'active' : ''}" data-cat="${c}">${c}</button>`
      ).join('');
      filterRow.dataset.built = '1';
      filterRow.querySelectorAll('.filter-pill').forEach(p => {
        p.addEventListener('click', () => {
          filterRow.querySelectorAll('.filter-pill').forEach(x => x.classList.remove('active'));
          p.classList.add('active');
          renderResourceList(p.dataset.cat);
        });
      });
    }
    renderResourceList(categories[0]);
  }

  function renderResourceList(cat) {
    const list = document.getElementById('resourceList');
    const items = DATA.resources[cat] || [];
    list.innerHTML = items.map(r => `
      <div class="resource-card" data-tool="${r.tool || ''}" data-title="${r.title}">
        <div class="resource-card__info">
          <div class="resource-card__title">${r.title}</div>
          <div class="resource-card__desc">${r.desc}</div>
          <div class="resource-card__length">${r.length}</div>
        </div>
        <div class="resource-card__action">▶</div>
      </div>
    `).join('');
    list.querySelectorAll('.resource-card').forEach(card => {
      card.addEventListener('click', () => {
        const tool = card.dataset.tool;
        if (tool === 'wheel') {
          openWheelOfLife();
        } else {
          openResourcePlayer(card.dataset.title);
        }
      });
    });
  }

  function openResourcePlayer(title) {
    openModal(`
      <h2 style="color:var(--olive);font-weight:400;margin-bottom:8px;">${title}</h2>
      <div class="module-detail__video" style="height:200px;">🎧</div>
      <p style="font-size:0.9rem;color:var(--brown);line-height:1.6;margin-bottom:18px;">
        This is a prototype — no real media attached. In production, this screen would play audio or video with chapter markers and a transcript.
      </p>
      <button class="btn btn--amber btn--full" id="rewardBtn">Mark as practiced · +5 pts</button>
    `);
    document.getElementById('rewardBtn').addEventListener('click', () => {
      awardPoints(5, 'practice');
      closeModal();
    });
  }

  function openWheelOfLife() {
    const segments = ['Career', 'Money', 'Health', 'Relationships', 'Growth', 'Play', 'Home', 'Spirit'];
    const values = segments.map(() => 5);
    openModal(`
      <h2 style="color:var(--olive);font-weight:400;margin-bottom:6px;">Wheel of Life</h2>
      <p style="font-size:0.85rem;color:var(--brown);opacity:0.8;margin-bottom:14px;">
        Tap to rate each area from 1 to 10. Uneven wheels roll roughly — that's the insight.
      </p>
      <div class="wheel-wrap">
        <svg class="wheel-svg" viewBox="-120 -120 240 240" id="wheelSvg"></svg>
        <div id="wheelLabels" style="display:grid;grid-template-columns:1fr 1fr;gap:6px;margin-top:14px;font-size:0.78rem;color:var(--brown);"></div>
      </div>
      <button class="btn btn--amber btn--full" id="wheelSave" style="margin-top:14px;">Save reflection · +10 pts</button>
    `);

    function drawWheel() {
      const svg = document.getElementById('wheelSvg');
      if (!svg) return;
      const n = segments.length;
      const angle = (2 * Math.PI) / n;
      let html = '';
      // grid rings
      for (let r = 20; r <= 100; r += 20) {
        html += `<circle cx="0" cy="0" r="${r}" fill="none" stroke="#D6D0B8" stroke-width="0.5" />`;
      }
      // radial lines
      for (let i = 0; i < n; i++) {
        const a = -Math.PI / 2 + i * angle;
        html += `<line x1="0" y1="0" x2="${Math.cos(a) * 100}" y2="${Math.sin(a) * 100}" stroke="#D6D0B8" stroke-width="0.5" />`;
      }
      // filled polygon
      let pts = '';
      for (let i = 0; i < n; i++) {
        const a = -Math.PI / 2 + i * angle;
        const r = (values[i] / 10) * 100;
        pts += `${Math.cos(a) * r},${Math.sin(a) * r} `;
      }
      html += `<polygon points="${pts}" fill="rgba(228,160,23,0.35)" stroke="#E4A017" stroke-width="2" />`;
      // segment labels
      for (let i = 0; i < n; i++) {
        const a = -Math.PI / 2 + i * angle;
        const x = Math.cos(a) * 115;
        const y = Math.sin(a) * 115 + 3;
        html += `<text x="${x}" y="${y}" font-size="8" fill="#3f4021" text-anchor="middle" font-weight="500">${segments[i]}</text>`;
      }
      svg.innerHTML = html;

      const labels = document.getElementById('wheelLabels');
      labels.innerHTML = segments.map((s, i) => `
        <div style="display:flex;justify-content:space-between;padding:6px 10px;background:var(--white);border-radius:8px;">
          <span>${s}</span>
          <span>
            <button data-area="${i}" data-delta="-1" style="padding:2px 8px;background:var(--beige);border-radius:6px;">−</button>
            <strong style="margin:0 8px;color:var(--amber);">${values[i]}</strong>
            <button data-area="${i}" data-delta="1" style="padding:2px 8px;background:var(--beige);border-radius:6px;">+</button>
          </span>
        </div>
      `).join('');
      labels.querySelectorAll('button').forEach(b => {
        b.addEventListener('click', () => {
          const idx = parseInt(b.dataset.area, 10);
          const d = parseInt(b.dataset.delta, 10);
          values[idx] = Math.max(1, Math.min(10, values[idx] + d));
          drawWheel();
        });
      });
    }
    drawWheel();

    document.getElementById('wheelSave').addEventListener('click', () => {
      awardPoints(10, 'wheel of life');
      closeModal();
    });
  }

  // ---------- Events / Calendar ----------
  function renderEvents() {
    // Calendar strip — 14 days
    const strip = document.getElementById('calStrip');
    if (!strip) return;
    const eventByOffset = new Set(DATA.events.map(e => e.dayOffset));
    let html = '';
    for (let i = 0; i < 14; i++) {
      const d = new Date();
      d.setDate(d.getDate() + i);
      const dow = d.toLocaleDateString(undefined, { weekday: 'short' }).slice(0, 3);
      const num = d.getDate();
      html += `<div class="cal-day ${i === 0 ? 'today' : ''} ${eventByOffset.has(i) ? 'has-event' : ''}">
        <div class="cal-day__dow">${dow}</div>
        <div class="cal-day__num">${num}</div>
      </div>`;
    }
    strip.innerHTML = html;

    // Event list
    const list = document.getElementById('eventList');
    list.innerHTML = '';
    [...DATA.events].sort((a, b) => a.dayOffset - b.dayOffset).forEach(ev => {
      const d = new Date();
      d.setDate(d.getDate() + ev.dayOffset);
      const dateLabel = d.toLocaleDateString(undefined, { weekday: 'short', month: 'short', day: 'numeric' });
      const el = document.createElement('div');
      el.className = 'event-card';
      el.innerHTML = `
        ${ev.premium ? '<span class="event-card__premium-badge">Premium</span>' : ''}
        <div class="event-card__type ${ev.type}">${ev.type}</div>
        <div class="event-card__title">${ev.title}</div>
        <div class="event-card__meta">${dateLabel} · ${ev.time} · ${ev.host}</div>
      `;
      el.addEventListener('click', () => openEventModal(ev));
      list.appendChild(el);
    });
  }

  function openEventModal(ev) {
    const going = state.rsvp.includes(ev.id);
    const locked = ev.premium && !state.user.isPremium;
    const d = new Date();
    d.setDate(d.getDate() + ev.dayOffset);
    const fullDate = d.toLocaleDateString(undefined, { weekday: 'long', month: 'long', day: 'numeric' });

    openModal(`
      <div style="display:flex;justify-content:space-between;align-items:baseline;margin-bottom:6px;">
        <span class="chip chip--${ev.premium ? 'amber' : 'olive'}">${ev.type}</span>
        <span style="font-size:0.78rem;color:var(--sage);">${ev.duration}</span>
      </div>
      <h2 style="color:var(--olive);font-weight:400;margin-bottom:6px;">${ev.title}</h2>
      <div style="font-size:0.85rem;color:var(--brown);margin-bottom:14px;">
        ${fullDate} · ${ev.time}<br/>
        Hosted by ${ev.host}
      </div>
      <p style="font-size:0.92rem;color:var(--charcoal);line-height:1.6;margin-bottom:20px;">${ev.description}</p>
      ${locked ? `
        <div style="padding:14px;background:rgba(228,160,23,0.12);border-radius:10px;margin-bottom:14px;font-size:0.85rem;color:var(--brown);">
          🌿 <strong>Premium event.</strong> Upgrade to join live.
        </div>
        <button class="btn btn--amber btn--full" id="eventUpgrade">See Premium benefits</button>
      ` : `
        <button class="btn ${going ? 'btn--ghost' : 'btn--amber'} btn--full" id="rsvpBtn">
          ${going ? '✓ You\'re going' : 'RSVP · I\'ll be there'}
        </button>
        <button class="btn btn--ghost btn--full" id="addCalBtn" style="margin-top:10px;">Add to calendar</button>
      `}
    `);

    if (locked) {
      document.getElementById('eventUpgrade').addEventListener('click', () => {
        closeModal();
        setTimeout(openPremiumModal, 300);
      });
    } else {
      document.getElementById('rsvpBtn').addEventListener('click', () => {
        if (going) {
          state.rsvp = state.rsvp.filter(id => id !== ev.id);
        } else {
          state.rsvp.push(ev.id);
          awardPoints(3, 'RSVP');
        }
        saveState();
        closeModal();
        renderEvents();
      });
      document.getElementById('addCalBtn').addEventListener('click', () => {
        showToast('Added to calendar (mock)');
        closeModal();
      });
    }
  }

  // ---------- Premium ----------
  function openPremiumModal() {
    const P = DATA.premium;
    openModal(`
      <div class="premium-hero">
        <div class="premium-hero__badge">LaWayra Premium</div>
        <h2>Deeper access, closer lineage</h2>
        <div class="premium-hero__price">${P.price}</div>
        <div class="premium-hero__trial">${P.trial}</div>
      </div>
      ${P.benefits.map(b => `
        <div class="premium-benefit">
          <div class="premium-benefit__icon">${b.icon}</div>
          <div class="premium-benefit__info">
            <strong>${b.title}</strong>
            <span>${b.desc}</span>
          </div>
        </div>
      `).join('')}
      <div class="premium-auto-note">${P.autoNote}</div>
      <button class="btn btn--amber btn--full" id="premiumStartBtn" style="margin-top:18px;">
        ${state.user.isPremium ? '✓ You have Premium' : 'Start 14-day free trial'}
      </button>
    `);
    document.getElementById('premiumStartBtn').addEventListener('click', () => {
      if (!state.user.isPremium) {
        state.user.isPremium = true;
        saveState();
        showToast('Premium activated ✨');
        renderAll();
      }
      closeModal();
    });
  }

  // ---------- Modal ----------
  function openModal(html) {
    document.getElementById('modalContent').innerHTML = html;
    document.getElementById('modalBackdrop').classList.add('open');
  }
  function closeModal() {
    document.getElementById('modalBackdrop').classList.remove('open');
  }
  function initModal() {
    document.getElementById('modalClose').addEventListener('click', closeModal);
    document.getElementById('modalBackdrop').addEventListener('click', (e) => {
      if (e.target.id === 'modalBackdrop') closeModal();
    });
  }

  // ---------- Global click handlers ----------
  function initGlobal() {
    // Premium teaser
    document.querySelectorAll('[data-action="open-premium"]').forEach(el => {
      el.addEventListener('click', openPremiumModal);
    });
    // Add habit
    const addHabitBtn = document.getElementById('addHabitBtn');
    if (addHabitBtn) addHabitBtn.addEventListener('click', openAddHabitModal);

    // Composer tap (Feed) → compose modal
    const composer = document.getElementById('composer');
    if (composer) composer.addEventListener('click', openComposerModal);

    // Go Live FAB
    const goLiveBtn = document.getElementById('goLiveBtn');
    if (goLiveBtn) goLiveBtn.addEventListener('click', openGoLiveModal);

    // Logo tap 5× to reset (dev)
    let taps = 0;
    let lastTap = 0;
    document.getElementById('logoTap').addEventListener('click', () => {
      const now = Date.now();
      if (now - lastTap > 800) taps = 0;
      lastTap = now;
      taps++;
      if (taps >= 5) {
        taps = 0;
        if (confirm('Reset all prototype data?')) resetState();
      }
    });
  }

  // ---------- Render everything ----------
  function renderAll() {
    renderFeed();
    renderHome();
    renderCourse(getActivePhaseFilter());
    renderResources();
    renderEvents();
  }

  // ---------- Boot ----------
  function init() {
    initOnboard();
    initTabs();
    initModal();
    initCourseFilter();
    initGlobal();
    renderAll();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
