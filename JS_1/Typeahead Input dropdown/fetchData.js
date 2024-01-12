
const url="https://restcountries.com/v3.1/name/";

async function getCountries(keyword) {
    const response = await fetch(`${url}${keyword}`);
    const data = await response.json();
    return data;     
}

// let result = await getCountries('india');
// console.log(result);
// result.forEach(element => {
//     console.log(element.name.common);
// });

export default getCountries;
