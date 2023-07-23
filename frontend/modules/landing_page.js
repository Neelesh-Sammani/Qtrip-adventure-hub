import config from "../conf/index.js";

async function init() {
  //Fetches list of all cities along with their images and description
  let cities = await fetchCities();
  console.log("From init()");
  console.log(config.backendEndpoint);
  console.log(cities);

  //Updates the DOM with the cities
  if (cities) {
    cities.forEach((key) => {
      addCityToDOM(key.id, key.city, key.description, key.image);
    });
  }
}

//Implementation of fetch call
async function fetchCities() {
  // TODO: MODULE_CITIES
  // 1. Fetch cities using the Backend API and return the data
  try{
  const response = await fetch(`${config.backendEndpoint}/cities`);
  const data = await response.json();
  return data;
  }
  catch(error){
    // Handle any errors that occurred during the request
    console.error('Error:', error);
    return null;
  };

  
}

//Implementation of DOM manipulation to add cities
// function addCityToDOM(id, city, description, image) {
//   // TODO: MODULE_CITIES
//   // 1. Populate the City details and insert those details into the DOM

// }
function addCityToDOM(id, city, description, image) {
  const colDiv = document.createElement('div');
  colDiv.classList.add('col-sm-6','col-lg-3','mb-4');
  //colDiv.id=id;

  const linkElement = document.createElement('a');
  linkElement.id=id;
  linkElement.href = `pages/adventures/?city=${id}`;
  
  const tileDiv = document.createElement('div');
  tileDiv.classList.add('tile');

  const tileTextDiv = document.createElement('div');
  tileTextDiv.classList.add('tile-text','text-center');

  const cityTitle = document.createElement('h3');
  cityTitle.textContent = city;
  const placesText = document.createElement('p');
  placesText.textContent = description;

  tileTextDiv.appendChild(cityTitle);
  tileTextDiv.appendChild(placesText);

  const cityImage = document.createElement('img');
  cityImage.src = image;
  cityImage.alt = 'image not available';

  tileDiv.appendChild(tileTextDiv);
  tileDiv.appendChild(cityImage);

  linkElement.appendChild(tileDiv);
  colDiv.appendChild(linkElement);

  const cityList = document.querySelector('#data');
  cityList.appendChild(colDiv);
//   const cardContainerElement = document.getElementById("data");
// let cardNew = document.createElement("div");
// cardNew.classList.add( "col-sm-6", "col-lg-3", "mb-4");
// cardNew.innerHTML = `<a href="pages/adventures/?city=${id}" id ="${id}">
//   <div class="tile">
//     <img src="${image}" alt="Card image cap"/>
//     <div class="tile-text text-center">
//     <h3>${city}</h3>
//     <p>${description}</p>
//   </div>
//   </div>
// </a>`
// ;
// cardContainerElement.appendChild(cardNew);
}



export { init, fetchCities, addCityToDOM };
