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
      moveCount++;
      /* Checking if it's this player's turn */
      if(cmd.mark !== currentMark) {
        return [{
          id: cmd.id,
          event: "NotYourTurn",
          userName: cmd.userName,
          timeStamp: cmd.timeStamp,
          mark: cmd.mark
        }];
      }

      /* Checking if the spot is already filled */
      if(grid[cmd.x, cmd.y] !== "") {
        return [{
          id: cmd.id,
          event: "SlotAlreadyFilled",
          userName: cmd.userName,
          timeStamp: cmd.timeStamp,
          mark: cmd.mark
        }];
      }

      /* Filling the slot */
      grid[cmd.x, cmd.y] = cmd.mark;

      /* Checking if this was a winning move */
      int col, row, diag, rdiag = 0;
      for(var i = 0; i < 3; ++i) {
        if(grid(cmd.x, i) === cmd.mark) col++;
        if(grid(i, cmd.y) === cmd.mark) row++;
        if(grid(i, i) === cmd.mark) diag++;
        if(grid(i, 2 - i) === cmd.mark) rdiag++;
      }
      if(col === 3 || row === 3 || diag === 3 || rdiag === 3) 
        return [{
          id: cmd.id,
          event: "Placed",
          userName: cmd.userName,
          timeStamp: cmd.timeStamp,
          mark: cmd.mark
        }, GameWon[0](cmd)];

      /* Checking if this was the last move, therefore resulting in a draw */
      if(moveCount === 9) 
        return [{
          id: cmd.id,
          event: "Placed",
          userName: cmd.userName,
          timeStamp: cmd.timeStamp,
          mark: cmd.mark
        }, GameDraw[0](cmd)];

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
