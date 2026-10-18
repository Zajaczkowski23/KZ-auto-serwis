function updateCopyrightYear() {
  const year = String(new Date().getFullYear());
  const copyrightYear = document.querySelector("#copyrightYear");

  copyrightYear.textContent = year;
  copyrightYear.setAttribute("datetime", year);
}

updateCopyrightYear();

const menuBtn = document.querySelector("#menuBtn");
const mobileMenu = document.querySelector("#mobileMenu");
const menuCloseBtn = document.querySelector("#menuCloseBtn");
const desktopMenu = window.matchMedia("(min-width: 768px)");
const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
let menuScrollY = 0;
let menuCloseTimer;

function closeMobileMenu(immediate = false) {
  mobileMenu.classList.remove("is-open");
  clearTimeout(menuCloseTimer);
  if (immediate || reducedMotion.matches) {
    finishClosingMobileMenu();
  } else {
    menuCloseTimer = setTimeout(finishClosingMobileMenu, 220);
  }
}

menuBtn.addEventListener("click", () => {
  if (desktopMenu.matches || mobileMenu.open) return;
  clearTimeout(menuCloseTimer);
  menuScrollY = window.scrollY;
  document.body.style.setProperty("--menu-scroll-top", `-${menuScrollY}px`);
  document.body.classList.add("menu-open");
  mobileMenu.showModal();
  // Flush the closed position so the panel slides in on its first opening too.
  mobileMenu.getBoundingClientRect();
  mobileMenu.classList.add("is-open");
  menuBtn.setAttribute("aria-expanded", "true");
});
menuCloseBtn.addEventListener("click", () => closeMobileMenu());
mobileMenu.addEventListener("cancel", (event) => {
  event.preventDefault();
  closeMobileMenu();
});
function finishClosingMobileMenu() {
  mobileMenu.close();
  clearTimeout(menuCloseTimer);
  mobileMenu.classList.remove("is-open");
  document.body.classList.remove("menu-open");
  document.body.style.removeProperty("--menu-scroll-top");
  window.scrollTo({ top: menuScrollY, behavior: "instant" });
  menuBtn.setAttribute("aria-expanded", "false");
}
mobileMenu
  .querySelectorAll("a")
  .forEach((link) =>
    link.addEventListener("click", () => closeMobileMenu(true)),
  );
desktopMenu.addEventListener("change", () => {
  if (desktopMenu.matches && mobileMenu.open) closeMobileMenu(true);
});

const range = document.querySelector("#compareRange");
const afterLayer = document.querySelector("#afterLayer");
const compareLine = document.querySelector("#compareLine");
function resizeComparison() {
  const width = document.querySelector("#comparison").offsetWidth;
  afterLayer.querySelector("img").style.width = `${width}px`;
}
function updateComparison() {
  afterLayer.style.width = `${100 - range.value}%`;
  compareLine.style.left = `${range.value}%`;
}
if (range) {
  range.addEventListener("input", updateComparison);
  window.addEventListener("resize", resizeComparison);
  resizeComparison();
  updateComparison();
}

const lightbox = document.querySelector("#lightbox");
const lightboxImg = document.querySelector("#lightboxImg");
document.querySelectorAll(".project").forEach((project) =>
  project.addEventListener("click", () => {
    lightboxImg.src = project.dataset.image;
    lightbox.classList.remove("hidden");
    lightbox.classList.add("flex");
    document.body.classList.add("modal-open");
  }),
);

function closeModal(modal) {
  modal.classList.add("hidden");
  modal.classList.remove("flex");
  document.body.classList.remove("modal-open");
}
document
  .querySelectorAll("[data-close]")
  .forEach((button) =>
    button.addEventListener("click", () =>
      closeModal(button.closest('[role="dialog"]')),
    ),
  );
document.querySelectorAll('[role="dialog"]').forEach((modal) =>
  modal.addEventListener("click", (event) => {
    if (event.target === modal) closeModal(modal);
  }),
);
document.addEventListener("keydown", (event) => {
  if (event.key === "Escape")
    document.querySelectorAll('[role="dialog"].flex').forEach(closeModal);
});
const revealItems = document.querySelectorAll("section > div");
const observer = new IntersectionObserver(
  (entries) =>
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("revealed");
        observer.unobserve(entry.target);
      }
    }),
  { threshold: 0.12 },
);
revealItems.forEach((item) => {
  item.classList.add("reveal");
  observer.observe(item);
});
