const menuBtn = document.querySelector('#menuBtn');
const mobileMenu = document.querySelector('#mobileMenu');
menuBtn.addEventListener('click', () => {
  const open = mobileMenu.classList.toggle('hidden');
  menuBtn.setAttribute('aria-expanded', String(!open));
  menuBtn.setAttribute('aria-label', open ? 'Otwórz menu' : 'Zamknij menu');
});
mobileMenu.querySelectorAll('a').forEach(link => link.addEventListener('click', () => {
  mobileMenu.classList.add('hidden');
  menuBtn.setAttribute('aria-expanded', 'false');
  menuBtn.setAttribute('aria-label', 'Otwórz menu');
}));

const range = document.querySelector('#compareRange');
const afterLayer = document.querySelector('#afterLayer');
const compareLine = document.querySelector('#compareLine');
function resizeComparison() {
  const width = document.querySelector('#comparison').offsetWidth;
  afterLayer.querySelector('img').style.width = `${width}px`;
}
function updateComparison() {
  afterLayer.style.width = `${100 - range.value}%`;
  compareLine.style.left = `${range.value}%`;
}
range.addEventListener('input', updateComparison);
window.addEventListener('resize', resizeComparison);
resizeComparison(); updateComparison();

const lightbox = document.querySelector('#lightbox');
const lightboxImg = document.querySelector('#lightboxImg');
document.querySelectorAll('.project').forEach(project => project.addEventListener('click', () => {
  lightboxImg.src = project.dataset.image;
  lightbox.classList.remove('hidden'); lightbox.classList.add('flex');
  document.body.classList.add('modal-open');
}));

const contactModal = document.querySelector('#contactModal');
document.querySelector('#contactBtn').addEventListener('click', () => {
  contactModal.classList.remove('hidden'); contactModal.classList.add('flex');
  document.body.classList.add('modal-open');
});
function closeModal(modal) { modal.classList.add('hidden'); modal.classList.remove('flex'); document.body.classList.remove('modal-open'); }
document.querySelectorAll('[data-close]').forEach(button => button.addEventListener('click', () => closeModal(button.closest('[role="dialog"]'))));
[lightbox, contactModal].forEach(modal => modal.addEventListener('click', event => { if (event.target === modal) closeModal(modal); }));
document.addEventListener('keydown', event => { if (event.key === 'Escape') document.querySelectorAll('[role="dialog"].flex').forEach(closeModal); });
document.querySelector('#contactForm').addEventListener('submit', event => {
  event.preventDefault();
  document.querySelector('#formStatus').classList.remove('hidden');
  event.currentTarget.reset();
});

const revealItems = document.querySelectorAll('section > div');
const observer = new IntersectionObserver(entries => entries.forEach(entry => {
  if (entry.isIntersecting) { entry.target.classList.add('revealed'); observer.unobserve(entry.target); }
}), { threshold: .12 });
revealItems.forEach(item => { item.classList.add('reveal'); observer.observe(item); });
