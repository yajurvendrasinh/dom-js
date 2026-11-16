const fruits = [
  "Apple",
  "Apricot",
  "Avocado",
  "Banana",
  "Blackberry",
  "Blueberry",
  "Cantaloupe",
  "Cherry",
  "Coconut",
  "Cranberry",
  "Date",
  "Dragon Fruit",
  "Durian",
  "Fig",
  "Grape",
  "Grapefruit",
  "Guava",
  "Kiwi",
  "Lemon",
  "Lime",
  "Lychee",
  "Mango",
  "Melon",
  "Nectarine",
  "Orange",
  "Papaya",
  "Passion Fruit",
  "Peach",
  "Pear",
  "Pineapple",
  "Plum",
  "Pomegranate",
  "Raspberry",
  "Starfruit",
  "Strawberry",
  "Tangerine",
  "Watermelon",
];

function debounce(fn, delay = 150) {
  let timerId = null;
  return (...args) => {
    clearTimeout(timerId);
    timerId = setTimeout(() => fn(...args), delay);
  };
}

// Simple memoized search using a Map
const searchCache = new Map();

function search(query, data = fruits) {
  const normalized = query.trim().toLowerCase();
  if (!normalized) return [];

  if (searchCache.has(normalized)) {
    return searchCache.get(normalized);
  }

  const results = data.filter((item) =>
    item.toLowerCase().includes(normalized),
  );
  searchCache.set(normalized, results);
  return results;
}

function initAutocomplete(inputBar, resultContainer, data = fruits) {
  let matches = [];
  let activeIndex = -1;

  // 1. WAI-ARIA Setup
  inputBar.setAttribute("role", "combobox");
  inputBar.setAttribute("aria-expanded", "false");
  inputBar.setAttribute("aria-controls", resultContainer.id);
  resultContainer.setAttribute("role", "listbox");
  resultContainer.hidden = true;

  // 2. Render Function
  function renderList() {
    resultContainer.replaceChildren();
    const hasMatches = matches.length > 0;

    resultContainer.hidden = !hasMatches;
    inputBar.setAttribute("aria-expanded", String(hasMatches));

    if (!hasMatches) {
      inputBar.removeAttribute("aria-activedescendant");
      return;
    }

    const fragment = document.createDocumentFragment();
    matches.forEach((item, index) => {
      const liElement = document.createElement("li");
      const isSelected = index === activeIndex;

      liElement.id = `ac-option-${index}`;
      liElement.setAttribute("role", "option");
      liElement.setAttribute("aria-selected", String(isSelected));
      liElement.dataset.index = String(index);
      liElement.textContent = item;

      if (isSelected) {
        inputBar.setAttribute("aria-activedescendant", liElement.id);
      }

      fragment.appendChild(liElement);
    });

    resultContainer.appendChild(fragment);
  }

  function closeList() {
    matches = [];
    activeIndex = -1;
    renderList();
  }

  function selectItem(index) {
    if (matches[index] === undefined) return;
    inputBar.value = matches[index];
    closeList();
  }

  // 3. Debounced Input Handler
  const handleInput = debounce((value) => {
    activeIndex = -1;
    matches = search(value, data);
    renderList();
  }, 150);

  inputBar.addEventListener("input", (e) => {
    handleInput(e.target.value);
  });

  // 4. Keyboard Navigation
  inputBar.addEventListener("keydown", (e) => {
    if (!matches.length) return;

    if (e.key === "ArrowDown") {
      e.preventDefault();
      activeIndex = (activeIndex + 1) % matches.length;
      renderList();
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      activeIndex = (activeIndex - 1 + matches.length) % matches.length;
      renderList();
    } else if (e.key === "Enter" && activeIndex >= 0) {
      e.preventDefault();
      selectItem(activeIndex);
    } else if (e.key === "Escape") {
      closeList();
    }
  });

  // 5. Event Delegation for Selection
  resultContainer.addEventListener("click", (e) => {
    const li = e.target.closest('[role="option"]');
    if (!li) return;
    selectItem(Number(li.dataset.index));
  });

  // 6. Scoped Outside-Click Handler
  document.addEventListener("click", (e) => {
    if (!inputBar.contains(e.target) && !resultContainer.contains(e.target)) {
      closeList();
    }
  });
}

// Initialize
const inputBar = document.getElementById("search");
const resultContainer = document.getElementById("result-list");
initAutocomplete(inputBar, resultContainer, fruits);
