let p = new Promise((resolve, reject) => {
  let a = 1 + 2;
  if (a === 2) {
    resolve("Sucess");
  } else {
    reject("Failed");
  }
});

p.then((message) => {
  console.log("this is in then " + message);
}).catch((message) => {
  console.log("This is in the catch " + message);
});

// let userLeft = false;
// let userWatchingCatMeme = false;
// function watchTutorialCallback(callback, errorCallback) {
//   if (userLeft) {
//     errorCallback({
//       name: "User Left",
//       message: ":(",
//     });
//   } else if (userWatchingCatMeme) {
//     errorCallback({
//       name: "User Watching Cat Meme",
//       message: "WebDevSimplified < Cat",
//     });
//   } else {
//     callback("Thumbs up and Subscribe");
//   }
// }

// function watchTutorialPromise() {
//   let userLeft = false;
//   let userWatchingCatMeme = false;
//   return new Promise((resolve, reject) => {
//     if (userLeft) {
//       reject({
//         name: "User Left",
//         message: ":(",
//       });
//     } else if (userWatchingCatMeme) {
//       reject({
//         name: "User Watching Cat Meme",
//         message: "WebDevSimplified < Cat",
//       });
//     } else {
//       resolve("Thumbs up and Subscribe");
//     }
//   });
// }

// watchTutorialCallback(
//   (message) => {
//     console.log(message);
//   },
//   (error) => {
//     console.log(error.name + " " + error.message);
//   }
// );

// watchTutorialPromise()
//   .then((message) => {
//     console.log(message);
//   })
//   .catch((error) => {
//     console.log(error.name + " " + error.message);
//   });

// const recordVideoOne = new Promise((resolve, reject) => {
//   resolve("Video 1 Recorded");
// });

// const recordVideoTwo = new Promise((resolve, reject) => {
//   resolve("Video 2 Recorded");
// });

// const recordVideoThree = new Promise((resolve, reject) => {
//   resolve("Video 3 Recorded");
// });

// Promise.all([recordVideoOne, recordVideoTwo, recordVideoThree]).then(
//   (messages) => {
//     console.log(messages);
//   }
// );

// Promise.race([recordVideoOne, recordVideoTwo, recordVideoThree]).then(
//   (message) => {
//     console.log(message);
//   }
// );
