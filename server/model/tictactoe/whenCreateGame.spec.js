var tictactoeCommandHandler = require("./tictactoeCommandHandler");

describe('create game command', function(){
  var given, when, then;

  it('should create game',function(){
    given= [];
    when = {
      id:"1234",
      gameId: "1",
      comm:"CreateGame",
      userName : "Gulli",
      name:"TheFirstGame",
      timeStamp: "2015.12.02T11:29:44"
    };
    then=[{
      id:"1234",
      gameId: "1",
      event:"GameCreated",
      userName: "Gulli",
      timeStamp: "2015.12.02T11:29:44",
      name: "TheFirstGame",
      mark: "X"
    }];

    var actualEvents = tictactoeCommandHandler(given).executeCommand(when);

    JSON.stringify(actualEvents).should.be.exactly(JSON.stringify(then));
  });

  it('should create game with another user another time',function(){
    given= [];
    when={
      id:"12347",
      gameId: "2",
      comm:"CreateGame",
      userName : "Halli",
      name:"TheFirstGame",
      timeStamp: "2015.12.02T10:29:44"
    };
    then=[{
      id:"12347",
      gameId: "2",
      event:"GameCreated",
      userName: "Halli",
      timeStamp: "2015.12.02T10:29:44",
      name: "TheFirstGame",
      mark: "X"
    }];

    var actualEvents = tictactoeCommandHandler(given).executeCommand(when);

    JSON.stringify(actualEvents).should.be.exactly(JSON.stringify(then));
  });
});


describe('join game command', function(){

  var given, when, then;

  it('should join game',function(){
    given= [{
      id:"1234",
      gameId: "1",
      event:"GameCreated",
      userName: "Gulli",
      timeStamp: "2015.12.02T11:29:44"
    }];
    when={
      id:"12345",
      gameId: "1",
      comm:"JoinGame",
      userName : "Halli",
      name:"TheFirstGame",
      timeStamp: "2015.12.02T11:30:50"
    };
    then=[{
      id:"12345",
      gameId: "1",
      event:"GameJoined",
      userName: "Halli",
      otherUserName: "Gulli",
      timeStamp: "2015.12.02T11:30:50",
      mark: "O"
    }];

    var actualEvents = tictactoeCommandHandler(given).executeCommand(when);

    JSON.stringify(actualEvents).should.be.exactly(JSON.stringify(then));
  });

  it('should reject joining of a non-existing game',function(){
    given= [];
    when={
      id:"12345",
      gameId: "1",
      comm:"JoinGame",
      userName : "Halli",
      name:"TheFirstGame",
      timeStamp: "2015.12.02T11:30:55"
    };
    then=[{
      id:"12345",
      gameId: "1",
      event:"GameDoesNotExist",
      userName: "Halli",
      timeStamp: "2015.12.02T11:30:55"
    }];

    var actualEvents = tictactoeCommandHandler(given).executeCommand(when);

    JSON.stringify(actualEvents).should.be.exactly(JSON.stringify(then));
  });
});