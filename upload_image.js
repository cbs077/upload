const FormData = require('form-data');
var fs = require('fs')
var request = require('request')

var url = 'http://uimg.filemaru.com/main/editor/smartEditor2/photo_uploader/popup/file_uploader_user.php?docStr=list_sub'

var form = new FormData();
form.append('Filedata', fs.createReadStream('런닝맨.E451.190512.세종대왕 레이스.1부-2부.HDTV.H264.720p-Next.mp4.jpg'));
/*
var options = {
    url: url ,
	
	 } 
   // headers: form.getHeaders()
};

form.pipe(request.post(options,function(err,res){
    if(err){
     // log.debug(err);
    }
    else {

	   console.log(res.headers)
	   console.log(res.headers['location'])
	   

      //log.debug(res);
    }
}));  
*/
const options = {
    method: "POST",
    url: url,
    //port: 443,
    headers: {
		'postman-token': 'bbcb1351-de44-11fd-5d8e-c8d0dfd6fe54',
     cookie: 'm_grade=1; loginVer=1; mid=0719i619a7193a19f6198719b619c719j6195919e919e9191a194719i6195719a719; nick=^%^EC^%^A1^%^B0^%^ED^%^9D^%^94^%^EC^%^82^%^AC^%^EB^%^9E^%^8C; Usr=choi077^%^40naver.com; grade=1; credit=25^%^7C^%^7C5; adult=1; memo_cnt=7; LogChk=Y; searchHistory=^%^5B^%^5B^%^227J2864W4IOuqqOydjA^%^3D^%^3D^%^22^%^2C^%^2205.12^%^22^%^2C^%^22ADT^%^22^%^2Cnull^%^2C^%^227J2864W4IOuqqOydjA^%^3D^%^3D^%^22^%^5D^%^2C^%^5B^%^227J28biDrqqjsnYw^%^3D^%^22^%^2C^%^2205.12^%^22^%^2C^%^22ADT^%^22^%^2Cnull^%^2C^%^227J28biDrqqjsnYw^%^3D^%^22^%^5D^%^2C^%^5B^%^227KeIeCAg66qo7J2M^%^22^%^2C^%^2205.12^%^22^%^2C^%^22ADT^%^22^%^2Cnull^%^2C^%^227KeIeCAg66qo7J2M^%^22^%^5D^%^2C^%^5B^%^227KeIeA^%^3D^%^3D^%^22^%^2C^%^2205.12^%^22^%^2C^%^22ADT^%^22^%^2Cnull^%^2C^%^227KeIeA^%^3D^%^3D^%^22^%^5D^%^2C^%^5B^%^227J28bg^%^3D^%^3D^%^22^%^2C^%^2205.12^%^22^%^2C^%^22ADT^%^22^%^2Cnull^%^2C^%^227J28bg^%^3D^%^3D^%^22^%^5D^%^2C^%^5B^%^2266qo7J2M^%^22^%^2C^%^2205.12^%^22^%^2C^%^22ADT^%^22^%^2Cnull^%^2C^%^2266qo7J2M^%^22^%^5D^%^2C^%^5B^%^22SEpNTy00MDU^%^3D^%^22^%^2C^%^2205.12^%^22^%^2C^%^22all^%^22^%^2Cnull^%^2C^%^22SEpNTy00MDU^%^3D^%^22^%^5D^%^2C^%^5B^%^227Zi46rWs65Ok7J2Y^%^22^%^2C^%^2205.12^%^22^%^2C^%^22all^%^22^%^2Cnull^%^2C^%^227Zi46rWs65Ok7J2Y^%^22^%^5D^%^5D; cmn_cash=620; coupon=4; bns_cash=150; total_cash=770',
     'accept-language': 'ko-KR,ko;q=0.9,en-US;q=0.8,en;q=0.7',
     'accept-encoding': 'gzip, deflate',
     referer: 'http://uimg.filemaru.com/main/editor/smartEditor2/photo_uploader/popup/photo_uploader2.html?targetP=list_sub',
    accept: 'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3',
	    'content-length': ' 334079',
        "Content-Type": "multipart/form-data ; boundary=----WebKitFormBoundaryxKTWXegmnkQYaCAF",
		'upgrade-insecure-requests': '1',
     origin: 'http://uimg.filemaru.com',
     'cache-control': 'no-cache',
	 connection: 'keep-alive'
    },
    formData : {
        "Filedata" : fs.createReadStream("런닝맨.E451.190512.세종대왕 레이스.1부-2부.HDTV.H264.720p-Next.mp4.jpg")
    }
};

request(options, function (err, res, body) {
    if(err) console.log(err);
    //console.log('1' , body);
	console.log('2' , res);
});

