var ffmpeg = require('fluent-ffmpeg');
var mongoose    = require('mongoose');
var uploadfile = require('./models/upload');
var mergeImg = require('merge-img');

var db = mongoose.connection;

db.on('error', console.error);
db.once('open', function(){
    // CONNECTED TO MONGODB SERVER
    console.log("Connected to mongod server");
});

mongoose.connect('mongodb://210.217.57.151/upload');
var folder = "C:/Users/cbs/Desktop/파일마루_다운로드/"
var Schema = mongoose.Schema;

function getRecentFile(){
  return new Promise( function( reslove, reject ){
    uploadfile.find({ thumbnailflag : false }).sort({published_date : -1 }).limit(1).then( function( res ){
        reslove( res )
    })
  })
}
function completeThumbnail( title ){
  console.log( 'completeThumbnail', title )
  return new Promise( function( reslove, reject ){
    uploadfile.update({ title: title },{ $set :{ 'thumbnailpath' :  title }}).then( function( res ){
      console.log( 'res', res )
      reslove( res )
    })
  })
}

function makeThumbnail( title ){
  return new Promise( function( reslove, reject ){
    ffmpeg( folder + title + ".mp4")
    .on('end', function(files) {
      console.log('screenshots were saved as ' + files);
      reslove()
    })
    .on('error', function(err) {
      console.log('an error happened: ' + err.message);
      reject()
    })
    .screenshots({
      timestamps: [30, 40, 50, 60 ,70 ],
      filename: 'thumbnail-at-%s-seconds.png',
      folder: folder,
      size: '640x480'
    });
  })
}
function mergeImage( title ){
  
  
  //var folder = "C:\Users\cbs\Desktop\파일마루 다운로드"
  var file = 
  [
    {src : folder + "thumbnail-at-60-seconds.png", offsetX: 5,offsetY: 5  },
    //{src : folder + "C:\Users\cbs\Desktop\파일마루 다운로드\thumbnail-at-60-seconds.png", offsetX: 5,offsetY: 5  },
    {src : folder + "thumbnail-at-50-seconds.png", offsetX: 5, offsetY: 5 },
    {src : folder + "thumbnail-at-40-seconds.png", offsetX: -195555 offsetY: 500 },
    {src : folder + "thumbnail-at-30-seconds.png", offsetX: 5, offsetY: 500 },
    //{src : folder + "thumbnail-at-30-seconds.png", offsetX: 5, offsetY: 500 }
  ]
  mergeImg(file)
  .then((img) => {
    // Save image as file
    img.write( folder + title + ".png", ()=> console.log('done'));
  });
}

async function start (){
  console.log('recentFile' )
  var recentFile = await getRecentFile()
  await makeThumbnail( recentFile[0].title )
  //await completeThumbnail( recentFile[0].title )
  console.log('recentFile', recentFile[0].title )
  await mergeImage( recentFile[0].title )

}

start()