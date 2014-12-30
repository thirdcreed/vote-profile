var _ = require('lodash');
var getBlankScores = require("./utils.js").getBlankScores;

module.exports = function veto(P) {

    var score = getBlankScores(P.alternatives);

    P.each(function (obj, val, i) {
        if (_.isArray(val)) {
            _.each(val, function (tied) {
                score[tied] += obj.numVotes;
            });
            return;
        }
        score[val] += obj.numVotes;
    });

    return score;
};