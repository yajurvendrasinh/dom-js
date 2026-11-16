//recursive

function deepFlattenArray(arr) {
  if (!Array.isArray(arr)) return null;

  return arr.reduce((acc, elem) => {
    if (Array.isArray(elem)) {
      acc.push(...deepFlattenArray(elem));
    } else {
      acc.push(elem);
    }
    return acc;
  }, []);
}

//iterative

function iterativeDeepFlatten(arr) {
  if (!Array.isArray(arr)) return null;

  let stack = [...arr];
  let result = [];

  while (stack.length) {
    let currentElem = stack.pop();

    if (Array.isArray(currentElem)) {
      stack.push(...currentElem);
    } else {
      result.push(currentElem);
    }
  }

  return result.reverse();
}
