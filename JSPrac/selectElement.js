const countryList = ['USA', 'INDIA', 'EUROPE', 'CANADA'];
const selectContainer = document.getElementById('select-container');

function renderSelect(options, container, { id = 'country-select', label = 'Select a country' } = {}) {
  // 1. Defensive guard
  if (!container || !Array.isArray(options) || options.length === 0) return;

  const fragment = document.createDocumentFragment();

  // 2. Accessibility: Associate a visible or screen-reader label
  const labelElement = document.createElement('label');
  labelElement.htmlFor = id;
  labelElement.textContent = label;

  const selectElement = document.createElement('select');
  selectElement.id = id;
  selectElement.name = id;

  // 3. Customizable Select structure (Button & <selectedcontent> go INSIDE <select>)
  // Note: Requires CSS `appearance: base-select;` in supporting browsers, 
  // and gracefully degrades to a standard <select> in older ones.
  const triggerButton = document.createElement('button');
  triggerButton.type = 'button'; // Prevent accidental form submission
  const selectedContent = document.createElement('selectedcontent');
  triggerButton.append(selectedContent);
  selectElement.append(triggerButton);

  // 4. Clean, semantic <option> creation
  options.forEach((optionText) => {
    const option = document.createElement('option');
    option.value = optionText.toLowerCase();
    option.textContent = optionText;
    fragment.append(option);
  });

  selectElement.append(fragment);
  
  // Clear container safely before mounting
  container.replaceChildren(labelElement, selectElement);
}

renderSelect(countryList, selectContainer);
