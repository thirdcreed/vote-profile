var assert = require('assert');
var Profile = require("../index.js");
var voteNTimes = function voteNTimes(p,ballot,N){

for(var i =0; i < N; i ++){
   p.vote(ballot);
}

};


describe('Profile', function () {

    var noExtensionsWithTies = new Profile();
    var condercetNoTies = new Profile("condercet");
    var condercetWithTies = new Profile("condercet");
    var approvalNoTies = new Profile("approval");
    var schulzeNoTies = new Profile("condercet");
    var minimaxNoTies = new Profile("condercet");
    
     
    minimaxNoTies.setAlternatives(["Memphis","Nashville","Chatanooga","Knoxville"]);
    voteNTimes(minimaxNoTies,["Memphis","Nashville","Chatanooga","Knoxville"],42);
    voteNTimes(minimaxNoTies,["Nashville","Chatanooga","Knoxville","Memphis"],26);
    voteNTimes(minimaxNoTies,["Chatanooga","Knoxville","Nashville","Memphis"],15);
    voteNTimes(minimaxNoTies,["Knoxville","Chatanooga","Nashville","Memphis"],17);


    schulzeNoTies.setAlternatives(["a","b","c","d","e"]);
    voteNTimes(schulzeNoTies,["a","c","b","e","d"],5);
    voteNTimes(schulzeNoTies,["a","d","e","c","b"],5);
    voteNTimes(schulzeNoTies,["b","e","d","a","c"],8);
    voteNTimes(schulzeNoTies,["c","a","b","e","d"],3);
    voteNTimes(schulzeNoTies,["c","a","e","b","d"],7);
    voteNTimes(schulzeNoTies,["c","b","a","d","e"],2);
    voteNTimes(schulzeNoTies,["d","c","e","b","a"],7);
    voteNTimes(schulzeNoTies,["e","b","a","d","c"],8);


    noExtensionsWithTies.setAlternatives(["a", "b", "c", "d"]);
    noExtensionsWithTies.vote([["a", "b"], "c", "d"]);
    noExtensionsWithTies.vote(["b", "c", "a", "d"]);
    noExtensionsWithTies.vote(["b", "c", "d", "a"]);
    noExtensionsWithTies.vote(["c", "d", "b", "a"]);

    condercetNoTies.setAlternatives(["a", "b", "c"]);
    condercetNoTies.vote(["a", "b", "c"]);
    condercetNoTies.vote(["a", "b", "c"]);
    condercetNoTies.vote(["b", "a", "c"]);

    condercetWithTies.setAlternatives(["a", "b", "c","d","e"]);
    condercetWithTies.vote(["a", "b", ["c","d"],"e"]);
    condercetWithTies.vote([["b", "a"], "c","d","e"]);
    condercetWithTies.vote(["b", "a", ["c","d"]]);



    describe("#data", function () {
        it("should have the correct vote aggregation data", function () {
            assert.equal(1, noExtensionsWithTies.votes[0].numVotes);
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

	 it('should correctly score with the black method with ties', function () {
            assert.deepEqual({
                "a": 1,
                "b": 1,
                "c": 0,
		"d": 0,
		"e": 0
            }, condercetWithTies.score("black"));
        });
       it('should correctly score with the schulze method', function(){
         assert.deepEqual({
	        "a": 30,
                "b": 33,
                "c": 29,
		"d": 28,
		"e": 31
	 }, schulzeNoTies.score("schulze"));
       });
      it('should correctly score with the minimax method', function(){
         assert.deepEqual({
	        "Nashville": 1,
                "Knoxville": 4,
                "Chatanooga": 3,
		"Memphis": 2
	 }, minimaxNoTies.score("minimax"));
       });
       
       
    });

    describe("#extend", function () {

        it('should not have a pairwise matrix without first extending ', function () {
            assert.equal(undefined, noExtensionsWithTies.pairwiseMatrix);
        });

        it('should have a pairwise matrix after extending', function () {
            assert.equal(typeof condercetNoTies.pairwiseMatrix, "object");
        });
    });


});
