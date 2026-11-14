const domA = document.getElementById('domA');
const domB = document.getElementById('domB');
const targetFromA = document.getElementById('target');

function findCorrespondingNode(treeA, treeB, target) {
  const stackA = [treeA];
  const stackB = [treeB];
  
  while(stackA.length) {
    const currentA = stackA.pop();
    const currentB = stackB.pop();
    
    if(currentA === target) {
      return currentB;
    }
    
    stackA.push(...currentA.children);
    stackB.push(...currentB.children);
  }
}

console.log(findCorrespondingNode(domA, domB, targetFromA).textContent)

// DOM

//  <section id='domA'>
//     <h2>Secondary Title - A</h2>
//     <p>paragraph A</p>
//     <p>paragraph A.2</p>
//      <div>
//         <button id='target'>Button A</button>
//      </div>
//   </section>

//   <section id='domB'>
//     <h2>Secondary Title - B</h2>
//     <p>paragraph B</p>
//     <p>paragraph B.2</p>
//      <div>
//         <button>Button B</button>
//      </div>
//   </section>