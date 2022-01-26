// startMenu

function togglePopupExplain(){
    document.getElementById("popupExplain").classList.toggle("activeE");
  }

  function togglePopupInfo(){
    document.getElementById("popupInfo").classList.toggle("activeI");
  }

 

  document.addEventListener("DOMContentLoaded", () => {
    
    

    GameMenu();	
    function GameMenu()
    {
        
        var play_button = document.querySelector('#game_play');
        var the_game_menu = document.getElementById('game_menu');
    
        the_game_menu.style.top = '8%'
        the_game_menu.style.display = 'block'
    
        play_button.addEventListener('click', () => {menu_moving();startGame();});
    }
    
    
    
    
    
    function play_clicked()
    {
        var the_game_menu = document.getElementById('game_menu');
    
        if (the_game_menu.style.display === 'block')
        {
            the_game_menu.style.display = 'none';
        } else {
            the_game_menu.style.display = 'block';
        }
          
    
    }
    
    function menu_moving()
    {
        
    
        var the_menu = document.getElementById('game_menu');
        let pos = 8;
        let sum = 0;
       
    
        let menu_interval = setInterval(frame1, 25);
    
        function frame1()
        {
            
            if (pos >= screen.height)
            {
               
                clearInterval(menu_interval);
                play_clicked();
            } 
            else {
                    pos += sum;
                    the_menu.style.top = pos + "%";
                    sum++;
            }
        }
        
        
                
        }  
    
        
    
    
        //   gameplay
    
       
        const startButton = document.getElementById('start-btn')
        const nextButton = document.getElementById('next-btn')
        const finish = document.getElementById('finish')
        const restartButton = document.getElementById('restart-btn')
        const questionContainerElement = document.getElementById('question-container')
        const questionElement = document.getElementById('question')
        const answerButtonsElement = document.getElementById('answer-buttons')

        
        const questions = [
          {
            question: 'ما المقصود بيوم الفرقان كما ورد في القرآن؟',
            answers: [
              { text: 'غزوة بدر', correct: true , score: 1 },
              { text: 'فتح مكة', correct: false , score: 0 },
              { text: 'غزوة أحد', correct: false , score: 1 },
              { text: 'غزوة تبوك', correct: false , score: 0 }
            ]
          },
          {
            question: 'من الذي اخترع الأحرف الهجائية؟',
            answers: [
              { text: 'العرب', correct: false , score: 0 },
              { text: 'الفراعنة', correct: false , score: 0 },
              { text: 'االساسانيين', correct: false , score: 0 },
              { text: 'الفينيقيين', correct: true , score: 0 }
            ]
          },
           {
            question: 'ما هي عاصمة البانيا؟',
            answers: [
              { text: 'ساوتومي', correct: false , score: 0 },
              { text: 'تيرانا', correct: false , score: 0 },
              { text: 'كتمندو', correct: false , score: 0 },
              { text: 'غوتيمالا', correct: true , score: 0 }
            ]
          },
          {
            question: 'ما هي المادة التي يستخرج منها الفازلين؟',
            answers: [
              { text: 'السماد', correct: false , score: 0 },
              { text: 'البرافين', correct: false , score: 0 },
              { text: 'النفط', correct: true , score: 0 },
              { text: 'الكوكاد', correct: false , score: 0 }
            ]
          },
          {
            question: 'ما هو الغاز الذي يكون غالب كتلة الشمس؟',
            answers: [
              { text: 'النيتروجين', correct: false , score: 0 },
              { text: 'الأكسجين', correct: false , score: 0 },
              { text: 'الهيليوم', correct: false , score: 0 },
              { text: 'الهايدروجين', correct: true , score: 0 }
            ]
          },
          {
           question: 'ما هي أقوى أنواع الأحجار الكريمة؟',
            answers: [
              { text: 'الماس', correct: true , score: 0 },
              { text: 'الياقوت', correct: false , score: 0 },
              { text: 'الصنج', correct: false , score: 0 },
              { text: 'الزمرد', correct: false , score: 0 }
            ]
          },
          {
          question: 'ما هو الطائر الذي يميز اللون الأزرق؟',
            answers: [
              { text: 'الصقر', correct: false , score: 0 },
              { text: 'النسر', correct: false , score: 0 },
              { text: 'الحمام', correct: false , score: 0 },
              { text: 'البومة', correct: true , score: 0 }
            ]
          },
          {
           question: '؟؟؟؟',
            answers: [
              { text: 'سكر', correct: false , score: 0 },
              { text: 'قطن', correct: false , score: 0 },
              { text: 'غزال', correct: false , score: 0 },
              { text: 'منزل', correct: true , score: 0 }
            ]
          },

           {
          question: 'ما هو الرقم الخطأ في سلسلة الأرقام هذه  60 ، 52 ، 45 ، 39 ، 35',
            answers: [
              { text: '45', correct: false , score: 0 },
              { text: '60', correct: false , score: 0 },
              { text: '35', correct: true , score: 0 },
              { text: '39', correct: false , score: 0 }
            ]
          },

           {
          question: 'ما هو العضو الذي يخزن السكر الزائد عن الحاجة',
            answers: [
              { text: 'المعدة', correct: false , score: 0 },
              { text: 'الكبد', correct: true , score: 0 },
              { text: 'القولون', correct: false , score: 0 },
              { text: 'البنكرياس', correct: false , score: 0 }
            ]
          },

            {
          question: '؟؟؟؟؟',
            answers: [
              { text: 'facebook', correct: false , score: 0 },
              { text: 'twitter', correct: false , score: 0 },
              { text: 'Snapchat', correct: false , score: 0 },
              { text: 'Google', correct: true , score: 0 }
            ]
          },
          {
          question: 'كم عدد السجدات في القرآن؟',
            answers: [
              { text: '15', correct: true , score: 0 },
              { text: '17', correct: false , score: 0 },
              { text: '14', correct: false , score: 0 },
              { text: '13', correct: false , score: 0 }
            ]
          },
          {
          question: '2,3,5,7,11,13,19....',
            answers: [
              { text: '30', correct: false , score: 0 },
              { text: '25', correct: false , score: 0 },
              { text: '20', correct: false , score: 0 },
              { text: '23', correct: true , score: 0 }
            ]
          },
          {
          question: '101 في النظام الثنائي للعد يساوي؟',
            answers: [
              { text: '101', correct: false , score: 0 },
              { text: '-3', correct: true , score: 0 },
              { text: '-10', correct: false , score: 0 },
              { text: '5', correct: true , score: 0 }
            ]
          }]
        
        let shuffledQuestions, currentQuestionIndex;
        
        startButton.addEventListener('click', startGame);
        nextButton.addEventListener('click', () => {
          currentQuestionIndex++
          setNextQuestion()
        })
        
        function startGame() {
          startButton.classList.add('hide')
          finish.classList.add('hide')
          restartButton.classList.add('hide')
          shuffledQuestions = questions.sort(() => Math.random() - .5)
          currentQuestionIndex = 0
          questionContainerElement.classList.remove('hide')
          setNextQuestion()
        }
        
        function setNextQuestion() {
          resetState()
          showQuestion(shuffledQuestions[currentQuestionIndex])
        }
        
        function showQuestion(question) {
          questionElement.innerText = question.question
          question.answers.forEach(answer => {
            const button = document.createElement('button')
            button.innerText = answer.text
            button.classList.add('btn')
            if (answer.correct) {
              button.dataset.correct = answer.correct
            
            }
            button.addEventListener('click', selectAnswer)
            answerButtonsElement.appendChild(button)
          })
        }
        var executed;
        function resetState() {
          clearStatusClass(document.body)
          nextButton.classList.add('hide')
          executed = true;
          while (answerButtonsElement.firstChild) {
            answerButtonsElement.removeChild(answerButtonsElement.firstChild)
          }
        }
        
        function selectAnswer(e) {
          const selectedButton = e.target
          const correct = selectedButton.dataset.correct
          var score = Number(document.getElementById("score").innerHTML)
         
         
          
          if (executed&&selectedButton.dataset.correct){
            executed = false;
            score++}

         else if (executed&&(selectedButton.dataset.correct==undefined)) {
                executed = false;
                score--}



          document.getElementById("score").innerHTML=score
          document.getElementById("scoreB").innerHTML=score


          setStatusClass(document.body, correct)
          Array.from(answerButtonsElement.children).forEach(button => {
            setStatusClass(button, button.dataset.correct)
          })
          if (shuffledQuestions.length > currentQuestionIndex + 1) {
            nextButton.classList.remove('hide')
          } else {
            finish.classList.remove('hide')
            restartButton.classList.remove('hide')
            startButton.innerText = 'Restart'

            if(score<=0){  document.getElementById("determineIQ").innerHTML="وش هالنقاط <i class=\"far fa-grin-squint-tears\"></i>، مدري وش أقول الله يفشل العدو بس"; document.getElementById("finish").style.backgroundColor = "#b14c3b"; document.getElementById("determineIQ").style.backgroundColor = "#7e3939";document.getElementById("scoreB").style.backgroundColor = "#be4242"}
           else if(score>0&&score<=2){  document.getElementById("determineIQ").innerHTML="قل قسم <i class=\"far fa-angry\"></i>!جاي تلعب ولا تستهبل أنت وش هالنقاط، مستوى ذكائك تحت المتدني!"; document.getElementById("finish").style.backgroundColor = "#b14c3b"; document.getElementById("determineIQ").style.backgroundColor = "#7e3939";document.getElementById("scoreB").style.backgroundColor = "#be4242"  }
           else if(score<=2&&score>4){  document.getElementById("determineIQ").innerHTML="مستوى ذكائك متدني مرة class=\"far fa-thumbs-down\"></i> تحتاج تتثقف"; document.getElementById("finish").style.backgroundColor = "#b14c3b"; document.getElementById("determineIQ").style.backgroundColor = "#7e3939";document.getElementById("scoreB").style.backgroundColor = "#be4242"  }
           else if(score>4&&score<=6){  document.getElementById("determineIQ").innerHTML="مستوى ذكائك متدني class=\"far fa-thumbs-down\"></i> ، اقرالك كتاب أو كتابين ما يضر والله"; document.getElementById("finish").style.backgroundColor = "#b14c3b"; document.getElementById("determineIQ").style.backgroundColor = "#7e3939";document.getElementById("scoreB").style.backgroundColor = "#be4242"  }
           else if(score<=6&&score>8){  document.getElementById("determineIQ").innerHTML="مستوى ذكائك منخفض، لكنك أديت اللي عليك<i class=\"far fa-meh-rolling-eyes\"></i>"; document.getElementById("finish").style.backgroundColor = "#ce9346"; document.getElementById("determineIQ").style.backgroundColor = "#996933";document.getElementById("scoreB").style.backgroundColor = "#be8442"  }
           else if(score>8&&score<=9){  document.getElementById("determineIQ").innerHTML="مستوى ذكائك فوق المنخفض، مشكور على المحاولة<i class=\"far fa-thumbs-up\"></i>"; document.getElementById("finish").style.backgroundColor = "#ce9346"; document.getElementById("determineIQ").style.backgroundColor = "#996933";document.getElementById("scoreB").style.backgroundColor = "#be8442"  }  
           else if(score<=9&&score>10){  document.getElementById("determineIQ").innerHTML="مستوى ذكائك متوسط، مشكور على المحاولة<i class=\"far fa-thumbs-up\"></i>"; document.getElementById("finish").style.backgroundColor = "#ce9346"; document.getElementById("determineIQ").style.backgroundColor = "#996933" ;document.getElementById("scoreB").style.backgroundColor = "#be8442"  }
           else if(score>10&&score<=11){  document.getElementById("determineIQ").innerHTML="مستوى ذكائك فوق المتوسط، تستاهل صفقة صغيرة<i class=\"fas fa-sign-language\"></i>" ; document.getElementById("finish").style.backgroundColor = "#ce9346"; document.getElementById("determineIQ").style.backgroundColor = "#996933";document.getElementById("scoreB").style.backgroundColor = "#be8442"   }
           else if(score<=11&&score>12){  document.getElementById("determineIQ").innerHTML="مستوى ذكائك مرتفع، تستاهل صفقتين <i class=\"fas fa-sign-language\"></i> <i class=\"fas fa-sign-language\"></i>"  }
           else if(score>12&&score<=13){  document.getElementById("determineIQ").innerHTML="مستوى ذكائك ممتاز، تستاهل ثلاث صفقات <i class=\"fas fa-sign-language\"></i> <i class=\"fas fa-sign-language\"></i> <i class=\"fas fa-sign-language\"></i>"  }
           else if(score<=13&&score>14){  document.getElementById("determineIQ").innerHTML="مستوى ذكائك عالي! تستاهل نجمة <i class=\"far fa-star\"></i>"  }
           else if(score>14&&score<=15){  document.getElementById("determineIQ").innerHTML="تفو تفو ما شاء الله مستوى ذكائك ممتاز <i class=\"far fa-star\"></i> <i class=\"far fa-star\"></i> ، إقر وردك قبل ما احد ينحتك"  }


          }
        }

        
        

      
     
        function setStatusClass(element, correct) {
          clearStatusClass(element)
          if (correct) {
            element.classList.add('correct')
           
  
           
          } else {
            element.classList.add('wrong')
          
          }
        }
        
       

        function clearStatusClass(element) {
          element.classList.remove('correct')
          element.classList.remove('wrong')
          

        }
        
       

       

    
    
    });
    
    
    
    
    