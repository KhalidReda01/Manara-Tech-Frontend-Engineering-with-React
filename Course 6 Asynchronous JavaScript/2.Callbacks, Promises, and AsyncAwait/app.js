// const fetch = require("node-fetch");
// const fs = require("fs");

//****************************Callbacks******************** */

// setTimeout(() => {
//   console.log("waited 4 second ");
// }, 4000);

// console.log("test");
// nested setTimeout outs
// setTimeout(() => {
//   console.log("3");
//   setTimeout(() => {
//     console.log("2");
//     setTimeout(() => {
//       console.log("1");
//     }, 1000);
//   }, 1000);
// }, 1000);
// button in event handler in browser Javascript
// let btn;
// btn.addEventListner("click", () => {});
// this code run in node we don't have access to the dom
// error first callback
// fs.readFile("./test.text", { encoding: "utfa-8" }, (err, data) => {
//   if (err) {
//     console.log("Error");
//     console.log(err);
//   } else {
//     console.log("Got Data");
//     console.log(data);
//   }
// });

// Create a promise
// const myPromise = new Promise((resolve, reject) => {
//   const rand = Math.floor(Math.random() * 6) + 1;
//   if (rand === 0) {
//     resolve();
//   } else {
//     reject();
//   }
// });
// myPromise
//   .then(() => console.log("Success"))
//   .catch(() => console.error("something is wrong"));

// fetch with promises
fetch(" https://pokeapi.co/api/v2/pokemon/ditto")
  .then((res) => res.json())
  .then((data) => console.log(data))
  .catch((err) => console.log(err));
//fetch Pokemon with async / await without error handling
const fetchPokemon = async (id) => {
  const res = await fetch(`https://pokeapi.co/api/v2/pokemon/${id})`);
  const data = await res.json();
  console.log(data);
};
fetchPokemon(2);
