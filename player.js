module.exports = class Player {
  constructor(socketID, username) {
    this.socketID = socketID;
    this.username = username;
    this.isDrawing = false;
    this.isWriting = false;
    this.currentTurn = false;
  }
  setUsername(name) {
    this.username = name;
  }
  setIsDrawing() {}
  setIsWriting() {}
  setCurrentTurn() {}
};
