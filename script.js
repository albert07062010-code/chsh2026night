document.addEventListener('DOMContentLoaded', () => {
  const navbar = document.getElementById('navbar');
  const menuToggle = document.getElementById('menuToggle');
  const navLinks = document.getElementById('navLinks');
  const navItems = document.querySelectorAll('.nav-item');
 
  // 1. 導航欄滾動背景（載入時也先判斷一次）
  const onScroll = () => navbar.classList.toggle('scrolled', window.scrollY > 40);
  onScroll();
  window.addEventListener('scroll', onScroll, { passive: true });
 
  // 2. 手機版選單：aria 狀態、點選項目 / 點外部 / 按 Esc 皆可收合
  if (menuToggle && navLinks) {
    const setOpen = (open) => {
      navLinks.classList.toggle('open', open);
      menuToggle.setAttribute('aria-expanded', String(open));
    };
    menuToggle.setAttribute('aria-controls', 'navLinks');
    setOpen(false);
    menuToggle.addEventListener('click', () => setOpen(!navLinks.classList.contains('open')));
    navItems.forEach(item => item.addEventListener('click', () => setOpen(false)));
    document.addEventListener('keydown', e => { if (e.key === 'Escape') setOpen(false); });
    document.addEventListener('click', e => { if (!navbar.contains(e.target)) setOpen(false); });
  }
 
  // 3. 導航列依捲動位置標示目前區塊
  const spy = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (!entry.isIntersecting) return;
      navItems.forEach(a => {
        const on = a.getAttribute('href') === '#' + entry.target.id;
        a.classList.toggle('active', on);
        on ? a.setAttribute('aria-current', 'true') : a.removeAttribute('aria-current');
      });
    });
  }, { rootMargin: '-45% 0px -50% 0px' });
  navItems.forEach(a => {
    const target = document.querySelector(a.getAttribute('href'));
    if (target) spy.observe(target);
  });
});