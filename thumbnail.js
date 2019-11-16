var ffmpeg = require('fluent-ffmpeg');
var mongoose    = require('mongoose');
var fs    = require('fs');
//var uploadfile = require('./models/upload');
var uploadfile = require('./lib/upload');
var uploadPhoto = require('./upload_image');
var mergeImg = require('merge-img');
var config = require('./config/index');
var util = require('./lib/util');

var db = mongoose.connection;

db.on('error', console.error);
db.once('open', function(){
    // CONNECTED TO MONGODB SERVER
    console.log("Connected to mongod server");
});

mongoose.connect('mongodb://210.217.57.151/upload');
//var folder = "C:/Users/cbs/Desktop/파일마루_다운로드/"
//var folder = 'D:/공유/TV/';
var folder = config.env.path
console.log("folder", folder)
var Schema = mongoose.Schema;

function makeThumbnail( title ){
	console.log('folder + title', folder + title)
  return new Promise( function( reslove, reject ){
    ffmpeg( folder + title )
    .on('end', function(files) {
      console.log('screenshots were saved as ' + files);
      reslove()
    })
    .on('error', function(err) {
      console.log('an error happened: ' + err.message);
      reject()
    })
    .screenshots({
      timestamps: [20, 40, 50, 60 ,70 ],
      filename: 'thumbnail-at-%s-seconds.png',
      folder: folder,
      size: '640x480'
    });
  })
}
function getfolder(  ){
  return new Promise( function( reslove, reject){
    fs.readdir( folder, function(err, items) {
        //console.log(items);
    
        //for (var i=0; i<items.length; i++) {
        //    console.log(items[i]);            
        // }
        reslove( items )
    });
  })
}
function mergeImage( title ){
  
  
  //var folder = "C:\Users\cbs\Desktop\파일마루 다운로드"
  var file = 
  [
    {src : folder + "thumbnail-at-20-seconds.png", offsetX: 5,offsetY: 5  },
    //{src : folder + "C:\Users\cbs\Desktop\파일마루 다운로드\thumbnail-at-60-seconds.png", offsetX: 5,offsetY: 5  },
    {src : folder + "thumbnail-at-40-seconds.png", offsetX: 5, offsetY: 5 },
    {src : folder + "thumbnail-at-60-seconds.png", offsetX: -1285, offsetY: 500 },
    {src : folder + "thumbnail-at-70-seconds.png", offsetX: 5, offsetY: 500 },
    //{src : folder + "thumbnail-at-30-seconds.png", offsetX: 5, offsetY: 500 }
  ]
  mergeImg(file)
  .then((img) => {
    // Save image as file
    img.write( folder + title + ".png", ()=> console.log('done'));
  });
}
var thumbnailTemp=
[
  "thumbnail-at-20-seconds.png",
  "thumbnail-at-40-seconds.png",
  "thumbnail-at-60-seconds.png",
  "thumbnail-at-70-seconds.png"
]
async function start (){
  var downloadedFile = await getfolder()
   
  var recentFile = await uploadfile.getRecentFile({ thumbnailflag : false })
  if( recentFile.length == 0 ) return 

  var regex = { keyword : recentFile[0].filekeyword, date: recentFile[0].filedate  }
  console.log('downloadedFile', downloadedFile)
  var title =  util.checkVaildFilebytitle( downloadedFile, regex )
  //console.log('aa', recentFile )
  console.log('recentFile', recentFile[0].title, title, regex )

  //실제 파일이름 등록
  await uploadfile.SetUpload( recentFile[0].title, { realfile: title } )
  await makeThumbnail( title )
  //await completeThumbnail( recentFile[0].title )
  //console.log('recentFile', recentFile[0].title )
  //await mergeImage( title )  

  //이미지 업로드 
  var thumbnailArr = []
  for( var i= 0 ; i < thumbnailTemp.length ; i++ ){
    var ResPhotoAddr = await uploadPhoto.upload_image( thumbnailTemp[i])    
    thumbnailArr.push( ResPhotoAddr )
  }
  console.log("thumbnailArr", thumbnailArr)
  await uploadfile.completeThumbnail( recentFile[0].title, thumbnailArr  )

}
exports.start=start

start()
