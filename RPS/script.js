// console.log("hello");
const buttons = document.querySelectorAll("Button")
const message = document.getElementById("outcome")


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

document.addEventListener("DOMContentLoaded",()=>{
  let humanScore = 0;
  let computerScore = 0;
  const playRound = (userChoice) => {
    const computerChoice = getComputerChoice()
      if (userChoice === computerChoice) {
        message.textContent=`draw, your score is ${humanScore} and computer score is ${computerScore} \n your choice is ${userChoice} and computer choice is ${computerChoice}`
        message.style.height = "10vh"
        // console.log("draw");
      }
    else if (userChoice === "rock" && computerChoice === "paper") {
      computerScore++
  message.textContent=`lost, your score is ${humanScore} and computer score is ${computerScore} \n your choice is ${userChoice} and computer choice is ${computerChoice}`
  message.style.height = "10vh"
  // console.log("draw");
    } else if (userChoice === "paper" && computerChoice === "rock") {
      humanScore++
    message.textContent=`won, your score is ${humanScore} and computer score is ${computerScore} \n your choice is ${userChoice} and computer choice is ${computerChoice}`
    message.style.height = "10vh"
    // console.log("draw");
    
    } else if (userChoice === "scissor" && computerChoice === "rock") {
      computerScore++
   message.textContent=`lost, your score is ${humanScore} and computer score is ${computerScore} \n your choice is ${userChoice} and computer choice is ${computerChoice}`
   message.style.height = "10vh"
   // console.log("draw");
   
    } else if (userChoice === "rock" && computerChoice === "scissor") {
      humanScore++
      message.textContent=`won, your score is ${humanScore} and computer score is ${computerScore}\n your choice is ${userChoice} and computer choice is ${computerChoice}`
      message.style.height = "10vh"
      // console.log("draw");
      
    } else if (userChoice === "paper" && computerChoice === "scissor") {
      computerScore++
      message.textContent=`lost, your score is ${humanScore} and computer score is ${computerScore}\n your choice is ${userChoice} and computer choice is ${computerChoice}`
      message.style.height = "10vh"
      // console.log("draw");;
      
    } else if  (userChoice === "scissor" && computerChoice === "paper") {
      humanScore++
     message.textContent=`won, your score is ${humanScore} and computer score is ${computerScore} \n your choice is ${userChoice} and computer choice is ${computerChoice}`
     message.style.height = "10vh"
        // console.log("draw");
     
    }
      else {
        console.log("invalid input");
  
      }
     
  };
  
  buttons.forEach((button) => {
    button.addEventListener("click", () => {
      const userChoice = button.value;
      playRound(userChoice);
    });
  });
      
  
  
})


