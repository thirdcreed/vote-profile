var _ = require('lodash');
var getBlankScores = require("./utils.js").getBlankScores;
var condercet = require("./condercet.js");
var borda = require("./borda.js");

module.exports = function black(P) {

    var condercetWinners = condercet(P);
    var bordaWinners = borda(P);

    return _.isEmpty(condercetWinners) ? bordaWinners : condercetWinners;

};