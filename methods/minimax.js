var _ = require("lodash");
var copy = require("shallow-copy");
var getBlankScores = require('./utils.js').getBlankScores;
var pairwiseToDominance = require('./utils.js').pairwiseToDominance;

module.exports = function minimax(P){
  var scores = getBlankScores(P.alternatives);
  var dominance = pairwiseToDominance(P.pairwiseMatrix);
  var numToName = _.invert(P.alternativeMap);
  var transpose = _.zip;

  var defeats = transpose(dominance);
        
   _.chain(defeats)
    .map(function (defeat,i){
      return _.max(defeat,function(margin,j){
         return i == j ? -Infinity : margin;
      });
  }).map(function(defeat,index){
      return {"name": numToName[index], "maxDefeat": defeat};
  }).sortBy("maxDefeat")
    .each(function(alternative,index){
        scores[alternative.name] = index + 1; 
  });

   
  return scores;

};
  
