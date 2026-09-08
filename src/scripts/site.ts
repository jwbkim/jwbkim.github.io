export {};
document.documentElement.classList.add('js');

// News remains a native, keyboard-scrollable region; expanding never changes its content.
const newsToggle = document.querySelector<HTMLButtonElement>('[data-news-expand]');
const newsWindow = document.querySelector<HTMLElement>('[data-news-window]');
const newsScroll = document.querySelector<HTMLElement>('#news-list');
const scrollHint = document.querySelector<HTMLElement>('[data-scroll-hint]');
if (newsToggle && newsWindow && newsScroll) {
  newsToggle.addEventListener('click', () => {
    const expanded = newsToggle.getAttribute('aria-expanded') !== 'true';
    newsToggle.setAttribute('aria-expanded', String(expanded));
    newsToggle.firstChild!.textContent = expanded ? 'Collapse news ' : 'Expand all ';
    newsWindow.classList.toggle('is-expanded', expanded);
    if (scrollHint) scrollHint.hidden = expanded;
    if (!expanded) newsScroll.scrollTop = 0;
  });
  newsScroll.addEventListener('scroll', () => newsWindow.classList.toggle('is-bottom', newsScroll.scrollTop + newsScroll.clientHeight >= newsScroll.scrollHeight - 3), { passive: true });
}

// Every publication is in the generated HTML. Filters progressively enhance that list.
const toolbar = document.querySelector<HTMLElement>('[data-publication-toolbar]');
const filterButtons = [...document.querySelectorAll<HTMLButtonElement>('[data-filter]')];
const searchInput = document.querySelector<HTMLInputElement>('#publication-search');
const entries = [...document.querySelectorAll<HTMLElement>('.publication')];
const resultStatus = document.querySelector<HTMLElement>('#publication-status');
const emptyState = document.querySelector<HTMLElement>('[data-publication-empty]');
let activeFilter = 'all';
function filterPublications() {
  const query = (searchInput?.value || '').trim().toLocaleLowerCase();
  const terms = query.split(/\s+/).filter(Boolean);
  let visible = 0;
  entries.forEach(entry => {
    const matches = (activeFilter === 'all' || entry.dataset.type === activeFilter) && terms.every(term => entry.dataset.search?.includes(term));
    entry.hidden = !matches;
    if (matches) visible++;
  });
  filterButtons.forEach(button => {
    const selected = button.dataset.filter === activeFilter;
    button.classList.toggle('is-active', selected);
    button.setAttribute('aria-pressed', String(selected));
  });
  if (emptyState) emptyState.hidden = visible > 0;
  if (resultStatus) resultStatus.textContent = `${visible} ${visible === 1 ? 'publication' : 'publications'}${query ? ` matching “${searchInput?.value.trim()}”` : ''}`;
}
if (toolbar) toolbar.hidden = false;
filterButtons.forEach(button => button.addEventListener('click', () => { activeFilter = button.dataset.filter || 'all'; filterPublications(); }));
searchInput?.addEventListener('input', filterPublications);
document.querySelector('[data-reset-search]')?.addEventListener('click', () => {
  activeFilter = 'all';
  if (searchInput) searchInput.value = '';
  filterPublications();
  searchInput?.focus();
});

// Only visible videos play. A user's pause is remembered, including on scroll/re-entry.
const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
const connection = (navigator as Navigator & { connection?: { saveData?: boolean } }).connection;
const demos = [...document.querySelectorAll<HTMLVideoElement>('[data-demo-video]')];
const inView = new Set<HTMLVideoElement>();
const pausedByUser = new Set<HTMLVideoElement>();
function loadVideo(video: HTMLVideoElement) {
  const source = video.querySelector<HTMLSourceElement>('source[data-src]');
  if (source?.dataset.src) { source.src = source.dataset.src; delete source.dataset.src; video.load(); }
}
function setVideoUI(video: HTMLVideoElement) {
  const button = video.parentElement?.querySelector<HTMLButtonElement>('[data-video-toggle]');
  if (!button) return;
  const playing = !video.paused;
  const play = button.querySelector<HTMLElement>('.play-icon');
  const pause = button.querySelector<HTMLElement>('.pause-icon');
  const label = button.querySelector<HTMLElement>('[data-video-label]');
  if (play) play.hidden = playing;
  if (pause) pause.hidden = !playing;
  if (label) label.textContent = playing ? 'Pause' : 'Play';
  button.setAttribute('aria-label', `${playing ? 'Pause' : 'Play'} ${button.dataset.title} video`);
}
function playIfAllowed(video: HTMLVideoElement) {
  if (!reducedMotion.matches && !connection?.saveData && !document.hidden && !pausedByUser.has(video)) {
    loadVideo(video);
    void video.play().catch(() => setVideoUI(video));
  }
}
const videoObserver = new IntersectionObserver(records => {
  records.forEach(record => {
    const video = record.target as HTMLVideoElement;
    if (record.isIntersecting) { inView.add(video); playIfAllowed(video); }
    else { inView.delete(video); video.pause(); }
  });
}, { threshold: 0.3 });
demos.forEach(video => {
  video.muted = true;
  video.addEventListener('play', () => setVideoUI(video));
  video.addEventListener('pause', () => setVideoUI(video));
  const button = video.parentElement?.querySelector<HTMLButtonElement>('[data-video-toggle]');
  button?.addEventListener('click', () => {
    if (video.paused) { pausedByUser.delete(video); loadVideo(video); void video.play().catch(() => setVideoUI(video)); }
    else { pausedByUser.add(video); video.pause(); }
  });
  videoObserver.observe(video);
});
document.addEventListener('visibilitychange', () => {
  demos.forEach(video => { if (document.hidden) video.pause(); else if (inView.has(video)) playIfAllowed(video); });
});
reducedMotion.addEventListener('change', () => demos.forEach(video => { if (reducedMotion.matches) video.pause(); else if (inView.has(video)) playIfAllowed(video); }));
