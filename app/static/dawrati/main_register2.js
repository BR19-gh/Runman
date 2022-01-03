


function check_inputs_empty(){
    let RSI= document.getElementById("register_street_input").value;
    let RS2I= document.getElementById("register_street2_input").value;
    let RPI= document.getElementById("register_postcode_input").value;
    let RCoI= document.getElementById("register_country_input").value;
    let RCiI= document.getElementById("register_city_input").value;
    let RAI= document.getElementById("register_area_input").value;
    if(RSI==""||RPI==""||RCoI==""||RCiI==""||RAI==""){alert("لم تدخل كل البيانات");}
    else{location.assign("register3.html")}
}