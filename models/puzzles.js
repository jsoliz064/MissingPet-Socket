const { json } = require("express");
const Puzzle = require("./puzzle");


class Puzzles {

    constructor(puzzles = []) {
        this.puzzles = puzzles;
    }

    addPuzzle( puzzle = new Puzzle() ) {
        this.puzzles.push( puzzle );
    }

    getPuzzles() {
        
        return this.puzzles;
    }

    deletePuzzle( id = '' ) {
        this.puzzles = this.puzzles.filter( puzzle => puzzle.id !== id );
        return this.puzzles;
    }

    getPuzzle( id = '' ) {
        var aux;
        this.puzzles.forEach((puzzle) =>{
            if (puzzle.id == id){
                aux =puzzle;
                
            }
        });
        return aux;
    }

    toJson(puzzle){
        return {
            "id": puzzle.id,
            "rows": puzzle.rows,
            "cols": puzzle.cols,
            "imageName": puzzle.imageName,
            "pieceCount": puzzle.pieceCount,
            "showMenu": puzzle.showMenu,
            "pieces": puzzle.pieces.getPieces(),
            "players": puzzle.players.getPlayers()
        };
    }

    decPieceCounter( id = '') {

        this.puzzles = this.puzzles.map( puzzle => {

            if ( puzzle.id === id ) {
                puzzle.pieceCounter--;
                return puzzle;
            } else {
                return puzzle;
            }

        });


    }


    


    // updateTimer( id = '', timer) {

    //     this.pieces = this.pieces.map( piece => {

    //         if ( piece.id === id ) {
    //             piece.top=top;
    //             piece.left=left;
    //             piece.isMov=isMov;
    //             return piece;
    //         } else {
    //             return piece;
    //         }

    //     });

    // }

}


module.exports = Puzzles;