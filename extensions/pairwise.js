var _ = require('lodash');

module.exports = {

    "initializeMatrix": function initializeMatrix(n,m) {
        var self = this;
        var matrix = [];

        for (var i = 0; i < n; i++) {
            matrix.push(_.range(0, m, 0));
        }

        return matrix;
    },

    "updateDominanceMatrix": function updateDominanceMatrix(ordering) {
        var self = this;
        var unwrittenAlternatives = _.difference(self.alternatives, ordering);
        
        var numOrdering = _.map(ordering, function (item) {
	    if (_.isArray(item)){
	       return _.map(item,function(tied){
	         return self.alternativeMap[tied];
	       }); 
	       }
            return self.alternativeMap[item];
        });

        var resolveDominance = function(i,j){
	     //Eaches are for ties, either runner ties, or opponent ties.
                   _.each(numOrdering[i],function(runner){
		      _.each(numOrdering[j],function(opponent){
		         self.dominanceMatrix[runner][opponent]++;
		      });
		   });
	};

        for (var i = 0; i < ordering.length; i++) {
            for (var j = i; j < ordering.length; j++) {
		if (i != j) {
		        resolveDominance(i,j);  
                }
            }
        }

      var resolveDominanceForUnwritten = function resolveDominanceForUnwritten(jj,unwritten){
 	        _.each(numOrdering[jj],function(runner){
		      self.dominanceMatrix[runner][unwritten]++;
		});
     };

        for (var ii = 0; ii < unwrittenAlternatives.length; ii++) {
            var unwritten = self.alternativeMap[unwrittenAlternatives[ii]];
            for (var jj = 0; jj < numOrdering.length; jj++) {
                resolveDominanceForUnwritten(jj,unwritten);
            }
        }

    }
};
