vote-profile
============

[![Join the chat at https://gitter.im/thirdcreed/vote-profile](https://badges.gitter.im/Join%20Chat.svg)](https://gitter.im/thirdcreed/vote-profile?utm_source=badge&utm_medium=badge&utm_campaign=pr-badge&utm_content=badge)

Voting profile for fair vote aggregation, and a collection of voting rules for deciding on it.  The default profile, can calculate any kind of positional vote, 
and is easily extensible with data structures for pairwise comparisons, approval voting, grading, and multi-stage elections.  
The project has a small but growing collection of voting rules, with a configurable elections, the goal is to make it easy to aggregate the opinions, 
in a way that reflects the preferences of the people who has them, and is otherwise unopinionated, if your interested in helping, please do! 


Install it
----------

    npm install fair-vote-profile

Use it
------

    var Profile = require('fair-vote-profile'); //require it
    var P = new Profile(); //New election
    var P2 = new Profile("condercet"); //extend

    P.setCandidates(['a','b','d','e']); //these are the candidates;
   
    P.vote(['b','a','d','e']); //vote
    P.vote([['b','a'],'e','d']); //vote with a tie
    P.vote(['e','d','a']); //incomplete vote
    P.vote(['d','b','a','e']);
    
    //your vote is stored in a profile, 
   
    P.score("borda"); // Outputs scores of each candidate, in a borda election.
    P.score("black");
    P.score("condorcet");
    P.score("schulze");
    P.score("veto");
    P.score("plurality");

The profile is the interface, there will be a simple express server made available soon on a seperate repository.
    
 
Contributing Voting Rules
-------------------------

Creating a voting rule is easy, simply make a function that takes a profile as an input, and outputs an object, with the names of the alternatives as keys, and the score of that candidate as values, the profile has a few helper methods: profile.each takes a visitFunction and runs that function on each group of similiar ballots. (e.g. for an object that looks like this {ordering:["a","b","c"],numVotes:33}) look in the folder "methods" for examples.

Contributing Extensions
-----------------------
Some rules require additional information about voters preferences, look at extensions, for some of examples of such additions, remember to add the name of methods into the beginning of the index.js profile initialized as _.noop, I will be creating a better encapsulated plugin system soon, for now be sure to call your method from the profile's vote method.


