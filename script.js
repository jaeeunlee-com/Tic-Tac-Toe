const Gameboard = (() => {
  const board = ['', '', '', '', '', '', '', '', ''];

  const getBoard = () => board;

  const setMark = (index, mark) => {
    if (board[index] === '') {
      board[index] = mark;
      return true;
    }
    return false;
  };

  const resetBoard = () => {
    for (let i = 0; i < board.length; i++) board[i] = '';
  };

  return { getBoard, setMark, resetBoard };
})();

const Player = (name, mark) => {
  return { name, mark };
};

const GameController = (() => {
  let players = [];
  let currentPlayerIndex = 0;
  let gameOver = false;

  const setPlayers = (player1, player2) => {
    players = [player1, player2];
  };

  const getCurrentPlayer = () => players[currentPlayerIndex];

  const switchPlayer = () => {
    currentPlayerIndex = 1 - currentPlayerIndex;
  };

  const checkWinner = () => {
    const b = Gameboard.getBoard();
    const lines = [
      [0,1,2],[3,4,5],[6,7,8],
      [0,3,6],[1,4,7],[2,5,8],
      [0,4,8],[2,4,6]
    ];
    for (let [a, b1, c] of lines) {
      if (b[a] && b[a] === b[b1] && b[a] === b[c]) {
        return b[a];
      }
    }
    if (!b.includes('')) {
      gameOver = true;
      return 'tie';
    }
    return null;
  };

  const isGameOver = () => gameOver;

  const resetGame = () => {
    Gameboard.resetBoard();
    gameOver=false;
    currentPlayerIndex = 0;
  };
return { setPlayers, getCurrentPlayer, switchPlayer, checkWinner, isGameOver, resetGame };
})();
const DisplayController = (() => {
  const boardDiv = document.querySelector('#board');
  const statusDiv = document.querySelector('#status');
  const startBtn = document.querySelector('#startBtn');
  const resetBtn = document.querySelector('#resetBtn');
  const player1Input = document.querySelector('#player1');
  const player2Input = document.querySelector('#player2');

  const renderBoard = () => {
    boardDiv.innerHTML = '';
    Gameboard.getBoard().forEach((mark, index) => {
      const cell = document.createElement('div');
      cell.textContent = mark;
      cell.classList.add('cell');
      cell.addEventListener('click', () => handleCellClick(index));
      boardDiv.appendChild(cell);
    }
    );
  };

  const handleCellClick = (index) => {
    if (GameController.isGameOver()) return;

    const currentPlayer= GameController.getCurrentPlayer();
    const successfulMove = Gameboard.setMark(index, currentPlayer.mark);

    if(!successfulMove) return;
    renderBoard();

    if (winner) {
      if (winner === 'tie') {
        statusDiv.textContent = "It's a tie!";
      } else {
        statusDiv.textContent = `${currentPlayer.name} wins!`;
      } 
    }
    else {
        GameController.switchPlayer();
        statusDiv.textContent = `${GameController.getCurrentPlayer().name}'s turn`;
      }
    };

    const startGame = () => {
      const p1Name = player1Input.value || 'Player 1';
      const p2Name = player2Input.value || 'Player 2';
      const player1 = Player(p1Name, 'X');
      const player2 = Player(p2Name, 'O');
      GameController.setPlayers(player1, player2);
      GameController.resetGame();
      renderBoard();
      statusDiv.textContent = `${GameController.getCurrentPlayer().name}'s turn`;
    }
  startBtn.addEventListener('click', startGame);
  resetBtn.addEventListener('click', resetGame);

  return { renderBoard };
})();

DisplayController.renderBoard();
