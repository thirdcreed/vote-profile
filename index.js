var util = require('util');
var config = require('./config.js');
var sizeOf = require('sizeof').sizeof;
var _ = require('lodash');
var Profile = function () {

    var Node = function () {
        this.children = {};
        this.name = 'root';
        this.numVotes = 0;
        this.rank = 0;
    };
    
    this._candidates = [];
    this._votingHasBegun = false;
    var _root = new Node();
    this.data = _root;

    function insert(node, arr) {

        node.numVotes++;

        if (arr.length) {
            var next = arr.shift();

            if (node.children[next]) {
                insert(node.children[next], arr);
            } else {
                childNode = new Node();
                childNode.name = next;
                childNode.rank = node.rank + 1;
                node.children[next] = childNode;

                insert(childNode, arr);
            }
        }
    }

    this.candidates = function candidates(nominees){
        if (!this._votingHasBegun){
        this._candidates = nominees;
	}
        

	return this._candidates.slice(0);
    };


    function query(node, arr) {
        if (arr.length) {
            var next = arr.shift();

            if (node.children[next]) {
                return query(node.children[next], arr);
            } else {
                return 0;
            }

        }

        return node.numVotes;
    }


    this.find = function find(ordering) {
	return query(_root, ordering);
    };


    this.vote = function vote(ordering) {
	if((_.difference(this._candidates,ordering)).length){
            return "ERR: you may not vote for non-candidate";	
	}
        this._votingHasBegun = true;
        insert(_root, ordering);
    };


};



var P = new Profile();

var score = require('vote-' + config.scoringMethod);
P.candidates(['a','b','c','d']);
P.vote(['a', 'b', 'c', 'd']);
P.vote(['a', 'b', 'c', 'd']);
P.vote(['a', 'b', 'd', 'c']);
console.log(P.find(['a', 'b', 'd', 'c']));
console.log(P.find(['a', 'b', 'c', 'd']));
console.log(P.find(['a', 'b']));
console.log(sizeOf(P.data,true));

score(P,function(winners){
  console.log("winners",winners);
});
