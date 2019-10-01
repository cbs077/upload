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
var testFolder = 'E:\꿩';
var fs = require('fs');

var service = new chrome.ServiceBuilder(path).build();
//chrome.setDefaultService(service);
//드라이버초기화
const driver = new webdriver.Builder().forBrowser('chrome').build();
//드라이버사용
const url = "http://www.filemaru.com/?doc=list_sub&cate=MED";
	 
var exec = require('child_process').exec;		 

var TitleinfoArray ;	
var downfile  

var newDate = new Date();

var time = newDate.toFormat('YYMMDD');
var filenumber 

var programInfo = [{ 'title' : '백종원' },{ 'title' : '어서와' }]
driver.get(url);
driver.executeScript("loginBtn_layer();");
driver.sleep(1000);
driver.executeScript("$('[name=email]').val('choi077@naver.com')");
driver.executeScript("$('[name=pass').val('hero6183')");		

driver.sleep(1000);	
				
driver.executeScript("loginChk();return;");
var Titleinfo1 ;

driver.sleep(1000);
var programList = [
	{ 'title' :'혼자 산다', 'date' : '5' },
	{ 'title' :'텔레비전', 'date' : '5' },
	{ 'title' : '안녕하세요', 'date' : '1' },
	{ 'title' : '비디오 스타', 'date' : '2' },
	{ 'title' : '아이돌룸', 'date' : '2' }
	
]
start()
checkDownloadfile()
example() 

async function start(){
	cron.schedule('*/3 * * * *', async function () {
	    await checkDownloadfile()
	    await example() 
	  //logger.log('info', 'running a task every minute / ' + new Date());
	}).start();
}

var filenumber 
var downloadList = []



async function checkDownloadfile(){
	// 1 월요일
	 
		var dayLabel = newDate.getDay()
		dayLabel = 2
		var time = newDate.toFormat('YYMMDD');
		time = '190618'
		
		console.log('time', time, dayLabel )
		_.each( programList, async function( program ){
			if( dayLabel == program.date ){
				var result = await checkfile( program, time )
				if( result ){			
					downloadList.push( program )
					console.log( 'downloadList', downloadList )
				}
				//resolve()
				console.log('result', result )
			}
							
		})
	
}
async function checkfile( program, time){
	var isflag = false
	return new Promise(function (resolve, reject) {
 
		fs.readdir(testFolder, function(error, filelist){
			console.log('checkfile', filelist);
			var _name = new RegExp( program.title );
			var _date = new RegExp( time );
			
			_.each( filelist, function( file ){
				var regex = _name.test( file )
				if( regex ){
					regex = _date.test( file )	
					if( regex ){
						console.log( 'checkfile1')
						resolve( false )
						return false
					}
				}
				
			})	 
			resolve( true )
			
			//console.log( 'checkfile')
			return true
		})
	})
}
 
async function example() {
	try {
		// 
		await driver.executeScript(function() {	
			var Titleinfo = [];		
			console.log('test3')
			for( var i = 1 ; i < 26 ; i++ ){
				console.log('test1')
		
				//var title = $('#mbox > div.rbox.w884 > div > div.sbase_box > table > tbody > tr:nth-child('+ i +') > td.tit > a > span').attr('tooltip')
				var title = $('#mbox > div.rbox.w884 > div > div.sbase_box > table > tbody > tr:nth-child('+ i +') > td.tit > a > span > span').text()
				Titleinfo.push(title)					
			}
			return Titleinfo
		}).then(function(innerHTML) {
			TitleinfoArray = innerHTML
			console.log("innerHTML", innerHTML) 		
			
			_.each( TitleinfoArray , function(list, index){
				_.each( downloadList , function( file ){
					var title = new RegExp( file.title );
					var regex = title.test( list )
					
					console.log( 'regex', list ) 
						
					if( regex ){
						var time = newDate.toFormat('YYMMDD');
						time = '190618'
						time = new RegExp( time )
						regex = time.test( list )
						
						if( regex ){							
							downfile = list
							filenumber = index		
						}
					}					
				})							
			})
		})
		
		console.log('ttt')
		await download( filenumber )
		console.log('downfile', downfile )
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
async function download( index ){
	console.log('download', index)
	if( index == undefined ) return 
	
	//index = 3
	index = index + 1
	var file ="$('#mbox > div.rbox.w884 > div > div.sbase_box > table > tbody > tr:nth-child("+ index +") > td.tit > a > span > span').click()"
	//driver.executeScript("$('#best_wrap > div.left > ul > li:nth-child(3) > a').click()")
	driver.executeScript( file )
	await driver.sleep(1000);
	driver.executeScript("fileDownload();")
	await driver.sleep(2000);
	driver.switchTo().alert().accept();

	await driver.sleep(8000);
	console.log('tttt') 		
	await exec('click_download.ahk',
	  function callback(err, stdout, stderr){
		if (err){
		  console.error(err);
		}
		//stdout 응답 : { success : true/false, data : .. }
		//var result = JSON.parse(stdout);
		//if(result.success){
		//  
		//}
	});
	
}
