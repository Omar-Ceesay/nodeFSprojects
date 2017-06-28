var fs = require('fs');
var path = require('path');

fs.readdir("./", (err, files) => {
  var d = new Date();
  year = d.getFullYear();
  day = d.getDate();
  month = d.getMonth() + 1;
  hour = d.getHours();
  min = d.getMinutes();
  sec = d.getSeconds();
  fin = year+"-"+month+"-"+day+"T"+hour+"."+min+"."+sec;
  var dir = __dirname+'/backup'+fin;
  fs.mkdirSync(dir, 0766);
  files.forEach(file => {
    fs.mkdir(dir, 0766, function(err){
      if(fs.lstatSync(file).isDirectory()){
        fs.readdir("./"+file, (err, files) => {
          files.forEach(file2 => {
            console.log(file);
            fs.mkdir(dir+"/"+file, 0766, function(err){
              if(fs.lstatSync("./"+file+"/"+file2).isDirectory()){
                console.log("Sorry can't go more then one dir");
              }else{
                fs.open("./"+file+"/"+file2, 'r+', function(err, fd){
                  if (err) throw err;

                  fs.readFile("./"+file+"/"+file2, function(err, data){
                    fs.writeFile(dir+"/"+file+"/"+file2, data, function(err){
                      if (err) throw err;
                    })
                  })
                })
              }

            });
          });
        })
      }else{
        fs.open(file, 'r+', function(err, fd){
          if (err) throw err;

          fs.readFile(file, function(err, data){
            fs.writeFile(dir+"/"+file, data, function(err){
              if (err) throw err;
            })
          })
        })
      }

    });
  });
})
console.log(__dirname);
