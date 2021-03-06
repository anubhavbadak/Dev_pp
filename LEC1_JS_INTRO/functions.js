//BODY
function sayHi(){
    console.log("functio says hi!!!");
}

//CALL
sayHi();

console.log(sayHi()); //-->undefined return hoga

//FUNCTIONS ARE VARIABLES
let sayHi = function(){
    console.log("I am function stored in sayHi!!!");

}

console.log(sayHi);
//output--> [Function : sayHi]

//4
function sayHi(name){
    console.log(name + "says hi!!!");
}
sayHi("steve");

//5
function sayHi(name){
    console.log(name + "says hi!!!");
    return 10;
}
let value = sayHi("steve");
console.log(value);
