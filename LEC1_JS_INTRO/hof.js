//HIGH ORDER FUNCTION ->  Function which accept fn as an argument
//CALLBACK FUNCTION -> Function which gets passed as an argument

function getFirstName(fullname){
    fullname = fullname.split(" ");
    return fullname[0];
}

function getLastName(fullname){
    fullname = fullname.split(" ");
    return fullname[1];
}

function sayHi(fullname,fun){
    let name = fun(fullname);
    console.log(name);
}

sayHi("Tony Stark", getFirstName);
sayHi("Bruce Wayne",getLastName);
