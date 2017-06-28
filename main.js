const readline = require('readline');

var cc = require("./copyCat.js");
var un = require("./unlink.js");

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

rl.question('Which function should I run?\n 1: copyCat()\n 2: unlink()\n', function(answer){
  // TODO: Log the answer in a database
  if(answer == "1" || answer == "copyCat"){
    console.log(`Running copyCat`);
    cc.copyCat(rl);
  }else if (answer == "2" || answer == "unlink") {
    console.log(`Running unlink`);
    un.unlink(rl);
  }

});
