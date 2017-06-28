var exports = module.exports = {};

var fs = require('fs');
const readline = require('readline');

exports.copyCat = function(rl){
  // fs.readdir("./", (err, files) => {
  //   files.forEach(file => {
  //     console.log(file);
  //   });
  // })
  var putInDir = function(num, answer){
    file = answer;
    re = /.*(?=\.)/;
    re2 = /[^.]+$/;
    par = file.match(re);
    ex = file.match(re2);

    fs.readFile(file, function(err, data){

      for(i = 1; i < parseInt(num)+1; i++){
        j = i;
        t = num;
        process.stdout.write("Created "+j+"/"+t+"\r");
        fs.writeFileSync(par[0]+i.toString()+"."+ex, data);
      }
      console.log((i-1) + " copies were created");
      rl.close();
    })

  }
  var putInNewDir = function(num, answer){
    file = answer;
    re = /.*(?=\.)/;
    re2 = /[^.]+$/;
    par = file.match(re);
    ex = file.match(re2);
    var dir = __dirname+'/copiesOf-'+file;
    fs.mkdir(dir, 0766, function(err){
      data = fs.readFileSync(file);

      for(i = 1; i < parseInt(num)+1; i++){
        j = i;
        t = num;
        process.stdout.write("Created "+j+"/"+t+"\r");
        fs.writeFileSync(__dirname+'/copiesOf-'+file+"/"+par[0]+i.toString()+"."+ex, data);
      }
      console.log((i-1) + " copies were created");
      rl.close();

    });
  }
  rl.question('What file should I copy?\n', function(answer){
    rl.question(`How many copies of ${answer}\n`, function(num){
      if(num >= 50){
        rl.question(`That's alot of copies, should I put them in a new folder? (yes, no)\n`, function(newDir){
          if(newDir.toLowerCase() == "yes" || newDir.toLowerCase() == "ya" || newDir.toLowerCase() == "sure"){
            putInNewDir(num, answer);
          }else if(newDir.toLowerCase() == "no" || newDir.toLowerCase() == "naw" || newDir.toLowerCase() == "nope"){
            putInDir(num, answer);
          }
        });
      }else{
        putInDir(num, answer);
      }
    });
  });
};
