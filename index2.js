//Steve's startup code
const stateForm = document.querySelector("#select-state-form");

// creating the dom html elements so that when a us state is submited the list of breweries show
const breweriesList = document.querySelector("#breweries-list");

const apiURL = "https://api.openbrewerydb.org/breweries";

const state = {
  types: ["regional", "micro", "brewpub"],
  usState: "",
  breweries: [],
};

stateForm.addEventListener("submit", (event) => {
  console.log("my event", event, event.target);

  event.preventDefault();
  state.usState = event.target[0].value;

  fetch(`${apiURL}?by_state=${state.usState}&per_page=100`)
    .then((res) => {
      console.log("my fetch", res);
      return res.json();
    })
    .then((data) => {
      console.log("my data", data);
      state.breweries = data;
      render();
    });
});

function breweriesLiEl() {
  const liEl = document.createElement("li");
  liEl.innerHTML = ``;
  breweriesList.append(liEl);
  //after set their inner text
}

// const renderBrewery = (brewery) => {
//     const liEl = document.createElement("li");

//     liEl.innerHTML = `<h2>${brewery.name}</h2><h3> TODO: add the rest ...</h3>`;

//     breweriesListEl.append(liEl);
//   };

render = () => {
  // do stuff with state.breweries
  //create
  //append
};

// const stateform = docomuent.querySelect...

/// put this fetch into a form eventlisteneer function
// fetch("https://api.openbrewerydb.org/breweries?by_state=New York")
//   .then(function (Response) {
//     console.log("the response", Response);
//     return Response.json();
//   })
//   .then(function (data) {
//     console.log("the data", data);
//   });

//const state = {
//usState: ""
//brewries:[]
//}

//set state
// how to render the state?

// fetch data from api
//set state from that data
// then render

//The list should only shows the types of breweries that offer brewery tours:
// Micro
// Regional
// Brewpub

//const state = breweries []
// an event listener
