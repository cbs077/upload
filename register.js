
var uploadfile = require('./models/upload');
//const webdriver = require('selenium-webdriver');
//const driver = new webdriver.Builder().forBrowser('chrome').build();
var mongoose    = require('mongoose');
var exec = require('child_process').exec;	

async function getuploadcontent( ){
	return new Promise( function( resolve, rejecj ){
		uploadfile.find({ 'UploadFlag' : false }).sort({ published_date : -1}).exec( function(err, uploadfile ){
			if(err) return console.error(err);
			//console.dir(book);
			resolve( uploadfile[0] )
			//console.log('uploadfile', uploadfile[0])
		});
		//uploadtitle = ''
	})
}
exports.getuploadcontent = getuploadcontent

async function registerDetail( driver, content){
	console.log("registerDetail", content)

	await driver.sleep(2000);
	await driver.executeScript( "mmsv_Upload_Insert('file','choi077@naver.com')" )			
	
	await driver.sleep(3000);	
	await driver.switchTo().alert().accept();
	
	var command = 'registerFile.ahk "[런닝맨].E463.190811.HDTV.H264-720p.mp4"'
	await exec( command,
	  function callback(err, stdout, stderr){
		if (err){
		  console.error(err);
		}
	});
	

	await driver.executeScript( "itemListToggle()" ) 	
	await driver.sleep(500);	
	await driver.executeScript( "$('.c_item_box > p:nth-child(2)').click()" ) 	
	await driver.executeScript( "itemResult('submit')" ) 
	await driver.switchTo().alert().accept();
	await driver.executeScript( "itemListToggle()" ) 	
	
	var title = "$('#title').val(" + content + "')"
	await driver.executeScript( title ) 	
}
exports.registerDetail = registerDetail

async function upload( driver, index ){	
	
	
}


/*
//웹드라이버초기화
const webdriver = require('selenium-webdriver');
require('date-utils')
const _ = require('underscore');
const By = webdriver.By;
//사용할 브라우저드라이버초기화
const chrome = require('selenium-webdriver/chrome');
var path = require('chromedriver').path;
var cheerio = require('cheerio')
//v/ar webdriver.common.keys import Keys

var service = new chrome.ServiceBuilder(path).build();
chrome.setDefaultService(service);
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
//var dayLabel = newDate.getDay()
//console.log('time', time, dayLabel )
//var programInfo = [ {'title' : '런닝맨', 'day' : 0 } ]

//		 driver.findElement(webdriver.By.xpath('//*[@id="loginBtn"]/img')).send_keys(Keys.ENTER)
(async function example() {
	try {
		await driver.get(url);
		await driver.executeScript("loginBtn_layer();");
		await driver.sleep(1000);
		await driver.executeScript("$('[name=email]').val('choi077@naver.com')");
		await driver.executeScript("$('[name=pass').val('hero6183')");		
		//await driver.executeScript("$('[name=searchVal').val('hero6183');return;");	
		await driver.sleep(1000);
		//console.log( loginbtn )
		//driver.executeScript("$('[name=pass').val('hero6183')");			
						
		await driver.executeScript("loginChk();return;");
		var Titleinfo1 ;
		console.log('test')
		await driver.sleep(1000);
		driver.executeScript( "$('#sort_area > div > p.b2 > a.openMask').click()" )
		
		await driver.sleep(1000);
		driver.executeScript( "mmsv_Upload_Insert('file','choi077@naver.com')" )
				
		await driver.sleep(1000);	
		await upload()		
		
		await driver.sleep(5000);			
		driver.executeScript( "$('#title').val('text')" ) 
		//driver.switchTo().alert().accept();		
		//driver.findElement(By.id("Value")).sendKeys(Keys.RETURN)
		//await ignoreAlert( driver )
		console.log('test3')
		
	
	} finally {
		await driver.sleep(10000);
		await driver.quit(); 
		//await driver.quit();
	}
})()
async function upload( index ){	
	driver.switchTo().alert().accept();
	
	var command = 'registerFile.ahk "아이돌룸.E62.(오마이걸).190806.720p-K.mp4"'
	await exec( command,
	  function callback(err, stdout, stderr){
		if (err){
		  console.error(err);
		}
	});
	
}
*/