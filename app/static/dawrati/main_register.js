


function check_inputs_empty(){
    let RUI= document.getElementById("register_username_input").value;
    let RPI= document.getElementById("register_password_input").value;
    let RcPI= document.getElementById("register_cpassword_input").value;
    let RNI= document.getElementById("register_name_input").value;
    let RBI= document.getElementById("register_birthday_input").value;
    let REI= document.getElementById("register_email_input").value;
    if(RUI==""||RPI==""||RcPI==""||RNI==""||RBI==""||REI==""){alert("لم تدخل كل البيانات");}
    else{location.assign("register2.html")}
}