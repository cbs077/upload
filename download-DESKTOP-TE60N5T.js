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

		driver.executeScript( "$('#sort_area > div > p.b2 > a.openMask > img').click()" )
		/*
		await driver.executeScript(function() {	
			var Titleinfo = [];		
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
				var regex = /런닝맨/.test( list )
					
				if( regex ){
					downfile = list
					filenumber = index
					
				}
				
			})
		})
		console.log('ttt')
		await download( filenumber )
		console.log('downfile', downfile )
		//check content here 
		//console.log( 'downloadFile', list )	
		*/

		
		/*
		//var Titleinfo 
		*/
	} finally {
		await driver.sleep(3000);
		await driver.quit(); 
		//await driver.quit();
	}
})()
async function download( index ){
	console.log('download', index)
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
