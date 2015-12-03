var tictactoeCommandHandler = require("./tictactoeCommandHandler");

describe("On move command", function(){
  var given, when, then;

  beforeEach(function(){
    given= [{
      id:"1234",
      event:"GameCreated",
      name:"TheFirstGame",
      userName: "Gulli",
      timeStamp: "2015.12.02T11:29:44"
    }, {
      id:"12345",
      event:"GameJoined",
      userName: "Halli",
      otherUserName: "Gulli",
      timeStamp: "2015.12.02T11:30:50"
    }];
  });

  it("should place down x",function(){
    given = [];
    when = {
      id:"1234",
      comm:"PlaceMove",
      userName : "Gulli",
      name:"TheFirstGame",
      timeStamp: "2015.12.02T11:29:44",
      x: 0,
      y: 0,
      mark: "X"
  };
    then = [{
      id:"1234",
      event:"Placed",
      userName: "Gulli",
      timeStamp: "2015.12.02T11:29:44",
      mark: "X"
    }];

    var actualEvents = tictactoeCommandHandler(given).executeCommand(when);
    JSON.stringify(actualEvents).should.be.exactly(JSON.stringify(then));
  });

  it("should not allow X to play twice in a row", function() {
    console.log("STARTING NOT ALLOW X TEST");
    given = [{
      id:"1234",
      event:"MoveMade",
      userName : "Gulli",
      name:"TheFirstGame",
      timeStamp: "2015.12.02T11:29:44",
      x: 0,
      y: 0,
      mark: "X"
  }];
    when [{
      id:"1234",
      comm:"PlaceMove",
      userName : "Gulli",
      name:"TheFirstGame",
      timeStamp: "2015.12.02T11:29:44",
      x: 1,
      y: 1,
      mark: "X"
    }];
    then = [{
      id: "1234",
      event: "NotYourTurn",
      userName: "Gulli",
      timeStamp: "2015.12.02T11:29:44",
      mark: "X"
    }];

    var actualEvents = tictactoeCommandHandler(given).executeCommand(when);
    JSON.stringify(actualEvents).should.be.exactly(JSON.stringify(then));
  });
});