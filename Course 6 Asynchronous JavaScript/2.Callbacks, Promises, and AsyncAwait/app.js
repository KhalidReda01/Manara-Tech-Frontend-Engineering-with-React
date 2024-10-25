// const fetch = require("node-fetch");
// const fs = require("fs");

//****************************Callbacks******************** */

// setTimeout(() => {
//   console.log("waited 4 second ");
// }, 4000);

// console.log("test");
// nested setTimeout outs
setTimeout(() => {
  console.log("3");
  setTimeout(() => {
    console.log("2");
    setTimeout(() => {
      console.log("1");
    }, 1000);
  }, 1000);
}, 1000);
// button in event handler in browser Javascript
// let btn;
// btn.addEventListner("click", () => {});
// this code run in node we don't have access to the dom
