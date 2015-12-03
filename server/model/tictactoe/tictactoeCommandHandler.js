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

      /* Checking if the spot is already filled */
      if(gameState.grid[cmd.x][cmd.y] !== "") {
        console.log(gameState.grid[cmd.x][cmd.y]);
        return [{
          id: cmd.id,
          event: "SlotAlreadyFilled",
          userName: cmd.userName,
          timeStamp: cmd.timeStamp,
          mark: cmd.mark
        }];
      }

      /* Filling the slot */
      gameState.grid[cmd.x][cmd.y] = cmd.mark;

      /* Setting the other player's turn */
      if(cmd.mark === "X") gameState.currentMark = "O";
      else gameState.currentMark = "X";

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