var fs = require('fs');
var path = require('path');

var path = function(){
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
    files.forEach(filename => {
      if(fs.lstatSync(file).isDirectory()){
        fs.readdir("./"+file, (err, files) => {
          files.forEach(filename => {
            fs.open(filename, 'r+', function(err, fd){
              if (err) throw err;

              fs.readFile(filename, function(err, data){
                fs.writeFile(dir+"/"+filename, data, function(err){
                  if (err) throw err;
                })
              })
            })
          });
        })
      }
    });
  })
}
