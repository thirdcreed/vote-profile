var _ = require('lodash');
var pairwise = require('./pairwise.js');

var Profile = function Profile() {
    var self = this;

    var _votingHasBegun = false;
    this.candidateMap = {};
    this.data = [];

    this.dominanceMatrix = undefined;
    this.initializeMatrix = _.noop;
    this.updateDominanceMatrix = _.noop;

    this.approvalMatrix = undefined;
    this.approvalData = _.noop;

    this.setCandidates = function setCandidates(nominees) {
        if (_votingHasBegun) return;
        self.candidates = nominees;
        self.dominanceMatrix = self.initializeMatrix(nominees);
        self.candidateMap = _.invert(nominees);
    };

    this.find = function find(ordering) {
        var key = ordering.join("_");
        return _.where(this.data, {
            "key": key
        });
    };

    this.vote = function vote(ordering) {

        _votingHasBegun = true;

        var key = ordering.join("_");
        var priorVote = _.where(this.data, {
            "key": key
        })[0];

        self.updateDominanceMatrix(ordering);

        if (priorVote) {
            priorVote.numVotes++;
            return;
        }

        var newVote = {
            "key": key,
            "ordering": ordering,
            "numVotes": 1,
        };

        this.data.push(newVote);

    };


    this.each = function each(visitFunc) {
        _.each(this.data, function (ordering) {
            _.each(ordering.ordering, function (voteValue, index) {
                visitFunc(ordering, voteValue, index);
            });
        });
    };

    this.extend = function extend(package) {
        var extension;
        if (typeof package == 'function') {
            var key = package.name;
            extension = {
                key: package
            };
        } else {
            extension = (require("./extensions.js").bind(self))(package);
        }
	
        _.mixin(self, extension);

    };

    this.score = require('./scoring.js').bind(this);

    _.each(arguments,this.extend);
};

module.exports = Profile;
