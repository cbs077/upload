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

var mongoose    = require('mongoose');
var uploadfile = require('./models/upload');
var register = require('./register');
var util = require('./lib/util');

var programList = require( './config/filelist.js').fileList



var testflag = false
var testDay = 3
var testTime = '190626'
var uploadtitle  = ''

var db = mongoose.connection;
db.on('error', console.error);
db.once('open', function(){
    // CONNECTED TO MONGODB SERVER
    console.log("Connected to mongod server");
});

mongoose.connect('mongodb://210.217.57.151/upload');

var Schema = mongoose.Schema;

var service = new chrome.ServiceBuilder(path).build();
//드라이버초기화
const driver = new webdriver.Builder().forBrowser('chrome').build();
//드라이버사용
const url = "http://www.filemaru.com/?doc=list_sub&cate=MED";
var exec = require('child_process').exec;		 

var TitleinfoArray ;	
//var downloadList ;  
var filenumber
var uploadList = []
var filenumber 
var downloadList = []
var newDate = new Date();

//driver.find_element_by_xpath('//*[@id="top_search_input"]').click()

var timeout = 5000

//console.log( 'abc', )

async function startUrl(){
	await driver.get(url);
	await driver.executeScript("loginBtn_layer();");
	await driver.sleep(1000);
	await driver.executeScript("$('[name=email]').val('choi077@naver.com')");
	await driver.executeScript("$('[name=pass').val('hero6183')");		
				
	await driver.executeScript("loginChk()")
	await driver.sleep(3000);	
	await driver.executeScript( "$('#sort_area > div > p.b2 > a.openMask').click()" )	

	//var content = await register.getuploadcontent()
	//await registerDetail( driver, content )

}

//driver.executeScript( "$('#sort_area > div > p.b2 > a.openMask > img').click()" )

async function openMask(){
	driver.executeScript( "$('#sort_area > div > p.b2 > a.openMask').click()" )	
	//driver.executeScript( "$('#sort_area > div > p.b2 > a:nth-child(1) > img').click()" )
}
startUrl()
startinit()
//startSchedule() 
async function startinit(){
	//await StartRegister( )	
	await checkDownloadfile()
	//await example()
	console.log('date:', new Date( ))
}
async function startSchedule(){
	await exec('close_maru.ahk - 바로 가기',
		function callback(err, stdout, stderr){
		if (err){
			console.error(err);
		}
	});	

	cron.schedule('*/20 * * * *', async function () {
		downloadList = []
		//close_maru		
		console.log('date:', new Date( ))
	    //await checkDownloadfile()
	    //await example() 
		await exec('close_maru.ahk - 바로 가기',
			function callback(err, stdout, stderr){
			if (err){
			  console.error(err);
			}
		});
		if( uploadtitle != '')  await StartRegister( uploadtitle ) 	  
	}, null, true, 'Asia/Shanghai' ).start();
}

//var file = new uploadfile({

function registerFiletoDownload( title, date ){
	var file = new uploadfile({
		filekeyword: title,
		filedate: date
	});
	  
	return new Promise( function( resolve, reject ){
		file.save().then( function(res){
			resolve(res)
		})
	})	
}

//일주일내 
function getDaytoDate( day ){
	var today = new Date( ).getDay()	
	console.log( 'getDaytoDate', today, day )
	var datoffset = day - today  
	if( datoffset < 0) datoffset = datoffset + 7

	var myDate = new Date();
	var dateOffset = (24*60*60*1000) * datoffset; //1 days

	var time = myDate.toFormat('YYMMDD');  // 오늘 날짜
	var time1 =  myDate.setTime(myDate.getTime() + dateOffset) // 하루후
	time1 = new Date( time1 ).toFormat('YYMMDD');

	return time1
}

async function checkDownloadfile(){
		_.each( programList, async function( program ){
			//console.log( program.title, getDaytoDate( program.date ) )
			//중복 확인 todo
			//await registerFiletoDownload( program.title, getDaytoDate( program.date ) )
		})
		//console.log('checkDownloadfile', testflag, testDay)
		//if( testflag == true){
		//	console.log('test1')
		//	dayLabel = testDay
		//	time = testTime
		//}
		//console.log('checkDownloadfile1', time,time1, dayLabel, dayLabel1 )
		/*
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
		*/
}
/* 제목, 날짜 : 런닝맨, 190812 */
/*
async function checkfile( program, time ){
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
}*/
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
//2일 정도 
function filetodownload(){
	//return new Promise( function( resolve, reject){
	var today = new Date( ).getDay()	
	
	var tomorrow = today + 1 
	if( tomorrow > 6) tomorrow = tomorrow - 7

	console.log( 'getDaytoDate', today, day )
		
	_.each( uploadfile, function( list ){
		if( list.date == today || list.date == tomorrow )
			downloadList.push({ 'title': list.title, 'date': list.date } )
	})

	return downloadList
}
function checkDownloadfile1(){

}
// 제목, 날짜 확인하여 다운받기
async function downloadFile() {
	try {
		// 
		driver.get(url);
		var title = ''

		var filelist = await filetodownload()
			
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
					//190925 런닝맨
					//console.log('example.title', list, file.title , regex)
					if( regex ){   // #제목
						/*var myDate = new Date();
						var dateOffset = (24*60*60*1000) * 1; //5 days
						var time = myDate.toFormat('YYMMDD');
						var time1 =  myDate.setTime(myDate.getTime() - dateOffset)
						time1 = new Date( time1 ).toFormat('YYMMDD');
						time  = time + '|' + time1		*/		
									
						time = new RegExp( time )
						regex = time.test( list )
						
						//console.log('example.title', list, time , regex)
						if( regex ){   // #시간
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
		var result = download( filenumber  )
			
		//console.log('downfile', downfile )
		//check content here 
	} finally {

		//await driver.quit();
	}
}

async function download( index, title  ){
	//return new Promise( async function (resolve, reject) {
		console.log('download', index  )
		var title1 = ''
		if( index == undefined ) return 
		
		index = index + 3
		//var downloadname = "var title = ; console.log('title', title )"
		var file = "$('#mbox > div.rbox.w884 > div > div.sbase_box > table > tbody > tr:nth-child("+ index +") > td.tit > a > span > span').click()"
		//driver.executeScript( downloadname )
		driver.executeScript(  function( [index] ) {					
				return $('#mbox > div.rbox.w884 > div > div.sbase_box > table > tbody > tr:nth-child('+ index +') > td.tit > a > span > span').text()
		}, [index] ).then( function( downloadfileName ) {
			
			// 다운로드 검증 체크
			//var downloadflag = util.checkDownloadfile( downloadfileName )
			// 다운로드 검증 체크 - mongodb 

			console.log('result.download', downloadfileName, downloadflag )
			title1 = downloadfileName
			if( downloadflag == 'false' ) return 

			var file = new uploadfile({
				title: downloadfileName,
				author: "test"
			});
			file.save(function(err, uploadfile){
				if(err) return console.error(err);
				//console.dir(book);
			});

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
			uploadfile.update({ 'title' : title1 },{ $set :{ downloadfile: true }}, function(err, uploadfile){
				if(err) return console.error(err);
				//console.dir(book);
			});

		});
}
async function StartRegister( ){

	
	
}
async function registerDetail( driver, content){
	console.log("registerDetail", content, content.title )
	await driver.sleep(10000);
	await driver.executeScript( "$('#naverEditorFrame').contents().find('.se2_photo').click()" )	
	
	let tab1, tab2
	await driver.getAllWindowHandles().then(function(windowHandles) {
		 tab1 = windowHandles[0];
		 tab2 = windowHandles[1];
		 console.log('windowHandles', windowHandles[0], windowHandles[1], windowHandles[2], windowHandles[3])
	})

	/*await driver.switchTo().window(tab1).then(() => {
		driver.getCurrentUrl().then(url => {console.log('current url: "' + url + '"');});
	});*/
	//console.log('current url11: ', document );
	await driver.switchTo().window(tab2).then( async() => {
		
		//driver.findElement(By.xpath('//*[@id="uploadInputBox"]')).click()
		
		
		//driver.executeScript( " alert( document.children[0].innerHTML )")
		//await driver.find_element_by_xpath('//*[@id="uploadInputBox"]').click()
		//
		//const until = webdriver.until;
		//driver.sleep(3000);
		//var user = driver.wait(until.elementLocated(By.id('uploadInputBox')), timeout);
		//user.click()
		//var clickFile = "document.getElementsByTagName('iframe')[0].contentWindow.document.getElementById('uploadInputBox').click()"
		//driver.executeScript ( clickFile )	

		driver.getCurrentUrl().then( (url) => {
			console.log('current url1: "' +  url + '"');
			driver.switchTo().frame(0)
			driver.findElement(By.xpath('//*[@id="uploadInputBox"]')).click()	
			
			driver.sleep(1000);
			var command = 'click_photo.ahk "C:\Users\cbs\Desktop\파일마루_다운로드" "thumbnail-at-60-seconds.png1"'
			exec( command,
				function callback(err, stdout, stderr){
					if (err){
					console.error(err);
					}
			});	
			driver.findElement(By.xpath('//*[@id="btn_confirm"]')).click()
		})
		console.log('current url2');
	});
	
	await driver.sleep(3000);
	//var clickFile = "document.getElementsByTagName('iframe')[0].contentWindow.document.getElementById('uploadInputBox').click()"
	//await driver.executeScript ( clickFile )
	//console.log( 'test' , test)
	//await driver.executeScript( "console.log( $('iframe').contentWindow.document )")
	//await driver.executeScript( "$('iframe').contentWindow.document.getElementById('uploadInputBox').click()")

	return 
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
	
	var title = "$('#title').val('" + content.title + "')"
	await driver.executeScript( title ) 

	await driver.executeScript( "itemListToggle()" ) 	
	await driver.sleep(500);	
	await driver.executeScript( "$('.c_item_box > p:nth-child(2)').click()" ) 	
	await driver.executeScript( "itemResult('submit')" ) 
	await driver.executeScript( "$('#se2_tool > div > ul.se2_multy > li > button').click()" ) 
	
	await driver.switchTo().alert().accept();
	
		
}


