const gameboard = (() => {
  const grid = [[], [], [], [], [], [], [], [], []];
  let cells;

  const render = (playerOne, playerTwo, playerOneChoice, playerTwoChoice) => {
    const startBtn = document.getElementById("start");
    cells = document.querySelector(".cells");

    startBtn.addEventListener("click", () => {
      cells.innerHTML = "";
      for (let i = 1; i <= 9; i++) {
        const cell = document.createElement("div");
        cell.dataset.index = -1 + i;
        cell.classList.add("pixel");
        cells.appendChild(cell);
      }

      details.textContent = `PlayerOne = ${playerOne}, PlayerTwo = ${playerTwo}, PlayerOneChoice = ${playerOneChoice}, PlayerTwoChoice = ${playerTwoChoice}`;
    });
  };

  const resetGrid = () => {
    for (let i = 0; i < grid.length; i++) {
      grid[i] = [];
    }
    if (cells) {
      cells.innerHTML = "";
    }
  };

  const getAllCells = () => {
    if (cells) {
      const allCells = cells.querySelectorAll(".pixel");
      console.log("all cells = ", allCells.length);

      return allCells;
    } else {
      return [];
    }
  };

  return { render, getAllCells, getGrid: () => grid, resetGrid };
})();

const gameContent = (() => {
  const details = document.getElementById("details");
  const playerOneInput = document.getElementById("p1");
  const playerTwoInput = document.getElementById("p2");
  const choice = document.getElementById("choice");
  let render = false;
  let playerOneChoice;
  let playerTwoChoice;
  let playerOne;
  let playerTwo;

  const checkPlayers = () => {
    playerOne = playerOneInput.value;
    playerTwo = playerTwoInput.value;
    playerOneChoice = choice.value;
    if (playerOneChoice === "X") {
      playerTwoChoice = "O";
    } else if (playerOneChoice === "O") {
      playerTwoChoice = "X";
    }
    if (
      playerOne &&
      playerTwo &&
      render === false &&
      (playerOneChoice === "X" || playerOneChoice === "O")
    ) {
      gameboard.render(playerOne, playerTwo, playerOneChoice, playerTwoChoice);
      render = true;
    }
  };

  const winConditon = () => {
    const grid = gameboard.getGrid();
    if (
      (grid[0].includes(playerOneChoice) &&
        grid[1].includes(playerOneChoice) &&
        grid[2].includes(playerOneChoice)) ||
      (grid[3].includes(playerOneChoice) &&
        grid[4].includes(playerOneChoice) &&
        grid[5].includes(playerOneChoice)) ||
      (grid[6].includes(playerOneChoice) &&
        grid[7].includes(playerOneChoice) &&
        grid[8].includes(playerOneChoice)) ||
      (grid[0].includes(playerOneChoice) &&
        grid[3].includes(playerOneChoice) &&
        grid[6].includes(playerOneChoice)) ||
      (grid[1].includes(playerOneChoice) &&
        grid[4].includes(playerOneChoice) &&
        grid[7].includes(playerOneChoice)) ||
      (grid[2].includes(playerOneChoice) &&
        grid[5].includes(playerOneChoice) &&
        grid[8].includes(playerOneChoice)) ||
      (grid[0].includes(playerOneChoice) &&
        grid[4].includes(playerOneChoice) &&
        grid[8].includes(playerOneChoice)) ||
      (grid[2].includes(playerOneChoice) &&
        grid[4].includes(playerOneChoice) &&
        grid[6].includes(playerOneChoice))
    ) {
      details.textContent = `${playerOne} wins!`;
      return true;
    } else if (
      (grid[0].includes(playerTwoChoice) &&
        grid[1].includes(playerTwoChoice) &&
        grid[2].includes(playerTwoChoice)) ||
      (grid[3].includes(playerTwoChoice) &&
        grid[4].includes(playerTwoChoice) &&
        grid[5].includes(playerTwoChoice)) ||
      (grid[6].includes(playerTwoChoice) &&
        grid[7].includes(playerTwoChoice) &&
        grid[8].includes(playerTwoChoice)) ||
      (grid[0].includes(playerTwoChoice) &&
        grid[3].includes(playerTwoChoice) &&
        grid[6].includes(playerTwoChoice)) ||
      (grid[1].includes(playerTwoChoice) &&
        grid[4].includes(playerTwoChoice) &&
        grid[7].includes(playerTwoChoice)) ||
      (grid[2].includes(playerTwoChoice) &&
        grid[5].includes(playerTwoChoice) &&
        grid[8].includes(playerTwoChoice)) ||
      (grid[0].includes(playerTwoChoice) &&
        grid[4].includes(playerTwoChoice) &&
        grid[8].includes(playerTwoChoice)) ||
      (grid[2].includes(playerTwoChoice) &&
        grid[4].includes(playerTwoChoice) &&
        grid[6].includes(playerTwoChoice))
    ) {
      details.textContent = `${playerTwo} wins!`;
      return true;
    }
    return false;
  };

  playerOneInput.addEventListener("input", checkPlayers);
  playerTwoInput.addEventListener("input", checkPlayers);
  choice.addEventListener("input", checkPlayers);

  const resetPlayers = () => {
    playerOne = "";
    playerTwo = "";
    playerOneChoice = "";
    playerTwoChoice = "";
    playerOneInput.value = "";
    playerTwoInput.value = "";
    choice.value = "";
    render = false;
  };

  return {
    getPlayerOneChoice: () => playerOneChoice,
    getPlayerTwoChoice: () => playerTwoChoice,
    winConditon,
    resetPlayers,
    checkPlayers,
  };
})();

let gameOver = false;

const playGame = (() => {
  let status 
  let allCells;
  const startBtn = document.getElementById("start");

  startBtn.addEventListener("click", () => {
    setTimeout(() => {
      status = true
      allCells = gameboard.getAllCells();
      console.log(allCells);
      allCells.forEach((cell) => {
        cell.addEventListener("click", (e) => {
          if (cell.textContent !== "" || gameOver === true) return;

          let val = e.target.dataset.index;
          if (status === true) {
            cell.textContent = gameContent.getPlayerOneChoice();
            gameboard.getGrid()[val].push(gameContent.getPlayerOneChoice());
            status = false;
          } else {
            cell.textContent = gameContent.getPlayerTwoChoice();
            gameboard.getGrid()[val].push(gameContent.getPlayerTwoChoice());
            status = true;
          }
          if (gameContent.winConditon()) {
            gameOver = true;
          }
        });
      });
    }, 100);
  });
  const stat = ()=>{
    return status = true
  }
  return{stat}
})();

const restartGame = () => {
  playGame.stat()
  gameOver = false;

  gameContent.resetPlayers();

  gameboard.resetGrid();

  gameContent.checkPlayers();
  

  const details = document.getElementById("details");
  details.textContent = "";
};

const restartBtn = document.getElementById("restart");
restartBtn.addEventListener("click", restartGame);
