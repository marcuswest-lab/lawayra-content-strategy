/* ============================================
   Garden growth — stage logic + render
   ============================================ */

window.Garden = (function () {
  const stages = window.APP_DATA.gardenStages;

  function stageForPoints(points) {
    let current = stages[0];
    for (const s of stages) {
      if (points >= s.threshold) current = s;
    }
    return current;
  }

  function nextStage(currentStage) {
    return stages[currentStage.stage + 1] || null;
  }

  function render(points) {
    const current = stageForPoints(points);
    const next = nextStage(current);

    const emoji = document.getElementById('gardenEmoji');
    const stageEl = document.getElementById('gardenStage');
    const captionEl = document.getElementById('gardenCaption');
    const progressText = document.getElementById('gardenProgressText');
    const nextStageEl = document.getElementById('gardenNextStage');
    const scene = document.getElementById('gardenScene');

    if (emoji) emoji.textContent = current.emoji;
    if (stageEl) stageEl.textContent = current.name;
    if (captionEl) captionEl.textContent = current.caption;

    if (progressText && nextStageEl) {
      if (next) {
        const toNext = next.threshold - points;
        progressText.textContent = `${points} / ${next.threshold} pts`;
        nextStageEl.textContent = `→ ${next.name} in ${toNext} pts`;
      } else {
        progressText.textContent = `${points} pts — full bloom`;
        nextStageEl.textContent = '✨';
      }
    }

    // Butterflies appear at stage 4+
    if (scene) {
      scene.querySelectorAll('.garden-butterfly').forEach(b => b.remove());
      if (current.stage >= 4) {
        const b1 = document.createElement('div');
        b1.className = 'garden-butterfly';
        b1.textContent = '🦋';
        scene.appendChild(b1);
        const b2 = document.createElement('div');
        b2.className = 'garden-butterfly';
        b2.textContent = '🦋';
        scene.appendChild(b2);
      }
    }
  }

  return { render, stageForPoints, nextStage };
})();
