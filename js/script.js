const menu = document.querySelector(".menu");
const burger = document.querySelector(".header__burger");
const navLinks = document.querySelectorAll(".menu__link");
const header = document.querySelector(".header");
const orderPopup = document.querySelector("#order-popup");
const orderButton = document.querySelector(".header__order-button");
let previousBodyOverflow = "";

orderButton.addEventListener("click", () => {
  previousBodyOverflow = document.body.style.overflow;
  document.body.style.overflow = "hidden";
  orderPopup.showModal();
});

orderPopup.addEventListener("close", () => {
  document.body.style.overflow = previousBodyOverflow;
});

orderPopup.addEventListener("click", (event) => {
  if (event.target === orderPopup) {
    orderPopup.close();
  }
});

const updateHeaderBackground = () => {
  header.classList.toggle("header--scrolled", window.scrollY > 0);
};

window.addEventListener("scroll", updateHeaderBackground, { passive: true });
updateHeaderBackground();

burger.addEventListener("click", () => {
  const isOpen = menu.classList.toggle("menu-open");
  burger.classList.toggle("menu-open");
  document.body.style.overflow = isOpen ? "hidden" : "";
  burger.setAttribute("aria-expanded", isOpen);
  burger.setAttribute("aria-label", isOpen ? "Закрыть меню" : "Открыть меню");
});

navLinks.forEach((link) => {
  link.addEventListener("click", () => {
    menu.classList.remove("menu-open");
    burger.classList.remove("menu-open");
    document.body.style.overflow = "";
    burger.setAttribute("aria-expanded", "false");
    burger.setAttribute("aria-label", "Открыть меню");
  });
});

const revealSections = document.querySelectorAll("section");

if (
  "IntersectionObserver" in window &&
  !window.matchMedia("(prefers-reduced-motion: reduce)").matches
) {
  const revealObserver = new IntersectionObserver(
    (entries, observer) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.12 }
  );

  document.body.classList.add("has-scroll-reveal");
  revealSections.forEach((section) => {
    section.classList.add("reveal-on-scroll");
    revealObserver.observe(section);
  });
}
