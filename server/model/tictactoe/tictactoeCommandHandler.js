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

  var eventHandlers={
    "MoveMade": function(event){
      console.log("PREVIOUS MOVE MADE, UPDATING");
      gameState.grid[event.x][event.y] = event.mark;
      if(event.mark === "X") gameState.currentMark = "O";
      else gameState.currentMark = "X";
    }
  };

  _.each(events, function(event){
    var eventHandler = eventHandlers[event.event];
    eventHandler && eventHandler(event);
  });

  var handlers = {
    "CreateGame": function (cmd) {
      {
        return [{
          id: cmd.id,
          event: "GameCreated",
          userName: cmd.userName,
          timeStamp: cmd.timeStamp,
          mark: "X"
        }];
      }
    },
    "JoinGame": function (cmd) {
      {
        if (gameState.gameCreatedEvent === undefined) {
          return [{
            id: cmd.id,
            event: "GameDoesNotExist",
            userName: cmd.userName,
            timeStamp: cmd.timeStamp
          }];
        }
        return [{
          id: cmd.id,
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
          event: "NotYourTurn",
          userName: cmd.userName,
          timeStamp: cmd.timeStamp,
          mark: cmd.mark
        }];
      }

      /* Filling the slot */
      gameState.grid[cmd.x, cmd.y] = cmd.mark;

      /* Setting the other player's turn */
      console.log("SETTING CURRENT MARK");
      console.log("CURRENT MOVE: " + cmd.x + " " + cmd.y);
      console.log("Previous: " + gameState.currentMark);
      if(cmd.mark === "X") gameState.currentMark = "O";
      else gameState.currentMark = "X";
      console.log("Now: " + gameState.currentMark);

      /* Returning the placed event */
      return [{
          id: cmd.id,
          event: "Placed",
          userName: cmd.userName,
          timeStamp: cmd.timeStamp,
          mark: cmd.mark
        }];
    },
    "GameWon": function (cmd) {
      /* Always returns game won for now */
      return [{
        id: cmd.id,
        event: "GameWon",
        userName: cmd.userName,
        timeStamp: cmd.timeStamp
      }];
    },
    "GameDraw": function (cmd) {
      /* Always returns game draw for now */
      return [{
        id: cmd.id,
        event: "GameDraw",
        userName: cmd.userName,
        timeStamp: cmd.timeStamp
      }];
    }
  };
  return {
    executeCommand: function (cmd) {
      return handlers[cmd.comm](cmd);
    }
  };
};