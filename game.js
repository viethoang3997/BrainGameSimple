
let questions = [
    {
        question: 'What is 2 + 8 ?',
        choice: [
            '2', '4', '21', '10'
        ],
        answer: 3,
    },
    {
        question: 'What is 4 * 3 ?',
        choice: [
            '2', '7', '12', '19'
        ],
        answer: 2,
    },
    {
        question: 'What is 9 / 3 ?',
        choice: [
            '2', '3', '21', '17'
        ],
        answer: 1,
    },
    {
        question: 'What is 12 - 8 ?',
        choice: [
            '2', '4', '21', '17'
        ],
        answer: 1
    }
]

renderQuestion(0);

setTimeRemaining();

function renderQuestion(index) {
   document.getElementById('question').textContent = 'Question: ' + questions[index]['question'] ;
   let answer = '';
   questions[index]['choice'].forEach(value => {
   answer += '<button onclick="chooseAnswer('+ index +', '+ value +')" class="question-answer btn col-6">'+value+'</button>'
   });
   document.getElementById('quizzAnswer').innerHTML = answer;
}

let score = 0;
let time = 10;

function chooseAnswer(index, value) {
    let correct = questions[index]['answer'];
    if (value == questions[index]['choice'][correct]){
        document.getElementById('correct').setAttribute("style", "display:block");
        setTimeout(function(){
            nextAnswer(index+1);
        }, 500)
        setScore(10)
    } else { 
        setGameOver();
    }
}

function nextAnswer(index)
{
    time = 10;
    if (index == questions.length) {
        alert('Bạn đã hoàn thành đầy đủ các câu trả lời');
    }
    renderQuestion(index);
    document.getElementById('correct').removeAttribute("style");
}


function setScore(val = 0) {
    score = val == 0 ? 0 : score+val;
    document.getElementById('quizzScore').innerHTML = 'Score: '+score;
}

function setGameOver() {
    setCorrect();
    document.getElementById('gameOver').setAttribute('style', 'display:block');
    document.getElementById('gameOver').innerHTML = 'GAME OVER!<br>YOUR SCORE IS ' + score;
}

function setTimeRemaining() {
    let myInterval = setInterval(function() {
        document.getElementById('quizzTime').innerHTML = 'Time remaining:' + time
        if (time <= 0) {
            setGameOver();
            clearInterval(myInterval)
            return;
        }
        time -= 1;
    }, 1000)
}

function setResetGame() {
    time = 10;
    setTimeRemaining();
    renderQuestion(0);
    setScore();
    document.getElementById('gameOver').removeAttribute('style', 'display:none');
}

function setCorrect() {
    localStorage.setItem('score', score);
}

function getCorrect() {
    let maxScore = localStorage.get('score'); 
}