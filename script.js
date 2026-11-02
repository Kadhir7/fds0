/* ==================================
   MOBILE PRICE DATA
   Example reference prices only.
================================== */

const mobileData = {
  apple: {
    "iPhone 16": {
      "128GB": 89900,
      "256GB": 99900,
      "512GB": 119900
    },
    "iPhone 16 Pro": {
      "128GB": 119900,
      "256GB": 129900,
      "512GB": 149900
    },
    "iPhone 15": {
      "128GB": 69900,
      "256GB": 79900,
      "512GB": 99900
    },
    "iPhone 15 Pro": {
      "128GB": 109900,
      "256GB": 119900,
      "512GB": 139900
    }
  },

  samsung: {
    "Galaxy S25": {
      "128GB": 80999,
      "256GB": 89999
    },
    "Galaxy S25 Ultra": {
      "256GB": 129999,
      "512GB": 149999,
      "1TB": 169999
    },
    "Galaxy A56": {
      "128GB": 41999,
      "256GB": 45999
    },
    "Galaxy A36": {
      "128GB": 33999,
      "256GB": 37999
    }
  },

  oneplus: {
    "OnePlus 13": {
      "256GB": 69999,
      "512GB": 76999
    },
    "OnePlus 13R": {
      "128GB": 42999,
      "256GB": 46999
    },
    "OnePlus Nord 5": {
      "128GB": 34999,
      "256GB": 38999
    }
  },

  xiaomi: {
    "Xiaomi 15": {
      "512GB": 64999
    },
    "Redmi Note 14 Pro": {
      "128GB": 27999,
      "256GB": 30999
    },
    "Redmi Note 14 Pro+": {
      "128GB": 32999,
      "256GB": 35999
    }
  },

  realme: {
    "Realme GT 7": {
      "256GB": 42999,
      "512GB": 46999
    },
    "Realme 14 Pro": {
      "128GB": 24999,
      "256GB": 27999
    },
    "Realme P4": {
      "128GB": 19999,
      "256GB": 22999
    }
  }
};


/* ==================================
   HTML ELEMENTS
================================== */

const brandSelect = document.getElementById("brand");
const modelSelect = document.getElementById("modelName");
const storageSelect = document.getElementById("storage");
const conditionSelect = document.getElementById("condition");

const result = document.getElementById("result");
const predictionText = document.getElementById("predictionText");
const predictButton = document.getElementById("predictButton");


/* ==================================
   RESET DROPDOWN
================================== */

function resetSelect(select, placeholder) {
  select.replaceChildren(new Option(placeholder, ""));
}


/* ==================================
   UPDATE MODEL OPTIONS
================================== */

function updateModels() {
  const brand = brandSelect.value;

  resetSelect(modelSelect, "Select Model");
  resetSelect(storageSelect, "Select Storage");

  modelSelect.disabled = !brand;
  storageSelect.disabled = true;

  if (!brand || !mobileData[brand]) {
    return;
  }

  Object.keys(mobileData[brand]).forEach(function(model) {
    modelSelect.add(new Option(model, model));
  });
}


/* ==================================
   UPDATE STORAGE OPTIONS
================================== */

function updateStorage() {
  const brand = brandSelect.value;
  const model = modelSelect.value;

  resetSelect(storageSelect, "Select Storage");

  storageSelect.disabled = !(brand && model);

  if (!brand || !model) {
    return;
  }

  Object.keys(mobileData[brand][model]).forEach(function(storage) {
    storageSelect.add(new Option(storage, storage));
  });
}


/* ==================================
   RESULT ANIMATION
================================== */

function animateResult() {
  result.classList.remove("animate-result");

  // Restart the CSS animation
  void result.offsetWidth;

  result.classList.add("animate-result");
}


/* ==================================
   MOBILE PRICE CHECKER
================================== */

function predictPrice() {
  const brand = brandSelect.value;
  const model = modelSelect.value;
  const storage = storageSelect.value;

  // Validate selections
  if (!brand || !model || !storage) {
    result.querySelector("h3").textContent =
      "Complete Your Selection";

    predictionText.textContent =
      "Please select brand, model and storage.";

    animateResult();
    return;
  }

  // Get the stored example price
  const referencePrice =
    mobileData[brand][model][storage];

  const isUsed = conditionSelect.value === "used";

  // Illustrative used-phone estimate only
  const displayedPrice = isUsed
    ? Math.round(referencePrice * 0.70)
    : referencePrice;

  // Format in Indian Rupees
  const formattedPrice = new Intl.NumberFormat(
    "en-IN",
    {
      style: "currency",
      currency: "INR",
      maximumFractionDigits: 0
    }
  ).format(displayedPrice);

  // Update result heading
  result.querySelector("h3").textContent = model;

  // Display result safely
  predictionText.replaceChildren();

  const details = document.createElement("span");

  details.textContent =
    `${storage} · ${
      isUsed
        ? "Used phone rough estimate"
        : "Stored reference price"
    }: `;

  const price = document.createElement("strong");
  price.textContent = formattedPrice;

  predictionText.append(details, price);

  // Show animation
  animateResult();
}


/* ==================================
   EVENT LISTENERS
================================== */

brandSelect.addEventListener("change", updateModels);

modelSelect.addEventListener("change", updateStorage);

predictButton.addEventListener("click", predictPrice);


/* ==================================
   SCROLL REVEAL ANIMATIONS
================================== */

const revealElements = document.querySelectorAll(
  ".section-title, " +
  ".workflow-card, " +
  ".stat-card, " +
  ".table-container, " +
  ".clean-card, " +
  ".prediction-box, " +
  ".metric-card, " +
  ".ethic-card, " +
  ".conclusion-panel"
);

if ("IntersectionObserver" in window) {

  const revealObserver = new IntersectionObserver(
    function(entries, observer) {

      entries.forEach(function(entry) {

        if (entry.isIntersecting) {

          entry.target.classList.add("is-visible");

          // Animate only the first time it enters view
          observer.unobserve(entry.target);
        }

      });

    },
    {
      threshold: 0.12
    }
  );

  revealElements.forEach(function(element, index) {

    // Small stagger effect between elements
    element.style.transitionDelay =
      `${(index % 4) * 75}ms`;

    element.classList.add("reveal");

    revealObserver.observe(element);
  });

} else {

  // Fallback for older browsers
  revealElements.forEach(function(element) {
    element.classList.add("is-visible");
  });

}