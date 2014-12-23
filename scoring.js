var copy = require('shallow-copy');

module.exports = function score(scoreMethod){
    
    scoreMethod = scoreMethod || "borda";
    return common[scoreMethod] || require("vote-method-" + scoreMethod);

};

common = {
    borda: function borda(P){
       var score = copy(P.candidates);
       P.each(function (node){
           score[node.name] += ((P.numCandidates() - node.rank) * node.numVotes);
       });

       return score;
    },
    plurality: function borda(P){
       var score = copy(P.candidates);
       P.each(function (node){
           score[node.name] += (node.rank) == 1 ? 1 : 0;
       });

       return score;
    },
    veto: function veto(P){
       var score = copy(P.candidates);
       P.each(function (node){
           score[node.name] += 1 * node.numVotes;
       });

       return score;
    }

};

