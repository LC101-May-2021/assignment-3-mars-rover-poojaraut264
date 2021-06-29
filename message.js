class Message {
  constructor(name, commands) {
    this.name = name;
    if (!name) {
      throw Error("Message name required.");
    } 
    this.commands = commands;
  } 
  receiveMessage (message) {
    return message;
  }
}

module.exports = Message;