var _ = require('lodash');
var pairwise = require('./extensions/pairwise.js');

var Profile = function Profile() {
    var self = this;

    var _votingHasBegun = false;
    this.alternativeMap = {};
    this.votes = [];

    this.pairwiseMatrix = undefined;
    this.initializeMatrix = _.noop;
    this.updatePairwiseMatrix = _.noop;

    this.approvalMatrix = undefined;
    this.approvalData = _.noop;

    this.setAlternatives = function setAlternatives(alternatives) {
        if (_votingHasBegun) return;
        self.alternatives = alternatives;
	var n = alternatives.length;
        self.pairwiseMatrix = self.initializeMatrix(n,n);
        self.alternativeMap = _.invert(alternatives);
    };

    this.find = function find(ordering) {
        var key = ordering.join("_");
        return _.where(this.votes, {
            "key": key
        });
    };

    this.vote = function vote(ballot) {

        _votingHasBegun = true;

        var key = ballot.join("_");
        var priorVote = _.where(this.votes, {
            "key": key
        })[0];

        self.updatePairwiseMatrix(ballot);

        if (priorVote) {
            priorVote.numVotes++;
            return;
        }

        var newVote = {
            "key": key,
            "ordering": ballot,
            "numVotes": 1,
        };

        this.votes.push(newVote);

    };


    this.each = function each(visitFunc) {
        _.each(this.votes, function (order) {
            _.each(order.ordering, function (voteValue, index) {
                visitFunc(order, voteValue, index);
            });
        });
    };

    this.extend = function extend(addOn) {
        var extension;
        if (typeof addOn == 'function') {
            var key = addOn.name;
            extension = {
                key: addOn
            };
        } else {
           addOn = (require("./extensions.js").bind(self))(addOn);
        }
	
        _.mixin(self, addOn);

    };

    this.score = require('./scoring.js').bind(this);

    _.each(arguments,this.extend);
};

module.exports = Profile;
