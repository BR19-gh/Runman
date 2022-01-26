

function check_inputs_empty(){
    var LUI= document.getElementById("login_username_input").value;
    console.log(LUI)
    var LPI= document.getElementById("login_password_input").value;
    console.log(LPI)
    if(LUI==""||LPI==""){alert("أدخل بياناتك اولا");}
    else{ location.assign("home.html")}
    
}






