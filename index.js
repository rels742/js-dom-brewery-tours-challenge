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

// Setup listener (currently just one) ...

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

  liEl.innerHTML = `<h2>${brewery.name}</h2><h3> TODO: add the rest ...</h3>`;

  breweriesListEl.append(liEl);
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
