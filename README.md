vote-profile
============

Voting profile for fair vote aggregation. 

    npm install fair-vote-profile //install it.

    var Profile = require('fair-vote-profile'); //require it
    var P = new Profile(); //New election
   
    P.setCandidates(['a','b','d','e']); //these are the candidates;
   
    P.vote(['b,'a','d','e']); //vote
    P.vote(['b,'a','e','d']);
    P.vote(['e,'d','a','b']);
    P.vote(['d,'b','a','e']);
    
    //your vote is stored in a profile, 
   
   
   


