let checkbox = document.getElementById('checkbox');



if (localStorage.getItem('rememberMeVal') == 1) {
    document.getElementById('username').value = localStorage.getItem('username');
    document.getElementById('password').value = localStorage.getItem('password');
} else if (localStorage.getItem('rememberMeVal') == 0) {
    document.getElementById('username').value = "";
    document.getElementById('password').value = "";
}


function login() {

    rememberMe();
    if (document.getElementById('username').value == 'admin' && document.getElementById('password').value == 'admin') {
        localStorage.setItem('isUserAdmin', 1);
        window.location.assign('/blogger/home');
    } else {
        localStorage.setItem('isUserAdmin', 0);
        window.location.assign('/blogger/home');
    }

}
document.getElementById('loginBtn').addEventListener('click', () => { login() })

function rememberMe() {
    if (checkbox.checked == true) {
        localStorage.setItem('username', document.getElementById('username').value);
        localStorage.setItem('password', document.getElementById('password').value);
        localStorage.setItem('rememberMeVal', 1)
    } else {
        localStorage.setItem('rememberMeVal', 0)
    }

}