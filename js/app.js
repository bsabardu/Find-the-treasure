const app = {
  boardColumns: 6,
  boardRows: 4,
  gameOver: false,
  nbMove: 0,

  //Objet html Elements
  htmlElements: {
    board: document.querySelector("#board"),
    winDiv: null,
  },

  //objet joueur
  player: {
    x: 0,
    y: 0,
    direction: "right",
  },


  //objet trésor
  targetCell: {
    x: 5,
    y: 3,
  },

  //Events Handlers
  listenKeyBoardEvents: function () {
    document.addEventListener("keyup", (e) => {
      switch (e.code) {
        case "ArrowLeft":
          app.turnLeft();
          break;
        case "ArrowRight":
          app.turnRight();
          break;
        case "ArrowUp":
          app.moveForward();
          break;
      };
    });
  },


  //methods
  createRow() {
    var row = document.createElement("div");
    row.classList.add("row");
    app.htmlElements.board.appendChild(row);
  },

  drawBoard() {
    //Double boucle pour créer le board (first x Row then x box per row)
    for (let y = 0; y < app.boardRows; y++) {
      app.createRow();
      for (let x = 0; x < app.boardColumns; x++) {

        let box = document.createElement("div");
        let row = document.getElementsByClassName("row")[y]
        box.classList.add("box", "herb");
        row.appendChild(box);

        //On colorise si case du trésor
        if (x === app.targetCell.x && app.targetCell.y === y) {
          box.classList.add("targetCell");
        };

        //On ajoute le joueur case du joueur
        if (x === app.player.x && app.player.y === y) {
          box.classList.add("player");
          switch (app.player.direction) {
            case "right":
              box.classList.add("player--right");
              break;
            case "down":
              box.classList.add("player--down");
              break;
            case "left":
              box.classList.add("player--left");
              break;
            case "up":
              box.classList.add("player--up");
              break;
          }


        };
      };
    };
  },

  clearBoard() {
    app.htmlElements.board.innerHTML = "";
  },

  redrawBoard() {
    app.clearBoard();
    app.drawBoard();
    app.isGameOver()

  },

  turnLeft() {
    if (app.gameOver) {
      return;
    }
    switch (app.player.direction) {
      case "right":
        app.player.direction = "up";
        break;
      case "up":
        app.player.direction = "left";
        break;
      case "left":
        app.player.direction = "down";
        break;
      case "down":
        app.player.direction = "right";
        break;
    };
    app.nbMove++;
    app.redrawBoard();
  },

  turnRight() {
    if (app.gameOver) {
      return;
    }

    var playerDiv = document.querySelector(".player")
    switch (app.player.direction) {
      case "right":
        app.player.direction = "down";
        break;
      case "up":
        app.player.direction = "right";
        break;
      case "left":
        app.player.direction = "up";
        break;
      case "down":
        app.player.direction = "left";
        break;
    };
    app.nbMove++;
    app.redrawBoard();
  },

  moveForward() {
    if (app.gameOver) {
      return;
    }

    switch (app.player.direction) {
      case "right":
        if (app.player.x < app.boardColumns - 1) {
          app.player.x++;
        }
        break;
      case "up":
        if (app.player.y > 0) {
          app.player.y--;
        }
        break;
      case "left":
        if (app.player.x > 0) {
          app.player.x--;
        }
        break;
      case "down":
        if (app.player.y < app.boardRows - 1) {
          app.player.y++
          break;
        }
    };
    app.nbMove++;
    app.redrawBoard();
  },

  createWinDiv() {
    app.htmlElements.winDiv = document.createElement("div");
    app.htmlElements.winDiv.classList.add("winDiv")
    var winMessage = document.createElement("h1");
    winMessage.textContent = `Bravo vous avez gagné en ${app.nbMove} déplacement(s) !`;
    var replayButton = document.createElement("button");
    replayButton.textContent = "Rejouer"
    replayButton.type = "submit"
    app.htmlElements.board.appendChild(app.htmlElements.winDiv);
    app.htmlElements.winDiv.appendChild(winMessage);
    app.htmlElements.winDiv.appendChild(replayButton);

    document.addEventListener("keyup", (e) => {
      if (e.code === "Enter" && app.gameOver) {
        app.resetGame();
      }
    })

    replayButton.addEventListener("click", () => {
      console.log("Click ?");
      app.resetGame();
    });
  },

  resetGame() {
    app.gameOver = false;
    app.player.x = 0;
    app.player.y = 0;
    app.player.direction = "right";
    app.nbMove = 0;
    app.htmlElements.winDiv.remove();
    app.clearBoard();
    app.drawBoard();
  },

  isGameOver() {
    if (app.player.x === app.targetCell.x && app.player.y === app.targetCell.y) {
      app.gameOver = true;
      app.clearBoard();
      app.createWinDiv();
    }
  },

  init: function () {
    app.drawBoard();
    app.listenKeyBoardEvents();
  },
};


document.addEventListener('DOMContentLoaded', app.init);