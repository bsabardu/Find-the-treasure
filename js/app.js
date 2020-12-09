var app = {
  boardColumns: 6,
  boardRows: 4,
  gameOver: false,
  nbMove: 0,

  //Objet html Elements
  htmlElements: {
    board: document.querySelector("#board"),
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
    keyUpHandler: function (e) {
      switch (e.keyCode) {
        case 37:
          app.turnLeft();
          break;
        case 39:
          app.turnRight();
          break;
        case 38:
          app.moveForward();
          break;
      };
    },
    
  listenKeyBoardEvents: function () {
    document.addEventListener("keyup", app.keyUpHandler);
  },


  //methods
  createRow: function () {
    var row = document.createElement("div");
    row.classList.add("row");
    app.htmlElements.board.appendChild(row);
  },

  drawBoard: function () {
    //Double boucle pour créer le board (first x Row then x box per row)
    for (var y = 0; y < app.boardRows; y++) {
      app.createRow();
      for (var x = 0; x < app.boardColumns; x++) {

        var box = document.createElement("div");
        var row = document.getElementsByClassName("row")[y]
        box.classList.add("box", );
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

  clearBoard: function () {
    var board = document.querySelector("#board");
    board.innerHTML = "";
  },

  redrawBoard: function () {
    app.clearBoard();
    app.drawBoard();
    app.isGameOver()

  },

  turnLeft: function () {
    if(!app.gameOver){
    var playerDiv = document.querySelector(".player");
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
  }
},

  turnRight: function () {
    if(!app.gameOver){
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
  }
},

  moveForward: function () {
    if(!app.gameOver){
    switch (app.player.direction) {
      case "right":
        if(app.player.x < app.boardColumns -1){
        app.player.x++;
      }
        break;
      case "up":
        if(app.player.y > 0){
        app.player.y--;
      }
        break;
      case "left":
        if(app.player.x > 0){
        app.player.x--;
      }
        break;
      case "down":
        if(app.player.y < app.boardRows -1){
        app.player.y++
        break;
        }
    };
    app.nbMove++; 
    app.redrawBoard();
  }
},

isGameOver: function(){
  if(app.player.x === app.targetCell.x && app.player.y === app.targetCell.y){
    app.isGameOver = true;
    app.clearBoard();
    var winDiv = document.createElement("div");
    winDiv.classList.add("winDiv")
    var winMessage = document.createElement("h1");
    winMessage.textContent = `Bravo vous avez gagné en ${app.nbMove} déplacement(s) !`;
    var replayButton = document.createElement("button");
    replayButton.textContent = "Rejouer"
    app.htmlElements.board.appendChild(winDiv);
    winDiv.appendChild(winMessage);
    winDiv.appendChild(replayButton);

    replayButton.addEventListener("click", function(){
      app.isGameOver = false;
      app.player.x = 0;
      app.player.y = 0;
      app.player.direction = "right";
      winDiv.innerHTML="";
      app.drawBoard();
    });
  }
},

  init: function () {
    app.drawBoard();
    app.listenKeyBoardEvents();
  },
};


document.addEventListener('DOMContentLoaded', app.init);