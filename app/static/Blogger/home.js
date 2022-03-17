let addBlogBtn = document.getElementById('addBlogBtn');
let addBlogBtnIcon = document.getElementById('fas fa-edit');
let signInBtn = document.getElementById('signInBtn');
let deleteBtn = document.getElementById('delete');
addBlogBtnIcon.style = 'opacity: 0;';
addBlogBtn.style = "curser:default;";
addBlogBtn.title = "";
deleteBtn.style.display = 'none';



document.getElementById('delCon').style.display = 'none';

var styles = `#addBlogBtn:hover i{color: #11111100;}`
var styleSheet = document.createElement("style")
styleSheet.type = "text/css"
styleSheet.innerText = styles
document.head.appendChild(styleSheet)

if (localStorage.getItem('isUserAdmin') == 1) {
    addBlogBtnIcon.style.opacity = '100%';
    addBlogBtn.style = "cursor: pointer;";
    addBlogBtn.title = "Add Article";
    var styles = `#addBlogBtn:hover i{color: #111111da;}`
    var styleSheet = document.createElement("style")
    styleSheet.type = "text/css"
    styleSheet.innerText = styles
    document.head.appendChild(styleSheet)
    deleteBtn.style.display = 'block';
}

addBlogBtn.addEventListener('click', () => {
    if (localStorage.getItem('isUserAdmin') == 1) {
        window.location.assign('/blogger/addBlog');
    }
});

signInBtn.addEventListener('click', () => {
    window.location.assign('/blogger');
});



//Update Articles
if (localStorage.getItem("addedFromBlog") == 1) {
    localStorage.setItem('isFirstTime', 1);
}
if (localStorage.getItem('isFirstTime') == null) {
    let dummyArticle = { titles: [""], details: [""], date: [""] }
    localStorage.setItem("articleArray", JSON.stringify(dummyArticle));
}
let article = JSON.parse(localStorage.getItem("articleArray"));
if (localStorage.getItem('isFirstTime') != null) {
    if (localStorage.getItem("addedFromBlog") == 1) {
        localStorage.setItem("addedFromBlog", 0);
        article.titles.unshift(localStorage.getItem("title"));
        article.details.unshift(localStorage.getItem("details"));
        article.date.unshift(localStorage.getItem("date"));
    }

    /*upadte*/
    {



        //Update Articles END

        let insideHome = document.getElementById("insideHome");
        document.getElementById('noNewMsg').style.display = "none";
        document.getElementById('delCon').style.display = 'inline-flex';

        for (let i = 0; i < (article.titles.length); i++) {

            //Creating Article
            let articleVal = document.createElement('div');
            articleVal.setAttribute("class", "article");
            insideHome.appendChild(articleVal);
            //Creating Article END
            //Creating Title

            let title = document.createElement('div');
            title.setAttribute("class", "title");
            articleVal.appendChild(title);
            title.innerHTML = `${article.titles[i]}<hr>`
                //Creating Title END

            //Creating <br>
            let br = document.createElement('br');
            articleVal.appendChild(br);
            //Creating <br> END

            //Creating <p>
            let p = document.createElement('p');
            articleVal.appendChild(p);
            p.innerText = `${article.details[i]}`
                //Creating <p> END

            //Creating <br>
            br = document.createElement('br');
            articleVal.appendChild(br);
            //Creating <br> END

            //Creating Date
            let dates = document.createElement('div');
            dates.setAttribute("class", "date");
            articleVal.appendChild(dates);
            dates.innerText = `Date of Uploding: ${article.date[i]}`
                //Creating Date END

            //Creating <br>
            br = document.createElement('br');
            articleVal.appendChild(br);
            //Creating <br> END

        }





    }


}
localStorage.setItem("articleArray", JSON.stringify(article));

if (localStorage.getItem("articleArray") == "{\"titles\":[],\"details\":[],\"date\":[]}") {
    document.getElementById('noNewMsg').style.display = "block";
    document.getElementById('delCon').style.display = 'none';
}

function deleteArticle() {
    if (localStorage.getItem("articleArray") == "{\"titles\":[],\"details\":[],\"date\":[]}") {
        document.getElementById('noNewMsg').style.display = "block";
        document.getElementById('delCon').style.display = 'none';
        return;
    }
    let articleInDel = JSON.parse(localStorage.getItem("articleArray"));
    articleInDel.titles.shift();
    articleInDel.details.shift();
    articleInDel.date.shift();
    localStorage.setItem("articleArray", JSON.stringify(articleInDel));
    window.location.assign('/blogger/home');
}

document.getElementById('delete').addEventListener('click', () => { deleteArticle() });