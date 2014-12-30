var _ = require('lodash');
var getBlankScores = require("./utils.js").getBlankScores;

module.exports = function plurality(P) {

    var score = getBlankScores(P.alternatives);

    P.each(function (obj, val, i) {
        if (_.isArray(val)) {
            _.each(val, function (tied) {
                score[tied] += (i === 0) ? obj.numVotes : 0;
            });
            return;
        }
        score[val] += (i === 0) ? obj.numVotes : 0;
    });

    return score;
};