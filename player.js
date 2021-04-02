module.exports = class Player {
  constructor(socketID, username) {
    this.socketID = socketID;
    this.username = username;
    this.room = "";
    // this.avatar = "";
    // this.currentTurn = false;
  }
  setRoom(room) {
    this.room = room;
  }
  getRoom() {
    return this.room;
  }
  // setUsername(name) {
  //   this.username = name;
  // }
  // setAvatar() {}
  // setIsDraw() {
  //   this.isDrawing = true;
  // }
  // setIsWrite() {
  //   this.isWriting = true;
  // }
  // setCurrentTurn() {}
};
