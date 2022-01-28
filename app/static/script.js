let pageName = window.location.pathname.split("/").pop();

// if (location.protocol !== "https:") {
//     location.protocol = "https:";
// }

window.addEventListener('load', function() {
    if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
        document.getElementById('linkedInBadge').setAttribute("data-theme", "dark");
    }

    if (window.matchMedia && window.matchMedia('(prefers-color-scheme: light)').matches) {
        document.getElementById('linkedInBadge').setAttribute("data-theme", "light");
    }
})





document.getElementById("dagshtick-card").addEventListener("click", function() {
    window.location.assign("/dagshtick")
});

document.getElementById("runman-card").addEventListener("click", function() {
    if (pageName == 'ar') {
        window.location.assign("/runman/ar")
    } else {
        window.location.assign("/runman/en")
    }
});

document.getElementById("dawrati-card").addEventListener("click", function() {
    window.location.assign("/dawrati")
});

document.getElementById("onlinestore-card").addEventListener("click", function() {
    window.location.assign(`${'http://onlinestore.'+(window.location.href).split('//')[1].split('www.')[1].split('/')[0]}`)
});

document.getElementById("1nbt3-card").addEventListener("click", function() {
    window.location.assign("/onethree")
});

document.getElementById("demonsKiller-card").addEventListener("click", function() {
    if (pageName == 'ar') {
        window.location.assign("/demonskiller/ar")
    } else {
        window.location.assign("/demonskiller/en")
    }
});

document.getElementById("blogger-card").addEventListener("click", function() {
    window.location.assign("/blogger");
});

document.getElementById("ar").addEventListener("click", function() {
    window.location.assign("/ar")
});
document.getElementById("en").addEventListener("click", function() {
    window.location.assign("/en")
});


document.getElementById("linkedinAccount").addEventListener("click", function() {

    window.location.assign("https://www.linkedin.com/in/ibrahim-alkhowaiter-430b24203")

});

document.getElementById("myProject").addEventListener("click", function() {
    if (screen.width <= 600) {
        document.getElementById('popupProjects').style.display = 'block';
        console.log('1')
    } else {
        console.log('2')
        document.getElementById('popupProjects').style.display = 'block';
        document.getElementById('popupLinkedIn').style.display = 'none';
    }
});

let btnClose = document.getElementsByClassName("btn-close");

for (let i = 0; i < btnClose.length; i++) {
    btnClose[i].addEventListener("click", function() {
        document.getElementById('popupProjects').style.display = 'none';
        document.getElementById('popupLinkedIn').style.display = 'none';
    })
}




document.getElementById("githubAccount").addEventListener("click", function() {
    window.location.assign("https://github.com/BR19-gh")
});

document.getElementById("emailAddress").addEventListener("click", function() {
    window.location.assign("mailto: ibrahim-abdalaziz@hotmail.com")
});