(function () {
  function applyChanges() {
    // Find H1 safely
    const h1 = document.querySelector(".lm-hero__header");
    if (h1) {
      if (
        h1.textContent.trim() !==
        "We are the best experimentation agency in the world"
      ) {
        h1.textContent = "We are the best experimentation agency in the world";
      }

      // Add value proposition UL only once
      if (!document.querySelector(".value-prop")) {
        const ul = document.createElement("ul");
        ul.className = "value-prop";
        ul.innerHTML = `
          <li>Increase conversion rates across your website</li>
          <li>Iterative site redesign</li>
          <li>Improve ROAS efficiency</li>
          <li>Standing or scaling an experimentation program</li>
          <li>Advanced customer research</li>
        `;
        h1.insertAdjacentElement("afterend", ul);
      }
    }

    // Update first button text
    const demoBtn = document.querySelector(".lm-hero__buttons .btn");
    if (demoBtn && demoBtn.textContent.trim() === "Request a demo") {
      demoBtn.textContent = "Contact us";
    }

    // Update "Why Liftmap?" link
    const whyBtn = document.querySelector(".lm-hero__buttons .btn-video");
    if (whyBtn && !whyBtn.dataset.scrollFixed) {
      whyBtn.dataset.scrollFixed = "true";

      // Clone the button to remove old event listeners
      const newWhyBtn = whyBtn.cloneNode(true);
      whyBtn.parentNode.replaceChild(newWhyBtn, whyBtn);

      newWhyBtn.addEventListener("click", function (e) {
        e.preventDefault();
        const section = document.querySelector(".lm-why");
        if (section) {
          section.scrollIntoView({ behavior: "smooth" });
        }
      });
    }
  }

  // Run once on load
  setTimeout(applyChanges, 200);

  // SPA-safe navigation
  const origPushState = history.pushState;
  history.pushState = function () {
    origPushState.apply(history, arguments);
    setTimeout(applyChanges, 500);
  };
  window.addEventListener("popstate", () => setTimeout(applyChanges, 500));
})();
