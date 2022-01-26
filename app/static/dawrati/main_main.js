console.log("Hello");

const navbar = document.getElementById("navbar")
const li1 = document.getElementById("li1")
const li2 = document.getElementById("li2")
const li3 = document.getElementById("li3")
const li4 = document.getElementById("li4")
const li5 = document.getElementById("li5")
const li12 = document.getElementById("li12")
const li22 = document.getElementById("li22")
const li32 = document.getElementById("li32")
const li42 = document.getElementById("li42")
const li52 = document.getElementById("li52")
const logoo = document.getElementById("logoo")

window.addEventListener("scroll", () => {

console.log("y=",window.scrollY);

if(window.scrollY>10){
navbar.classList.add("active");
li1.classList.add("active1");
li2.classList.add("active2");
li3.classList.add("active3");
li4.classList.add("active4");
li5.classList.add("active5");
li12.classList.add("active12");
li22.classList.add("active22");
li32.classList.add("active32");
li42.classList.add("active42");
li52.classList.add("active52");
logoo.classList.add("activel");

} else {
    navbar.classList.remove("active");
    li1.classList.remove("active1");
    li2.classList.remove("active2");
    li3.classList.remove("active3");
    li4.classList.remove("active4");
    li5.classList.remove("active5");
    li12.classList.remove("active12");
    li22.classList.remove("active22");
    li32.classList.remove("active32");
    li42.classList.remove("active42");
    li52.classList.remove("active52");
    logoo.classList.remove("activel");
}



});





