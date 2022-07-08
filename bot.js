const fs = require('fs');
const http = require('http')
const { spawn } = require('child_process');


var dateOffset = 2 //2 days
var today = new Date();
var dd = String(today.getDate() - dateOffset).padStart(2, '');
var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
var yyyy = today.getFullYear();
today = dd + '.' + mm + '.' + yyyy;

var schedule = require('node-schedule');

var rulesDownload = new schedule.RecurrenceRule();
rulesDownload.dayOfWeek = [0,1,2,3,4,5,6];
rulesDownload.hour = [7];
rulesDownload.minute = [0];
rulesDownload.second = [0];


schedule.scheduleJob(rulesDownload, function(){
    dlpic()
});

var rulesSpawn = new schedule.RecurrenceRule();
rulesSpawn.dayOfWeek = [0,1,2,3,4,5,6];
rulesSpawn.hour = [7];
rulesSpawn.minute = [5];
rulesSpawn.second = [0];


schedule.scheduleJob(rulesSpawn, function(){
    spawn(process.argv[0], ['slicer.js'], {
        detached: true
      });
});

var rulesrename = new schedule.RecurrenceRule();
rulesrename.dayOfWeek = [0,1,2,3,4,5,6];
rulesrename.hour = [7];
rulesrename.minute = [10];
rulesrename.second = [0];


schedule.scheduleJob(rulesrename, function(){
    rename()
});



//dl picture 

function dlpic(){

    var request = http.get("http://sosrff.tsu.ru/new/shm.jpg",  function(response) {
        if (response.statusCode === 200) {
            var file =  fs.createWriteStream("./schumann_archive/" + today + ".jpg");
             response.pipe(file)
        }
    });
    console.log('downloaded')
}

//delete and rename

function rename(){

    fs.unlink('./schumann_archive/section-1.jpg', function (err) {
    });
    fs.unlink('./schumann_archive/section-3.jpg', function (err) {
     });
    fs.unlink('./schumann_archive/section-4.jpg', function (err) {
    });

    fs.rename('./schumann_archive/section-2.jpg','./schumann_archive_singlulardays/' + today + '.jpg', function (err) {
        if (err) throw err;
        console.log('File Renamed.');
    });


console.log('renamed')

}




