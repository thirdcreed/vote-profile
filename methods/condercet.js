var _ = require("lodash");
var copy = require("shallow-copy");
var getBlankScores = require('./utils.js').getBlankScores;
var pairwiseToDominance = require('./utils.js').pairwiseToDominance;
module.exports = function condercet(P) {

    var scores = getBlankScores(P.alternatives);
    
    var dominance = pairwiseToDominance(P.pairwiseMatrix);
    var isVoteDeltaPositive = function isVoteDeltaPositive(voteDiff) {
        return voteDiff >= 0;
    };

    var numToName = _.invert(P.alternativeMap);

    var mapToScoringObjects = function mapToScoringObjects(alternative, index) {
        return {
            "name": numToName[index],
            "winner": _.every(alternative, isVoteDeltaPositive)
        };

    };

    _.chain(dominance)
        .map(mapToScoringObjects)
        .filter(function (alternative) {
            return alternative.winner;
        })
        .pluck("name")
        .each(function (winner) {
            scores[winner] += 1;
        });

    return scores;
};
