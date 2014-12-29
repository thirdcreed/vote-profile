var _ = require("lodash");
var copy = require("shallow-copy");

module.exports = function schulze(P) {
    /*

*/
    var d = P.dominanceMatrix;
    var C = P.candidates;
    var p = P.initializeMatrix(P.candidates);
    var scores = {};
    var numToName = _.invert(P.candidateMap);


        for (var i = 0; i < C.length; i++) {
            for (var j = 0; j < C.length; j++) {
                if (i != j) {
                    if (d[i][j] > d[j][i]) {
                        p[i][j] = d[i][j];
                    } else
                        p[i][j] = 0;
                }
            }
        }
        for (var ii = 0; ii < C.length ; ii++) {
            for (var jj = 0; jj < C.length ; jj++) {
                if (ii != jj) {
                    for (var k = 0; k < C.length ; k++) {
                        if (ii != k && jj != k) {
                            p[jj][k] = Math.max(p[jj][k], Math.min(p[jj][ii], p[ii][k]));

                        }

                    }
                }

            }
        }
    var highest =
        _.map(p, function (candidate) {
            return _.max(candidate);
        });
    
    _.each(highest, function (strongestPath, index) {
        
        scores[numToName[index]] = strongestPath;
        
    });


    return scores;


};
