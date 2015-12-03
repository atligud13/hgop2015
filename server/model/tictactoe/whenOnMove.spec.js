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
    when = {
      id:"1234",
      comm:"PlaceMove",
      userName : "Gulli",
      name:"TheFirstGame",
      timeStamp: "2015.12.02T11:29:44",
      x: 1,
      y: 1,
      mark: "X"
    };
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


  it("should not allow x to fill in the same spot twice", function() {
      given = [{
      id:"1234",
      event:"MoveMade",
      userName : "Gulli",
      name:"TheFirstGame",
      timeStamp: "2015.12.02T11:29:44",
      x: 0,
      y: 0,
      mark: "X"
    }, {
      id:"12345",
      event:"MoveMade",
      userName : "Halli",
      name:"TheFirstGame",
      timeStamp: "2015.12.02T11:29:44",
      x: 1,
      y: 2,
      mark: "O"
    }];
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
      id: "1234",
      event: "SlotAlreadyFilled",
      userName: "Gulli",
      timeStamp: "2015.12.02T11:29:44",
      mark: "X"
    }];
 
    var actualEvents = tictactoeCommandHandler(given).executeCommand(when);
    JSON.stringify(actualEvents).should.be.exactly(JSON.stringify(then));
  });


  it("should report X winning after achieving a horizontal move", function() {
      given = [{
      id:"1234",
      event:"MoveMade",
      userName : "Gulli",
      name:"TheFirstGame",
      timeStamp: "2015.12.02T11:29:44",
      x: 0,
      y: 0,
      mark: "X"
    }, {
      id:"12345",
      event:"MoveMade",
      userName : "Halli",
      name:"TheFirstGame",
      timeStamp: "2015.12.02T11:29:44",
      x: 0,
      y: 1,
      mark: "O"
    }, {
      id:"1234",
      event:"MoveMade",
      userName : "Gulli",
      name:"TheFirstGame",
      timeStamp: "2015.12.02T11:29:44",
      x: 1,
      y: 0,
      mark: "X"
    }, {
      id:"12345",
      event:"MoveMade",
      userName : "Halli",
      name:"TheFirstGame",
      timeStamp: "2015.12.02T11:29:44",
      x: 0,
      y: 2,
      mark: "O"
    }];
    when = {
      id:"1234",
      comm:"PlaceMove",
      userName : "Gulli",
      name:"TheFirstGame",
      timeStamp: "2015.12.02T11:29:44",
      x: 2,
      y: 0,
      mark: "X"
    };
    then = [{
      id:"1234",
      event:"Placed",
      userName: "Gulli",
      timeStamp: "2015.12.02T11:29:44",
      mark: "X"
    },{
      id: "1234",
      event: "GameWon",
      userName: "Gulli",
      timeStamp: "2015.12.02T11:29:44"
    }];
 
    var actualEvents = tictactoeCommandHandler(given).executeCommand(when);
    JSON.stringify(actualEvents).should.be.exactly(JSON.stringify(then));
  });
});