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

const searchBar = document.getElementById("search-bar");
const resultList = document.getElementById("result-list");

function debounce(callbackFn, delay) {
  let timer;
  return (...args) => {
    clearTimeout(timer);
    timer = setTimeout(() => {
      callbackFn(...args);
    }, delay);
  };
}

const filterAndrenderData = debounce((query, data) => {
  let normalizeQuery = query.toLowerCase();
  let dataSuggestions = data.filter((item) =>
    item.toLowerCase().includes(normalizeQuery),
  );
  // console.log(dataSuggestions)
  renderList(dataSuggestions);
}, 420);

function renderList(collection) {
  const fragment = document.createDocumentFragment();
  resultList.replaceChildren();

  collection.forEach((listItem, idx) => {
    let liElement = document.createElement("li");
    liElement.textContent = `${listItem}`;
    liElement.id = `${listItem}-${idx}`;

    fragment.append(liElement);
  });

  resultList.hidden = false;
  resultList.append(fragment);
  searchBar.setAttribute("aria-expanded", "true");
}

function autocompleteFeature(searchElement, data) {
  // add input event
  searchElement.addEventListener("input", (e) => {
    filterAndrenderData(e.target.value, data);
  });
}

autocompleteFeature(searchBar, fruits);

// upgrades

// 1. Guard empty queries & empty results inside renderList
function renderList(collection) {
  resultList.replaceChildren();
  const hasItems = collection.length > 0;
  resultList.hidden = !hasItems;
  searchBar.setAttribute("aria-expanded", String(hasItems));
  if (!hasItems) return;

  const fragment = document.createDocumentFragment();
  collection.forEach((listItem, idx) => {
    const liElement = document.createElement("li");
    liElement.textContent = listItem;
    liElement.id = `option-${idx}`; // No spaces in ID
    liElement.setAttribute("role", "option");
    fragment.append(liElement);
  });
  resultList.append(fragment);
}

// 2. Guard empty input before filtering
const filterAndRenderData = debounce((query, data) => {
  const normalizeQuery = query.trim().toLowerCase();
  if (!normalizeQuery) {
    renderList([]);
    return;
  }
  const dataSuggestions = data.filter((item) =>
    item.toLowerCase().includes(normalizeQuery),
  );
  renderList(dataSuggestions);
}, 200);

// 3. Add Click Selection + Outside Click Close
resultList.addEventListener("click", (e) => {
  const li = e.target.closest("li");
  if (!li) return;
  searchBar.value = li.textContent;
  renderList([]);
});

document.addEventListener("click", (e) => {
  if (!searchBar.contains(e.target) && !resultList.contains(e.target)) {
    renderList([]);
  }
});
