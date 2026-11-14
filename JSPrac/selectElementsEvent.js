const countryList = ['USA', 'INDIA', 'EUROPE', 'CANADA'];
const selectContainer = document.getElementById('select-container');

function createCountrySelector(container, options, { id = 'country-select', initialValue = 'usa', onChange } = {}) {
  if (!container || !Array.isArray(options) || options.length === 0) return null;

  // 1. Centralized Component State
  const state = {
    selectedValue: initialValue.toLowerCase(),
  };

  // 2. Render Function
  function render() {
    const fragment = document.createDocumentFragment();

    const label = document.createElement('label');
    label.htmlFor = id;
    label.textContent = 'Select a country';

    const select = document.createElement('select');
    select.id = id;
    select.name = id;

    // Customizable select trigger
    const triggerButton = document.createElement('button');
    triggerButton.type = 'button';
    triggerButton.append(document.createElement('selectedcontent'));
    select.append(triggerButton);

    options.forEach((optionText) => {
      const value = optionText.toLowerCase();
      const option = document.createElement('option');
      option.value = value;
      option.textContent = optionText;
      
      // Sync initial DOM state with component state
      if (value === state.selectedValue) {
        option.selected = true;
      }
      
      fragment.append(option);
    });

    select.append(fragment);
    container.replaceChildren(label, select);
  }

  // 3. Event Delegation on Parent Container
  function handleDelegatedChange(event) {
    // Filter to ensure the event came from our target <select>
    const select = event.target.closest(`select#${id}`);
    if (!select) return;

    // Update internal state from the DOM's native value
    state.selectedValue = select.value;

    // Notify external consumers / parent state
    if (typeof onChange === 'function') {
      onChange(state.selectedValue);
    }
  }

  // 4. Programmatic State Sync (Two-Way Binding)
  function setValue(newValue) {
    const normalized = String(newValue).toLowerCase();
    const select = container.querySelector(`select#${id}`);
    
    if (select && [...select.options].some((opt) => opt.value === normalized)) {
      state.selectedValue = normalized;
      select.value = normalized; // Automatically updates <selectedcontent>
    }
  }

  // Initialize DOM & Bind Delegated Listener
  render();
  container.addEventListener('change', handleDelegatedChange);

  // 5. Return Public API & Teardown Method (Prevents Memory Leaks)
  return {
    getValue: () => state.selectedValue,
    setValue,
    destroy: () => container.removeEventListener('change', handleDelegatedChange),
  };
}

// --- Usage Example ---
const countryPicker = createCountrySelector(selectContainer, countryList, {
  initialValue: 'CANADA',
  onChange: (newCountry) => {
    console.log('Synced state:', newCountry);
  },
});

// External state change automatically updates <select> AND <selectedcontent>
// countryPicker.setValue('INDIA');
// 

function createSelect(container, options, { id = 'country-select', initial = '', onChange } = {}) {
  if (!container || !options?.length) return null;
  let value = initial.toLowerCase();

  const label = Object.assign(document.createElement('label'), { htmlFor: id, textContent: 'Select country' });
  const select = Object.assign(document.createElement('select'), { id, name: id });

  const btn = Object.assign(document.createElement('button'), { type: 'button' });
  btn.append(document.createElement('selectedcontent'));
  select.append(btn);

  const frag = document.createDocumentFragment();
  options.forEach((text) => {
    const val = text.toLowerCase();
    frag.append(Object.assign(document.createElement('option'), {
      value: val,
      textContent: text,
      selected: val === value,
    }));
  });

  select.append(frag);
  container.replaceChildren(label, select);

  const handleChange = (e) => {
    if (!e.target.closest(`select#${id}`)) return;
    value = e.target.value;
    onChange?.(value);
  };

  container.addEventListener('change', handleChange);

  return {
    getValue: () => value,
    setValue: (next) => { select.value = value = next.toLowerCase(); },
    destroy: () => container.removeEventListener('change', handleChange),
  };
}
