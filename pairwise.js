var _ = require('lodash');

module.exports = {
    "initializeMatrix": function initializeMatrix(arr) {
        var self = this;
        var matrix = [];

        for (var i = 0; i < arr.length; i++) {
            matrix.push(_.range(0, arr.length, 0));
        }

        return matrix;
    },
    "updateDominanceMatrix": function updateDominanceMatrix(ordering) {
        var self = this;
        console.log(this);
        var unwrittenCandidates = _.difference(self.candidates, ordering);

        var numOrdering = _.map(ordering, function (item) {
            return self.candidateMap[item];
        });
        for (var i = 0; i < ordering.length; i++) {
            for (var j = i; j < ordering.length; j++) {
                if (i != j) {
                    self.dominanceMatrix[numOrdering[i]][numOrdering[j]]++;
                }
            }
        }

        for (var ii = 0; ii < unwrittenCandidates.length; ii++) {
            var unwritten = self.candidateMap[unwrittenCandidates[ii]];
            for (var jj = 0; jj < numOrdering.length; jj++) {
                self.dominanceMatrix[numOrdering[jj]][unwritten]++;
            }
        }

    }
};