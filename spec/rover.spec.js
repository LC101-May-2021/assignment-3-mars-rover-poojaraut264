const Rover = require('../rover.js');
const Message = require('../message.js');
const Command = require('../command.js');

// NOTE: If at any time, you want to focus on the output from a single test, feel free to comment out all the others.
//       However, do NOT edit the grading tests for any reason and make sure to un-comment out your code to get the autograder to pass.

describe("Rover class", function() {

  it("constructor sets position and default values for mode and generatorWatts", function() {
    let commands = [new Command('MODE_CHANGE', 'LOW_POWER'), new Command('STATUS_CHECK')];
    let message = new Message('Check default values', commands);
    let rover = new Rover(98382); 
    expect(rover.position).toEqual(98382);
    expect(rover.mode).toEqual('NORMAL');
    expect(rover.generatorWatts).toEqual(110);
  });

  it("response returned by receiveMessage contains name of message", function() {
    let commands = [new Command('STATUS_CHECK'), new Command('MOVE', 20)];
    let message = new Message('Name of message!', commands);
    let rover = new Rover(98382); 
    let response = rover.receiveMessage(message);
    expect(response.message).toEqual('Name of message!');
  });
  
  it("response returned by receiveMessage includes two results if two commands are sent in the message", function() {
    let commands = [new Command('MODE_CHANGE', 'LOW_POWER'), new Command('STATUS_CHECK')];
    let message = new Message('Test message with two commands', commands);
    let rover = new Rover(98382); 
    let response = rover.receiveMessage(message);
    expect(response.results.length).toEqual(2);
  });

  it("responds correctly to status check command", function() {
    let commands = [new Command('MODE_CHANGE', 'LOW_POWER'), new Command('STATUS_CHECK')];
    let message = new Message('Test message with two commands', commands);
    let rover = new Rover(98382); 
    let response = rover.receiveMessage(message);
    expect(response.results[1].roverStatus.position).toEqual(rover.position);
    expect(response.results[1].roverStatus.mode).toEqual(rover.mode);
    expect(response.results[1].roverStatus.generatorWatts).toEqual(110);
  });

  it("responds correctly to mode change command", function() {
    let commands = [new Command('MODE_CHANGE','NORMAL')];
    let message = new Message('Test mode change!', commands);
    let rover = new Rover(98382); 
    let response = rover.receiveMessage(message);
    expect(rover.mode).toEqual('NORMAL');
    expect(response.results[0].completed).toEqual(true);
  });

  it("responds with false completed value when attempting to move in LOW_POWER mode", function() {
    let commands = [new Command('MODE_CHANGE','LOW_POWER'),new Command('MOVE')];
    let message = new Message('Test low power mode change!', commands);
    let rover = new Rover(98382); 
    let response = rover.receiveMessage(message);
    expect(rover.mode).toEqual('LOW_POWER');
    expect(response.results[1].completed).toEqual(false);
  });

  it("responds with position for move command", function() {
    let commands = [new Command('MOVE',7000)];
    let message = new Message('Test mode change!', commands);
    let rover = new Rover(98382); 
    let response = rover.receiveMessage(message);
    expect(rover.position).toEqual(7000);
  });

});