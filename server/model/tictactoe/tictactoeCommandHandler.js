var _ = require("lodash");
module.exports = function tictactoeCommandHandler(events) {
  var gameState = {
    gameCreatedEvent : events[0],
    grid: [["","",""],
          ["","",""],
          ["","",""]],
    currentMark: "X",
    moveCount: 0
  };

  var eventHandlers = {
    "MoveMade": function(event){
      gameState.grid[event.x][event.y] = event.mark;
      if(event.mark === "X") gameState.currentMark = "O";
      else gameState.currentMark = "X";
      gameState.moveCount++;
    }
  };

  _.each(events, function(event){
    var eventHandler = eventHandlers[event.event];
    if(eventHandler) eventHandler(event);
  });

  function printGrid() {
    console.log("[ " + gameState.grid[0][0] + ", " + gameState.grid[1][0] + ", " + gameState.grid[2][0] + " ]"); 
    console.log("[ " + gameState.grid[0][1] + ", " + gameState.grid[1][1] + ", " + gameState.grid[2][1] + " ]"); 
    console.log("[ " + gameState.grid[0][2] + ", " + gameState.grid[1][2] + ", " + gameState.grid[2][2] + " ]");
  }

  var handlers = {
    "CreateGame": function (cmd) {
      {
        return [{
          id: cmd.id,
          gameId: cmd.gameId,
          event: "GameCreated",
          userName: cmd.userName,
          timeStamp: cmd.timeStamp,
          name: cmd.name,
          mark: "X"
        }];
      }
    },
    "JoinGame": function (cmd) {
      {
        if (gameState.gameCreatedEvent === undefined) {
          return [{
            id: cmd.id,
            gameId: cmd.gameId,
            event: "GameDoesNotExist",
            userName: cmd.userName,
            timeStamp: cmd.timeStamp
          }];
        }
        return [{
          id: cmd.id,
          gameId: cmd.gameId,
          event: "GameJoined",
          userName: cmd.userName,
          otherUserName: gameState.gameCreatedEvent.userName,
          timeStamp: cmd.timeStamp,
          mark: "O"
        }];
      }
    },
    "PlaceMove": function (cmd) {
      gameState.moveCount++;
      /* Checking if it's this player's turn */
      if(cmd.mark !== gameState.currentMark) {
        return [{
          id: cmd.id,
          gameId: cmd.gameId,
          event: "NotYourTurn",
          userName: cmd.userName,
          timeStamp: cmd.timeStamp,
          mark: cmd.mark
        }];
      }

      /* Checking if the spot is already filled */
      if(gameState.grid[cmd.x][cmd.y] !== "") {
        return [{
          id: cmd.id,
          gameId: cmd.gameId,
          event: "SlotAlreadyFilled",
          userName: cmd.userName,
          timeStamp: cmd.timeStamp,
          mark: cmd.mark
        }];
      }

      /* Filling the slot */
      gameState.grid[cmd.x][cmd.y] = cmd.mark;

      /* Checking if this was a winning move */
      var col = 0, row = 0, diag = 0, rdiag = 0;
      for(var i = 0; i < 3; ++i) {
        if(gameState.grid[cmd.x][i] === cmd.mark) col++;
        if(gameState.grid[i][cmd.y] === cmd.mark) row++;
        if(gameState.grid[i][i] === cmd.mark) diag++;
        if(gameState.grid[i][2 - i] === cmd.mark) rdiag++;
      }
      if(col === 3 || row === 3 || diag === 3 || rdiag === 3) {
        return [{
          id: cmd.id,
          gameId: cmd.gameId,
          event: "MoveMade",
          x: cmd.x,
          y: cmd.y,
          userName: cmd.userName,
          timeStamp: cmd.timeStamp,
          mark: cmd.mark
        }, handlers.GameWon(cmd)[0]];
      }

      /* Checking if this was the last move, therefore resulting in a draw */
      if(gameState.moveCount === 9)
        return [{
          id: cmd.id,
          gameId: cmd.gameId,
          event: "MoveMade",
          x: cmd.x,
          y: cmd.y,
          userName: cmd.userName,
          timeStamp: cmd.timeStamp,
          mark: cmd.mark
        }, handlers.GameDraw(cmd)[0]];

      /* Returning the MoveMade event */
      return [{
          id: cmd.id,
          gameId: cmd.gameId,
          event: "MoveMade",
          x: cmd.x,
          y: cmd.y,
          userName: cmd.userName,
          timeStamp: cmd.timeStamp,
          mark: cmd.mark
        }];
    },
    "GameWon": function(cmd) {
      /* Always returns game won for now */
      return [{
        id: cmd.id,
        gameId: cmd.gameId,
        event: "GameWon",
        userName: cmd.userName,
        timeStamp: cmd.timeStamp
      }];
    },
    "GameDraw": function(cmd) {
      /* Always returns game draw for now */
      return [{
        id: cmd.id,
        gameId: cmd.gameId,
        event: "GameDraw",
        userName: cmd.userName,
        timeStamp: cmd.timeStamp
      }];
    }
  };
  return {
    executeCommand: function(cmd) {
      var handler = handlers[cmd.comm];
      if(!handler){
        throw new Error("No handler resolved for command " + JSON.stringify(cmd));
      }
      return handler(cmd);
    }
  };
};