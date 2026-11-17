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
