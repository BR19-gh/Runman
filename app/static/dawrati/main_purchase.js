function hover(){
    document.getElementById("popupCVV2").style.display="block";
}

function nothover(){
    document.getElementById("popupCVV2").style.display="none";
}


function check_inputs_empty(){
    let RCnaI= document.getElementById("register_cardname_input").value;
    let RCvI= document.getElementById("register_CVV2_input").value;
    let RCnuI= document.getElementById("register_cardno_input").value;
    let REI= document.getElementById("register_expdate_input").value;
    if(RCnaI==""||RCvI==""||RCnuI==""||REI==""){alert("لم تدخل كل البيانات");}
    else{location.assign("thanks.html")}
}

function back(){
    location.assign("time.html")
}