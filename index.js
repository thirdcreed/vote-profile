var _ = require('lodash');
var Profile = function () {

    var _votingHasBegun = false;
    
    this.candidates = [];
    this.data = [];

    this.setCandidates = function setCandidates(nominees){
	if (_votingHasBegun) return;
	this.candidates = nominees;
    };
    

    this.find = function find(ordering) {
	var key = ordering.join("_");
	return  _.where(this.data,{"key":key});
    };


    this.vote = function vote(ordering) {
        
	_votingHasBegun = true;
         
	var key = ordering.join("_");

	var priorVote = _.where(this.data,{"key":key})[0];
	if (priorVote) {
	    priorVote.numVotes++;
	    return;
	}


	var newVote = {
		    "key":key,
	            "ordering":ordering,
		    "numVotes":1,
		    };

        this.data.push(newVote);	
       };

    this.each = function each(visitFunc){ 
    _.each(this.data,function(ordering){
        _.each(ordering.ordering,function(voteValue,index){
             visitFunc(ordering,voteValue,index);  
        });
    });    
  };

   this.score = require('./scoring.js').bind(this);
};


var P = new Profile();
P.setCandidates(['a','b','c','d']);
P.vote(['a', 'b', 'c', 'd']);
P.vote(['a', 'b', 'c', 'd']);
P.vote(['a', 'b', 'd', 'c']);
P.vote(['a','b','c']);

console.log(P.score("veto"));
console.log(P.score("borda"));
console.log(P.score("plurality"));

