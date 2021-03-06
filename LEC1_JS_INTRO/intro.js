//TOP TO DOWN
//EFT TO RIGHT

//DATA TYPE
//int,char,String,double,float,boolean,big int
//javascript --> 
    //number(int,char,float big int,long)
    //boolean(true,false)
    //string('a',"ahiudikd")
    //undefined
    //object

//VARIABLES
let a = 10;//blocked scope hota hain variables ka\
//koi 

if(true){
    let a = 20;
    //ye a aur upar waala a alag hain 
    //is a ka scope is if k andar tak hi hain
}

console.log(a);

const pi = 3.14; //ye ek baar value assign krdi to fir change nahi ho skti
//intialize bhi vahi krna padega

// == ans ===
console.log(10 == "10");
console.log(10 === "10")

//OBJECTS -->Key Value Pairs
let data = {
    name : "Bruce Wayne",
    place :"Gotham",
}

console.log(data.name, data.pace);
let key = "name";
//console.log(data.key) --> ye error dega 
//Dot notation mein literal check hota hain

console.log(data[key]);//ye sahi hain

//ADDING A NEW KEY TO OBJECT
data.butler = "Alfred";
console.log(data);

//KEYS ARE UNIQUE
data.place = "Wayne Manor";


//ARRAY --> KUCH BHI DAAL LO ISME
let value = [
    10,false,
    {
        name : "Steve Rogers",
        place : "California",

    },
    [1,2,3,4,5,6],
    "hey i am a value",
];
console.log(value[3][5]);

//to get all key
for(let key in data){
    console.log(key);
}
