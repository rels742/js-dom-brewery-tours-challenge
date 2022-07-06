// The 'Which state are you visiting?' form
const stateForm = document.querySelector("#select-state-form");

// The type of brewery dropdown option form
const selectTypeDropdown = document.querySelector("#filter-by-type");

// Targetting the ul for later use when creating dom elements and appending the li tot this variable.
const breweriesListEl = document.querySelector("#breweries-list");

const apiURL = "https://api.openbrewerydb.org/breweries";

// The state
const state = {
  types: ["regional", "micro", "brewpub"],
  breweryType: "",
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
    .then((data) => {
      // console.log("my data", data);
      setBreweries(data);
      render();
    });
});

selectTypeDropdown.addEventListener("change", (event) => {
  state.breweryType = event.target.value;

  render();

  //create an event listener that targets the drop down.

  //target value is the value of what the user has picked in the dropdown.

  // data has already been fetched

  // only render that specifc brewery type option
});

function setBreweries(allBreweries) {
  const filteredBreweries = allBreweries.filter((brewery) =>
    state.types.includes(brewery.brewery_type)
  );

  state.breweries = filteredBreweries;
}

// Render functions ...
const renderBrewery = (brewery) => {
  const liEl = document.createElement("li");

  const liHeader = document.createElement("h2");
  liHeader.innerHTML = `${brewery.name}`;

  const liDiv = document.createElement("div");
  liDiv.setAttribute("class", "type");
  liDiv.innerHTML = `${brewery.brewery_type}`;

  // Address section
  const liSection = document.createElement("section");
  liSection.setAttribute("class", "address");

  const liH3 = document.createElement("h3");
  liH3.innerText = "Address";

  const liP = document.createElement("p");
  liP.innerHTML = `${brewery.street}`;

  const liCityAndPostcodePStrong = document.createElement("strong");
  liCityAndPostcodePStrong.innerHTML = `${brewery.city}, ${brewery.postal_code} `;

  // Phone section
  const liSectionTwo = document.createElement("section");
  liSectionTwo.setAttribute("class", "phone");

  const liSectionTwoH3 = document.createElement("h3");
  liSectionTwoH3.innerText = "Phone";

  const liSectionTwoP = document.createElement("p");
  liSectionTwoP.innerHTML = `${brewery.phone}`;

  // Link website section
  const liSectionThree = document.createElement("section");
  liSectionThree.setAttribute("class", "link");

  const liSectionThreeAttribute = document.createElement("a");
  liSectionThreeAttribute.setAttribute("href", `${brewery.website_url}`);
  liSectionThreeAttribute.setAttribute("target", "_blank");

  liSectionThreeAttribute.innerText = "Visit Website";

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

  state.breweries.forEach((brewery) => {
    if (
      state.breweryType === "" ||
      state.breweryType === brewery.brewery_type
    ) {
      renderBrewery(brewery);
    }
  });
};

function render() {
  renderBreweries();
}
