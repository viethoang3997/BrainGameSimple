{
    let questions=[{
      question: 'What is 2 + 8 ?', choice: [ '2', '4', '21', '10'], answer: 3
    },
    
    {
      question: 'What is 4 * 3 ?', choice: [ '2', '7', '12', '19'], answer: 2
    },
    
    {
      question: 'What is 9 / 3 ?', choice: [ '2', '3', '21', '17'], answer: 1
    },
    
    {
      question: 'What is 12 - 8 ?', choice: [ '2', '4', '21', '17'], answer: 1
    }]
     
    renderQuestion();
    
    setTimeRemaining();
    
    function renderQuestion(index=0) {
      document.getElementById('question').textContent='Question: '+questions[index]['question'];
      let answer='';
      questions[index]['choice'].forEach(value=> {
        answer +='<button onclick="chooseAnswer('+ index +', '+ value +')" class="question-answer btn col-6">'+value+'</button>'
      }
      );
      document.getElementById('quizzAnswer').innerHTML=answer;
    }
    
    let score=0;
    let time=10;
    
    function chooseAnswer(index, value) {
      let correct=questions[index]['answer'];
      if (value==questions[index]['choice'][correct]) {
        document.getElementById('correct').setAttribute("style", "display:block");
        setTimeout(function() {
          nextAnswer(index+1);
        }
        , 500) 
        setScore(10)
      }
      else {
        setGameOver();
      }
    }
    
    function nextAnswer(index) {
      time=10;
      if (index==questions.length) {
        alert('Bạn đã hoàn thành đầy đủ lượt câu hỏi đầu tiên');
        renderQuestion();
      }
      renderQuestion(index);
      setCorrect();
      document.getElementById('correct').removeAttribute("style");
    }
    
    function setScore(value=0) {
      score=value==0 ? 0: score+value;
      document.getElementById('quizzScore').innerHTML='Score: '+score;
    }
    
    function setGameOver() {
      setCorrect();
      document.getElementById('gameOver').setAttribute('style', 'display:block');
      document.getElementById('gameOver').innerHTML='GAME OVER!<br>YOUR SCORE IS '+score;
    }
    
    function setTimeRemaining() {
      let myInterval=setInterval(function() {
        document.getElementById('quizzTime').innerHTML='Time remaining:' + time 
        if (time <=0) {
          setGameOver();
          clearInterval(myInterval) 
          return;
        }
        time -=1;
      }
      , 1000)
    }
    
    function setResetGame() {
      time=10;
      setTimeRemaining();
      renderQuestion();
      setScore();
      document.getElementById('gameOver').removeAttribute('style', 'display:none');
    }
    
    function setCorrect() {
      let temp=getCorrect();
      if(score > temp) {
        localStorage.setItem('score', score)
      }
    }
    
    function getCorrect() {
      let maxScore=localStorage.getItem('score');
      return maxScore;
    }
    
    function highScore() {
      highScore=getCorrect();
      alert('Điểm số cao nhất là: '+ highScore);
    }
}