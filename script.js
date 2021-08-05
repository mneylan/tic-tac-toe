//Gameboard Module
let gameBoard = (() => {
 

 let gridItems = document.querySelectorAll('.grid');
//  let gridZero = document.querySelector('.item1').innerHTML;
//  let gridOne = document.querySelector('.item2').innerHTML;
//  let gridTwo = document.querySelector('.item3').innerHTML;
//  let gridThree = document.querySelector('.item4').innerHTML;
//  let gridFour = document.querySelector('.item5').innerHTML;
//  let gridFive = document.querySelector('.item6').innerHTML;
//  let gridSix = document.querySelector('.item7').innerHTML;
//  let gridSeven = document.querySelector('.item8').innerHTML;
//  let gridEight = document.querySelector('.item9').innerHTML;

 let board = ["", "", "", "", "", "", "", "", ""];

 
 let print = () => {
  let i = 0 
  gridItems.forEach((item) => {
   console.log(i)
   item.innerHTML = board[i]
   i += 1
  })};

  
 
 return {board, gridItems, print}
})();

let player = (name, symbol) => {
  return {name, symbol}
}

const playerOne = player("Player 1", "x")
const playerTwo = player("Player 2", "o")
let currentPlayer = playerOne;
let counter = 0

//Game Module
let game = (() => {

let winningContainer = document.querySelector('.player-info')

let edit = document.querySelectorAll('.far');

let changeName = () => {
  edit[0].addEventListener('click', () => {
    let name = prompt('What is your name?');

    if (name == null || name == "") {return}

    let nameDom = document.querySelector('.player-1')
    nameDom.textContent = name
    playerOne.name = name
  })
  edit[1].addEventListener('click', () => {
    let name = prompt('What is your name?');

    if (name == null || name == "") {return}

    let nameDom = document.querySelector('.player-2')
    nameDom.textContent = name
    playerTwo.name = name
  })
}

let switchPlayer = () => {
  if (currentPlayer == playerOne) {
   currentPlayer = playerTwo
  } else { currentPlayer = playerOne}
    
}

let updateBoard = () => {
  let i = 0 
  gameBoard.gridItems.forEach((item) => {
   
  gameBoard.board[i] = item.innerHTML
   i += 1
  })
return gameBoard.board};

let checkWinner = () => {
  // updateBoard()
  if (gameBoard.board.slice(0, 3).toString() == ["x", "x", "x"].toString() || gameBoard.board.slice(0, 3).toString() == ["o", "o", "o"].toString()) {return true}
  else if (gameBoard.board.slice(3, 6).toString() == ["x", "x", "x"].toString() || gameBoard.board.slice(3, 6).toString() == ["o", "o", "o"].toString()) {return true} 
  else if (gameBoard.board.slice(6, 9).toString() == ["x", "x", "x"].toString() || gameBoard.board.slice(6, 9).toString() == ["o", "o", "o"].toString()) {return true}
  else if ([gameBoard.board[0], gameBoard.board[3], gameBoard.board[6]].toString() == ["x", "x", "x"].toString() || [gameBoard.board[0], gameBoard.board[3], gameBoard.board[6]].toString() == ["o", "o", "o"].toString()) {return true} 
  else if ([gameBoard.board[1], gameBoard.board[4], gameBoard.board[7]].toString() == ["x", "x", "x"].toString() || [gameBoard.board[1], gameBoard.board[4], gameBoard.board[7]].toString() == ["o", "o", "o"].toString()) {return true} 
  else if ([gameBoard.board[2], gameBoard.board[5], gameBoard.board[8]].toString() == ["x", "x", "x"].toString() || [gameBoard.board[2], gameBoard.board[5], gameBoard.board[8]].toString() == ["o", "o", "o"].toString()) {return true}
  else if ([gameBoard.board[0], gameBoard.board[4], gameBoard.board[8]].toString() == ["x", "x", "x"].toString() || [gameBoard.board[0], gameBoard.board[4], gameBoard.board[8]].toString() == ["o", "o", "o"].toString()) {return true}
  else if ([gameBoard.board[2], gameBoard.board[4], gameBoard.board[6]].toString() == ["x", "x", "x"].toString() || [gameBoard.board[2], gameBoard.board[4], gameBoard.board[6]].toString() == ["o", "o", "o"].toString()) {return true} 
  else {return false}
}

let addWinner = () => {
  
  let winnerContainer = document.createElement('div')
  winnerContainer.className = "display-winner-container"
  let winnerItem = document.createElement('div')
  winnerItem.className = "display-winner"
  winnerItem.textContent = `${currentPlayer.name} wins!`
  
  let btnContainer = document.createElement('div')
  btnContainer.className = "btn-container"
  let btnNew = document.createElement('button')
  btnNew.className = "new-game"
  btnNew.textContent = "New Game"


  winnerContainer.appendChild(winnerItem)
  winningContainer.appendChild(winnerContainer)
  btnContainer.appendChild(btnNew)
  winningContainer.appendChild(btnContainer)

  restartGame()
}

let addTie = () => {
  let winnerContainer = document.createElement('div')
  winnerContainer.className = "display-winner-container"
  let winnerItem = document.createElement('div')
  winnerItem.className = "display-winner"
  winnerItem.textContent = "It's a tie!"

  let btnContainer = document.createElement('div')
  btnContainer.className = "btn-container"
  let btnNew = document.createElement('button')
  btnNew.className = "new-game"
  btnNew.textContent = "New Game"


  winnerContainer.appendChild(winnerItem)
  winningContainer.appendChild(winnerContainer)
  btnContainer.appendChild(btnNew)
  winningContainer.appendChild(btnContainer)

  restartGame()
}

let restartGame = () => {
let btn = document.querySelector('.new-game')
btn.addEventListener('click', () => {
  let btnContain = document.querySelector('.new-game')
  let displayWin = document.querySelector('.display-winner')
  
  btnContain.parentNode.remove()
  displayWin.parentNode.remove()

  gameBoard.gridItems.forEach(item => item.innerHTML = "")
  currentPlayer = playerOne
  newGame()
  
})
}

let activateGame = (item) => {
  item.target.innerHTML = currentPlayer.symbol
  
  counter += 1
  
  updateBoard()
  checkWinner()
  if (checkWinner() == true) {
    addWinner()
    gameBoard.gridItems.forEach(item => item.removeEventListener('click', activateGame))
    
  }

  if (counter == 9 && checkWinner() == false) {
    addTie()
    gameBoard.gridItems.forEach(item => item.removeEventListener('click', activateGame))
  }
  switchPlayer()
}

let newGame = () => {
  counter = 0
  gameBoard.gridItems.forEach((item) => item.addEventListener('click', activateGame, {once: true }))} 

return {edit, changeName, switchPlayer, updateBoard, checkWinner, newGame, winningContainer, addWinner, addTie, restartGame}
})();

game.changeName()
game.newGame();





// let newGame = () => {
//   let counter = 0
//   gameBoard.gridItems.forEach((item) => item.addEventListener('click', (e) => {
//   item.innerHTML = currentPlayer.symbol
//   counter += 1
//   if (counter == 9) {addTie()}
//   updateBoard()
//   checkWinner()
//   if (checkWinner() == true) {
//     addWinner()
    
    
//   }
//   switchPlayer()
  
// }, {once: true }))} 