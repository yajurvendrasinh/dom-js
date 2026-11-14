function addColumn() {
    const mainBodyElement = document.getElementById('main-body');
    const childDiv = document.createElement('div')
    mainBodyElement.appendChild(childDiv)
    console.log('child added')
}

// const input = document.querySelector('input')
// const typedResult = document.getElementById('typed-str')

// input.addEventListener('change', updateValue);
// function updateValue(e) {
//     typedResult.textContent = e.target.value
// }

const input = document.querySelector("input");
const log = document.getElementById("log");

input.addEventListener("change", updateValue);

function updateValue(e) {
      console.log(e.target.value)

  log.textContent = e.target.value;
}


// function as values
// let square = function() {}

// declaration notation
// function square() {}

// Arrow Function
// const square = () => {}