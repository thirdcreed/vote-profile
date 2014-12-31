var _ = require("lodash");
var copy = require("shallow-copy");

module.exports = function schulze(P) {
   
    var d = P.pairwiseMatrix;
    var C = P.alternatives;
    var n = P.alternatives.length;
    var p = P.initializeMatrix(n,n);
    var scores = {};
    var numToName = _.invert(P.alternativeMap);

    //Find strongest path from any runner to any opponent, using a well understood algorithm:
    // Floyd Warshall

        for (var i = 0; i < n; i++) {
            for (var j = 0; j < n; j++) {
                if (i != j) {
                    if (d[i][j] > d[j][i]) {
                        p[i][j] = d[i][j];
                    } else
                        p[i][j] = 0;
                }
            }
        }

        for (var ii = 0; ii < n ; ii++) {
            for (var jj = 0; jj < n ; jj++) {
                if (ii != jj) {
                    for (var k = 0; k < n ; k++) {
                        if (ii != k && jj != k) {
                            p[jj][k] = Math.max(p[jj][k], Math.min(p[jj][ii], p[ii][k]));

                        }

                    }
                }

            }
        }
    
    var highest =
        _.map(p, function (alternative) {
            return _.max(alternative);
        });
    
    _.each(highest, function (strongestPath, index) {
        
        scores[numToName[index]] = strongestPath;
        
    });

    return scores;
};
