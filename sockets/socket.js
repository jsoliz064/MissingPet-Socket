const { io }= require('../index');

const Puzzles = require('../models/puzzles');
const Puzzle = require('../models/puzzle');
const Players = require('../models/players');
const Player = require('../models/player');
const Pieces = require('../models/pieces');
const Piece = require('../models/piece');
const { comprobarUser} = require('../controllers/auth');
const { Socket } = require('socket.io');




const pieces1 = new Pieces();

pieces1.addPiece(new Piece(0, 0, 150, 45));
pieces1.addPiece(new Piece(0, 1, 50, 70));
pieces1.addPiece(new Piece(1, 0, 50, 30));
pieces1.addPiece(new Piece(1, 1, 20, 50));

const pieces2 = new Pieces();

pieces2.addPiece(new Piece(0, 0, 140, 40));
pieces2.addPiece(new Piece(1, 0, 70, 30));

const players1 = new Players();

players1.addPlayer(new Player('01','user1'));
players1.addPlayer(new Player('02','user2'));

const players2 = new Players();

players2.addPlayer(new Player('03','user1'));


const puzzles = new Puzzles();

puzzles.addPuzzle(new Puzzle('123',2,2, 'assets/dbz_cell.jpg', pieces1, players1))
puzzles.addPuzzle(new Puzzle('456',2,2, 'assets/dbz.jpg', pieces2, players2))
puzzles.addPuzzle(new Puzzle('756',2,2, 'assets/dbz.jpg'))





// Mensajes de Sockets

io.on('connection', client => {

    console.log('Connection Request');
    
    
    

    
    if (client.handshake.headers['x-token']){
        console.log('Cliente Autorizado Conectado');
    }else{
        client.disconnect();
    }
            

    // client.emit('active-puzzles', puzzles.getPuzzles());



    client.on('disconnect', () =>{
        console.log('Cliente Desconectado');
    });

    client.on('join-room', (payload) =>{
        client.join(payload.id);
        const puzzleT = puzzles.getPuzzle(payload.id);
        const newPlayer = new Player(payload.playerId, payload.username)
        puzzleT.players.addPlayer( newPlayer );
        const result = puzzles.toJson(puzzleT);
        io.in(payload.id).emit('load-puzzle', result);
    });

    // ! Puzzle 

    client.on('add-puzzle', (payload) => {
        const newPuzzle = new Puzzle(payload.id, payload.rows, payload.cols, payload.image)
        puzzles.addPuzzle( newPuzzle );
    });
    

    client.on('delete-puzzle', (payload) => {

        puzzles.deletePuzzle( payload.id );
        io.emit('confirm-deleted', puzzles.getPuzzles());
    });

    client.on('decPieceCounter', (payload) => {
        const puzzleT = puzzles.getPuzzle(payload.id);
        puzzleT.pieceCount--;
        
        io.in(payload.id).emit('updated-counter', puzzleT.pieceCount);
    });

    client.on('showMenu-puzzle', (payload) => {

        const puzzleT = puzzles.getPuzzle(payload.id);
        puzzleT.showMenu=payload.bool;
        io.in(payload.id).emit('updated-bool', puzzleT.showMenu);
    });

    client.on('onStart-timer', (payload) => {
        client.to(payload.id).emit('onStart-timer', payload);
    });

    client.on('onPause-timer', (payload) => {
        client.to(payload.id).emit('onPause-timer', payload);
    });

    client.on('onResume-timer', (payload) => {
        client.to(payload.id).emit('onResume-timer', payload);
    });

    client.on('onRestart-timer', (payload) => {
        client.to(payload.id).emit('onRestart-timer', payload);
    });

    client.on('onIA', (payload) => {
        client.to(payload.id).emit('onIA', payload);
    });

    client.on('offIA', (payload) => {
        client.to(payload.id).emit('offIA', payload);
    });

    client.on('reset-puzzle', (payload) => {
        const puzzleT = puzzles.getPuzzle(payload.id);
        puzzleT.players.resetPoints();
        puzzleT.pieces.resetPieces();
        puzzleT.pieceCount=puzzleT.rows*puzzleT.cols;
    });

    client.on('reload-puzzle', (payload) => {
        console.log('reset puzzle');
        const puzzleT = puzzles.getPuzzle(payload.id);
        io.in(payload.id).emit('active-players', puzzleT.players.getPlayers());
        io.in(payload.id).emit('updated-counter', puzzleT.pieceCount);
        io.in(payload.id).emit('active-pieces', puzzleT.pieces.getPieces());
    });


    // !Piece
    client.on('add-piece', (payload) => {
        const puzzleT = puzzles.getPuzzle(payload.id);
        const newPiece = new Piece(payload.x, payload.y, payload.top, payload.left)
        puzzleT.pieces.addPiece( newPiece );
    });

    client.on('bringToTop-piece', (payload) => {
        const puzzleT = puzzles.getPuzzle(payload.id);
        puzzleT.pieces.bringToTop( payload.pieceId );
        io.in(payload.id).emit('active-pieces', puzzleT.pieces.getPieces());
    });

    client.on('sendToBack-piece', (payload) => {
        const puzzleT = puzzles.getPuzzle(payload.id);
        puzzleT.pieces.sendToBack( payload.pieceId );
        io.in(payload.id).emit('active-pieces', puzzleT.pieces.getPieces());
    });

    client.on('updatePos-piece', (payload) => {
        const puzzleT = puzzles.getPuzzle(payload.id);
        const piece= puzzleT.pieces.getPiece(payload.pieceId);
        piece.top+=payload.top;
        piece.left+=payload.left;
        client.to(payload.id).emit('update-piece', piece);
    });

    client.on('moveFree-piece', (payload) => {
        const puzzleT = puzzles.getPuzzle(payload.id);
        const piece= puzzleT.pieces.getPiece(payload.pieceId);
        piece.top=payload.top;
        piece.left=payload.left;
        // piece.isMov=true;
        // piece.user='null';
        io.in(payload.id).emit('update-piece', piece);
    });

    client.on('shuffle-piece', (payload) => {
        const puzzleT = puzzles.getPuzzle(payload.id);
        const piece= puzzleT.pieces.getPiece(payload.pieceId);
        piece.top=payload.top;
        piece.left=payload.left;
        piece.isMov=true;
        piece.user='null';
    });



    client.on('setValues-piece', (payload) => {
        const puzzleT = puzzles.getPuzzle(payload.id);
        const piece= puzzleT.pieces.getPiece(payload.pieceId);
        piece.top=0;
        piece.left=0;
        piece.isMov=false;
        puzzleT.pieces.sendToBack( payload.pieceId );
        puzzleT.pieceCount--;
        puzzleT.players.incPoints( payload.playerId );
        client.to(payload.id).emit('updated-counter', puzzleT.pieceCount);
        client.to(payload.id).emit('active-players', puzzleT.players.getPlayers());
        client.to(payload.id).emit('active-pieces', puzzleT.pieces.getPieces());
    });

    client.on('player-piece', (payload) => {
        const puzzleT = puzzles.getPuzzle(payload.id);
        const piece= puzzleT.pieces.getPiece(payload.pieceId);
        piece.user=payload.user;
        client.to(payload.id).emit('player-piece', piece);
    });

    


    //! Players

    client.on('add-player', (payload) => {
        const puzzleT = puzzles.getPuzzle(payload.id);
        const newPlayer = new Player(payload.playerId, payload.username)
        puzzleT.players.addPlayer( newPlayer );
        io.in(payload.id).emit('active-players', puzzleT.players.getPlayers());
    });
    

    client.on('delete-player', (payload) => {
        const puzzleT = puzzles.getPuzzle(payload.id);
        puzzleT.players.deletePlayer( payload.playerId );
        if (puzzleT.players.length  <=  0 ) {
            puzzles.deletePuzzle( payload.id );
        }
        io.in(payload.id).emit('active-players', puzzleT.players.getPlayers());
    });

    client.on('inc-points', (payload) => {
        const puzzleT = puzzles.getPuzzle(payload.id);
        puzzleT.players.incPoints( payload.playerId );
        io.in(payload.id).emit('active-players', puzzleT.players.getPlayers());
    });



});