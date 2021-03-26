











let fs = require("fs");


let f1kapendingPromise = fs.promises.readFile("./f1.txt");

f1kapendingPromise.then(function(data){
    let f2Kapendingpromise = fs.promises.readFile("./f2.txt");
    console.log(data+"");

    f2Kapendingpromise.then(function(data){
        let f3Kapendingpromise = fs.promises.readFile("./f3.txt");
        console.log(data+"");


        f3Kapendingpromise.then(function(data){
            console.log(data+"");
        })
    })
})