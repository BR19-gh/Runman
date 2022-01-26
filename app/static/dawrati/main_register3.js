


function check_inputs_empty(){
    let RcghI= document.getElementById("register_CGH_input");
    let RemI= document.getElementById("register_EM_input");
    let RscI= document.getElementById("register_SC_input");
    let RsdI= document.getElementById("register_SD_input");
    let RryI= document.getElementById("register_RY_input");
    let RceI= document.getElementById("register_CE_input");
    if(RcghI.checked==false&&RemI.checked==false&&RscI.checked==false&&RsdI.checked==false&&RryI.checked==false&&RceI.checked==false){alert("أختر واحدا على الأقل");}
    else{location.assign("thanks2.html")}
}