var ffmpeg = require('fluent-ffmpeg');
var mongoose    = require('mongoose');
var uploadfile = require('./models/upload');
var db = mongoose.connection;

db.on('error', console.error);
db.once('open', function(){
    // CONNECTED TO MONGODB SERVER
    console.log("Connected to mongod server");
});

mongoose.connect('mongodb://210.217.57.151/upload');

var Schema = mongoose.Schema;

function getRecentFile(){
  return new Promise( function( reslove, reject ){
    uploadfile.find({ }).sort({published_date : -1 }).limit(1).then( function( res ){
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
    ffmpeg("C:/Users/cbs/Desktop/파일마루_다운로드/" + title + ".mp4")
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
      folder: 'C:/Users/cbs/Desktop/파일마루_다운로드',
      size: '640x480'
    });
  })
}
async function start (){
  var recentFile = await getRecentFile()
  await makeThumbnail( recentFile[0].title )
  await completeThumbnail( recentFile[0].title )
  console.log('recentFile', recentFile )

}

start()