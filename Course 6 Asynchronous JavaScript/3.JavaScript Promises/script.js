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
