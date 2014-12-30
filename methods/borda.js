var _ = require('lodash');
var getBlankScores = require("./utils.js").getBlankScores;

module.exports = function borda(P) {
   
    var score = getBlankScores(P.alternatives);
    
    P.each(function (obj, val, i) {
        if (_.isArray(val)) {
            _.each(val, function (tied) {
                score[tied] += ((P.alternatives.length - i) * obj.numVotes);
            });
            return;
        }
        score[val] += ((P.alternatives.length - i) * obj.numVotes);
    });

    return score;
};