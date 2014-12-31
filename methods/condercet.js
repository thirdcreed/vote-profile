var _ = require("lodash");
var copy = require("shallow-copy");
var getBlankScores = require('./utils.js').getBlankScores;

module.exports = function condercet(P) {

    var scores = getBlankScores(P.alternatives);

    var sumMatrix = P.dominanceMatrix;
    var pairwise = [];
    for (var i = 0; i < sumMatrix.length; i++) {
        pairwise[i] = [];
        for (var j = 0; j < sumMatrix.length; j++) {
            pairwise[i].push(sumMatrix[i][j] - sumMatrix[j][i]);
        }
    }

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

    _.chain(pairwise)
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
