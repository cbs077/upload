var mergeImg = require('merge-img');
 
var folder = 'C:\Users\cbs\Desktop\파일마루 다운로드'
var file = 
[
 {src : "C:/Users/cbs/Desktop/파일마루 다운로드/thumbnail-at-60-seconds.png", offsetX: 5,offsetY: 5  },
 {src : "C:/Users/cbs/Desktop/파일마루 다운로드/thumbnail-at-60-seconds.png", offsetX: 5,offsetY: 5  },
 {src : "C:/Users/cbs/Desktop/파일마루 다운로드/thumbnail-at-50-seconds.png",	offsetX: 5, offsetY: 5 },
 {src : "C:/Users/cbs/Desktop/파일마루 다운로드/thumbnail-at-40-seconds.png", offsetX: -1935, offsetY: 500 },
 {src : "C:/Users/cbs/Desktop/파일마루 다운로드/thumbnail-at-30-seconds.png", offsetX: 5, offsetY: 500 },
 {src : "C:/Users/cbs/Desktop/파일마루 다운로드/thumbnail-at-30-seconds.png", offsetX: 5, offsetY: 500 }
]
mergeImg(file)
  .then((img) => {
    // Save image as file
    img.write('out.png', ()=> console.log('done'));
  });
