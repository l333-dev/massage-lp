const menuToggle = document.querySelector("[data-menu-toggle]");
const nav = document.querySelector("[data-nav]");
const navLinks = document.querySelectorAll("[data-nav] a");
const menuLabel = document.querySelector("[data-menu-label]");
const mobileViewport = window.matchMedia("(max-width: 767px)");
const demoContactLinks = document.querySelectorAll("[data-demo-contact]");

if (menuToggle && nav) {
  const setMenuState = (isOpen) => {
    const shouldOpen = mobileViewport.matches && isOpen;

    menuToggle.setAttribute("aria-expanded", String(shouldOpen));
    nav.classList.toggle("is-open", shouldOpen);
    document.body.classList.toggle("is-menu-open", shouldOpen);
    nav.toggleAttribute("inert", mobileViewport.matches && !shouldOpen);

    if (mobileViewport.matches && !shouldOpen) {
      nav.setAttribute("aria-hidden", "true");
    } else {
      nav.removeAttribute("aria-hidden");
    }

    if (menuLabel) {
      menuLabel.textContent = shouldOpen ? "メニューを閉じる" : "メニューを開く";
    }
  };

  menuToggle.addEventListener("click", () => {
    const isOpen = menuToggle.getAttribute("aria-expanded") === "true";
    setMenuState(!isOpen);
  });

  document.addEventListener("click", (event) => {
    const isOpen = menuToggle.getAttribute("aria-expanded") === "true";
    const clickedOutside = !menuToggle.contains(event.target) && !nav.contains(event.target);

    if (isOpen && clickedOutside) {
      setMenuState(false);
    }
  });

  navLinks.forEach((link) => {
    link.addEventListener("click", () => {
      if (mobileViewport.matches) {
        setMenuState(false);
      }
    });
  });

  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape" && menuToggle.getAttribute("aria-expanded") === "true") {
      setMenuState(false);
      menuToggle.focus();
    }
  });

  if (typeof mobileViewport.addEventListener === "function") {
    mobileViewport.addEventListener("change", () => setMenuState(false));
  } else {
    mobileViewport.addListener(() => setMenuState(false));
  }

  setMenuState(false);
}

demoContactLinks.forEach((link) => {
  link.addEventListener("click", (event) => {
    event.preventDefault();
    const contactType = link.dataset.demoContact;
    window.alert(`${contactType}予約はデモ表示です。公開時に実際の連絡先へ差し替えてください。`);
  });
});
