let scoreStr = localStorage.getItem('Score');
let score;
resetScore(scoreStr);

function resetScore(scoreStr){
    if(scoreStr !== null){
        score = JSON.parse(scoreStr);
    }
    else{
        score = {
            win: 0,
            lost: 0,
            tie: 0,
        }; 
    }
    
    score.showingScore = function(){
        return ` Won: ${score.win}, Lost: ${score.lost}, Tie: ${score.tie}`;
    };

    displayResult();
}

function computerCh(){
    let randomNumber = Math.random() * 3;
    if(randomNumber >= 0 && randomNumber <1 ){
        return 'bat';
    }
    else if(randomNumber >= 1 && randomNumber < 2 ){
        return 'ball';
    }
    else {
        return 'stump';
    }
}

function result(computerMove, userMove) {
    if(computerMove === userMove){
        score.tie++;
        return 'Its a Tie.';
    }
    else if((computerMove === 'stump' && userMove === 'ball') || (computerMove === 'ball' && userMove === 'bat') || (computerMove === 'bat' && userMove === 'stump')){
        score.win++;
        return 'User has won.';
    }
    else{
        score.lost++;
        return 'Computer has won.';
    }
}

function displayResult(computerMove, userMove, resultMove) {
    localStorage.setItem('Score', JSON.stringify(score));
    document.querySelector('#user-move').innerText = 
        userMove !== undefined ? `You have chosen ${userMove}.` : '';
        //userMove ? `You have chosen ${userMove}.` : ''; can also write like this
    document.querySelector('#computer-move').innerText = 
        computerMove !== undefined ? `Computer choice is ${computerMove}.` : '';

    const resultElement = document.querySelector("#result");
    resultElement.innerText = resultMove || "";
    resultElement.className = ""; // reset animation color
    if (resultMove?.includes("User")) resultElement.classList.add("win");
    else if (resultMove?.includes("Computer"))
        resultElement.classList.add("lost");
    else if (resultMove?.includes("Tie")) resultElement.classList.add("tie");

    document.querySelector('#score').innerText = score.showingScore();
}