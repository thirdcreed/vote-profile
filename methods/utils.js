var _ = require('lodash');
var copy = require('shallow-copy');

module.exports = {

    getBlankScores: function getBlankScores(alternatives) {
        var blankScores = {};

        _.each(alternatives, function (alternative) {
            blankScores[alternative] = 0;
        });

        return copy(blankScores);
    }
};