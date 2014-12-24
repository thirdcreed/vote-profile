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
    P.vote(['b,'a','e','d']);
    P.vote(['e,'d','a','b']);
    P.vote(['d,'b','a','e']);
    
    //your vote is stored in a profile, 
   
    P.score("borda"); // Outputs scores of each candidate, in a borda election.
    

There is extremely minimal coverage for voting methods right now, until I have settled on A data structure, for
the voting profile.  Methods are pluggable, if you need one in right away, look at scoring.js for examples, and either
include them or write your own method that takes a profile as an input, and outputs an object like this: {a:score,b:score ...}
name it vote-method-YOURMETHOD, and npm install it. Currently I'm working on condercet-method, and it's variants.
    
   


