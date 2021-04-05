module.exports = class Player {
  constructor(socket) {
    this.socketID = socket.id;
    this.username = socket.username;
    this.room = socket.room;
    this.avatar = socket.avatar;
    // this.currentTurn = false;
  }
  setRoom(room) {
    this.room = room;
  }
  getRoom() {
    return this.room;
  }
  getUsername() {
    return this.username;
  }
  // setAvatar() {}
  // setIsDraw() {
  //   this.isDrawing = true;
  // }
  // setIsWrite() {
  //   this.isWriting = true;
  // }
  // setCurrentTurn() {}
};
