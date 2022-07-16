const Piece = require("./piece");


class Pieces {

    constructor(pieces = []) {
        this.pieces = pieces;
    }

    addPiece( piece = new Piece() ) {
        this.pieces.push( piece );
    }

    getPieces() {
        // console.log('aqui');
        // console.log(this.pieces);
        return this.pieces;
    }

    deletePiece( id = '' ) {
        this.pieces = this.pieces.filter( piece => piece.id !== id );
        return this.pieces;
    }

    getPiece( id = '' ) {
        var aux;
        this.pieces.forEach((piece) =>{
            if (piece.id == id){
                aux=piece;
            }
        });
        
        return aux;
    }

    bringToTop( id = '' ) {
        var aux;
        this.pieces.forEach((piece) =>{
            if (piece.id == id){
                aux=piece;
            }
        });
        if (aux == null) return;
        this.pieces = this.pieces.filter( piece => piece.id !== aux.id );
        this.pieces.push(aux);
    }

    

    sendToBack( id = '' ) {
        var aux;
        this.pieces.forEach((piece) =>{
            if (piece.id == id){
                aux=piece;
            }
        });
        if (aux == null) return;
        this.pieces = this.pieces.filter( piece => piece.id !== aux.id );
        
        this.pieces.unshift(aux);
    }


    updatePosPiece( id = '', top, left ) {

        this.pieces = this.pieces.map( piece => {

            if ( piece.id === id ) {
                piece.top+=top;
                piece.left+=left;
                return piece;
            } else {
                return piece;
            }

        });

    }

    setPieceValues( id = '', top, left , isMov) {

        this.pieces = this.pieces.map( piece => {

            if ( piece.id === id ) {
                piece.top=top;
                piece.left=left;
                piece.isMov=isMov;
                return piece;
            } else {
                return piece;
            }

        });

    }

    setPieceUser( id = '', user) {

        this.pieces = this.pieces.map( piece => {

            if ( piece.id === id ) {
                piece.user=user;
                return piece;
            } else {
                return piece;
            }

        });

    }

    setIsMov( id = '',  isMov) {

        this.pieces = this.pieces.map( piece => {

            if ( piece.id === id ) {
                piece.isMov=isMov;
                return piece;
            } else {
                return piece;
            }

        });

    }

    resetPieces() {
        this.pieces.forEach((piece) => {
            piece.top=150;
            piece.left= 100;
            piece.isMov = true;
            piece.user = 'null';
        });
    }

}


module.exports = Pieces;