const imageToSlices = require('image-to-slices');

//slicer

function slicepic(){

    var dateOffset = 1
    var today = new Date();
    var dd = String(today.getDate() - dateOffset).padStart(2, '');
    var mm = String(today.getMonth() + 1).padStart(2, '0');
    var yyyy = today.getFullYear();
    today = dd + '.' + mm + '.' + yyyy;

    var lineXArray = [1000, 1000];
    var lineYArray = [541, 1022];
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
