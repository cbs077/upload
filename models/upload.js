
var mongoose    = require('mongoose');

var Schema = mongoose.Schema;

var uploadfile = new Schema({
    filekeyword: String,  // 키워드
    filedate: String,     // 날짜
    title: String,    // 전체 이름 
    downloadfile: { type: Boolean, default: false  }, // 다운로드 했나
    UploadFlag : { type: Boolean, default: false  },  // 업로드 했나
    date: String,    
    thumbnailpath: String,
    published_date: { type: Date, default: Date.now  },
});

module.exports = mongoose.model('uploadfile', uploadfile);
