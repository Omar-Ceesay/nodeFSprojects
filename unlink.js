var exports = module.exports = {};

var fs = require('fs');
const readline = require('readline');

exports.unlink = function(rl){
  var arr = [];
  rl.question('What is the pretext of the file?\n', function(answer){
    rl.question('What is the extention of the file?\n', function(answer2){
      rl.question('How many should I delete?\n', function(num){
        for(i = 1; i < parseInt(num)+1; i++){
          var name = answer+i.toString()+answer2;
          arr.push(name);
        }
        var strikes = 0;
        for(var j = 1; j < parseInt(num)+1; j++){
          t = j - 1;
          fs.open(answer+t.toString()+answer2, 'r+', function(err, fd){
            var cur = arr.pop();
            fs.stat(cur, function(err, stat) {
              if(err == null) {
                process.stdout.write("Deleting: "+(parseInt(t)+1)+"/"+num+"\r");
                fs.unlink(cur, function(err){
                  if (err) console.log(err);
                });
                //console.log(answer+i.toString()+answer2);
              }else if(err.code == 'ENOENT') {
                console.log(`File doesn\'t exist. ${strikes}`);
                strikes += 1;
                if (strikes >= 3) {
                  console.log("3 files weren't found so unlink is going to stop.");
                  console.log(j);
                  j = parseInt(num);
                }
              }else {
                console.log('Some other error: ', err.code);
              }
            });
          });
        }
        console.log("Strikes: "+strikes);
        rl.close();
      });
    });
  });
}
