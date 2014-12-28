vote-profile
============

Voting profile for fair vote aggregation. 

Install it:

    npm install fair-vote-profile

Use it:

    var Profile = require('fair-vote-profile'); //require it
    var P = new Profile(); //New election
   
    P.setCandidates(['a','b','d','e']); //these are the candidates;
   
    P.vote(['b,'a','d','e']); //vote
    P.vote([['b,'a'],'e','d']); //vote with a tie
    P.vote(['e,'d','a']); //incomplete vote
    P.vote(['d,'b','a','e']);
    
    //your vote is stored in a profile, 
   
    P.score("borda"); // Outputs scores of each candidate, in a borda election.
    

Methods are pluggable, if you need one in right away, look at scoring.js for examples, and either
include them or write your own method that takes a profile as an input, and outputs an object like this: {a:score,b:score ...}. Name it vote-method-YOURMETHOD, and npm install it.
    
   


