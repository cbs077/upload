var request = require("request");
var cron = require('node-cron');
var content = require('./get_content');
var moment = require('moment');
var curHour = moment().format('HH');
var date1 = moment().format('mm');
var day = moment().day();

var fileNo = ''
function getoption( fileNo ){
  var options = { method: 'POST',
    url: 'http://www.filemaru.com/proInclude/ajax/bbsItemPrc.php',
    qs: { t: '1558880154270' },
    headers: 
    { 'postman-token': '9036a59f-2287-8327-f9db-1aeb3b214463',
      'cache-control': 'no-cache',
      connection: 'keep-alive',
      cookie: 'G_ENABLED_IDPS=google; m_grade=1; loginVer=1; mid=0719i619a7193a19f6198719b619c719j6195919e919e9191a194719i6195719a719; nick=%EC%A1%B0%ED%9D%94%EC%82%AC%EB%9E%8C; Usr=choi077%40naver.com; grade=1; credit=25%7C%7C5; adult=1; memo_cnt=7; LogChk=Y; PHPSESSID=j51kqpn2bmo955esum3cl1l4f3; coupon=4; searchHistory=%5B%5B%227ZW07ZS87Yis%22%2C%2205.26%22%2C%22all%22%2Cnull%2C%227ZW07ZS87Yis%22%5D%2C%5B%227J2864W4IOuqqOydjA%3D%3D%22%2C%2205.12%22%2C%22ADT%22%2Cnull%2C%227J2864W4IOuqqOydjA%3D%3D%22%5D%2C%5B%227J28biDrqqjsnYw%3D%22%2C%2205.12%22%2C%22ADT%22%2Cnull%2C%227J28biDrqqjsnYw%3D%22%5D%2C%5B%227KeIeCAg66qo7J2M%22%2C%2205.12%22%2C%22ADT%22%2Cnull%2C%227KeIeCAg66qo7J2M%22%5D%2C%5B%227KeIeA%3D%3D%22%2C%2205.12%22%2C%22ADT%22%2Cnull%2C%227KeIeA%3D%3D%22%5D%2C%5B%227J28bg%3D%3D%22%2C%2205.12%22%2C%22ADT%22%2Cnull%2C%227J28bg%3D%3D%22%5D%2C%5B%2266qo7J2M%22%2C%2205.12%22%2C%22ADT%22%2Cnull%2C%2266qo7J2M%22%5D%2C%5B%22SEpNTy00MDU%3D%22%2C%2205.12%22%2C%22all%22%2Cnull%2C%22SEpNTy00MDU%3D%22%5D%2C%5B%227Zi46rWs65Ok7J2Y%22%2C%2205.12%22%2C%22all%22%2Cnull%2C%227Zi46rWs65Ok7J2Y%22%5D%5D; bns_cash=10; cmn_cash=320; total_cash=330; viewContents=14350388',
      referer: 'http://www.filemaru.com/?doc=mypage_sellerUpload',
      accept: '*/*',
      'content-type': 'application/x-www-form-urlencoded; charset=UTF-8',
      'user-agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/74.0.3729.169 Safari/537.36',
      'accept-language': 'ko-KR,ko;q=0.9,en-US;q=0.8,en;q=0.7',
      'accept-encoding': 'gzip, deflate',
      origin: 'http://www.filemaru.com' },
    body: '&act=top&chkvalue%5B0%5D='+ fileNo 
  };
  return options
}


var index = 3
async function startSchedule(){
  start(index)   
	cron.schedule('*/10 * * * *', async function () {		    
    //if( index > 3 )index = 0
    start(index) 
    
    //index++
	}, null, true, 'Asia/Shanghai' ).start();
}
if( Number(curHour) == 1 ) console.log('t')

async function start(index){  
  console.log('index', index )
  
  if( day == 0 || day == 6 ){
          if( Number(curHour) > 9 || Number(curHour) < 3 ){
                  var contentId = await content.getPoint()
                  console.log('contentId.id[index]', contentId.id[index])
                  //fileNo = contentId.id
                  request( getoption( contentId.id[index] ), function (error, response, body) {
                    if (error) throw new Error(error);
                  
                    console.log(body);
                  });
                  //console.log('point:',point)
                  //console.log('date', curHour, date1, 'num:',num, 'point:', point, 'result:', result )
          }
  }else{
          if( Number(curHour) > 10 || Number(curHour) < 3 ){
                  var contentId = await content.getPoint()
                  console.log('1contentId.id[index]', contentId.id[index])
                  request( getoption( contentId.id[index] ), function (error, response, body) {
                    if (error) throw new Error(error);
                  
                    console.log(body);
                  });
                  //console.log('point:',point)
                  //console.log('date', curHour, date1, 'num:',num, 'point:', point, 'result:', result )
          }
  }
}
startSchedule()