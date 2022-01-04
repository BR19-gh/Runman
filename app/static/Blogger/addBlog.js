function submit() {
    let title = document.getElementById('title').value;
    let details = document.getElementById('details').value;
    let date = new Date();

    if (title == "" || details == "") {
        alert(`You have to fill both fields.`);
        return;
    }
    localStorage.setItem("title", title);
    localStorage.setItem("details", details);
    localStorage.setItem("date", date.toLocaleTimeString() + ',' + date.toDateString());
    localStorage.setItem("addedFromBlog", 1);

    alert(`Your article of the title "${title}" has been uploded successfully.\nCheck Home page to see the article.`)
    title.value = "";
    details.value = "";
}


document.getElementById('submitBtn').addEventListener('click', submit);
document.getElementById('x').addEventListener('click', () => { window.location.assign('/home.html'); });