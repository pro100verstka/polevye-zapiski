const menu = document.querySelector(".menu");
const burger = document.querySelector(".header__burger");
const navLinks = document.querySelectorAll(".menu__link");
const header = document.querySelector(".header");
const orderPopup = document.querySelector("#order-popup");
const customOrderPopup = document.querySelector("#custom-order-popup");
const orderButtons = document.querySelectorAll(".header__order-button");
const customOrderButton = document.querySelector(".special-order__button");
let previousBodyOverflow = "";

orderButtons.forEach((button) => {
  button.addEventListener("click", () => {
    previousBodyOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    orderPopup.showModal();
  });
});

if (customOrderButton && customOrderPopup) {
  customOrderButton.addEventListener("click", () => {
    previousBodyOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    customOrderPopup.showModal();
  });

  customOrderPopup.addEventListener("close", () => {
    document.body.style.overflow = previousBodyOverflow;
  });

  customOrderPopup.addEventListener("click", (event) => {
    if (event.target === customOrderPopup) {
      customOrderPopup.close();
    }
  });
}

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

const categoryButtons = document.querySelectorAll(".bouquet-category");
const catalogItems = document.querySelectorAll(".catalog__item");
const catalogCount = document.querySelector(".catalog__count");
const catalogList = document.querySelector(".catalog__list");
const catalogSort = document.querySelector(".catalog__sort");

if (categoryButtons.length && catalogItems.length && catalogCount) {
  const getBouquetWord = (count) => {
    const lastTwoDigits = count % 100;
    const lastDigit = count % 10;

    if (lastTwoDigits >= 11 && lastTwoDigits <= 14) return "букетов";
    if (lastDigit === 1) return "букет";
    if (lastDigit >= 2 && lastDigit <= 4) return "букета";
    return "букетов";
  };

  categoryButtons.forEach((button) => {
    button.addEventListener("click", () => {
      const selectedCategory = button.dataset.category;
      let visibleCount = 0;

      categoryButtons.forEach((categoryButton) => {
        const isActive = categoryButton === button;
        categoryButton.classList.toggle("bouquet-category--active", isActive);
        categoryButton.setAttribute("aria-pressed", String(isActive));
      });

      catalogItems.forEach((item) => {
        const categories = item.dataset.categories.split(" ");
        const isVisible = selectedCategory === "all" || categories.includes(selectedCategory);

        item.hidden = !isVisible;
        if (isVisible) visibleCount += 1;
      });

      catalogCount.textContent = `Найдено: ${visibleCount} ${getBouquetWord(visibleCount)}`;
    });
  });
}

if (catalogList && catalogSort && catalogItems.length) {
  const originalOrder = Array.from(catalogItems);

  catalogSort.addEventListener("change", () => {
    const sortedItems = Array.from(catalogItems);

    if (catalogSort.value === "price-ascending") {
      sortedItems.sort((first, second) => {
        const firstPrice = Number(first.querySelector(".bouquet-card__price data").value);
        const secondPrice = Number(second.querySelector(".bouquet-card__price data").value);
        return firstPrice - secondPrice;
      });
    } else if (catalogSort.value === "price-descending") {
      sortedItems.sort((first, second) => {
        const firstPrice = Number(first.querySelector(".bouquet-card__price data").value);
        const secondPrice = Number(second.querySelector(".bouquet-card__price data").value);
        return secondPrice - firstPrice;
      });
    } else {
      sortedItems.splice(0, sortedItems.length, ...originalOrder);
    }

    sortedItems.forEach((item) => catalogList.append(item));
  });
}
