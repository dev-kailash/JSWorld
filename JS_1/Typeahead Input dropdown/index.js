import getCountries from "./fetchData.js";

const inputbox = document.getElementById('search-input');
const suggestionbox = document.querySelector('.suggestion-box');


const handleSuggestion  = async (e) => {
    let keyword = e.target.value;
    console.log(keyword);
    if ( keyword != '') {
        let countryNameArr = await handleSearch(keyword);
        populateSuggestions(countryNameArr);
    } else {
        suggestionbox.classList.remove('visible');
        suggestionbox.innerHTML = '';
    }

}

const populateSuggestions = (countryNameArr) => {
    suggestionbox.classList.remove('visible');
    suggestionbox.innerHTML = '';
     if ( countryNameArr.length) {
        suggestionbox.classList.add('visible');
        const fragment = document.createDocumentFragment();
        countryNameArr.forEach( countryName => {
            const li = document.createElement('li');
            li.innerText = countryName;
            fragment.appendChild(li);
        });

        suggestionbox.appendChild(fragment);
     }

     
}

async function handleSearch(keyword) {
    let countryName = await getCountries(keyword);
    let countryNameArr; 
    if ( countryName["message"] != "Not Found") {
        countryNameArr = countryName.map( obj => obj.name.common);
    } 
    console.log(countryName);
    return countryNameArr;
}

// Debouncing in JS
function debounce( fn, delay = 1000) {
    let timerId;
    return function(...args) {
        clearInterval(timerId);
        timerId = setTimeout(() => {
            fn(...args);
        }, delay);
    }
}

let debounceFn =  debounce(handleSuggestion, 300)

inputbox.addEventListener('input', debounceFn);