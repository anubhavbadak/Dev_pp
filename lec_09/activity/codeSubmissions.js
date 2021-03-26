const puppeteer = require("puppeteer");
let email = "tasoki4763@asfalio.com";
let pwd = "123123";
let tab;

let browserOpenPromise = puppeteer.launch({
    headless:false,
    defaultViewport:null,
    args: ["--start-maximized"],
    slowMo: 200
});

browserOpenPromise.then(function(browser){
    console.log("Browser Opened!!!");

    //console.log(browser);

    let allPagesPromise = browser.pages();

    return allPagesPromise
})

.then(function(pages){
    tab = pages[0];
    let pageOpenPromise = tab.goto("https://www.hackerrank.com/auth/login");
    return pageOpenPromise; 
})

.then(function(){
    let idTypePromise = tab.type("#input-1",email);
    return idTypePromise;
})

.then(function(){
    let pwdPromise = tab.type("#input-2",pwd);
    return pwdPromise;
})
.then(function(){
    let loginPromise = tab.click(".ui-btn.ui-btn-large.ui-btn-primary.auth-button.ui-btn-styled");
    return loginPromise;
})
.then(function(){
    console.log("login krdiyaaaaaa");
})
//SABKA BAS EK HI CATCH HOGA
.catch(function(error){
    console.log(error);
})