var _ = require('lodash');

module.exports = function score(scoreMethod) {

    scoreMethod = scoreMethod || "borda";
    return common[scoreMethod] ? common[scoreMethod](this) : require("vote-method-" + scoreMethod)(this);

};

var common = {
    borda: require("./methods/borda.js"),
    plurality: require("./methods/plurality.js"),
    veto: require("./methods/veto.js"),
    black: require("./methods/black.js"),
    schulze: require("./methods/schulze.js")
};