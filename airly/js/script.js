(function () {
  const loaderMessage = document.getElementById("ld-msg");
  const loader = document.getElementById("loader");

  if (loaderMessage && loader) {
    const hasNavbar = !!document.getElementById("navbar");
    const messages = hasNavbar
      ? [
          "Loading your experience...",
          "Preparing the dashboard...",
          "Setting up properties...",
          "Almost there...",
          "Welcome to Airly!",
        ]
      : [
          "Loading demo data...",
          "Setting up properties...",
          "Fetching bookings...",
          "Almost ready...",
          "Welcome to Airly!",
        ];

    let messageIndex = 0;
    loaderMessage.textContent = messages[messageIndex];

    const messageInterval = setInterval(() => {
      messageIndex = (messageIndex + 1) % messages.length;
      loaderMessage.textContent = messages[messageIndex];
    }, hasNavbar ? 500 : 480);

    window.addEventListener("load", () => {
      setTimeout(() => {
        clearInterval(messageInterval);
        loaderMessage.textContent = "Welcome to Airly!";
        setTimeout(() => {
          loader.classList.add("hide");
        }, 500);
      }, 2200);
    });
  }

  const navbar = document.getElementById("navbar");
  if (navbar) {
    window.addEventListener("scroll", () => {
      navbar.classList.toggle("scrolled", window.scrollY > 30);
    });
  }

  window.toggleMenu = function toggleMenu() {
    const mobileMenu = document.getElementById("mobile-menu");
    if (mobileMenu) {
      mobileMenu.classList.toggle("open");
    }
  };

  const waTooltip = document.getElementById("wa-tooltip");
  if (waTooltip) {
    setTimeout(() => {
      waTooltip.style.display = "none";
    }, 5000);
  }

  const waButton = document.getElementById("wa-btn");
  if (waButton) {
    waButton.addEventListener("click", () => {
      const countryCode = "91";
      const phoneParts = ["6304", "893", "550"];
      const phoneNumber = countryCode + phoneParts.join("");
      const message = "Hi! I saw Airly and want to know more";
      const whatsappUrl =
        "https://wa.me/" + phoneNumber + "?text=" + encodeURIComponent(message);

      window.open(whatsappUrl, "_blank", "noopener");
    });
  }

  if (typeof IntersectionObserver !== "undefined") {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("visible");
          }
        });
      },
      { threshold: 0.1 }
    );

    document.querySelectorAll(".reveal").forEach((element) => observer.observe(element));
  }

  const spotCount = document.getElementById("spot-count");
  if (spotCount) {
    let spots = Number(spotCount.textContent) || 38;

    setInterval(() => {
      if (spots > 12 && Math.random() < 0.3) {
        spots -= 1;
        spotCount.textContent = String(spots);
      }
    }, 8000);

    window.submitWaitlist = function submitWaitlist() {
      const nameInput = document.getElementById("wl-name");
      const emailInput = document.getElementById("wl-email");
      const form = document.getElementById("wl-form");
      const success = document.getElementById("wl-success");
      const name = nameInput ? nameInput.value.trim() : "";
      const email = emailInput ? emailInput.value.trim() : "";

      if (!name || !email) {
        alert("Please enter your name and email to join the waitlist!");
        return;
      }

      if (form) {
        form.style.display = "none";
      }

      if (success) {
        success.style.display = "block";
      }

      if (spots > 1) {
        spots -= 1;
        spotCount.textContent = String(spots);
      }
    };
  }

  window.goTo = function goTo(page, element) {
    const targetPage = document.getElementById("page-" + page);
    if (!targetPage) {
      return;
    }

    document.querySelectorAll(".page").forEach((pageElement) => pageElement.classList.remove("active"));
    targetPage.classList.add("active");

    document.querySelectorAll(".nav-item").forEach((navItem) => navItem.classList.remove("active"));

    if (element) {
      element.classList.add("active");
    } else {
      document.querySelectorAll(".nav-item").forEach((navItem) => {
        if (navItem.onclick && navItem.onclick.toString().includes("'" + page + "'")) {
          navItem.classList.add("active");
        }
      });
    }

    const mainContent = document.getElementById("main-content");
    if (mainContent) {
      mainContent.scrollTop = 0;
    }

    window.scrollTo({ top: 0, behavior: "instant" });

    const sidebar = document.getElementById("sidebar");
    if (window.innerWidth < 900 && sidebar) {
      sidebar.classList.remove("open");
      document.body.classList.remove("app-menu-open");
      const demoMenuButton = document.getElementById("demo-menu-btn");
      if (demoMenuButton) {
        demoMenuButton.classList.remove("active");
        demoMenuButton.setAttribute("aria-expanded", "false");
      }
    }
  };

  window.toggleSidebar = function toggleSidebar() {
    const sidebar = document.getElementById("sidebar");
    const demoMenuButton = document.getElementById("demo-menu-btn");
    if (sidebar) {
      const shouldOpen = !sidebar.classList.contains("open");
      sidebar.classList.toggle("open", shouldOpen);
      document.body.classList.toggle("app-menu-open", shouldOpen && window.innerWidth <= 900);
      if (demoMenuButton) {
        demoMenuButton.classList.toggle("active", shouldOpen);
        demoMenuButton.setAttribute("aria-expanded", shouldOpen ? "true" : "false");
      }
    }
  };

  window.addEventListener("resize", () => {
    const sidebar = document.getElementById("sidebar");
    const demoMenuButton = document.getElementById("demo-menu-btn");
    if (window.innerWidth > 900 && sidebar) {
      sidebar.classList.remove("open");
      document.body.classList.remove("app-menu-open");
      if (demoMenuButton) {
        demoMenuButton.classList.remove("active");
        demoMenuButton.setAttribute("aria-expanded", "false");
      }
    }
  });

  window.openModal = function openModal(id) {
    const modal = document.getElementById(id);
    if (modal) {
      modal.classList.add("open");
    }
  };

  window.closeModal = function closeModal(id) {
    const modal = document.getElementById(id);
    if (modal) {
      modal.classList.remove("open");
    }
  };

  document.querySelectorAll(".modal-overlay").forEach((modal) => {
    modal.addEventListener("click", (event) => {
      if (event.target === modal) {
        modal.classList.remove("open");
      }
    });
  });

  window.activateTab = function activateTab(element) {
    const tabs = element.closest(".booking-tabs");
    if (!tabs) {
      return;
    }

    tabs.querySelectorAll(".b-tab").forEach((tab) => tab.classList.remove("active"));
    element.classList.add("active");
  };

  window.activateSettingTab = function activateSettingTab(element) {
    const tabs = element.closest(".settings-nav");
    if (!tabs) {
      return;
    }

    tabs.querySelectorAll(".sn-item").forEach((tab) => tab.classList.remove("active"));
    element.classList.add("active");
  };

  window.showToast = function showToast(message, type = "") {
    const wrap = document.getElementById("toast-wrap");
    if (!wrap) {
      return;
    }

    const toast = document.createElement("div");
    toast.className = "toast" + (type ? " " + type : "");
    toast.textContent = message;
    wrap.appendChild(toast);

    setTimeout(() => {
      toast.remove();
    }, 3000);
  };

  window.toggleSwitch = function toggleSwitch(element) {
    element.classList.toggle("on");
    window.showToast(element.classList.contains("on") ? "Setting enabled" : "Setting disabled");
  };

  window.addProperty = function addProperty() {
    window.closeModal("modal-add-prop");
    window.showToast("Property added and iCal sync started!", "success");
  };

  window.addBooking = function addBooking() {
    window.closeModal("modal-add-booking");
    window.showToast("Manual booking added successfully!", "success");
  };

  window.filterCleaners = function filterCleaners(element, filter) {
    const filterWrap = element.closest(".nearby-filter");
    if (!filterWrap) {
      return;
    }

    filterWrap.querySelectorAll(".nf-btn").forEach((button) => button.classList.remove("active"));
    element.classList.add("active");

    const cards = Array.from(document.querySelectorAll(".cleaner-card[data-cleaner]"));
    const pins = Array.from(document.querySelectorAll(".map-cleaner-pin[data-cleaner]"));

    const cleaners = cards.map((card) => ({
      id: card.dataset.cleaner,
      status: card.dataset.status || "",
      rating: Number(card.dataset.rating || "0"),
      distance: Number(card.dataset.distance || "0"),
      card,
      pin: pins.find((pin) => pin.dataset.cleaner === card.dataset.cleaner),
    }));

    const filterPredicates = {
      all: () => true,
      avail: (cleaner) => cleaner.status === "avail",
      "4plus": (cleaner) => cleaner.rating >= 4,
      "2km": (cleaner) => cleaner.distance <= 2,
    };

    const predicate = filterPredicates[filter] || filterPredicates.all;
    const visibleCleaners = cleaners.filter(predicate);

    cleaners.forEach((cleaner) => {
      const isVisible = visibleCleaners.includes(cleaner);
      cleaner.card.classList.toggle("is-hidden", !isVisible);
      if (cleaner.pin) {
        cleaner.pin.classList.toggle("is-hidden", !isVisible);
      }
    });

    const messages = {
      all: `Showing all ${visibleCleaners.length} cleaners nearby`,
      avail: `Showing ${visibleCleaners.length} available cleaners`,
      "4plus": `Showing ${visibleCleaners.length} cleaners rated 4+`,
      "2km": `Showing ${visibleCleaners.length} cleaners within 2km`,
    };

    window.showToast(messages[filter] || messages.all);
  };

  window.highlightCleaner = function highlightCleaner(id) {
    document.querySelectorAll(".cleaner-card").forEach((card) => card.classList.remove("highlighted"));

    const cleaner = document.getElementById("cc-" + id);
    if (cleaner) {
      cleaner.classList.add("highlighted");
      cleaner.scrollIntoView({ behavior: "smooth", block: "nearest" });
    }
  };

  const rawHash = window.location.hash.replace("#", "");
  const pageAliases = {
    cleaners: "nearby",
  };
  const hash = pageAliases[rawHash] || rawHash;
  if (hash && document.getElementById("page-" + hash)) {
    window.goTo(hash, null);
  }
})();
