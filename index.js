'use strict';

const STORE = [
    {
        question: 'What is the capital of Mongolia?',
        answers: ['Ulaanbaatar', 'Istanbul', 'Belmopan', 'Lusaka'],
        correctAnswer: 'Ulaanbaatar',
        image: 'img/Ulaanbaatar.jpg',
        alt:  'picture of Ulaanbaatar' 
    },
    {
        question: 'What language is spoken in Mongolia?',
        answers: ['Sylheti', 'Zulu', 'Mongolian', 'Magahi'],
        correctAnswer: 'Mongolian',
        image: 'img/Mongolian_writing.jpg',
        alt: 'mongolian script'
    },
    {
        question: 'Who is the most famous leader of Mongolia?',
        answers: ['George Washington', 'Chingis Khaan', 'Mohatma Gandhi', 'Vladmir Lenin'],
        correctAnswer: 'Chingis Khaan',
        image: 'img/Chingis_khaan.jpg',
        alt: 'picture of the great Chingis khaan'
    },
    {
        question: 'What is the population in Mongolia?',
        answers: ['6 million', '14 million', '20 million', '3 million'],
        correctAnswer: '3 million',
        image: 'img/Population.jpg',
        alt: 'population of Mongolia'
    },
    {
        question: 'What color is the Mongolian flag?',
        answers: ['Red, Green, Blue', 'Yellow, Pink', 'White, Red, Blue', 'Red, Blue, Yellow'],
        correctAnswer: 'Red, Blue, Yellow', 
        image: 'img/MongolianFlag.png',
        alt: 'Mongolian flag'
    },
];

//create variable to store question number
let questionNum = 0;
let statNum = 0;
//create variable to store score
let score = 0;

function renderQuizApp() {
    console.log("renderQuizApp ran")
    //generate the question
    if(questionNum < STORE.length) {
        return `<form class="question_box">
            <fieldset> 
            <legend>${STORE[questionNum].question}</legend>
            <ul class="answer">
                <li><input type="radio" name="answer" required value="${STORE[questionNum].answers[0]}">${STORE[questionNum].answers[0]}</li>
                <li><input type="radio" name="answer" required value="${STORE[questionNum].answers[1]}">${STORE[questionNum].answers[1]}</li>
                <li><input type="radio" name="answer" required value="${STORE[questionNum].answers[2]}">${STORE[questionNum].answers[2]}</li>
                <li><input type="radio" name="answer" required value="${STORE[questionNum].answers[3]}">${STORE[questionNum].answers[3]}</li>
            </ul>
            <input type=submit value=Submit class="button submit">
            </fieldset>
        </form>`
    } else {
        quizResults(); // not done yet
            
    }
} 

function incrementQuestion() {
    statNum++;
    $('.stats').remove
    $('.statNum').text(`Question: ${statNum}/${STORE.length}`);
}

function incrementScore() {
    score++;
    $('.stats').remove;
    $('.sNumber').text(`Score: ${score}`);
}

function quizQuestion() {
    console.log("quizQuestion ran");
    incrementQuestion();
    $('.question_box').remove();
    $('.quiz_box').html(renderQuizApp());
}

function startQuiz() {
    //start a quiz
    $('.question_box').on('click', '.start', function(event){
        event.preventDefault();
        //display quiz box
        quizQuestion();
    });
}

function nextQuestion() {
    console.log("nextQuestion Ran")
    questionNum++
    quizQuestion();

}

function correctUpdate(answer) {
    console.log("correctUpdate ran")
    $('.question_box').remove();
    $('.quiz_box').html(
        `<form class="question_box">
            <fieldset> 
            <legend>You are correct!</legend>
            <!-- add <label></label> -->

            <ul class=answer>
                <li>${answer}</li>
                <li><img class="correct_img" src=${STORE[questionNum].image} alt=${STORE[questionNum].alt}></li>
            </ul>
            <input type=submit value=Next class="button next">
            </fieldset>
        </form>`
    );
}

function wrongUpdate(answer) {
    console.log("wrongUpdate ran")
    $('.question_box').remove();
    $('.quiz_box').html(
        `<form class="question_box">
            <fieldset> 
            <legend>Wrong! The correct answer</legend>
            <!-- add <label></label> -->

            <ul class=answer>
                <li>${answer}</li>
                <li><img class="correct_img" src=${STORE[questionNum].image} alt=${STORE[questionNum].alt}></li>
            </ul>
            <input type=submit value=Next class="button next">
            </fieldset>
        </form>`
        
    );
}

function checkQuestion() {
    //check quiz
    $('.quiz_box').on('submit', function(event){
        console.log("checkQuestion Ran")
        event.preventDefault();
        let selection = $('input:checked');
        let answer  = selection.val();
        let correctAnswer = `${STORE[questionNum].correctAnswer}`;
        if (answer == undefined) {
            nextQuestion();
        } else if (answer === correctAnswer) {
            correctUpdate(answer);
            incrementScore();
        } else {
            wrongUpdate(correctAnswer); 
        }
    })
}

function quizResult() {
    if(score >=5) {
        $('.question_box').html(
            //write feedback you did great or some picture that excited
            //then restart quiz
        );
    } else if (score < 5 && score >= 3) {
        $('.question_box').html (

        );
    } else {
        $('.question_box').html(

        );
    }

}

function quiz() {
    startQuiz();
    renderQuizApp();
    checkQuestion();
    quizResult();
}
$(quiz);

// Update html code in renderQuizApp, correctUpdate, wrongUpdate