var expect  = require("chai").expect;
var request = require("request");

describe("Docker Demo Application", function() {

  describe("Testing Homepage", function() {

    var url = "http://localhost:3000/";

    it("returns status 200", function() {
      request(url, function(error, response, body) {
        expect(response.statusCode).to.equal(200);
        done();
      });
    });

    it("Has correct title", function() {
      request(url, function(error, response, body) {
        expect(response.body).to.contains('Welcome to this homepage!');
        done();
      });
    });
  });
});