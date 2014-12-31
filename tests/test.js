var assert = require('assert');
var Profile = require("../index.js");

var voteNTimes = function voteNTimes(p,ballot,N){

for(var i =0; i < N; i ++){
   p.vote(ballot);
}

};

var tenessee = function tenesee(P){
 
    P.setAlternatives(["Memphis","Nashville","Chatanooga","Knoxville"]);
    voteNTimes(P,["Memphis","Nashville","Chatanooga","Knoxville"],42);
    voteNTimes(P,["Nashville","Chatanooga","Knoxville","Memphis"],26);
    voteNTimes(P,["Chatanooga","Knoxville","Nashville","Memphis"],15);
    voteNTimes(P,["Knoxville","Chatanooga","Nashville","Memphis"],17);
  
  return P;

};



describe('Profile', function () {

    var borda = tenessee(new Profile());
    var black = tenessee(new Profile("condercet"));
    var plurality = tenessee(new Profile("condercet"));
    var schulze = new Profile("condercet");
    var schulze2 = tenessee(new Profile("condercet"));
    var minimax = tenessee(new Profile("condercet"));
    var copeland = tenessee(new Profile("condercet"));
     
     
    schulze.setAlternatives(["a","b","c","d","e"]);
    voteNTimes(schulze,["a","c","b","e","d"],5);
    voteNTimes(schulze,["a","d","e","c","b"],5);
    voteNTimes(schulze,["b","e","d","a","c"],8);
    voteNTimes(schulze,["c","a","b","e","d"],3);
    voteNTimes(schulze,["c","a","e","b","d"],7);
    voteNTimes(schulze,["c","b","a","d","e"],2);
    voteNTimes(schulze,["d","c","e","b","a"],7);
    voteNTimes(schulze,["e","b","a","d","c"],8);
    

    describe("#data", function () {
        it("should have the correct vote aggregation data", function () {
            assert.equal(42, borda.votes[0].numVotes);
        });
    });

    describe("#score", function () {

        it('should correctly score with the borda method', function () {
            assert.deepEqual({
                "Nashville": 294,
                "Knoxville": 207,
                "Chatanooga": 273,
		"Memphis": 226
            }, borda.score("borda"));
        });

        it('should correctly score with the plurlality method', function () {
            assert.deepEqual({
                "Nashville": 26,
                "Knoxville": 17,
                "Chatanooga": 15,
		"Memphis": 42
            }, plurality.score("plurality"));
        });

        it('should correctly score with the veto method', function () {
            assert.deepEqual({
                 "Nashville": 100,
                "Knoxville": 100,
                "Chatanooga": 100,
		"Memphis": 100,
            }, plurality.score("veto"));
        });

        it('should correctly score with the black method', function () {
            assert.deepEqual({
                "Nashville": 1,
                "Knoxville": 0,
                "Chatanooga": 0,
		"Memphis": 0
            },black.score("black"));
        });

	 it('should correctly score with the black method with ties', function () {
            assert.deepEqual({
                "Nashville": 1,
                "Knoxville": 0,
                "Chatanooga": 0,
		"Memphis": 0
            }, black.score("black"));
        });
       it('should correctly score with the schulze method', function(){
         assert.deepEqual({
	        "a": 3,
                "b": 1,
                "c": 2,
		"d": 0,
		"e": 4
	 }, schulze.score("schulze"));

	 assert.deepEqual({
	        "Nashville": 3,
                "Knoxville": 1,
                "Chatanooga":2,
		"Memphis": 0
            }, schulze2.score("schulze"));
       });
      it('should correctly score with the minimax method', function(){
         assert.deepEqual({
	        "Nashville": 1,
                "Knoxville": 4,
                "Chatanooga": 3,
		"Memphis": 2
	 }, minimax.score("minimax"));
       });
       
       
    });

    describe("#extend", function () {

        it('should not have a pairwise matrix without first extending ', function () {
            assert.equal(undefined, borda.pairwiseMatrix);
        });

        it('should have a pairwise matrix after extending', function () {
            assert.equal(typeof black.pairwiseMatrix, "object");
        });
    });


});
