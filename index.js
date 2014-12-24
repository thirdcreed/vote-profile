var _ = require('lodash');
var Profile = function () {

    var _votingHasBegun = false;
    
    this.dominanceMatrix = [];

    function initializeMatrix(arr){
      var matrix = [];

          for(var i = 0; i < arr.length;i++){
              matrix.push(_.range(0,arr.length,0));
          }

        return matrix;
      }

     var updateDominanceMatrix = _.bind(function updateDominanceMatrix(ordering){ 
	var num_ordering = _.map(ordering, function(item){
	    return candidateMap[item];
	});
        
	for(var i=0;i < ordering.length;i++){
	    for(var j=i; j < ordering.length;j++){
	       if(i != j) {this.dominanceMatrix[num_ordering[i]][num_ordering[j]]++;}
	    }
	} 
     },this);
    var candidateMap ={}; 
    this.candidates = [];
    this.data = [];

    this.setCandidates = function setCandidates(nominees){
	if (_votingHasBegun) return;
	this.candidates = nominees;
	this.dominanceMatrix = initializeMatrix(nominees);
        candidateMap = _.invert(nominees);
    };

    this.find = function find(ordering) {
	var key = ordering.join("_");
	return  _.where(this.data,{"key":key});
    };

    this.vote = function vote(ordering) {
        
	_votingHasBegun = true;
         
	var key = ordering.join("_");
	var priorVote = _.where(this.data,{"key":key})[0];
	updateDominanceMatrix(ordering);
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

console.log(P.dominanceMatrix);
