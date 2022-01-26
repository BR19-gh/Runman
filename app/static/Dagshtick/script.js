let A=0;
let G=0;
let PN=0;
let RPN=0;
let KU=0;
let KR=0;
let D = 0; //هذا المتغير اللي عيلمن اذا سويت تراجع والقيمة كانت 100
var Amount = 1;
var changeAmountBitCounter = 0;
let inputs = document.querySelectorAll('input');

function togglePopupInfo(){
    document.getElementById("popupInfo").classList.toggle("activeI");
  }

  function togglePopupSet(){
    document.getElementById("popupSet").classList.toggle("activeS");
  }

  function changeUndoRedo(x){
   let undo=document.getElementById("undoBtn");
   let redo=document.getElementById("redoBtn");
    if(x==0)
    {
      undo.style.background= "background: linear-gradient(to left,#00344e5e,#005e8d5e);"
      undo.style.border= "1px solid rgb(153, 153, 153)"
      undo.style.color= " #ffffff"
      return;}
    
    if(x==1){
     
        redo.style.background= "background: linear-gradient(to left,#00344e5e,#005e8d5e);"
        redo.style.border= "1px solid rgb(153, 153, 153)"
        redo.style.color= " #ffffff"
        return;}
      }
    
    function reChangeUndoRedo(x){
      let undo=document.getElementById("undoBtn");
      let redo=document.getElementById("redoBtn");
       if(x==0){
      
        document.getElementById("undoBtn").style.background= "linear-gradient(to left,#00344e36,#005e8d31);"
         undo.style.color= " #ffffff5e"
         undo.style.border= "0px solid rgb(153, 153, 153)"
         return;
        
       }
       if(x==1){
       
        document.getElementById("redoBtn").style.background= "linear-gradient(to left,#00344e36,#005e8d31);"
           redo.style.color= " #ffffff5e"
           redo.style.border= "0px solid rgb(153, 153, 153)"
           return;
         
        }
       }
       

function undo(){
  if(KU==1){return;}
  if(PN==0){return;}
  let N = Number(document.getElementById("yourmoneyBox").textContent)
  if(A==1&&N==100&&D==0){A=0;G=0; D=1;}
  RPN=N;
  N=PN;
  document.getElementById("yourmoneyBox").innerHTML=N;
  KU=1;
  KR=0;
  changeUndoRedo(1);
  reChangeUndoRedo(0);

}
function redo(){
  if(KR==1||KU==0){reChangeUndoRedo(1); return;}
  if(RPN==0){return;}
  let N = Number(document.getElementById("yourmoneyBox").textContent)
  if(A==0&&RPN==100&&D==1){A++;G++;D--;}
  PN=N;
  N=RPN;
  document.getElementById("yourmoneyBox").innerHTML=N;
  KR=1;
  KU=0;
  changeUndoRedo(0);
  reChangeUndoRedo(1);
}

 function changeYourMoney(){
    let N = Number(document.getElementById("yourmoneyBox").textContent)
    let C = Number(document.getElementById("changeYourM").value)
    
    if(C==""){return;}
    if(C<100){alert("أقل قيمة يمكنك تعيينها لنقودك هي 100؛");  inputs.forEach(input =>  input.value = ''); return;}
 
    if(C>=L){alert("لا يمكنك تعيين نقودك أكثر من حد الفوز"); inputs.forEach(input =>  input.value = ''); return;}
    PN=N;
    N=C;
    document.getElementById("yourmoneyBox").innerHTML=N;
    togglePopupSet();
    inputs.forEach(input =>  input.value = '')
    KU=0;
    KR=0;
    changeUndoRedo(0);
    if(KR==1||KU==0){reChangeUndoRedo(1); }
 }
 var L = Number(document.getElementById("winLimit").textContent)

 function changeYourLimit(){
  let N = Number(document.getElementById("yourmoneyBox").textContent)
  let CL = Number(document.getElementById("changeYourL").value)
    
    if(CL==""){return;}
    if(CL<200){alert("أقل قيمة يمكنك تعيينها لحد الفوز هي 200؛");  inputs.forEach(input =>  input.value = ''); return;}
    if(CL<=N){alert("لا يمكنك تعيين حد الفوز أقل من نقودك"); inputs.forEach(input =>  input.value = ''); return;}
  L=CL;
    document.getElementById("winLimit").innerHTML=L;
    togglePopupSet();
    inputs.forEach(input =>  input.value = '')
    KU=0;
    KR=0;
 }


function changeAmountBit(){
  changeAmountBitCounter++;

  if(changeAmountBitCounter==1){
    Amount=1;
    document.getElementById("done3").innerHTML="المـ×1ـثل";
    document.getElementById("done3").style.background= "linear-gradient(to right,#0a6d173f,#10419cea)";
    return;
  }

  if(changeAmountBitCounter==2){
    Amount=2;
    document.getElementById("done3").innerHTML="الضـ×2ـعف";
    document.getElementById("done3").style.background= "linear-gradient(to right,#6b6d0a3f,#10419cea)";
    return;
  }

  if(changeAmountBitCounter==3){
    changeAmountBitCounter=0;
    Amount=3;
    document.getElementById("done3").innerHTML="مـــــــــ×3ــرات"; 
    document.getElementById("done3").style.background= "linear-gradient(to right,#6d480a3f,#10419cea)";
    return;
  }

}
 
function win(){ 
  let N = Number(document.getElementById("yourmoneyBox").textContent)
    PN=N;
    let R = Number(document.getElementById("yourB").value)
    let M = Number(document.getElementById("sumG").value)
    if(R==""&&M==""){return;}
    
    if(isNaN(N)&&isNaN(L)){alert("عين قيمة لنقودك وحد للفوز أولا");return;}
    if(isNaN(N)){alert("عين قيمة لنقودك أولا");return;}
    if(isNaN(L)){alert("عين حد للفوز أولا");return;}
   
    if(R==""&&M>0){alert("لا يمكنك المراضاة فقط من غير المراهنة"); return;}
    if(N<R){alert("مبلغ \"الرهان\" أكثر من النقود التي تمتلكها"); return;}
    if(M>(N+(R*2))){alert("مبلغ \"الرضاوة\" أكثر من النقود التي ستمتلكها"); return;}
    
    N=N+(R*Amount);N=N-M; document.getElementById("yourmoneyBox").innerHTML=N;
    inputs.forEach(input =>  input.value = '')
    KU=0;
    KR=0;
    changeUndoRedo(0);
    if(KR==1||KU==0){reChangeUndoRedo(1);}
    if(N>=L){gamewin();}

   
}

function lose(){
let N = Number(document.getElementById("yourmoneyBox").textContent)
PN=N;
let R = Number(document.getElementById("yourB").value)
let M = Number(document.getElementById("sumG").value)
if(R==""&&M==""){return;}
if(isNaN(N)&&isNaN(L)){alert("عين قيمة لنقودك وحد للفوز أولا");return;}
if(isNaN(N)){alert("عين قيمة لنقودك أولا");return;}
if(isNaN(L)){alert("عين حد للفوز أولا");return;}

if(R==""&&M>0){alert("لا يمكنك المراضاة فقط من غير المراهنة"); return;}
if(N<R){alert("مبلغ \"الرهان\" أكثر من النقود التي تمتلكها"); return;}

if(M>(N+(R*2))){alert("مبلغ \"الرضاوة\" أكثر من النقود التي ستمتلكها"); return;}


if(N==R){N=100;A++; document.getElementById("yourmoneyBox").innerHTML=N;}
else if(N!==R){N=N-R;N=N-M; document.getElementById("yourmoneyBox").innerHTML=N;}
if(N<=0){N=100;A++; document.getElementById("yourmoneyBox").innerHTML=N;}
inputs.forEach(input =>  input.value = '')
KU=0;
KR=0;
changeUndoRedo(0);
if(KR==1||KU==0){reChangeUndoRedo(1);}
if(A>1){gameover();}
if(A==1){G++;tryoveron();}
}

function withd(){
    let N = Number(document.getElementById("yourmoneyBox").textContent)
    PN=N;
    let R = Number(document.getElementById("yourB").value)
    let M = Number(document.getElementById("sumG").value)
    if(M<=0&&R<=0){return;}
    if(isNaN(N)&&isNaN(L)){alert("عين قيمة لنقودك وحد للفوز أولا");return;}
    if(isNaN(N)){alert("عين قيمة لنقودك أولا");return;}
    if(isNaN(L)){alert("عين حد للفوز أولا");return;}
    if(R>=1&&M>=1){alert("ضع قيمة في أحد الخانتين فقط لاحتساب مراضاة الانسحاب"); return;}
    if(R<=0&&M>=1){N=N+M;}
    if(R>=1&&M<=0){N=N+R;}

    document.getElementById("yourmoneyBox").innerHTML=N;
    inputs.forEach(input =>  input.value = '')
    KU=0;
    KR=0;
    changeUndoRedo(0);
    if(KR==1||KU==0){reChangeUndoRedo(1);}
    if(N>=L){gamewin();}
}

function gameover(){
    var gameover = document.getElementById('gameover');
    gameover.style.display = "block"
    gameover.style.position = "absolute"
    gameover.style.transition = "all 100ms ease-in-out"
}

function gamewin(){
  let ym = document.getElementById('ym').textContent
  let N = document.getElementById("yourmoneyBox").textContent
  ym=N;
  document.getElementById('ym').textContent=ym;
  var gamewin = document.getElementById('gamewin');
  gamewin.style.display = "block"
  gamewin.style.position = "absolute"
  gamewin.style.transition = "all 100ms ease-in-out"
}

function tryoveron(){
  if(G>1){return;}
  var tryover = document.getElementById('tryover');
  tryover.style.display = "block"
  tryover.style.position = "absolute"
  tryover.style.transition = "all 100ms ease-in-out"
}

function tryoveroff(){
 
  
  var tryover = document.getElementById('tryover');
  tryover.style.display = "none"
  tryover.style.transition = "all 100ms ease-in-out"
}