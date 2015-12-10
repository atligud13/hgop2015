'use strict';

var should = require('should');
var request = require('supertest');
var acceptanceUrl = process.env.ACCEPTANCE_URL;

var user = function(userName) {
  var api = {
    id : "1234",
    userName: userName,
    timeStamp: "2014-12-02T11:29:29",
    createsGame: function(gameId) {
      api.name = "Sample Name";
      api.gameId = gameId;
      api.comm = "CreateGame";
      return api;
    },
    joinsGame: function(gameId) {
      api.name = "Sample Name";
      api.gameId = gameId;
      api.comm = "JoinGame";
      return api;
    },
    named: function(name) {
      api.name = name;
      return api;
    },
    placesMove: function(x, y, mark) {
      api.x = x;
      api.y = y;
      api.mark = mark;
      api.comm = "PlaceMove";
      return api;
    }
  }
  return api;
}

function postCommandsAndRequestExpectations(commands, expectations, done) {
  var command = commands.shift();
  var postUrl = "/api/" + command.comm;
  request(acceptanceUrl)
  .post(postUrl)
  .type('json')
  .send(command)
  .end(function (err, res) {
    if (err) return done(err);
    if(commands.length > 0) return postCommandsAndRequestExpectations(commands, expectations, done);
    else return requestExpectations(command, expectations, done);
  });
}

function requestExpectations(command, expectations, done) {
  var expectation = expectations.shift();
  var requestUrl = "/api/gameHistory/" + expectation.gameId;
  var expectedResponse = {
    "id": command.id,
    "gameId": command.gameId,
    "userName": command.userName,
    "timeStamp": command.timeStamp
  };
  if(expectation.eventName === "GameCreated") {
    expectedResponse.event = "GameCreated";
    expectedResponse.name = command.name;
    expectedResponse.mark = "X";
  }
  if(expectation.eventName === "GameDraw") {
    expectedResponse.event = "GameDraw";
  }
  /* Do the actual call with the expected response object built by the current expectation */
  request(acceptanceUrl)
    .get(requestUrl)
    .expect(200)
    .expect('Content-Type', /json/)
    .end(function (err, res) {
      if (err) return done(err);
      res.body.should.be.instanceof(Array);
      should(res.body.pop()).eql(
        expectedResponse);
      if(expectations.length > 0) return requestExpectations(expectations);
      else return done();
    });
}


function given(cmd) {
  var gameId = cmd.gameId;
  var name = cmd.name;
  var commands = [cmd];
  var expectations = [];
  var givenApi = {
    expect: function(eventName) {
      expectations.push({ eventName: eventName, gameId: gameId, name: name });
      return givenApi;
    },
    and: function(cmd) {
      if(!cmd.gameId) cmd.gameId = gameId;
      if(!cmd.name) cmd.name = name;
      commands.push(cmd);
      return givenApi;
    },
    withGameId: function(gameId) {
      var expectation = expectations.pop();
      expectation.gameId = gameId;
      expectations.push(expectation);
      return givenApi;
    },
    byUser: function(userName) {
      var expectation = expectations.pop();
      expectations.userName = userName;
      expectations.push(expectation);
      return givenApi;
    },
    isOk: function(done) {
      var req = request(acceptanceUrl);
      return postCommandsAndRequestExpectations(commands, expectations, done);
    },
    when: function(done) {
      
      done()
    }
  }
  return givenApi;
}

module.exports.user = user;
module.exports.given = given;