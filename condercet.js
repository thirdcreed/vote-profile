var _ = require("lodash");
var copy = require("shallow-copy");


var getBlankScores = function getBlankScores(candidates) {

    var blankScores = {};
    _.each(candidates, function (candidate) {
        blankScores[candidate] = 0;
    });
    return copy(blankScores);
};

module.exports = function condercet(P) {
    var scores = getBlankScores(P.candidates);

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

    var numToName = _.invert(P.candidateMap);

    var mapToScoringObjects = function mapToScoringObjects(candidate, index) {
        return {
            "name": numToName[index],
            "winner": _.every(candidate, isVoteDeltaPositive)
        };

    };

    _.chain(pairwise)
        .map(mapToScoringObjects)
        .filter(function (candidate) {
            return candidate.winner;
        })
        .pluck("name")
        .each(function (winner) {
            scores[winner] += 1;
        });

    return scores;
};