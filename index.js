// The 'Which state are you visiting?' form
const stateForm = document.querySelector("#select-state-form");

// <ul> that we render breweries into
const breweriesListEl = document.querySelector("#breweries-list");

// The external API the we get data from
const apiURL = "https://api.openbrewerydb.org/breweries";

// Our application's state
const state = {
  usState: "",
  breweries: [],
};

stateForm.addEventListener("submit", (event) => {
  console.log("my event", event, event.target);
  event.preventDefault();

  state.usState = event.target[0].value;

  fetch(`${apiURL}?by_state=${state.usState}&per_page=100`)
    .then((res) => {
      // console.log("my fetch", res);
      return res.json();
    })
    .then((breweries) => {
      // console.log("breweries", breweries);
      state.breweries = breweries;

      render();
    });
});

// Render functions ...

const renderBrewery = (brewery) => {
  const liEl = document.createElement("li");

  const liHeader = document.createElement("h2");
  liHeader.innerHTML = `${brewery.name}`;

  const liDiv = document.createElement("div");
  liDiv.setAttribute("class", "type");
  liDiv.innerHTML = `${brewery.brewery_type}`;

  const liSection = document.createElement("section");
  liSection.setAttribute("class", "address");

  const liH3 = document.createElement("h3");
  liH3.innerText = "Address";
  const liP = document.createElement("p");
  liP.innerHTML = `${brewery.street}`;

  const liCityAndPostcodePStrong = document.createElement("strong");
  liCityAndPostcodePStrong.innerHTML = `${brewery.city}, ${brewery.postal_code} `;

  const liSectionTwo = document.createElement("section");
  liSectionTwo.setAttribute("class", "phone");
  const liSectionTwoH3 = document.createElement("h3");
  liSectionTwoH3.innerText = "Phone";
  const liSectionTwoP = document.createElement("p");
  liSectionTwoP.innerHTML = `${brewery.phone}`;

  const liSectionThree = document.createElement("section");
  liSectionThree.setAttribute("class", "link");
  const liSectionThreeAttribute = document.createElement("a");
  liSectionThreeAttribute.setAttribute("href", `${brewery.website_url}`);
  liSectionThreeAttribute.setAttribute("target", "_blank");
  liSectionThreeAttribute.innerText = "Visit Website";

  //How do I set attributes with template literals
  //   liEl.innerHTML = `<h2>${brewery.name}</h2>`;
  // `<h3>${brewery.street}</h3>`

  breweriesListEl.append(liEl);
  liEl.append(liHeader);
  liEl.append(liDiv);
  liEl.append(liSection);
  liSection.append(liH3);
  liSection.append(liP);
  liSection.append(liCityAndPostcodePStrong);
  liEl.append(liSectionTwo);
  liSectionTwo.append(liSectionTwoH3);
  liSectionTwo.append(liSectionTwoP);
  liEl.append(liSectionThree);
  liSectionThree.append(liSectionThreeAttribute);
};

const clearBreweries = () => {
  breweriesListEl.innerHTML = "";
};

const renderBreweries = () => {
  clearBreweries();

  state.breweries.forEach((brewery) => renderBrewery(brewery));
};

function render() {
  renderBreweries();
}
