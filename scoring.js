var copy = require('shallow-copy');
var _ = require('lodash');
module.exports = function score(scoreMethod){
     
    scoreMethod = scoreMethod || "borda";
    return common[scoreMethod](this) || require("vote-method-" + scoreMethod)(this);

};

var getBlankScores = function getBlankScores(candidates){
 
var blankScores = {};
 _.each(candidates,function(candidate){
       blankScores[candidate] = 0; 
 });
 return copy(blankScores);
};


var common = {

    borda: function borda(P){
        var score = getBlankScores(P.candidates);
        P.each(function(obj,val,i){
            score[val] += ((P.candidates.length - i) * obj.numVotes);
        });

	return score;
    },

    plurality: function plurality(P){
     var score = getBlankScores(P.candidates);
        P.each(function(obj,val,i){
            score[val] += (i === 0) ? obj.numVotes : 0;
        });

	return score;
    },
    veto: function veto(P){
     var score = getBlankScores(P.candidates);
        P.each(function(obj,val,i){
            score[val] += obj.numVotes;
        });

       return score;
    }

};

