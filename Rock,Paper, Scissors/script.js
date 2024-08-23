console.log("hello");



const getComputerChoice = () => {
  let a;
  function choice() {
    return Math.floor(Math.random() * 10);
  }
  a = choice();
//   console.log(a);

  if (a >= 0 && a <= 3) {
     return "rock"
  } else if (a >= 4 && a <= 6) {
    return "scissor"
  } else {
    return "paper"
  }
  
};


const getHumanChoice = () => {
  const person = prompt("make a choice between rock,paper or scissor");
  if (
    person.toLowerCase() !== "rock" &&
    person.toLowerCase() !== "scissor" &&
    person.toLowerCase() !== "paper"
  ) {
    alert("enter valid choice")
  } else {
    console.log(person.toLowerCase());
    
    return person.toLowerCase()
  }
};

let humanScore = 0;
let computerScore = 0;
const playRound = (humanChoice, computerChoice) => {
    if (humanChoice === computerChoice) {
        console.log("draw");
    }
  else if (humanChoice === "rock" && computerChoice === "paper") {
    computerScore++
    console.log("you lost");
  } else if (humanChoice === "paper" && computerChoice === "rock") {
    humanScore++
    console.log("you won");
  } else if (humanChoice === "scissor" && computerChoice === "rock") {
    computerScore++
    console.log("you lost");
  } else if (humanChoice === "rock" && computerChoice === "scissor") {
    humanScore++
    console.log("you won");
  } else if (humanChoice === "paper" && computerChoice === "scissor") {
    computerScore++
    console.log("you lost");
  } else if  (humanChoice === "scissor" && computerChoice === "paper") {
    humanScore++
    console.log("you won");
  }
    else {
      console.log("invalid input");

    }
    console.log(`human score is ${humanScore}`);
    console.log(`computer score is ${computerScore}`);
};


const playGame = () => {
   for(let i=1; i<=5; i++){
    const humanSelection = getHumanChoice();
    const computerSelection = getComputerChoice();
    playRound(humanSelection, computerSelection)
   }
}
playGame()

if(humanScore> computerScore){
    console.log("you won the game");
    
}else if(humanScore === computerScore){
    console.log("game draw");
}else{
    console.log("you lost the game");
    
}
