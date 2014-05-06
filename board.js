var Piece = require("./piece.js").Piece;

function Board() {
  this.grid = [];

  for (i = 0; i < 8; i++){
    var row = [];
    for (j = 0; j < 8; j++){
      row.push(null);
    }
    this.grid.push(row);
  }

  this.grid[3][3] = new Piece('Black');
  this.grid[3][4] = new Piece('White');
  this.grid[4][3] = new Piece('White');
  this.grid[4][4] = new Piece('Black');
}

Board.prototype.full = function () {
  for (i = 0; i < 8; i++){
    for (j = 0; j < 8; j++){
      if (this.grid[i][j] === null){
        return false;
      }
    }
  }
  return true;
};

Board.prototype.position = function (pos) {
  var x = pos[0];
  var y = pos[1];

  return this.grid[x][y];
}

Board.prototype.isValidBoardPos = function (pos) {
  var x = pos[0];
  var y = pos[1];

  if (x > 7 || x < 0 || y > 7 || y < 0) {
    return false;
  } else if (pos.length < 2) {
    return false;
  } else {
    return true;
  }
}

Board.prototype.isEnemyPiece = function(pos, ourColor) {
  if (!this.position(pos)) return false;
  // console.log('you are here');
//   console.log(ourColor);
//   console.log(this.position(pos).color);

  if ((ourColor === 'Black' && this.position(pos).color === 'White') ||
    (ourColor === 'White' && this.position(pos).color === 'Black')) {
      // console.log("inthe loop");
      return true;

    }

    // console.log('you are HJERE');
  return false;
}

Board.prototype.addDeltas = function(pos, delta) {
  return [pos[0] + delta[0], pos[1] + delta[1]];
}

Board.prototype.validMoves = function (pos, color) {
  if (!this.isValidBoardPos(pos)) return false;

  var deltas = [[-1,-1],[-1,0],[-1,1],[0,1],[0,-1],[1,1],[1,-1],[1,0]];
  var piecesToFlip = [];

  for (var i = 0; i < deltas.length; i++){
    var current_delta = deltas[i];
    var potentialPiecesToFlip = [];
    var newPos = this.addDeltas(pos, current_delta);
    // console.log(newPos);
    // console.log(this.isValidBoardPos(newPos));
    // console.log(this.isEnemyPiece(newPos, color));

    while(this.isValidBoardPos(newPos) && this.isEnemyPiece(newPos, color)) {
      // potentialPiecesToFlip.push(this.position(newPos));
      potentialPiecesToFlip.push((newPos));
      newPos = this.addDeltas(newPos, current_delta);
      // console.log(newPos);
      // console.log(' ');
      // console.log(potentialPiecesToFlip);
    }

    if (this.isValidBoardPos(newPos) && (this.position(newPos))) {
      piecesToFlip = piecesToFlip.concat(potentialPiecesToFlip);
      // console.log(piecesToFlip);
    }
  }
  return piecesToFlip;
}

Board.prototype.placePiece = function (pos, color) {
  var validMoves = this.validMoves(pos, color)
  this.grid[pos[0]][pos[1]] = new Piece(color);
  if (validMoves.length > 0) {
    this.pos = new Piece(color);
    for (var i = 0; i < validMoves.length; i++){
      var x = validMoves[i][0];
      var y = validMoves[i][1];
      this.grid[x][y].flip();
    }
  }
}

// Other helper methods may be helpful!

exports.Board = Board;

//
//
//
//
//b = require('./board');
board = new Board();
console.log(board);
// console.log(board);
// console.log(board.validMoves([3,2], 'White'));
// console.log(board.position([3,3]))
// board.position([3,3]).flip();
// console.log(board.position([3,2]))
console.log('3,3b')
console.log(board.position([3,3]))
board.placePiece([3,2], 'White');
// console.log(board.position([3,3]))
// board.position([3,3]).assignColor('White');
console.log('3,3after')
console.log(board.position([3,3]))

console.log(board);

console.log("this and that");
// console.log(board.position([3][3]));
// console.log(board.position([3][3])).color;





