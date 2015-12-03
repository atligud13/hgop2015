module.exports = function tictactoeCommandHandler(events) {
  var gameCreatedEvent = events[0];
  var grid =   [["","",""],
                 ["","",""],
                 ["","",""]];
  var currentMark = "X";
  var moveCount = 0;
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
        if (gameCreatedEvent === undefined) {
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
          otherUserName: gameCreatedEvent.userName,
          timeStamp: cmd.timeStamp,
          mark: "O"
        }];
      }
    },
    "OnMove": function (cmd) {
      /* Filling the slot */
      grid[cmd.x, cmd.y] = cmd.mark;

      /* Setting the other player's turn */
      if(cmd.mark === "X") currentMark = "O";
      else currentMark = "X";

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