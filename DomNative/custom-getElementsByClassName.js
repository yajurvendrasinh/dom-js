/**
 * Custom implementation of Element.prototype.getElementsByClassName.
 * Traverses descendants of `root` in pre-order (document order) and
 * returns all elements containing every class in `classNames`.
 */
function getElementsByClassName(root, classNames) {
  const matchedElements = [];

  if (!root || typeof classNames !== 'string') {
    return matchedElements;
  }

  // Normalize whitespace and handle multi-class queries (e.g., "btn   primary")
  const requiredClasses = classNames.trim().split(/\s+/).filter(Boolean);
  if (requiredClasses.length === 0) {
    return matchedElements;
  }

  const hasAllRequiredClasses = (element) =>
    requiredClasses.every((className) => element.classList.contains(className));

  function traverseDescendants(parent) {
    // Use .children (Element nodes only) to safely skip text and comment nodes
    for (const child of parent.children) {
      if (hasAllRequiredClasses(child)) {
        matchedElements.push(child);
      }
      traverseDescendants(child);
    }
  }

  // Start from root's descendants (native API excludes root itself)
  traverseDescendants(root);
  return matchedElements;
}
