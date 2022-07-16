const Player = require("./player");


class Players {

    constructor(players = []) {
        this.players = players;
    }

    addPlayer( player = new Player() ) {
        this.players.push( player );
    }

    getPlayers() {
        return this.players;
    }

    deletePlayer( id = '' ) {
        this.players = this.players.filter( player => player.id !== id );
        return this.players;
    }




    incPoints( id = '') {

        this.players = this.players.map( player => {

            if ( player.id === id ) {
                player.points++;
                return player;
            } else {
                return player;
            }

        });

        this.players.sort( (a, b) => a['points'] == b['points'] ? 0 : a['points'] > b['points'] ? -1 : 1);

    }

    
    resetPoints() {
        this.players.forEach((player) => player.points=0);
    }

}


module.exports = Players;