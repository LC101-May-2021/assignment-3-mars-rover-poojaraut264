class Rover {
  constructor (position) {
    this.position = position;
    this.mode = 'NORMAL';
    this.generatorWatts = 110;
  }

  receiveMessage (message) {
    let response = {};
    let result = [];
    response["message"] = message.name;
    
    for (let i=0;i<message.commands.length;i++) {

      if (message.commands[i].commandType === 'MOVE') {

        if (this.mode === 'LOW_POWER') {
          result[i] = {"completed":false};  
        } else {
          result[i] = {"completed":true};
          this.position = message.commands[i].value;
        }

      } else if (message.commands[i].commandType === 'MODE_CHANGE') {
        result[i] = {"completed": true};
        this.mode = message.commands[i].value;

      } else if (message.commands[i].commandType === 'STATUS_CHECK') {
        let status = {
          "mode":this.mode,
          "generatorWatts":this.generatorWatts,
          "position":this.position
        }
        result[i] = {"completed":true,"roverStatus":status};
      } else {
        result[i] = {"completed": false};  
      }
    }
    response["results"] = result;
    return response;
  }
}

module.exports = Rover;