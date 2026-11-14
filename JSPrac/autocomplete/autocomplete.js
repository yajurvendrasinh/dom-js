const DATA_URL = './state_capitals.json'

const inputElement = document.getElementById('search');
const resultDom = document.getElementById('result');

async function getData(url) {
    try {
        const response = await fetch(url);
        if(!response.ok) {
            throw new Error('Response not obtained', response.status);
        }

        const data = response.json();
        console.log(data)
        return data;
    } catch(error) {
        console.error('Error while fetching data');
        return error
    }
}

getData(DATA_URL);
// console.log(countries())
function renderCountryCard(countryData) {}