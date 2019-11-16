var mergeImg = require('./development');
var mergeImg = require('./development');

var config
if(process.env.NODE_ENV === 'production') {
    env = {
        "path" : "D:/공유/TV/"
    }
} else {
   // We are running in development mode
   env = {
      "path" : "C:/Users/cbs/Desktop/파일마루_다운로드/"
   }
}
exports.env = env