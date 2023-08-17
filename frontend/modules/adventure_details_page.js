import config from "../conf/index.js";

//Implementation to extract adventure ID from query params
function getAdventureIdFromURL(search) {
  // TODO: MODULE_ADVENTURE_DETAILS
  // 1. Get the Adventure Id from the URL
  const params = new URLSearchParams(search);
  const adventuresId = params.get('adventure');
  return adventuresId;

  // Place holder for functionality to work in the Stubs

}
//Implementation of fetch call with a paramterized input based on adventure ID
async function fetchAdventureDetails(adventureId) {
  // TODO: MODULE_ADVENTURE_DETAILS
  // 1. Fetch the details of the adventure by making an API call
  try{
    const response = await fetch(`${config.backendEndpoint}/adventures/detail?adventure=${adventureId}`);
    const data = await response.json();
    return data;
  }
  catch(error){
    console.error('Error:', error);
    return null;
  };

  // Place holder for functionality to work in the Stubs
  
}

//Implementation of DOM manipulation to add adventure details to DOM
function addAdventureDetailsToDOM(adventure) {
  // TODO: MODULE_ADVENTURE_DETAILS
  // 1. Add the details of the adventure to the HTML DOM
  const name = document.querySelector("#adventure-name");
  name.innerHTML= adventure.name;

  const subtitle = document.querySelector("#adventure-subtitle");
  subtitle.innerHTML = adventure.subtitle;

  const photos = document.querySelector("#photo-gallery");
  adventure.images.forEach(image => {
    const imageEach = document.createElement('img');
    imageEach.classList.add('activity-card-image');
    imageEach.src= image;
    photos.appendChild(imageEach);
  });

  const content = document.querySelector("#adventure-content");
  content.innerHTML = adventure.content;

}

//Implementation of bootstrap gallery component
function addBootstrapPhotoGallery(images) {
  // TODO: MODULE_ADVENTURE_DETAILS
  // 1. Add the bootstrap carousel to show the Adventure images
  const photos = document.querySelector("#photo-gallery");

  let carouselIndicators = "";
  let carouselItems = "";

  images.forEach((image, index) => {
    carouselIndicators += `
      <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="${index}" ${
      index === 0 ? 'class="active"' : ""
    } aria-label="Slide ${index + 1}"></button>
    `;

    carouselItems += `
      <div class="carousel-item ${index === 0 ? "active" : ""}">
        <img src="${image}" class="activity-card-image d-block w-100" alt="image not available">
      </div>
    `;
  });

  photos.innerHTML = `
    <div id="carouselExampleIndicators" class="carousel slide">
      <div class="carousel-indicators">
        ${carouselIndicators}
      </div>
      <div class="carousel-inner">
        ${carouselItems}
      </div>
      <button class="carousel-control-prev" type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide="prev">
        <span class="carousel-control-prev-icon" aria-hidden="true"></span>
        <span class="visually-hidden">Previous</span>
      </button>
      <button class="carousel-control-next" type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide="next">
        <span class="carousel-control-next-icon" aria-hidden="true"></span>
        <span class="visually-hidden">Next</span>
      </button>
    </div>
  `;
}


//Implementation of conditional rendering of DOM based on availability
function conditionalRenderingOfReservationPanel(adventure) {
  // TODO: MODULE_RESERVATIONS
  // 1. If the adventure is already reserved, display the sold-out message.
  const soldPanel = document.querySelector("#reservation-panel-sold-out");
  const reservePanel = document.querySelector("#reservation-panel-available");
  const reserveCost = document.querySelector("#reservation-person-cost");

  if(adventure.reserved){
    soldPanel.style.display = 'block';
    reservePanel.style.display = 'none';
  }

  else if(adventure.available){
    soldPanel.style.display ="none";
    reservePanel.style.display = "block";
    reserveCost.innerHTML = String(adventure.costPerHead);
  }
  else{
    reservePanel.style.display = "none";
    soldPanel.style.display = "block";
  }

}

//Implementation of reservation cost calculation based on persons
function calculateReservationCostAndUpdateDOM(adventure, persons) {
  // TODO: MODULE_RESERVATIONS
  // 1. Calculate the cost based on number of persons and update the reservation-cost field
  const reservationCostField = document.querySelector("#reservation-cost");
  const totalCost = adventure.costPerHead * persons;
  reservationCostField.textContent = `${totalCost}`;

}

//Implementation of reservation form submission
function captureFormSubmit(adventure) {
  // TODO: MODULE_RESERVATIONS
  // 1. Capture the query details and make a POST API call using fetch() to make the reservation
  // 2. If the reservation is successful, show an alert with "Success!" and refresh the page. If the reservation fails, just show an alert with "Failed!".
  const form = document.querySelector("#myForm");
  
  form.addEventListener("submit", async (event) => {
    event.preventDefault();
    
    const formData = new FormData(form);
    const data = {
      adventure: adventure.id,
      name: formData.get("name"),
      date: formData.get("date"),
      time: formData.get("time"),
      person: formData.get("person"),
     // adventure: formData.get('adventure.id')
    };
    
    try {
      const response = await fetch(`${config.backendEndpoint}/reservations/new`,{
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(data)
      });
      
      if (response.ok) {
        alert("Reservation Successful!");
        location.reload(); // Refresh the page to update the reservations
      } else {
        alert("Reservation Failed!");
      }
    } catch (error) {
      console.error('Error:', error);
      alert("Reservation Failed!");
    }
  });
}

//Implementation of success banner after reservation
function showBannerIfAlreadyReserved(adventure) {
  // TODO: MODULE_RESERVATIONS
  // 1. If user has already reserved this adventure, show the reserved-banner, else don't
  const reservedBanner = document.querySelector("#reserved-banner");
  
  if (adventure.reserved) {
    reservedBanner.style.display = "block";
  } else {
    reservedBanner.style.display = "none";
  }

}

export {
  getAdventureIdFromURL,
  fetchAdventureDetails,
  addAdventureDetailsToDOM,
  addBootstrapPhotoGallery,
  conditionalRenderingOfReservationPanel,
  captureFormSubmit,
  calculateReservationCostAndUpdateDOM,
  showBannerIfAlreadyReserved,
};
