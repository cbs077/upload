var fs = require('fs')
var request = require('request')
var url = 'http://uimg.filemaru.com/main/editor/smartEditor2/photo_uploader/popup/file_uploader_user.php?docStr=list_sub'

const formData = {

  file : fs.createReadStream('런닝맨.E451.190512.세종대왕 레이스.1부-2부.HDTV.H264.720p-Next.mp4.jpg'),
  // Pass multiple values /w an Array
  
};
var file = fs.createReadStream("런닝맨.E451.190512.세종대왕 레이스.1부-2부.HDTV.H264.720p-Next.mp4.jpg")

var options = { 
  method: 'POST',
  url: 'http://uimg.filemaru.com/main/editor/smartEditor2/photo_uploader/popup/file_uploader_user.php',
  qs: { docStr: 'list_sub' },
  formData: {
  	'Filedata': fs.createReadStream('런닝맨.E451.190512.세종대왕 레이스.1부-2부.HDTV.H264.720p-Next.mp4.jpg')
  },
  headers: 
   { 'postman-token': 'bbcb1351-de44-11fd-5d8e-c8d0dfd6fe54',
     cookie: 'm_grade=1; loginVer=1; mid=0719i619a7193a19f6198719b619c719j6195919e919e9191a194719i6195719a719; nick=^%^EC^%^A1^%^B0^%^ED^%^9D^%^94^%^EC^%^82^%^AC^%^EB^%^9E^%^8C; Usr=choi077^%^40naver.com; grade=1; credit=25^%^7C^%^7C5; adult=1; memo_cnt=7; LogChk=Y; searchHistory=^%^5B^%^5B^%^227J2864W4IOuqqOydjA^%^3D^%^3D^%^22^%^2C^%^2205.12^%^22^%^2C^%^22ADT^%^22^%^2Cnull^%^2C^%^227J2864W4IOuqqOydjA^%^3D^%^3D^%^22^%^5D^%^2C^%^5B^%^227J28biDrqqjsnYw^%^3D^%^22^%^2C^%^2205.12^%^22^%^2C^%^22ADT^%^22^%^2Cnull^%^2C^%^227J28biDrqqjsnYw^%^3D^%^22^%^5D^%^2C^%^5B^%^227KeIeCAg66qo7J2M^%^22^%^2C^%^2205.12^%^22^%^2C^%^22ADT^%^22^%^2Cnull^%^2C^%^227KeIeCAg66qo7J2M^%^22^%^5D^%^2C^%^5B^%^227KeIeA^%^3D^%^3D^%^22^%^2C^%^2205.12^%^22^%^2C^%^22ADT^%^22^%^2Cnull^%^2C^%^227KeIeA^%^3D^%^3D^%^22^%^5D^%^2C^%^5B^%^227J28bg^%^3D^%^3D^%^22^%^2C^%^2205.12^%^22^%^2C^%^22ADT^%^22^%^2Cnull^%^2C^%^227J28bg^%^3D^%^3D^%^22^%^5D^%^2C^%^5B^%^2266qo7J2M^%^22^%^2C^%^2205.12^%^22^%^2C^%^22ADT^%^22^%^2Cnull^%^2C^%^2266qo7J2M^%^22^%^5D^%^2C^%^5B^%^22SEpNTy00MDU^%^3D^%^22^%^2C^%^2205.12^%^22^%^2C^%^22all^%^22^%^2Cnull^%^2C^%^22SEpNTy00MDU^%^3D^%^22^%^5D^%^2C^%^5B^%^227Zi46rWs65Ok7J2Y^%^22^%^2C^%^2205.12^%^22^%^2C^%^22all^%^22^%^2Cnull^%^2C^%^227Zi46rWs65Ok7J2Y^%^22^%^5D^%^5D; cmn_cash=620; coupon=4; bns_cash=150; total_cash=770',
     'accept-language': 'ko-KR,ko;q=0.9,en-US;q=0.8,en;q=0.7',
     'accept-encoding': 'gzip, deflate',
     referer: 'http://uimg.filemaru.com/main/editor/smartEditor2/photo_uploader/popup/photo_uploader2.html?targetP=list_sub',
     accept: 'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3',
     'user-agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/74.0.3729.131 Safari/537.36',
     'content-type': 'multipart/form-data; boundary=----WebKitFormBoundarywsEESlWXuLmuU0CA',
     'upgrade-insecure-requests': '1',
     origin: 'http://uimg.filemaru.com',
     'cache-control': 'no-cache',
     //'content-length': '335760',
     connection: 'keep-alive' 
  }, 
  //	 formData: formData	
}
request.post( options, function optionalCallback(err, httpResponse, body) {
  if (err) {
    return console.error('upload failed:', err);
  }
  console.log('Upload successful!  Server responded with:', body, httpResponse);
});
