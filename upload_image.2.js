var request = require("request");

var options = { method: 'POST',
  url: 'http://uimg.filemaru.com/main/editor/smartEditor2/photo_uploader/popup/file_uploader_user.php',
  qs: { docStr: 'list_sub' },
  headers: 
   { 'postman-token': 'ec7e7ed9-81f5-f48f-791f-4c4a7e277c6a',
     cookie: 'm_grade=1; loginVer=1; mid=0719i619a7193a19f6198719b619c719j6195919e919e9191a194719i6195719a719; nick=%EC%A1%B0%ED%9D%94%EC%82%AC%EB%9E%8C; Usr=choi077%40naver.com; grade=1; credit=25%7C%7C5; adult=1; LogChk=Y; cmn_cash=30; bns_cash=550; total_cash=580; coupon=0; searchHistory=%5B%5B%227Zi87J6QIOyCsOuLpA%3D%3D%22%2C%2208.19%22%2C%22all%22%2Cnull%2C%227Zi87J6QIOyCsOuLpA%3D%3D%22%5D%2C%5B%2264KY7Zi87J6Q%22%2C%2208.15%22%2C%22all%22%2Cnull%2C%2264KY7Zi87J6Q%22%5D%2C%5B%227JWE64qU%22%2C%2208.15%22%2C%22all%22%2Cnull%2C%227JWE64qU%22%5D%5D',
     'accept-language': 'ko-KR,ko;q=0.9,en-US;q=0.8,en;q=0.7',
     'accept-encoding': 'gzip, deflate',
     referer: 'http://uimg.filemaru.com/main/editor/smartEditor2/photo_uploader/popup/photo_uploader2.html?targetP=list_sub',
     accept: 'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3',
     'user-agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/76.0.3809.100 Safari/537.36',
     'content-type': 'multipart/form-data; boundary=----WebKitFormBoundaryZqDypP37WDt0CBNR',
     'upgrade-insecure-requests': '1',
     origin: 'http://uimg.filemaru.com',
     'cache-control': 'no-cache',
     'content-length': '334079',
     connection: 'keep-alive' } };

request(options, function (error, response, body) {
  if (error) throw new Error(error);

  console.log(body, response);
});
