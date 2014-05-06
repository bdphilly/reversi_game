function Piece(color) {
  this.color = color;
}

Piece.prototype.flip = function () {
  if (this.color === "Black"){
    this.color = "White";
  } else {
    this.color = "Black";
  }


  // this.color = ((this.color === "Black") ? "White" : "Black");
};

Piece.prototype.assignColor = function (color) {
  this.color = color;
}

exports.Piece = Piece;
