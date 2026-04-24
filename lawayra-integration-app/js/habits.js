/* ============================================
   Habits — check-in logic, streaks, rendering
   ============================================ */

window.Habits = (function () {
  const POINTS_PER_CHECKIN = 5;

  function todayKey() {
    return new Date().toISOString().slice(0, 10);
  }

  function lastNDates(n) {
    const out = [];
    const d = new Date();
    for (let i = n - 1; i >= 0; i--) {
      const copy = new Date(d);
      copy.setDate(d.getDate() - i);
      out.push(copy.toISOString().slice(0, 10));
    }
    return out;
  }

  function isCheckedToday(habit) {
    return habit.checkins && habit.checkins.includes(todayKey());
  }

  function toggleCheckin(habit) {
    const today = todayKey();
    habit.checkins = habit.checkins || [];
    const i = habit.checkins.indexOf(today);
    if (i === -1) {
      habit.checkins.push(today);
      return true; // now checked
    } else {
      habit.checkins.splice(i, 1);
      return false; // now unchecked
    }
  }

  // Streak = consecutive days (ending today or yesterday) where AT LEAST ONE habit was checked
  function calcStreak(habits) {
    const allDates = new Set();
    habits.forEach(h => (h.checkins || []).forEach(d => allDates.add(d)));
    let streak = 0;
    const cursor = new Date();
    // If today has no checkin, start counting from yesterday (grace)
    if (!allDates.has(cursor.toISOString().slice(0, 10))) {
      cursor.setDate(cursor.getDate() - 1);
      if (!allDates.has(cursor.toISOString().slice(0, 10))) return 0;
    }
    while (allDates.has(cursor.toISOString().slice(0, 10))) {
      streak++;
      cursor.setDate(cursor.getDate() - 1);
    }
    return streak;
  }

  // --- Rendering ---
  function renderHomeTiles(habits, onToggle) {
    const wrap = document.getElementById('homeHabits');
    if (!wrap) return;
    wrap.innerHTML = '';
    habits.slice(0, 5).forEach(h => {
      const tile = document.createElement('button');
      tile.className = 'home-habit' + (isCheckedToday(h) ? ' done' : '');
      tile.innerHTML = `
        <div class="home-habit__icon">${h.icon || '🌿'}</div>
        <div class="home-habit__name">${h.name}</div>
      `;
      tile.addEventListener('click', () => onToggle(h));
      wrap.appendChild(tile);
    });
  }

  function renderHabitList(habits, onToggle) {
    const list = document.getElementById('habitList');
    if (!list) return;
    list.innerHTML = '';
    const dates = lastNDates(7);

    habits.forEach(h => {
      const row = document.createElement('div');
      row.className = 'habit-row';
      const todayDone = isCheckedToday(h);
      row.innerHTML = `
        <div class="habit-row__icon">${h.icon || '🌿'}</div>
        <div class="habit-row__info">
          <div class="habit-row__name">${h.name}</div>
          <div class="habit-row__week">
            ${dates.map(d => `<span class="habit-dot ${(h.checkins || []).includes(d) ? 'done' : ''}"></span>`).join('')}
          </div>
        </div>
        <div class="check ${todayDone ? 'checked' : ''}" data-habit="${h.id}">${todayDone ? '✓' : ''}</div>
      `;
      row.querySelector('.check').addEventListener('click', () => onToggle(h));
      list.appendChild(row);
    });
  }

  return {
    POINTS_PER_CHECKIN,
    todayKey,
    isCheckedToday,
    toggleCheckin,
    calcStreak,
    renderHomeTiles,
    renderHabitList
  };
})();
