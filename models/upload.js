
var mongoose    = require('mongoose');

var Schema = mongoose.Schema;

var uploadfile = new Schema({
    filekeyword: String,  // 키워드
    filedate: String,     // 날짜
    title: String,    // 전체 이름 
    downloadfile: { type: Boolean, default: false  }, // 다운로드 했나
    UploadFlag : { type: Boolean, default: false  },  // 업로드 했나
    //date: String,    
    fulldate: Date,
    thumbnailPath: Array,
    published_date: { type: Date, default: Date.now  },
    thumbnailflag: { type: Boolean, default: false  }, // 썸네일 존재 유무
    realfile: String, // 실제  파일 위치
});

module.exports = mongoose.model('uploadfile', uploadfile);
