/**
 * Custom implementation of Element.prototype.querySelectorAll.
 * Returns a static array of all descendants of `root` in document order
 * that match `selector`.
 */
function customQuerySelectorAll(root, selector) {
  const matchedElements = [];
  if (!root || typeof selector !== 'string') return matchedElements;

  const selectorGroups = parseSelector(selector);
  if (selectorGroups.length === 0) return matchedElements;

  function collectAllMatches(parent) {
    for (const child of parent.children) {
      if (matchesSelector(child, selectorGroups, root)) {
        matchedElements.push(child);
      }
      collectAllMatches(child);
    }
  }

  collectAllMatches(root);
  return matchedElements;
}

// /// ///

/**
 * Checks if a single element matches a simple or compound selector
 * (e.g., "div", ".btn", "#header", or "button.btn.primary#submit").
 */
function matchesSimpleSelector(element, selector) {
  if (!element || element.nodeType !== 1) return false;

  // Tokenize into tag, #id, and .class parts
  const tokens = selector.match(/(?:^[a-zA-Z0-9-]+)|(?:[#.][a-zA-Z0-9_-]+)/g);
  if (!tokens || tokens.join('') !== selector) return false;

  for (const token of tokens) {
    if (token.startsWith('#')) {
      if (element.id !== token.slice(1)) return false;
    } else if (token.startsWith('.')) {
      if (!element.classList.contains(token.slice(1))) return false;
    } else {
      // Tag names in HTML DOM are uppercase (e.g., "DIV")
      if (element.tagName !== token.toUpperCase()) return false;
    }
  }

  return true;
}

/**
 * Checks whether `element` matches any comma-separated selector in `selectorGroup`.
 */
function matchesSelector(element, parsedSelectorGroups, root) {
  return parsedSelectorGroups.some((chainParts) =>
    matchesDescendantChain(element, chainParts, root)
  );
}

/**
 * Parses "div.card p, .highlight" into [["div.card", "p"], [".highlight"]].
 */
function parseSelector(selector) {
  if (typeof selector !== 'string' || !selector.trim()) return [];
  return selector
    .split(',')
    .map((group) => group.trim().split(/\s+/).filter(Boolean))
    .filter((chain) => chain.length > 0);
}


/**
 * Evaluates a descendant chain (e.g., ["div.card", "ul", "li.active"])
 * right-to-left against an element and its ancestors up to `root`.
 */
function matchesDescendantChain(element, chainParts, root) {
  let currentElement = element;
  let partIndex = chainParts.length - 1;

  // The rightmost selector must match the candidate element itself
  if (!matchesSimpleSelector(currentElement, chainParts[partIndex])) {
    return false;
  }

  partIndex--;
  currentElement = currentElement.parentElement;

  // Walk upward through ancestors to match remaining selector parts
  while (currentElement && currentElement !== root && partIndex >= 0) {
    if (matchesSimpleSelector(currentElement, chainParts[partIndex])) {
      partIndex--;
    }
    currentElement = currentElement.parentElement;
  }

  return partIndex < 0;
}

