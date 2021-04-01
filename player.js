module.exports = class Player {
  constructor(socketID, username) {
    this.socketID = socketID;
    this.username = username;
    this.avatar = "";
    this.isDrawing = false;
    this.isWriting = false;
    this.currentTurn = false;
  }
  setUsername(name) {
    this.username = name;
  }
  setAvatar() {}
  setIsDraw() {
    this.isDrawing = true;
  }
  setIsWrite() {
    this.isWriting = true;
  }
  setCurrentTurn() {}
};
