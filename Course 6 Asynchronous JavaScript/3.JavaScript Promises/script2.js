// doJimWork = () => {
//   return true;
// };
// function handleJimWork(successCallback, errorCallback) {
//   // Slow method that runs in the background
//   const success = doJimWork();
//   if (success) {
//     successCallback();
//   } else {
//     errorCallback();
//   }
// }

// handleJimWork(
//   () => {
//     console.log("Success");
//   },
//   () => {
//     console.error("Error");
//   }
// );
// const myPromise = new Promise((resolve, reject) => {
//   let sucess = false;
//   if (sucess) {
//     resolve("you sucessed");
//   } else {
//     reject("you failed");
//   }
// });

// myPromise
//   .then((result) => {
//     console.log(result);
//   })
//   .catch((error) => {
//     console.log(error);
//   });

// Tutorial Docs
//https://www.w3schools.com/js/js_callback.asp
