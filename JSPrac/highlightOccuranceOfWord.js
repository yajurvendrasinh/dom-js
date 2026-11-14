
const domA = document.getElementById('domA');


function highLightWordOccurance(element, wordLookup, highLightColor) {
  const regExp = new RegExp(wordLookup, 'g') ; // coz we want all occurance of the word
  element.innerHTML = element.innerHTML.replace(regExp, (word) => {
    return `<span style="background-color : ${highLightColor}">${word}</span>`
  })
}

highLightWordOccurance(domA, 'paragraph', 'yellow')


{/* <section id='domA'>
    Secondary Title - A
    paragraph A
    paragraph A.2
     Button A
  </section> */}