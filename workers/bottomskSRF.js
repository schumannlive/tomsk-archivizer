const fs = require('fs');
const http = require('http')
const { spawn } = require('child_process');
const dateOffset = 1
const schedule = require('node-schedule');
const config = require('../config.json')
const sharp = require('sharp');

console.log('SRF worker started')

var rulesDownload = new schedule.RecurrenceRule();
rulesDownload.dayOfWeek = [0,1,2,3,4,5,6];
rulesDownload.hour = (config.archivizer.hour)
rulesDownload.minute = (config.archivizer.minute1);
rulesDownload.second = [0];


schedule.scheduleJob(rulesDownload, function(){
    dlpic()
});

var rulesSpawn = new schedule.RecurrenceRule();
rulesSpawn.dayOfWeek = [0,1,2,3,4,5,6];
rulesSpawn.hour = (config.archivizer.hour)
rulesSpawn.minute = (config.archivizer.minute2);
rulesSpawn.second = [0];


schedule.scheduleJob(rulesSpawn, function(){

    var today = new Date();
    var dd = String(today.getDate() - dateOffset).padStart(2, '');
    var mm = String(today.getMonth() + 1).padStart(2, '0'); 
    var yyyy = today.getFullYear();
    today = dd + '.' + mm + '.' + yyyy;

    const ls = spawn(process.argv[0], ['./workers/slicerSRF.js'], {
        detached: true
      });

    ls

    console.log('SRF ' + today + ' sliced')

});

var rulesrename = new schedule.RecurrenceRule();
rulesrename.dayOfWeek = [0,1,2,3,4,5,6];
rulesrename.hour = (config.archivizer.hour)
rulesrename.minute = (config.archivizer.minute3);
rulesSpawn.second = [0];


schedule.scheduleJob(rulesrename, function(){
    rename()
});

var rulesresize = new schedule.RecurrenceRule();
rulesresize.dayOfWeek = [0,1,2,3,4,5,6];
rulesresize.hour = (config.archivizer.hour)
rulesresize.minute = (config.archivizer.minute4);
rulesresize.second = [0];


schedule.scheduleJob(rulesresize, function(){
    resize()
});



//dl picture and call slicer

function dlpic(){

    var today = new Date();
    var dd = String(today.getDate() - dateOffset).padStart(2, '');
    var mm = String(today.getMonth() + 1).padStart(2, '0'); 
    var yyyy = today.getFullYear();
    today = dd + '.' + mm + '.' + yyyy;

    var request = http.get("http://sosrff.tsu.ru/new/srf.jpg",  function(response) {
        if (response.statusCode === 200) {
            var file =  fs.createWriteStream("./schumann_archive_SRF/" + today + ".jpg");
             response.pipe(file).on('finish', () => {
                console.log('SRF ' + today + ' downloaded')
              });
        }
    });
   
}

//delete and rename

function rename(){

    var today = new Date();
    var dd = String(today.getDate() - dateOffset).padStart(2, '');
    var mm = String(today.getMonth() + 1).padStart(2, '0'); 
    var yyyy = today.getFullYear();
    today = dd + '.' + mm + '.' + yyyy;

    fs.unlink('./schumann_archive_SRF/section-1.jpg', function (err) {
    });
    fs.unlink('./schumann_archive_SRF/section-3.jpg', function (err) {
     });
    fs.unlink('./schumann_archive_SRF/section-4.jpg', function (err) {
    });
    fs.unlink('./schumann_archive_SRF/section-5.jpg', function (err) {
    });

    fs.rename('./schumann_archive_SRF/section-2.jpg','./schumann_archive_singulardays_SRF/' + today + '.jpg', function (err) {
        if (err) throw err;
        else console.log('SRF ' + today + ' deleted and renamed');
    });

}

function resize(){

var today = new Date();
var dd = String(today.getDate() - dateOffset).padStart(2, '');
var mm = String(today.getMonth() + 1).padStart(2, '0'); 
var yyyy = today.getFullYear();
today = dd + '.' + mm + '.' + yyyy;

let inputFile  = './schumann_archive_singulardays_SRF/' + today + '.jpg';
let outputFile = './schumann_archive_singulardays_SRF/' + today + '_stretched.jpg';

sharp(inputFile).resize({ height: 340, width: 481, fit: 'fill'}).toFile(outputFile)
    .then(function(newFileInfo) {
        console.log('SRF ' + today + " resized");
    })
    .catch(function(err) {
        console.log("Error occured");
    });

}




