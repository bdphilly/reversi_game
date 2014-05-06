var Piece = require("./piece.js").Piece;
var Board = require("./board.js").Board;

function Game() {
  this.board = new Board();
  // Other attributes?
}

// You will certainly need some more helper methods...

Game.prototype.won = function () {
  var blacks = 0;

  for (i = 0; i < 8; i++){
    for (j = 0; j < 8; j++){
      if (self.grid[i][j].color === "Black"){
        blacks++;
      }
    }
  }

  if (blacks === 32) {
    return "Tie"
  } else if (blacks > 32) {
    return "Black wins";
  } else {
    return "White wins";
  }
};

Game.prototype.placePiece = function (pos, color) {
  self.grid.position(pos) = new Piece(color);
};

Game.prototype.runLoop = function () {

};

exports.Game = Game;
