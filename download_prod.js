//웹드라이버초기화
const webdriver = require('selenium-webdriver');
require('date-utils')
const _ = require('underscore');
const By = webdriver.By;
//사용할 브라우저드라이버초기화
const chrome = require('selenium-webdriver/chrome');
var path = require('chromedriver').path;
var cheerio = require('cheerio')
var cron = require('node-cron');
var testFolder = 'D:/공유/TV';
var fs = require('fs');

var service = new chrome.ServiceBuilder(path).build();
//chrome.setDefaultService(service);
//드라이버초기화
const driver = new webdriver.Builder().forBrowser('chrome').build();
//드라이버사용
const url = "http://www.filemaru.com/?doc=list_sub&cate=MED";
//const url = "https://coinpan.com/index.php?mid=free&search_target=title_content";
//	 const url = "http://www.naver.com";
var exec = require('child_process').exec;		 

var TitleinfoArray ;	
var downfile  
var filenumber

var newDate = new Date();

var time = newDate.toFormat('YYMMDD');
 

var programInfo = [{ 'title' : '백종원' },{ 'title' : '어서와' }]
driver.get(url);
driver.executeScript("loginBtn_layer();");
driver.sleep(1000);
driver.executeScript("$('[name=email]').val('choi077@naver.com')");
driver.executeScript("$('[name=pass').val('hero6183')");		

driver.sleep(1000);	
				
driver.executeScript("loginChk();return;");
var Titleinfo1 ;
//강식당
driver.sleep(1000);
var programList = [
	{ 'title' :'혼자 산다', 'date' : '5' },
	{ 'title' :'텔레비전', 'date' : '5' },
	{ 'title' : '강식당', 'date' : '5' },
	{ 'title' : '안녕하세요', 'date' : '1' },
	{ 'title' : '미운 우리', 'date' : '1' },
	{ 'title' : '비디오 스타', 'date' : '2' },
	{ 'title' : '아이돌룸', 'date' : '2' },
	{ 'title' : '취존생활', 'date' : '2' },
	{ 'title' : '아내의맛', 'date' : '2' },
	{ 'title' : '주간 아이돌', 'date' : '3' },
	{ 'title' : '백종원의', 'date' : '3' },
	{ 'title' : '라디오스타', 'date' : '3' },	
	{ 'title' : '비디오 스타', 'date' : '3' },
	{ 'title' : 'test', 'date' : '3' },
	{ 'title' : '어서와 한국은', 'date' : '4' },
	{ 'title' : '해피투게더', 'date' : '4' },
	{ 'title' : '아는 형님', 'date' : '6' },
	{ 'title' : '그것이', 'date' : '6' },
	{ 'title' : '호구들', 'date' : '6' },
	{ 'title' : '정글의', 'date' : '6' },
	{ 'title' : '런닝맨', 'date' : '0' }
	
]
var filenumber 
var downloadList = []

var testflag = false
var testDay = 3
var testTime = '190626'


start()
 

async function start(){
		await exec('close_maru.ahk - 바로 가기',
			function callback(err, stdout, stderr){
			if (err){
			  console.error(err);
			}
		});	
	/*	
	exec('click_download_admin.ahk',
	  function callback(err, stdout, stderr){
		if (err){
		  console.error(err);
		}
	});	*/
	await checkDownloadfile()
	await example()
	console.log('date:', new Date( ))
	cron.schedule('*/20 * * * *', async function () {
		downloadList = []
		//close_maru		
		console.log('date:', new Date( ))
	    await checkDownloadfile()
	    await example() 
		await exec('close_maru.ahk - 바로 가기',
			function callback(err, stdout, stderr){
			if (err){
			  console.error(err);
			}
		});
	  //logger.log('info', 'running a task every minute / ' + new Date());
	}, null, true, 'Asia/Shanghai' ).start();
}



console.log('test', testflag)
async function checkDownloadfile(){
	// 1 월요일
		console.log('checkDownloadfile')
		var myDate = new Date();
		var dateOffset = (24*60*60*1000) * 1; //5 days

		var dayLabel = new Date( ).getDay()		
		if( dayLabel == 0 )
			 dayLabel1 =6
		else 
			 dayLabel1 = new Date( ).getDay() - 1 
		 
		var time = myDate.toFormat('YYMMDD');
		var time1 =  myDate.setTime(myDate.getTime() - dateOffset)
		time1 = new Date( time1 ).toFormat('YYMMDD');
		
		time  = time + '|' + time1
		///time  = time1

		console.log('checkDownloadfile', testflag, testDay)
		if( testflag == true){
			console.log('test1')
			dayLabel = testDay
			time = testTime
		}
		console.log('checkDownloadfile1', time,time1, dayLabel, dayLabel1 )
		
		_.each( programList, async function( program ){
			if( dayLabel == program.date ||  dayLabel1 == program.date){
				var result = await checkfile( program, time )
				console.log('checkDownloadfile.result:',program.title, result )
				if( result ){						
					//if( _.findWhere(downloadList, {title: result.title}) == undefined ){
						downloadList.push( program )
						console.log( 'downloadList', downloadList )
					//}
				}
				//resolve()				
			}
							
		})
	
}
async function checkfile( program, time){
	var isflag = false
	return new Promise(function (resolve, reject) {
		//console.log('checkfile.testFolder', testFolder)
		fs.readdir(testFolder, function(error, filelist){
			
			var _name = new RegExp( program.title );
			var _date = new RegExp( time );

			console.log('checkfile', _name, _date)
			_.each( filelist, function( file ){
				var regex = _name.test( file )
				if( regex ){
					regex = _date.test( file )						
					if( regex ){						
						resolve( false ) // 이름, 시간 둘다 맞으면
					}
				}				
			})	 
			resolve( true )
		})
	})
}
async function checkResultfile( title, downloadtitle) {
	// 날짜
	var regex1 = new RegExp( downloadtitle );
	var regex = regex1.test( title )
		
	if( regex ){  // 제목
		var myDate = new Date();
		var dateOffset = (24*60*60*1000) * 1; //5 days
		var time = myDate.toFormat('YYMMDD');
		var time1 =  myDate.setTime(myDate.getTime() - dateOffset)
		time1 = new Date( time1 ).toFormat('YYMMDD');
		time  = time + '|' + time1			
								
		time = new RegExp( time )
		regex = time.test( title )
		
		if( regex ){  //날짜 							
			//downfile = list
			//filenumber = index

			return true
		}
		return false
	}		
	return false
}	
async function startMain() {
	driver.get(url);
	var title = ''
	
		await driver.executeScript(  function() {	
			//for( var i = 3 ; i < 26 ; i++ ){
				title = $('#mbox > div.rbox.w884 > div > div.sbase_box > table > tbody > tr:nth-child(3) > td.tit > a > span > span').html()
				console.log('startMain',  title)
			//}
			return 'title'
		}).then(  function(title) {
			console.log('startMain1',  title)		
			_.each( downloadList ,  function( file ){
				
				var downloadflag = checkResultfile( title,  file.title) 	
						
				if( downloadflag ){					
						//await download( i ) 		
				}					
				
			})
		})
	//}	
	
}

async function example() {
	try {
		// 
		driver.get(url);
		var title = ''
			
		await driver.executeScript( function() {	
			var Titleinfo = [];		
			for( var i = 3 ; i < 26 ; i++ ){
				title = $('#mbox > div.rbox.w884 > div > div.sbase_box > table > tbody > tr:nth-child('+ i +') > td.tit > a > span > span').text()
				Titleinfo.push(title)				
			}
			return Titleinfo
		}).then( function(innerHTML) {
			TitleinfoArray = innerHTML
			console.log("innerHTML", innerHTML) 		
			
			_.each( TitleinfoArray , async function(list, index){
				_.each( downloadList , async function( file ){
					title = new RegExp( file.title );
					var regex = title.test( list )					
		
					//console.log('example.title', list, file.title , regex)
					if( regex ){   // 제목
						var myDate = new Date();
						var dateOffset = (24*60*60*1000) * 1; //5 days
						var time = myDate.toFormat('YYMMDD');
						var time1 =  myDate.setTime(myDate.getTime() - dateOffset)
						time1 = new Date( time1 ).toFormat('YYMMDD');
						time  = time + '|' + time1				
									
						time = new RegExp( time )
						regex = time.test( list )
						
						//console.log('example.title', list, time , regex)
						if( regex ){   // 시간
							console.log('example.title', list, index )
							downfile = list
							filenumber = index		
							return
							
							console.log('result', result )
						}
					}					
				})							
			})
		})
		console.log('example()')	
		var result = download( filenumber, downfile  )
			
		//console.log('downfile', downfile )
		//check content here 
	} finally {
		//await driver.sleep(3000);
		//await driver.quit(); 
		//await driver.quit();
	}
}

/*
async function ignoreAlert(driver) {
  // detect and accept any alert
  console.log('ttt12')
  driver.switchTo().alert().then(function() {
	  console.log('ttt1')
    driver.switchTo().alert().accept();}, 
    function(){});
}
*/
async function download( index, title  ){
	//return new Promise( async function (resolve, reject) {
		console.log('download', index  )
		if( index == undefined ) return 
		
		index = index + 3
		//var downloadname = "var title = ; console.log('title', title )"
		var file = "$('#mbox > div.rbox.w884 > div > div.sbase_box > table > tbody > tr:nth-child("+ index +") > td.tit > a > span > span').click()"
		//driver.executeScript( downloadname )
		driver.executeScript(  function( [index] ) {					
				return $('#mbox > div.rbox.w884 > div > div.sbase_box > table > tbody > tr:nth-child('+ index +') > td.tit > a > span > span').text()
		}, [index] ).then( function(result) {
			console.log('result.download', result )
		})
		//console.log('download1', downloadname )
		await driver.sleep(500);
		driver.executeScript( file )
		await driver.sleep(1500);
		
		await driver.executeScript("fileDownload();")
		console.log( 'fileDownload()' )
		await driver.sleep(2000);
		driver.switchTo().alert().accept();

		await driver.sleep(13000);
		//console.log('tttt') 		
		await exec('click_download.ahk - 바로 가기',
		  function callback(err, stdout, stderr){
			if (err){
			  console.error(err);
			}
	//		resolve( true )
		});
//	})	
}
