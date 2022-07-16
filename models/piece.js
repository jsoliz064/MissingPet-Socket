const { v4: uuidV4 } = require('uuid');

class Piece {
    

    constructor( x=0, y=0, top=0.5, left=0.5, isMov = true , user='null') {
        
        this.id     = uuidV4(); // identificador único
        this.x      = x;
        this.y      = y;
        this.top    = top;
        this.left   = left;
        this.isMov  = isMov;
        this.user   = user;
    }

}


module.exports = Piece;