var tictactoeCommandHandler = require("./tictactoeCommandHandler");

describe("On move command", function(){
  var given, when, then;
  it("should place down x",function(){
    given= [{
      id:"1234",
      event:"GameCreated",
      userName: "Gulli",
      timeStamp: "2015.12.02T11:29:44"
    }, {
      id:"12345",
      comm:"JoinGame",
      userName : "Halli",
      name:"TheFirstGame",
      timeStamp: "2015.12.02T11:30:50"
    }];
    when={
      id:"1234",
      comm:"OnMove",
      userName : "Gulli",
      name:"TheFirstGame",
      timeStamp: "2015.12.02T11:29:44",
      x: 0,
      y: 0,
      mark: "X"
    };
    then=[{
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