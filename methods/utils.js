var _ = require('lodash');
var copy = require('shallow-copy');

module.exports = {

    getBlankScores: function getBlankScores(alternatives) {
        var blankScores = {};

        _.each(alternatives, function (alternative) {
            blankScores[alternative] = 0;
        });

        return copy(blankScores);
    },
    pairwiseToDominance: function pairwiseToDominance(pairwise) {
        var n = pairwise.length;
        var dominance = [];
        
	for (var i = 0; i < n; i++) {
            dominance[i] = [];
            for (var j = 0; j < n; j++) {
                dominance[i].push(pairwise[i][j] - pairwise[j][i]);
            }
        }

	return dominance;
    }
};
