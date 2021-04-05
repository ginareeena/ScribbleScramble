module.exports = class Room {
  constructor(name) {
    this.name = name;
    this.players = [];
  }
  getPlayers() {
    return this.players;
  }
  setPlayers(player) {
    this.players.push(player);
  }
};
