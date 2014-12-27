var assert = require('assert');
var Profile = require("../index.js");


describe('Profile',function(){
  var p = new Profile();
   p.setCandidates(["a","b","c","d"]); 
   p.vote(["a","b","c","d"]);
   p.vote(["b","c","a","d"]);
   p.vote(["b","c","d","a"]);
   p.vote(["c","d","b","a"]);
  
 describe("#data",function(){
   it("should have the correct vote aggregation data",function(){
       assert.equal(1,p.data[0].numVotes);
   });
 });

 describe("#score",function(){
  
  it('should correctly score with the borda method',function(){
     assert.deepEqual({"a":8,"b":13,"c":12,"d":7},p.score("borda"));
     });
 
  it('should correctly score with the plurlality method',function(){
     assert.deepEqual({"a":1,"b":2,"c":1,"d":0},p.score("plurality"));
     });

   it('should correctly score with the veto method',function(){
     assert.deepEqual({"a":4,"b":4,"c":4,"d":4},p.score("veto"));
     });

   it('should correctly score with the black method',function(){
     assert.deepEqual({"a":0,"b":1,"c":0,"d":0},p.score("black"));
     });

 });
});
