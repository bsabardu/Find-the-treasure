var app = {

  boardColumns: 6,
  boardRows: 4,

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
        box.classList.add("box",);
        row.appendChild(box);
    
        //On colorise si case du trésor
        if (x === app.targetCell.x && app.targetCell.y === y){
          box.classList.add("targetCell");
        }

        //On ajoute le joueur case du joueur
        if (x === app.player.x && app.player.y === y){
          box.classList.add("player");
        }


      }
    }
  },

  init: function () {
    app.drawBoard();
  }
};

document.addEventListener('DOMContentLoaded', app.init);