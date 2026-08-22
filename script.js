// =====================================================
// モバイルメニューの開閉
// =====================================================
const menuToggle = document.getElementById('menuToggle');
const mainNav = document.querySelector('.main-nav');

if (menuToggle && mainNav) {
  menuToggle.addEventListener('click', () => {
    const isOpen = mainNav.classList.toggle('is-open');
    menuToggle.setAttribute('aria-expanded', String(isOpen));
  });

  mainNav.querySelectorAll('a').forEach((link) => {
    link.addEventListener('click', () => {
      mainNav.classList.remove('is-open');
      menuToggle.setAttribute('aria-expanded', 'false');
    });
  });
}

// =====================================================
// コースマップ：現在地のハイライト＋ランナー移動
// =====================================================
const mapNodes = document.querySelectorAll('.course-map__nodes li');
const runner = document.getElementById('mapRunner');
const sections = Array.from(mapNodes).map((li) =>
  document.getElementById(li.dataset.target)
);

function updateCourseMap() {
  const scrollPos = window.scrollY + window.innerHeight / 3;
  let activeIndex = 0;

  sections.forEach((section, i) => {
    if (section && section.offsetTop <= scrollPos) {
      activeIndex = i;
    }
  });

  mapNodes.forEach((li, i) => {
    li.classList.toggle('is-active', i === activeIndex);
  });

  if (runner && mapNodes[activeIndex]) {
    const targetNode = mapNodes[activeIndex].querySelector('.node');
    const listRect = document.querySelector('.course-map__nodes').getBoundingClientRect();
    const nodeRect = targetNode.getBoundingClientRect();
    const offset = nodeRect.top - listRect.top + nodeRect.height / 2 - 8;
    runner.style.top = `${offset}px`;
  }
}

window.addEventListener('scroll', updateCourseMap, { passive: true });
window.addEventListener('resize', updateCourseMap);
window.addEventListener('load', updateCourseMap);

mapNodes.forEach((li) => {
  li.addEventListener('click', () => {
    const target = document.getElementById(li.dataset.target);
    if (target) target.scrollIntoView({ behavior: 'smooth' });
  });
});

// =====================================================
// 隠しブロック（?ブロック）を叩くと1UP演出
// =====================================================
const qblock = document.getElementById('qblock');
const toast = document.getElementById('toast');
let coinCount = 0;

if (qblock && toast) {
  qblock.addEventListener('click', () => {
    coinCount += 1;
    qblock.classList.add('is-hit');

    const messages = [
      '⭐︎コインゲット！',
      '＋1UP！！',
      '力を合わせてスターを取り戻そう！',
      'もうネタ切れデス...',
      '本当にナイヨ',
      '......',
      'しつこいデスネ',
      'あーもうわかったわかった、豆知識でも教えてあげヨウ。',
      'クッパの名前の由来は韓国料理らしいヨ',
      '知らんケド...'
    ];
    toast.textContent = messages[Math.min(coinCount - 1, messages.length - 1)];
    toast.classList.add('is-visible');

    window.clearTimeout(qblock._resetTimer);
    qblock._resetTimer = window.setTimeout(() => {
      toast.classList.remove('is-visible');
    }, 1800);
  });
}
