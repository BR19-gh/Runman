let listOfProjects = [{
    "img": "../static/img/onlinestore.png",
    "title": "Fullstack Online Store Billing System",
    "link": "https://br19-onlinestore.herokuapp.com/",
    "description": "A fullstack online store model that gives the store owner the ability to add products and their prices, the ability to add promocodes which their customers can use, and the ability of a customer to send their bill to the owner's WhatsApp, The store uses Flask as its backend, PostgreSQL as database, and CSS/Bootstrap, HTML, and JS as its frontend.",
}, {
    "img": "../static/img/Runman.png",
    "title": "Fullstack Platform Game",
    "link": "/runman/en",
    "description": "A side-scrolling fullstack pixel game where player has to make the character avoid obstacles and kill the monsters. The game uses Flask as its backend, PostgreSQL as database, and CSS, HTML and JS as its frontend.",
}, {
    "img": "../static/img/Blogger.png",
    "title": "Blog Website",
    "link": "/blogger/login",
    "description": "Frontend blog website that makes the user upload blogs with titles after logging in as \"admin \".",
}, {
    "img": "../static/img/DemonsKiller.png",
    "title": "Mini Game",
    "link": "/demonskiller/en",
    "description": "The game objective is to kill the demons (by clicking on them) as much as possible without killing any human.",
}, {
    "img": "../static/img/Dagshtick.png",
    "title": "Game Calculater",
    "link": "/dagshtick",
    "description": "Calculator for the famous Saudi card game مداقش <b></b> (similar to Poker) that do the full math in the game for the players.",
}, {
    "img": "../static/img/dawrati.png",
    "title": "Courses Website",
    "link": "/dawrati",
    "description": "Sample frontend website for organizations that offer courses and self-improvement sessions.",
}, {
    "img": "../static/img/onethree.png",
    "title": "Quiz App",
    "link": "/onethree",
    "description": "Quiz app that can include as many questions as wanted with multiple answers provided.",
}, ];

for (let project in listOfProjects) {
    document.write(
        `<div class="carousel-item"> 
<img src="${listOfProjects[project]["img"]}" class="d-block w-100" alt="${listOfProjects[project]["img"]}"> 
<div class="carousel-caption  d-md-block"> <h5>${listOfProjects[project]["title"]}</h5> 
<p class="pInPupupProjects">${listOfProjects[project]["description"]}</p> 
<div onclick="location.assign('${listOfProjects[project]["link"]}');" class="card-body"> 
    <p class="card-text">Press HERE to Go to the Project.</p> 
    </div> </div> </div> `
    )
}