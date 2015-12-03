var tictactoeCommandHandler = require("./tictactoeCommandHandler");

describe("On move command", function(){
  var given, when, then;

  beforeEach(function(){
    given = [{
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

  describe("On first move", function() {
    it("should place down x",function(){
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
  });


  describe("On illegal same turn move", function() {
    it("should not allow X to play twice in a row", function() {
      given.push({
        id:"1234",
        event:"MoveMade",
        userName : "Gulli",
        name:"TheFirstGame",
        timeStamp: "2015.12.02T11:29:44",
        x: 0,
        y: 0,
        mark: "X"
      });
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
  });

  describe("On illegal duplicate move", function() {
    it("should not allow x to fill in the same spot twice", function() {
      given.push({
        id:"1234",
        event:"MoveMade",
        userName : "Gulli",
        name:"TheFirstGame",
        timeStamp: "2015.12.02T11:29:44",
        x: 0,
        y: 0,
        mark: "X"
      });
      given.push({
        id:"12345",
        event:"MoveMade",
        userName : "Halli",
        name:"TheFirstGame",
        timeStamp: "2015.12.02T11:29:44",
        x: 1,
        y: 2,
        mark: "O"
      });
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
  });



  describe("On horizontal win", function() {
    it("should report X winning after achieving a horizontal move", function() {
        given.push({
        id:"1234",
        event:"MoveMade",
        userName : "Gulli",
        name:"TheFirstGame",
        timeStamp: "2015.12.02T11:29:44",
        x: 0,
        y: 0,
        mark: "X"
      });
      given.push({
        id:"12345",
        event:"MoveMade",
        userName : "Halli",
        name:"TheFirstGame",
        timeStamp: "2015.12.02T11:29:44",
        x: 0,
        y: 1,
        mark: "O"
      });
      given.push({
        id:"1234",
        event:"MoveMade",
        userName : "Gulli",
        name:"TheFirstGame",
        timeStamp: "2015.12.02T11:29:44",
        x: 1,
        y: 0,
        mark: "X"
      });
      given.push({
        id:"12345",
        event:"MoveMade",
        userName : "Halli",
        name:"TheFirstGame",
        timeStamp: "2015.12.02T11:29:44",
        x: 0,
        y: 2,
        mark: "O"
      });
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


  describe("On vertical win", function() {
    it("should report X winning after achieving a vertical move", function() {
        given.push({
        id:"1234",
        event:"MoveMade",
        userName : "Gulli",
        name:"TheFirstGame",
        timeStamp: "2015.12.02T11:29:44",
        x: 0,
        y: 0,
        mark: "X"
      });
      given.push({
        id:"12345",
        event:"MoveMade",
        userName : "Halli",
        name:"TheFirstGame",
        timeStamp: "2015.12.02T11:29:44",
        x: 1,
        y: 0,
        mark: "O"
      });
      given.push({
        id:"1234",
        event:"MoveMade",
        userName : "Gulli",
        name:"TheFirstGame",
        timeStamp: "2015.12.02T11:29:44",
        x: 0,
        y: 1,
        mark: "X"
      });
      given.push({
        id:"12345",
        event:"MoveMade",
        userName : "Halli",
        name:"TheFirstGame",
        timeStamp: "2015.12.02T11:29:44",
        x: 2,
        y: 0,
        mark: "O"
      });
      when = {
        id:"1234",
        comm:"PlaceMove",
        userName : "Gulli",
        name:"TheFirstGame",
        timeStamp: "2015.12.02T11:29:44",
        x: 0,
        y: 2,
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



  describe("On diagonal win", function() {
    it("should report X winning after achieving a diagonal move", function() {
        given.push({
        id:"1234",
        event:"MoveMade",
        userName : "Gulli",
        name:"TheFirstGame",
        timeStamp: "2015.12.02T11:29:44",
        x: 0,
        y: 0,
        mark: "X"
      });
      given.push({
        id:"12345",
        event:"MoveMade",
        userName : "Halli",
        name:"TheFirstGame",
        timeStamp: "2015.12.02T11:29:44",
        x: 1,
        y: 0,
        mark: "O"
      });
      given.push({
        id:"1234",
        event:"MoveMade",
        userName : "Gulli",
        name:"TheFirstGame",
        timeStamp: "2015.12.02T11:29:44",
        x: 1,
        y: 1,
        mark: "X"
      });
      given.push({
        id:"12345",
        event:"MoveMade",
        userName : "Halli",
        name:"TheFirstGame",
        timeStamp: "2015.12.02T11:29:44",
        x: 2,
        y: 0,
        mark: "O"
      });
      when = {
        id:"1234",
        comm:"PlaceMove",
        userName : "Gulli",
        name:"TheFirstGame",
        timeStamp: "2015.12.02T11:29:44",
        x: 2,
        y: 2,
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



  describe("On draw", function() {
    it("should report a draw if no one wins", function() {
      given.push({
        id:"1234",
        event:"MoveMade",
        userName : "Gulli",
        name:"TheFirstGame",
        timeStamp: "2015.12.02T11:29:44",
        x: 0,
        y: 0,
        mark: "X"
      });
      given.push({
        id:"12345",
        event:"MoveMade",
        userName : "Halli",
        name:"TheFirstGame",
        timeStamp: "2015.12.02T11:29:44",
        x: 1,
        y: 0,
        mark: "O"
      });
      given.push({
        id:"1234",
        event:"MoveMade",
        userName : "Gulli",
        name:"TheFirstGame",
        timeStamp: "2015.12.02T11:29:44",
        x: 0,
        y: 1,
        mark: "X"
      });
      given.push({
        id:"12345",
        event:"MoveMade",
        userName : "Halli",
        name:"TheFirstGame",
        timeStamp: "2015.12.02T11:29:44",
        x: 2,
        y: 0,
        mark: "O"
      });
      given.push({
        id:"1234",
        event:"MoveMade",
        userName : "Gulli",
        name:"TheFirstGame",
        timeStamp: "2015.12.02T11:29:44",
        x: 2,
        y: 1,
        mark: "X"
      });
      given.push({
        id:"12345",
        event:"MoveMade",
        userName : "Halli",
        name:"TheFirstGame",
        timeStamp: "2015.12.02T11:29:44",
        x: 1,
        y: 1,
        mark: "O"
      });
      given.push({
        id:"1234",
        event:"MoveMade",
        userName : "Gulli",
        name:"TheFirstGame",
        timeStamp: "2015.12.02T11:29:44",
        x: 1,
        y: 2,
        mark: "X"
      });
      given.push({
        id:"12345",
        event:"MoveMade",
        userName : "Halli",
        name:"TheFirstGame",
        timeStamp: "2015.12.02T11:29:44",
        x: 0,
        y: 2,
        mark: "O"
      });
      when = {
        id:"1234",
        comm:"PlaceMove",
        userName : "Gulli",
        name:"TheFirstGame",
        timeStamp: "2015.12.02T11:29:44",
        x: 2,
        y: 2,
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
        event: "GameDraw",
        userName: "Gulli",
        timeStamp: "2015.12.02T11:29:44"
      }];
   
      var actualEvents = tictactoeCommandHandler(given).executeCommand(when);
      JSON.stringify(actualEvents).should.be.exactly(JSON.stringify(then));
    });
  });
});