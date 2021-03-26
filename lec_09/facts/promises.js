const fs = require("fs");


let pendingPromise = fs.promises.readFile("./f1.txt");

console.log(pendingPromise);


pendingPromise.then(function(data){
    console.log("Inside then ka callback i.e scb fn");
    console.log(data+"");
    console.log(pendingPromise);
})


pendingPromise.catch(function(error){
    console.log("Inside catch ka callback i.e fcb fn");
    console.log("error");
    console.log(pendingPromise);
})