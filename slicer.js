const imageToSlices = require('image-to-slices');

//slicer

function slicepic(){

    var dateOffset = 2 //2 days
    var today = new Date();
    var dd = String(today.getDate() - dateOffset).padStart(2, '');
    var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
    var yyyy = today.getFullYear();
    today = dd + '.' + mm + '.' + yyyy;
    
    var lineXArray = [1000, 1000];
    var lineYArray = [60, 541];
    var source = "./schumann_archive/" + today + ".jpg";

     imageToSlices(source, lineXArray, lineYArray, {
        saveToDir: './schumann_archive/',
        clipperOptions: {
            canvas: require('canvas')
        }    
    })

    console.log('sliced')

}

slicepic()
