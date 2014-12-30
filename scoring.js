var copy = require('shallow-copy');
var _ = require('lodash');
var condercet = require('./methods/condercet.js');

module.exports = function score(scoreMethod) {

    scoreMethod = scoreMethod || "borda";
    return common[scoreMethod] ? common[scoreMethod](this) : require("vote-method-" + scoreMethod)(this);

};

var getBlankScores = function getBlankScores(alternatives) {

    var blankScores = {};
    _.each(alternatives, function (alternative) {
        blankScores[alternative] = 0;
    });
    return copy(blankScores);
};


var common = {

    borda: function borda(P) {
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
    },

    plurality: function plurality(P) {

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
    },

    veto: function veto(P) {

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
    },

    black: function black(P) {

        var condercetWinners = condercet(P);
        var bordaWinners = this.borda(P);

        return _.isEmpty(condercetWinners) ? bordaWinners : condercetWinners;

    },
    schulze: require("./methods/schulze.js")
};
