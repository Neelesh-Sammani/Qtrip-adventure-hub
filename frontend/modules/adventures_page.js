import config from "../conf/index.js";

//Implementation to extract city from query params
function getCityFromURL(search) {
  // TODO: MODULE_ADVENTURES
  // 1. Extract the city id from the URL's Query Param and return it
  const params = new URLSearchParams(search);
  const cityId = params.get('city');
  return cityId;
}
  // const url= new URL("http://13.232.164.162:8081/frontend/pages/adventures/?city=bengaluru")
  // const cityId = getCityFromURL(url.search);
  // console.log(cityId);

//Implementation of fetch call with a paramterized input based on city
async function fetchAdventures(city) {
  // TODO: MODULE_ADVENTURES
  // 1. Fetch adventures using the Backend API and return the data
  try{
    const response = await fetch(`${config.backendEndpoint}/adventures?city=${city}`);
    const data = await response.json();
    return data;
  }
  catch(error){
      // Handle any errors that occurred during the request
    console.error('Error:', error);
    return null;
  };

}

//Implementation of DOM manipulation to add adventures for the given city from list of adventures
function addAdventureToDOM(adventures) {
  // TODO: MODULE_ADVENTURES
  // 1. Populate the Adventure Cards and insert those details into the DOM
  const container= document.querySelector("#data");
  adventures.forEach((adventure)=>{
    const elementDiv=document.createElement('div');
    elementDiv.classList.add('col-6','col-lg-3','mb-4');

    const linkElement=document.createElement('a');
    linkElement.href=`detail/?adventure=${adventure.id}`;
    linkElement.id=adventure.id;

    const contentDiv=document.createElement('div');
    contentDiv.classList.add("activity-card");

    const categoryBanner=document.createElement('div');
    categoryBanner.classList.add('category-banner');
    categoryBanner.textContent=adventure.category;

    // const imageDiv=document.createElement('div');
    // imageDiv.classList.add("activity-card","img","overflow-hidden","object-fit-cover");

    const adventureImage=document.createElement('img');
    adventureImage.classList.add("img-responsive");
    adventureImage.src=adventure.image;
    adventureImage.alt=adventure.name;

    //imageDiv.appendChild(adventureImage);

    
    const textDiv=document.createElement("div");
    textDiv.classList.add("activity-card-text","text-md-center","w-100","mt-3","px-2");

    const leftDiv=document.createElement('div');
    leftDiv.classList.add("d-block","d-md-flex","justify-content-between","flex-wrap","pl-3","pr-3");
    
    const cardName=document.createElement('h5');
    cardName.classList.add("text-left");
    cardName.textContent= adventure.name;

    const inr=document.createElement('p');
    inr.textContent="₹"+adventure.costPerHead;


    leftDiv.appendChild(cardName);
    leftDiv.appendChild(inr);

    const rightDiv=document.createElement('div');
    rightDiv.classList.add("d-block","d-md-flex","justify-content-between","flex-wrap","pl-3","pr-3");

    const duration=document.createElement('h5');
    duration.classList.add("text-left");
    duration.textContent="Duration";

    const hours=document.createElement('p');
    hours.textContent=adventure.duration+" hours";

    rightDiv.appendChild(duration);
    rightDiv.appendChild(hours);

    textDiv.appendChild(leftDiv);
    textDiv.appendChild(rightDiv);

    contentDiv.appendChild(categoryBanner);
    contentDiv.appendChild(adventureImage);
    contentDiv.appendChild(textDiv);

    linkElement.appendChild(contentDiv);

    elementDiv.appendChild(linkElement);
  
    container.appendChild(elementDiv);
  });

  
}

//Implementation of filtering by duration which takes in a list of adventures, the lower bound and upper bound of duration and returns a filtered list of adventures.
function filterByDuration(list, low, high) {
  // TODO: MODULE_FILTERS
  // 1. Filter adventures based on Duration and return filtered list
  return list.filter(e => e.duration>=low && e.duration<=high);

}

//Implementation of filtering by category which takes in a list of adventures, list of categories to be filtered upon and returns a filtered list of adventures.
function filterByCategory(list, categoryList) {
  // TODO: MODULE_FILTERS
  // 1. Filter adventures based on their Category and return filtered list
  return list.filter(e => categoryList.includes(e.category));

}

// filters object looks like this filters = { duration: "", category: [] };

//Implementation of combined filter function that covers the following cases :
// 1. Filter by duration only
// 2. Filter by category only
// 3. Filter by duration and category together

function filterFunction(list, filters) {
  // TODO: MODULE_FILTERS
  // 1. Handle the 3 cases detailed in the comments above and return the filtered list of adventures
  // 2. Depending on which filters are needed, invoke the filterByDuration() and/or filterByCategory() methods
  let filteredList=list;
  if(filters.duration){
    let [low,high]=filters.duration.split('-');
    filteredList = filterByDuration(filteredList, Number(low), Number(high));
  }

  if(filters.category.length>0){
    filteredList = filterByCategory(filteredList,filters.category);
  }

  // Place holder for functionality to work in the Stubs
  return filteredList;

}

//Implementation of localStorage API to save filters to local storage. This should get called everytime an onChange() happens in either of filter dropdowns
function saveFiltersToLocalStorage(filters) {
  // TODO: MODULE_FILTERS
  // 1. Store the filters as a String to localStorage
  localStorage.setItem('filters',JSON.stringify(filters));

  return true;
}

//Implementation of localStorage API to get filters from local storage. This should get called whenever the DOM is loaded.
function getFiltersFromLocalStorage() {
  // TODO: MODULE_FILTERS
  // 1. Get the filters from localStorage and return String read as an object
  const filterString = localStorage.getItem('filters');


  // Place holder for functionality to work in the Stubs
 return filterString?JSON.parse(filterString):null;
}

//Implementation of DOM manipulation to add the following filters to DOM :
// 1. Update duration filter with correct value
// 2. Update the category pills on the DOM

function generateFilterPillsAndUpdateDOM(filters) {
  // TODO: MODULE_FILTERS
  // 1. Use the filters given as input, update the Duration Filter value and Generate Category Pills
  const durationSelect = document.getElementById('duration-select');
  durationSelect.value = filters.duration;

  const categoryListContainer = document.getElementById('category-list');
  categoryListContainer.innerHTML = '';

  filters.category.forEach(category => {
    const categoryPill = document.createElement('div');
    categoryPill.classList.add('category-filter');
    categoryPill.textContent = category;
    categoryListContainer.appendChild(categoryPill);
  });

}
export {
  getCityFromURL,
  fetchAdventures,
  addAdventureToDOM,
  filterByDuration,
  filterByCategory,
  filterFunction,
  saveFiltersToLocalStorage,
  getFiltersFromLocalStorage,
  generateFilterPillsAndUpdateDOM,
};
