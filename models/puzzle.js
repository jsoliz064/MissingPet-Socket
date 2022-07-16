const { v4: uuidV4 } = require('uuid');
const Pieces = require("./pieces");
const Players = require('./players');

class Puzzle {
    

    constructor( id, rows=3, cols=3, imageName='assets/no-image.png', pieces=new Pieces(), players = new Players(), showMenu=true) {
        
        this.id         = id; // identificador único
        this.rows       = rows;
        this.cols       = cols;
        this.imageName  = imageName;
        this.pieces     = pieces;
        this.players    = players;
        this.pieceCount = rows*cols;
        this.showMenu   = showMenu;
    }

}


module.exports = Puzzle