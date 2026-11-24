const nav = document.getElementById('nav');
const menuBtn = nav.querySelector('.menu-btn');

const onScroll = () => nav.classList.toggle('scrolled', window.scrollY > 40);
window.addEventListener('scroll', onScroll, { passive: true });
onScroll();

const closeMenu = () => {
  nav.classList.remove('open');
  menuBtn.setAttribute('aria-expanded', 'false');
  document.body.style.overflow = '';
};
menuBtn.addEventListener('click', () => {
  const open = nav.classList.toggle('open');
  menuBtn.setAttribute('aria-expanded', open);
  document.body.style.overflow = open ? 'hidden' : '';
});
nav.querySelectorAll('.nav-links a').forEach(a => a.addEventListener('click', closeMenu));

const reveal = new IntersectionObserver(entries => {
  entries.forEach(e => { if (e.isIntersecting) { e.target.classList.add('in'); reveal.unobserve(e.target); } });
}, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });
document.querySelectorAll('.r').forEach(el => reveal.observe(el));

const tabs = [...document.querySelectorAll('.tab')];
const selectTab = tab => {
  tabs.forEach(t => {
    const on = t === tab;
    t.setAttribute('aria-selected', on);
    t.tabIndex = on ? 0 : -1;
    document.getElementById(t.getAttribute('aria-controls')).hidden = !on;
  });
};
tabs.forEach((t, i) => {
  t.addEventListener('click', () => selectTab(t));
  t.addEventListener('keydown', e => {
    const d = e.key === 'ArrowRight' || e.key === 'ArrowDown' ? 1 : e.key === 'ArrowLeft' || e.key === 'ArrowUp' ? -1 : 0;
    if (!d) return;
    e.preventDefault();
    const next = tabs[(i + d + tabs.length) % tabs.length];
    selectTab(next);
    next.focus();
  });
});

const items = [...document.querySelectorAll('.g-item')];
if (items.length) {
  const filters = [...document.querySelectorAll('.filter')];
  filters.forEach(f => f.addEventListener('click', () => {
    filters.forEach(x => x.setAttribute('aria-pressed', x === f));
    const cat = f.dataset.cat;
    items.forEach(it => { it.hidden = cat !== 'all' && it.dataset.cat !== cat; });
  }));

  const box = document.getElementById('lightbox');
  const boxImg = box.querySelector('img');
  const boxCap = box.querySelector('figcaption');
  let current = 0;
  const visible = () => items.filter(it => !it.hidden);
  const show = i => {
    const list = visible();
    current = (i + list.length) % list.length;
    const it = list[current];
    boxImg.src = it.href;
    boxImg.alt = it.querySelector('img').alt;
    boxCap.textContent = it.querySelector('.cap').textContent;
  };
  items.forEach(it => it.addEventListener('click', e => {
    e.preventDefault();
    show(visible().indexOf(it));
    box.showModal();
  }));
  box.querySelector('.lb-close').addEventListener('click', () => box.close());
  box.querySelector('.lb-prev').addEventListener('click', () => show(current - 1));
  box.querySelector('.lb-next').addEventListener('click', () => show(current + 1));
  box.addEventListener('click', e => { if (e.target === box || e.target.tagName === 'FIGURE') box.close(); });
  box.addEventListener('keydown', e => {
    if (e.key === 'ArrowRight') show(current + 1);
    if (e.key === 'ArrowLeft') show(current - 1);
  });
}
