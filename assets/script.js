var buttonEl = document.getElementById('start');
var elementsInsideBox = document.querySelector('.box-elements')
var boxElements = document.querySelector('.box-start');

var listQA = [{question: "1. Which of following is NOT a CSS property?",
a1: "A. Background-color",
a2: "B. Color",
a3: "C. Font-weight",
a4: "D. Text",
}, 
{question: "2. Which of the following is used to implement a responsive layout?",
a1: "A. @media",
a2: "B. :hover",
a3: "C. screen",
a4: "D. ::after",
}, 
{question: "3. Which of the following is a CSS Selector?",
a1: "A. > ",
a2: "B. ! ",
a3: "C. & ",
a4: "D. $ ",
}, 
{question: "4. If 'a = true' and 'b = false', what will '(!a || b) && (a || !b)' return?",
a1: "A. True ",
a2: "B. False ",
a3: "C. Nothing ",
a4: "D. Undefined "
}, 
{question: "5. What is the default behavior of the form tag?",
a1: "A. Nothing",
a2: "B. Sends the data to the local storage",
a3: "C. refreshes the page",
a4: "D. Displays an alert"
}];

var correctAnswers = ['D. Text', 'A. @media', "A. > ", "B. False ", "C. refreshes the page"];


//these are declared outside of the block so that it's accessible in different functions
var answerBox;
var questionBox;
var placeBox;
var timerBox;
var answerList;

var timeCount = 60;

var track = 0;

var wrongCount = 0;
var timeOut = 0;

var timeLeft;
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
    var setTime = setInterval(function () {
        // if the wrong count is 1 we will subtract time
        if (wrongCount != 0) {
            timeCount = timeCount - 5;
            --wrongCount;
        } else {
            --timeCount;
        }
        timeLeft.textContent = 'Time Left: ' + timeCount + "sec";
        
        //if the timer hits 0 or the user answers all questions, stop the time. 
        if (timeCount <= 0 || timeOut != 0) {
            clearInterval(setTime);
            displayScore();
        }

    }, 1000)

    //adds the initial question and answer buttons
    initQuestion();

    playQuestions();

    return;
}

var elements;
var elements1;
var elements2;
var elements3;
var elements4;
var btnInfo;

function initQuestion () {

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

    //stores the answer buttons to a variable
    btnInfo = placeBox.children;

    return;
}

// displays each questions and choices
var userChoices;
var userPoints = 0;
function playQuestions() {
// adds an event listener to all the answer button
    for (i of btnInfo) {
        i.addEventListener('click', function(event) {
            var clickedEl = event.target;
            userChoices = clickedEl.textContent;
            if (correctAnswers.includes(userChoices)) {
                answerList = document.createElement('p')
                answerList.textContent = (track+1) + '. Correct!';
                answerBox.append(answerList);
                userPoints = userPoints + 5;
            }  else {
                answerList = document.createElement('p')
                answerList.textContent = (track+1) + '. Wrong!';
                answerBox.append(answerList);
                //everytime the user gets a wrong answer, increase this count
                //it will then be checked on the timer interval in initQuiz.
                wrongCount++;
            } 
            //once a button has been clicked, it will display the next question
            //this checks whether all questions have been answered
            ++track;
            if (track === listQA.length) {
                ++timeOut;
                return;
            } else {
                displayQuestion();
                return;
            }
        });
    }
}


function displayQuestion() {
    //adds the next question and answer to the box.
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

//appends a new box with form elements for saving score
function displayScore() {

    var points = document.createElement('h2');
    points.setAttribute('id', 'user-points');
    points.textContent = "New Score: " + userPoints + "/25";
    timerBox.append(points);

    questionBox.remove();

    questionBox = document.createElement('div');
    questionBox.className = 'mid-box'
    boxElements.append(questionBox);

    var endMessage = document.createElement('h2');
    endMessage.textContent = 'Finish! Save your score!'
    questionBox.append(endMessage);

    var formEl = document.createElement('form');
    var formLabel = document.createElement('label');
    var formInput = document.createElement('input');
    var formButton = document.createElement('button');

    questionBox.append(formEl);

    formLabel.setAttribute('for', 'User-Initials');
    formLabel.textContent = 'Your Initials: '
    questionBox.append(formLabel);

    formInput.setAttribute('type', "text");
    formInput.setAttribute('id', "user-input");
    questionBox.append(formInput);

    formButton.setAttribute('id', 'save-score');
    formButton.textContent = "SAVE";
    questionBox.append(formButton);

    formButton.addEventListener('click', saveScore);    

    return;
}

var prevScores =[];
//takes the user's input and store it in localstorage
function saveScore(event) {
    event.preventDefault();
    var userInput = document.getElementById('user-input');
    //checks to see if user inputed nothing and alerts the user,
    //otherwise save user's info to local storage.
    console.log(userInput.value);
    if (userInput.value == '' || userInput.value.includes(' ')) {
        alert('Please enter your Initials with no spaces!');
        userInput.value = '';
        return;
    } else {
        var userScores = {
            initials: userInput.value,
            pts: userPoints,
            time: timeCount,
        }
        prevScores = JSON.parse(localStorage.getItem('ScoreList'))
        if (prevScores == null) {
            prevScores = [userScores];
            localStorage.setItem('ScoreList', JSON.stringify(prevScores));
        } else {
            prevScores.push(userScores);
            prevScores.sort(function(a,b){return a.pts - b.pts });
            prevScores.reverse();
            if (prevScores.length > 5) {
                    prevScores.pop();
            }
            localStorage.setItem('ScoreList', JSON.stringify(prevScores));
        }
    }

    userInput.value = '';

    displayHighScore();
}

function displayHighScore() {
    questionBox.remove()

    questionBox = document.createElement('div');
    questionBox.className = 'mid-box'
    boxElements.append(questionBox);

    var title = document.createElement('h2');
    title.textContent = "High Scores"
    questionBox.append(title);

    var list = document.createElement('ol');
    list.setAttribute('class', 'score-list');
    questionBox.append(list);

    var listEl;
    prevScores = JSON.parse(localStorage.getItem('ScoreList'))
    for (var i = 0; i < prevScores.length; ++i) {
        listEl = document.createElement('li');
        var name = prevScores[i].initials;
        var points = prevScores[i].pts;
        var time = prevScores[i].time;
        listEl.textContent = name + '  ' + points + '/25  ' + time + 'sec';
        list.append(listEl);
    }

    var tempBox = document.createElement('div');
    questionBox.append(tempBox);

    var againBtn = document.createElement('button');
    var clearBtn = document.createElement('button');
    againBtn.textContent = 'Play Again';
    clearBtn.textContent = "Clear Scores"
    againBtn.setAttribute('id', 'temp-btn')
    clearBtn.setAttribute('id', 'temp-btn')
    tempBox.append(againBtn);
    tempBox.append(clearBtn);

    againBtn.addEventListener('click',function(){window.location.href = "./index.html";});

    clearBtn.addEventListener('click',function() {
        localStorage.removeItem('ScoreList');
        alert('Score cleared!');
    });

    return;


}


buttonEl.addEventListener('click', initQuiz);
