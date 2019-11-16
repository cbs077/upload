var request = require("request");
var fs = require("fs");
var config = require('./config/index');

var folder = config.env.path
//var folder = 'D:/공유/TV/';
function getOption( thumbnail ){
    var options = { method: 'POST',
    url: 'http://uimg.filemaru.com/main/editor/smartEditor2/photo_uploader/popup/file_uploader_html5.php',
    qs: { idx: '0', docStr: 'list_sub' },
    headers: 
    { 'postman-token': '4269fa67-15d5-5e6e-cd2a-74a5a75a0baa',
        'cache-control': 'no-cache',
        contenttype: 'multipart/form-data',
        referer: 'http://uimg.filemaru.com/main/editor/smartEditor2/photo_uploader/popup/photo_uploader2.html?targetP=list_sub',
        charset: 'utf-8',
        'content-type': 'application/x-www-form-urlencoded; charset=utf-8',
        'user-agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/77.0.3865.120 Safari/537.36',
        'file-size': '355996',
        'file-type': 'image/png',
        origin: 'http://uimg.filemaru.com',
        'file-name': 'thumbnail-at-20-seconds.png',
        'file-webkitRelativePath': '' 
        } ,
        encoding: null,
        //body: fs.createReadStream("C:/Users/cbs/Desktop/파일마루_다운로드/thumbnail-at-30-seconds.png"), 
        body: fs.createReadStream( folder+ thumbnail ), 
    }
    return options
}
function upload_image( thumbnail ){
    var options = getOption( thumbnail )

    return new Promise( function( resolve, reject){
        request(options, function (error, res, body) {
            if (error) throw new Error(error);

            var start = body.toString().indexOf('=')
            var text = body.toString().substring( start+1, body.toString().length )
            text = text.substring( 0, text.indexOf('&') )
            console.log( 'photo:', text)
            resolve( text )           
        });
    })
}
exports.upload_image = upload_image