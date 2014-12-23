var util = require('util');
var config = require('./config.js');
var sizeOf = require('sizeof').sizeof;
var _ = require('lodash');
var scoring = require('./scoring.js'); 

var Profile = function () {

    var Node = function () {
        this.children = {};
        this.name = 'root';
        this.numVotes = 0;
        this.rank = 0;
    };

    var _votingHasBegun = false;
    var _root = new Node();
    
    this.candidates = {};
    this.data = _root;
    this.numCandidates = function numCandidates(){
    	return Object.keys(this.candidates).length;
    };
    
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


    this.setCandidates = function setCandidates(nominees){
        candidates = this.candidates;
        
	if (!_votingHasBegun){
	nominees.forEach(function(candidate){
	    candidates[candidate] = 0;
	});
	}

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
	ordering.forEach(function(candidate){
	 if (!this.candidates[candidate]){
	      return;
	  } 
	});
	
        this._votingHasBegun = true;
        insert(_root, ordering);
    };

    this.each = function each(visitFunc){
       
        var queue = [];
        queue.unshift(this.data);
        while (queue.length){
            node = queue.pop();
	    if (node.name){
                visitFunc(node);
	    }
	    for (var child in node.children){
	        queue.unshift(node.children[child]);
	    }
        }
    };    
};



var P = new Profile();
P.setCandidates(['a','b','c','d']);
console.log(P.numCandidates());
P.vote(['a', 'b', 'c', 'd']);
P.vote(['a', 'b', 'c', 'd']);
P.vote(['a', 'b', 'd', 'c']);
P.vote(['a','b','c']);
console.log(P.find(['a', 'b', 'd', 'c']));
console.log(P.find(['a', 'b', 'c', 'd']));
console.log(P.find(['a', 'b']));

var veto = scoring("veto");
var borda = scoring("borda");
var plurality = scoring("plurality");

console.log("veto",veto(P));
console.log("borda",borda(P));
console.log("plurality",plurality(P));
