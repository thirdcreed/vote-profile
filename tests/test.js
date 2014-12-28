var assert = require('assert');
var Profile = require("../index.js");


describe('Profile', function () {

    var noExtensionsWithTies = new Profile();
    var condercetNoTies = new Profile();
    var condercetWithTies = new Profile();
    var approvalNoTies = new Profile();

    condercetNoTies.extend("condercet");
    condercetWithTies.extend("condercet");
    approvalNoTies.extend("approval");

    noExtensionsWithTies.setCandidates(["a", "b", "c", "d"]);
    noExtensionsWithTies.vote([["a", "b"], "c", "d"]);
    noExtensionsWithTies.vote(["b", "c", "a", "d"]);
    noExtensionsWithTies.vote(["b", "c", "d", "a"]);
    noExtensionsWithTies.vote(["c", "d", "b", "a"]);

    condercetNoTies.setCandidates(["a", "b", "c"]);
    condercetNoTies.vote(["a", "b", "c"]);
    condercetNoTies.vote(["a", "b", "c"]);
    condercetNoTies.vote(["b", "a", "c"]);

    condercetWithTies.setCandidates(["a", "b", "c"]);
    condercetWithTies.vote(["a", "b", "c"]);
    condercetWithTies.vote(["a", "b", "c"]);
    condercetWithTies.vote(["b", "a", "c"]);



    describe("#data", function () {
        it("should have the correct vote aggregation data", function () {
            assert.equal(1, noExtensionsWithTies.data[0].numVotes);
        });
    });

    describe("#score", function () {

        it('should correctly score with the borda method', function () {
            assert.deepEqual({
                "a": 8,
                "b": 14,
                "c": 13,
                "d": 8
            }, noExtensionsWithTies.score("borda"));
        });

        it('should correctly score with the plurlality method', function () {
            assert.deepEqual({
                "a": 1,
                "b": 3,
                "c": 1,
                "d": 0
            }, noExtensionsWithTies.score("plurality"));
        });

        it('should correctly score with the veto method', function () {
            assert.deepEqual({
                "a": 4,
                "b": 4,
                "c": 4,
                "d": 4
            }, noExtensionsWithTies.score("veto"));
        });

        it('should correctly score with the black method', function () {
            assert.deepEqual({
                "a": 1,
                "b": 0,
                "c": 0
            }, condercetNoTies.score("black"));
        });

    });

    describe("#extend", function () {

        it('should not have a domniance matrix without first extending ', function () {
            assert.equal(undefined, noExtensionsWithTies.dominanceMatrix);
        });

        it('should have a dominance matrix after extending', function () {
            assert.equal(typeof condercetNoTies.dominanceMatrix, "object");
        });
    });


});