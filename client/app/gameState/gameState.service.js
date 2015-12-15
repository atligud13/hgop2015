'use strict';

angular.module('tictactoeApp')
  .factory('gameState', function () {
    return function () {

      var gameState = {
        created: false,
        board: [['', '', ''], ['', '', ''], ['', '', '']],
        nextTurn: 'X',
        gameDraw: false,
        winner: undefined,
        mutate: function (events) {
          console.log("Mutate called");
          console.log(events);
          var handlers = {
            'GameCreated': function (event, gameState) {
              gameState.created = true;
              gameState.name = event.name;
              gameState.gameId = event.gameId;
              gameState.creatingUser = event.user;
            },
            'GameJoined': function (event, gameState) {
              gameState.joiningUser = event.user;
            },
            'MoveMade': function (event, gameState) {
              console.log("Service receiving move placed, event: ");
              console.log(event);
              var x = event.x, y = event.y;
              gameState.board[x][y] = event.mark;
              gameState.nextTurn = event.mark === 'X' ? 'O' : 'X';
            },
            'GameWon': function (event, gameState) {
              gameState.nextTurn = 'GameOver';
              gameState.winner = event.user;
            },
            'GameDraw': function (event, gameState) {
              gameState.nextTurn = 'GameOver';
              gameState.gameDraw = true;
            }
          };
          _.each(events, function (ev) {
            if(!ev) {
              return;
            }
            if(handlers[ev.event]){
              handlers[ev.event](ev, gameState);
            }
          });
        }
      };
      return gameState;
    };
  });
