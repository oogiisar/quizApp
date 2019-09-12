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
        question: 'Who is a famous leader of Mongolia?',
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
    {   question: 'Where in the world is Mongolia located?',
        answers: ['Between China and Russia', 'Between Turkey and Armenia', 'Between India and China', 'Between Russia and Ukraine'],
        correctAnswer: 'Between China and Russia',
        image: 'img/LocationMongolia.png',
        alt: 'location of Mongolia'
    },
    {   question: 'How large is Mongolia compared to others?',
        answers:  ['50th largest country', '125th largest country', '18th largest country', '5th largest country'],
        correctAnswer: '18th largest country',
        image: 'img/Mongolia_USA.jpg',
        alt:    'how big Mongolia compared to USA'
    },
    {   question: 'What sport is common in Mongolia?',
        answers: ['Soccer', 'Wrestling', 'Sumo', 'Baseball'],
        correctAnswer: 'Wrestling',
        image: 'img/Mongolia-Naadam.jpg',
        alt: 'Mongolian naadam'
    },
];

let questionNum = 0;
let statNum = 0;
let score = 0;

function renderQuizApp() {
    if(questionNum < STORE.length) {
        return `<form class="question_box">
            <fieldset> 
                <legend class="question_head">${STORE[questionNum].question}</legend>
                <label class="answer">
                    <input type="radio" name="answer" required value="${STORE[questionNum].answers[0]}"><span>${STORE[questionNum].answers[0]}</span></label>
                <label class="answer">
                    <input type="radio" name="answer" required value="${STORE[questionNum].answers[1]}"><span>${STORE[questionNum].answers[1]}</span></label>
                <label class="answer">
                    <input type="radio" name="answer" required value="${STORE[questionNum].answers[2]}"><span>${STORE[questionNum].answers[2]}</span></label>
                <label class="answer">
                    <input type="radio" name="answer" required value="${STORE[questionNum].answers[3]}"><span>${STORE[questionNum].answers[3]}</span></label>
                <input type=submit value=Submit class="button submit">
            </fieldset>
        </form>`
    } else {
        $('.restart').show();
        quizResult();    
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
    incrementQuestion();
    $('.question_box').remove();
    $('.quiz_box').html(renderQuizApp());
}

function startQuiz() {
    $('.question_box').on('click', '.start', function(event){
        event.preventDefault();
        quizQuestion();
    });
}

function nextQuestion() {
    questionNum++
    quizQuestion();

}

function correctUpdate(answer) {
    $('.question_box').remove();
    $('.quiz_box').html(
        `<form class="question_box">
            <fieldset> 
                <legend class="answer_head">You are correct! One point added</legend>
                <label class="answer">${answer}</label>
                <label class="answer"><img class="correct_img" src=${STORE[questionNum].image} alt=${STORE[questionNum].alt}></label>
                <input type=submit value=Next class="button next">
            </fieldset>
        </form>`
    );
}

function wrongUpdate(answer) {
    $('.question_box').remove();
    $('.quiz_box').html(
        `<form class="question_box">
            <fieldset> 
                <legend class="answer_head">Wrong! The correct answer is</legend>
                <label class="answer">${answer}</label>
                <label class="answer"><img class="correct_img" src=${STORE[questionNum].image} alt=${STORE[questionNum].alt}></label>
                <input type=submit value=Next class="button next">
            </fieldset>
        </form>`
    );
}

function handleButton() {
    $('.quiz_box').on('submit', function(event){
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
    $('.stats').remove
    $('.statNum').text(`Question: ${STORE.length}/${STORE.length}`);

    if(score >= 7) {
        $('.quiz_box').html(
            `<section class="question_box">
                <h3 class="result_text">You rock!</h3>
                <p class="result_text">You scored ${score} points</p>
                <img src="img/camel.jpg" alt="Happy girl with camel" class="result_img">
                <button class="button restart">Restart</button> 
            </section>`
        );
    } else if(score < 7 && score >= 4) {
        $('.quiz_box').html (
            `<section class="question_box">
                <h3 class="result_text">You are not bad!</h3>
                <p class="result_text">You scored ${score} points</p>
                <img src="img/eagle.jpg" alt="Eagle huntress" class="result_img">
                <button class="button restart">Restart</button> 
            </section>`
        );
    } else {
        $('.quiz_box').html(
            `<section class="question_box">
                <h3 class="result_text">Ooh not great :(</h3>
                <p class="result_text">You scored ${score} points</p>
                <img src="img/falling.jpg" alt="Wrestler falling down" class="result_img">
                <button class="button restart">Restart</button> 
            </section>`
        );
    }
}

function restartQuiz() {
	$('main').on('click', '.restart', function (e) {
        location.reload(); 
	});
} 

function quiz() {
    $('.restart').hide();
    startQuiz();
    handleButton();
    restartQuiz();
}
$(quiz);