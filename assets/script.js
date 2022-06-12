var buttonEl = document.getElementById('start');
var elementsInsideBox = document.querySelector('.box-elements')
var boxElements = document.querySelector('.box-start');

// var q1 = {question: "1. Which of following is not a CSS property?",
//     a1: "background-color",
//     a2: "color",
//     a3: "font-weight",
//     a4: "text"
// }

var listQA = [{question: "1. Which of following is NOT a CSS property?",
a1: "A. Background-color",
a2: "B. Color",
a3: "C. Font-weight",
a4: "D. Text",
correct: "D"
}, 
{question: "2. Which of the following is used to implement a responsive layout?",
a1: "A. @media",
a2: "B. :hover",
a3: "C. screen",
a4: "D. ::after",
correct: "A"
}, 
{question: "3. Which of the following is a CSS Selector?",
a1: "A. > ",
a2: "B. ! ",
a3: "C. & ",
a4: "D. $ ",
correct: "A"
}, 
{question: "4. If 'a = true' and 'b = false', what will '(!a || b) && (a || !b)' return?",
a1: "A. True ",
a2: "B. False ",
correct: "B"
}, 
{question: "5. What is the default behavior of the form tag?",
a1: "A. Nothing",
a2: "B. Sends the data to the local storage",
a3: "C. refreshes the page",
a4: "D. Displays an alert",
correct: "C"
}];

var correctAnswers = ['D. Text', 'A. @media', "A. > ", "B. False ", "C. refreshes the page"];


//these are declared outside of the block so that it's accessible in different functions
var answerBox;
var questionBox;
var answerList;
var placeBox;
var timerBox;
var timeCount = 60;
var userChoices;
var track = 0;
var timeLeft;
var btnInfo;
var elements;
var elements1;
var elements2;
var elements3;
var elements4;

var wrongCount = 0;


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
    
    //add the middle box to the main box
    questionBox = document.createElement('div');
    questionBox.className = 'mid-box'
    boxElements.append(questionBox);

    //add the right box to the main box
    timerBox = document.createElement('div');
    timerBox.className = 'right-box'
    boxElements.append(timerBox);

    //shows the time left for the quiz
    timeLeft = document.createElement('h2')
    timeLeft.textContent = 'Time Left: ' + timeCount + "sec";
    timerBox.append(timeLeft)
    //add the time interval function to the right box
    
    var setTime = setInterval (function () {
        // if the wrong count is 1 we will subtract time
        if (wrongCount != 0) {
            timeCount = timeCount - 5;
            --wrongCount;
        } else {
            --timeCount;
        }
        timeLeft.textContent = 'Time Left: ' + timeCount + "sec";
        

        if (timeCount <= 0) {
            clearInterval(setTime);

            //make sure we go to the score page after it timer hits 0

        }

    }, 1000)

    //adds the initial question and answers
    elements = document.createElement('h2');
    elements.textContent = listQA[track].question;
    questionBox.append(elements);
    
    placeBox = document.createElement('div');
    placeBox.className = 'choice-box';
    questionBox.append(placeBox);
    
    elements1 = document.createElement('button');
    elements1.className = "btn-info";
    elements1.textContent = listQA[track].a1;
    placeBox.append(elements1);
    
    elements2 = document.createElement('button');
    elements2.className = "btn-info";
    elements2.textContent = listQA[track].a2;
    placeBox.append(elements2);
    
    elements3 = document.createElement('button');
    elements3.className = "btn-info";
    elements3.textContent = listQA[track].a3;
    placeBox.append(elements3);
    
    elements4 = document.createElement('button');
    elements4.className = "btn-info";
    elements4.textContent = listQA[track].a4;
    placeBox.append(elements4);
    
    btnInfo = placeBox.children;
    console.log(btnInfo);

    playQuestions();

    return;
}

// displays each questions and choices, should return something

function playQuestions() {

    // adds an event listener to all the answer button

    for (i of btnInfo) {
        i.addEventListener('click', function(event) {
            var clickedEl = event.target;
            userChoices = checkAnswer(clickedEl);
                if (correctAnswers.includes(userChoices)) {
                    answerList = document.createElement('p')
                    answerList.textContent = (track+1) + '. Correct!';
                    answerBox.append(answerList);
                }  else {
                    answerList = document.createElement('p')
                    answerList.textContent = (track+1) + '. Wrong!';
                    answerBox.append(answerList);
                    //everytime the user gets a wrong answer, increase this count
                    //it will then be checked on the timer interval in initQuiz.
                    wrongCount++;
                } 
            //once a button has been click, it will display the next question
            console.log(track)
                ++track;
                displayQuestion();
        });
    }

}


function displayQuestion() {
    //adds the questions and answers to the HTML document. Then gets displayed on the mid box.
    if (track < listQA.length) {
        elements.textContent = listQA[track].question;

        elements1.textContent = listQA[track].a1;
        elements2.textContent = listQA[track].a2;
        elements3.textContent = listQA[track].a3;
        elements4.textContent = listQA[track].a4;
    } else {
        return;
    }
}

function checkAnswer(clickedEl) {
    var text = clickedEl.textContent;
    return text;
}



buttonEl.addEventListener('click', initQuiz);
