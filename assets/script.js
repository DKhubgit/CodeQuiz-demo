var buttonEl = document.getElementById('start');
var elementsInsideBox = document.querySelector('.box-elements')
var boxElements = document.querySelector('.box-start');

var q1 = {question: "1. Which of following is not a CSS property?",
    a1: "background-color",
    a2: "color",
    a3: "font-weight",
    a4: "text"
}
var listQA = [q1];

var answerBox;
var answerList;
var questionBox;
var timerBox;
var timeCount = 60;

//initializes the layout of the quiz
function initQuiz(event) {
    event.preventDefault();
    //remove all the inital elements inside the main box
    elementsInsideBox.remove();
    //update the main box to have a row of child boxes and adjust height
    boxElements.style.height = '500px';
    boxElements.style.flexDirection = 'row';
    boxElements.style.justifyContent = 'space-between';
    //create a box on the left of the main box
    answerBox = document.createElement('div');
    answerBox.className = 'left-box'
    boxElements.append(answerBox);
    //add a list that tracks the right or wrong answers on the left box
    for( var i = 0; i < 5; i++) {
        answerList = document.createElement('p')
        answerList.textContent = (i+1) + '. ';
        answerBox.append(answerList);
    }
    //add the middle box to the main box
    questionBox = document.createElement('div');
    questionBox.className = 'mid-box'
    boxElements.append(questionBox);

    //add the right box to the main box
    timerBox = document.createElement('div');
    timerBox.className = 'right-box'
    boxElements.append(timerBox);

    //shows the time left for the quiz
    var timeLeft = document.createElement('h2')
    timeLeft.textContent = 'Time Left: ' + timeCount + "sec";
    timerBox.append(timeLeft)
    //add the time interval function to the right box
    
    var setTime = setInterval (function () {
        --timeCount;
        timeLeft.textContent = 'Time Left: ' + timeCount + "sec";

        if (timeCount === 0) {
            clearInterval(setTime);

            //make sure we go to the score page after it timer hits 0

        }

    }, 1000)


    playQuestions();
}

// displays each questions and choices, should return something
function playQuestions() {
    var dataObject = listQA[0]; //this is an object

    var elements = document.createElement('h2');
    elements.textContent = dataObject.question;
    questionBox.append(elements);

    var placeBox = document.createElement('div');
    placeBox.className = 'choice-box';
    questionBox.append(placeBox);

    var elements1 = document.createElement('button')
    elements1.textContent = "A. " + dataObject.a1;
    placeBox.append(elements1);

    var elements2 = document.createElement('button')
    elements2.textContent = "B. " + dataObject.a2;
    placeBox.append(elements2);

    var elements3 = document.createElement('button')
    elements3.textContent = "C. " + dataObject.a3;
    placeBox.append(elements3);

    var elements4 = document.createElement('button')
    elements4.textContent = "D. " + dataObject.a4;
    placeBox.append(elements4);

    return;
}



buttonEl.addEventListener('click', initQuiz);
