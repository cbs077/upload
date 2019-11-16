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
var _uploadfile = require('./lib/upload');
var register = require('./register');
var util = require('./lib/util');
var uploadLib = require('./lib/upload');
var thumbnail = require('./thumbnail');
//var uploadfile = require('./lib/upload');

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
//var filenumber
var uploadList = []
//var filenumber 
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
	await driver.sleep(5000);	
	//await driver.executeScript( "$('#sort_area > div > p.b2 > a.openMask').click()" )	

	//var content = await register.getuploadcontent()
	//

}

//driver.executeScript( "$('#sort_area > div > p.b2 > a.openMask > img').click()" )

async function openMask(){
	driver.executeScript( "$('#sort_area > div > p.b2 > a.openMask').click()" )	
	//driver.executeScript( "$('#sort_area > div > p.b2 > a:nth-child(1) > img').click()" )
} 
async function startinit(){
//시작하기
	await thumbnail.start() 
	await startUrl()
// 다운로드
//	await downloadFile() 
// 썸네일 만들기
//	await driver.sleep(40000);
//	await thumbnail.start()   
//등록하기
	await openMask() 
	var content = await register.getuploadcontent()
	if( content.length == 0) return 
	if( content[0].thumbnailPath.length ==0) return
	await registerDetail_1( driver, content[0] )
	//await registerDetail()	
	//console.log('date:', new Date( ))
}
async function startSchedule(){
	/*await exec('close_maru.ahk - 바로 가기',
		function callback(err, stdout, stderr){
		if (err){
			console.error(err);
		}
	});*/	

	cron.schedule('*/5 * * * *', async function () {	
		await thumbnail.start()   
		await openMask() 
		var content = await register.getuploadcontent()
		if( content.length == 0) return 
		if( content[0].thumbnailPath.length ==0) return
		await registerDetail_1( driver, content[0] )	
		//await downloadFile()
		//await driver.sleep(40000);
		//await thumbnail.start()

		/*
		await exec('close_maru.ahk - 바로 가기',
			function callback(err, stdout, stderr){
			if (err){
			  console.error(err);
			}
		});*/
		//if( uploadtitle != '')  await StartRegister( uploadtitle ) 	  
	}, null, true, 'Asia/Shanghai' ).start();
}

//var file = new uploadfile({

function registerFiletoDownload( title, keyword, date ){
	//var new Date( 2019, 10, 07)
	console.log('registerFiletoDownload', title, date )
	var file = new uploadfile({
		filekeyword: keyword,
		filedate: date,
		fulldate: date,
		downloadfile : true,
		title: title 
	});
	  
	return new Promise( function( resolve, reject ){
		file.save().then( function(res){
			resolve(res)
		})
	})	
}

// input : 1(월요일) , ouput : 191011
function getDaytoDate( day ){
	var today = new Date( ).getDay()	
	//console.log( 'getDaytoDate', today, day )
	var datoffset = day - today  
	//if( datoffset < 0) datoffset = datoffset - 7

	var myDate = new Date();
	var dateOffset = (24*60*60*1000) * datoffset; //1 days

	var time = myDate.toFormat('YYMMDD');  // 오늘 날짜
	var time1 =  myDate.setTime(myDate.getTime() + dateOffset) // 하루후
	time1 = new Date( time1 ).toFormat('YYMMDD');

	return time1
}
function getDownlist(){
	var today = new Date( ).getDay()	
	var downlist = []

	var yesterday = today - 1
	if( yesterday < 0) yesterday = today + 7

	_.each( programList, function( program ){
		
		if( program.date == today || program.date == yesterday  ) downlist.push( program )
	})

	return downlist
}
async function checkDownloadfile(){
		_.each( programList, async function( program ){
			//console.log( program.title, getDaytoDate( program.date ) )
			//중복 확인 todo
			await registerFiletoDownload( program.title, getDaytoDate( program.date ))
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
//-1 ~ +1일 정도 
function filetodownload(){
	var dateOffset = (24*60*60*1000) * 1; //5 days
	var myDate = new Date();
	var myDate1 = new Date();
	var time = myDate.toFormat('YYMMDD');
		time =  myDate.setTime(myDate.getTime() + dateOffset)
		time = new Date( time ).toFormat('YYMMDD');// 하루후날
	var time1 = myDate1.toFormat('YYMMDD');	
		time1 = myDate1.setTime(myDate1.getTime() - dateOffset)
		time1 = new Date( time1 ).toFormat('YYMMDD');// 하루전날

	return new Promise( function( resolve, reject){
		_uploadfile.find({ filedate: { $gte: time1 , $lte: time }}, function(err, downloadList ){
			if(err) return console.error(err);
			resolve( downloadList )
			//console.dir(book);
		});
	})

	return downloadList
}
function checkDownloadfile1(){

}
// title, keyword, date 
function checkVaildFilebytitle( title, downloadList ){
	
	//getDaytoDate
	var flag = false
	var result = { flag : false }
	_.each( downloadList , async function( file ){
		//console.log('checkVaildFilebytitle2', file.title ,getDaytoDate( file.date ), title  )		
		var regex = new RegExp( file.title );
		var validTitle = regex.test( title )	

		//190925 런닝맨
		if( validTitle ){   // #제목	검증		
			console.log('checkVaildFilebytitle', getDaytoDate( file.date ))					
			regex = new RegExp( getDaytoDate( file.date ))

			var validDate = regex.test( title )

			if( validDate ){   // #시간 검증
				//console.log( 'checkVaildFilebytitleTRue')	
				flag = true
				console.log('')
				result.result = flag
				result.keyword = file.title
				result.date = getDaytoDate( file.date )
				return	result	
			}
		}								
	})
	//console.log( 'false')
	return result
}
// 제목, 날짜 확인하여 다운받기
function checkTitleinSite( _index ){
	var index = _index
	return new Promise( function( resolve, reject){
		driver.executeScript( function( [index] ){	
			//var Titleinfo = [];		
			//console.log( 'index', i)
			return  title = $('#mbox > div.rbox.w884 > div > div.sbase_box > table > tbody > tr:nth-child('+ index +') > td.tit > a > span > span').text()
			//Titleinfo.push(title)					
		}, [index] ).then( function( title ) {
			//TitleinfoArray = innerHTML
			//console.log( 'checkTitleinSite',title  )
			resolve( title )
			return title
			//console.log("innerHTML.Title:", innerHTML) 
		})
	})
}
function checkExistFile(){
	return new Promise( function( resolve, reject){
		uploadfile.find({ filedate: { $gte: time1 , $lte: time }}, function(err, downloadList ){
			if(err) return console.error(err);
			resolve( downloadList )
			//console.dir(book);
		});
	})
}
function getFile(title, date ){
	return new Promise( function( resolve, reject){
		var result = uploadLib.FindUpload({ filekeyword: title , filedate: getDaytoDate( date ) }) 
		resolve( result )	
	})
}
function filterDownlist(downloadList){
	var downloadListOrg = getDownlist()
	var downloadList = []
	_.each( downloadListOrg, async function( list, index ){
		var result = await getFile( list.title , list.date )	
		if( result.length == 0 ) downloadList.push( list )
	})
	return downloadList
}
async function downloadFile() {
	try {
		driver.get(url);
		
		var downloadList = filterDownlist()
		console.log( 'downloadList', downloadList )			
		
		var download = {}
		for( var i = 3 ; i < 26 ; i++ ){
			// 사이트에서 타이틀만 얻어옴
			var title = await checkTitleinSite( i )
			//console.log( 'checkTitleinSite', title )
			// 하나씩 검증 및 다운로드
			var validDownload = await checkVaildFilebytitle( title, downloadList );
	
			//console.log( 'validDownload', validDownload )
			if( validDownload.result ){
				download.index = i
				download.title = title
				downloadby( download.index , title, validDownload )
				return 
			} 
			//console.log( 'valid', validDownload, title, download.index )
			//console.log( 'title', title )
		}
	    
	} finally {
		//await driver.quit();
	}
}

async function downloadby( index, title, validDownload  ){
	//return new Promise( async function (resolve, reject) {
		console.log('download!!!!!!!!!!!!!', index, title, validDownload  )
		var title1 = ''
		if( index == undefined ) return 
		
		//index = index + 3
		var file = "$('#mbox > div.rbox.w884 > div > div.sbase_box > table > tbody > tr:nth-child("+ index +") > td.tit > a > span > span').click()"
		//driver.executeScript( downloadname )
		driver.executeScript(  function( [index] ) {					
				return $('#mbox > div.rbox.w884 > div > div.sbase_box > table > tbody > tr:nth-child('+ index +') > td.tit > a > span > span').text()
		}, [index] ).then( function( downloadfileName ) {
			
			// 다운로드 검증 체크
			//var downloadflag = util.checkDownloadfile( downloadfileName )
			// 다운로드 검증 체크 - mongodb 
			var downloadflag = true
			console.log('result.download', downloadfileName, downloadflag )
			title1 = downloadfileName
			if( downloadflag == false ) return 
			

		})
		//console.log('download1', downloadname )
		await driver.sleep(500);
		driver.executeScript( file )
		await driver.sleep(1500);
		
		await  driver.executeScript("fileDownload();")
		console.log( 'fileDownload()' )
		await driver.sleep(2000);
		driver.switchTo().alert().accept();

		await driver.sleep(6000);
		//console.log('tttt') 		
		 exec('click_download.ahk - 바로 가기',
		  async function callback(err, stdout, stderr){
			if (err){
			  console.error(err);
			}
			await registerFiletoDownload( title, validDownload.keyword, validDownload.date )
			//uploadfile.update({ 'title' : title1 },{ $set :{ downloadfile: true }}, function(err, uploadfile){
			//	if(err) return console.error(err);
			//	//console.dir(book);
			//});

		});
}
async function StartRegister( ){

	
	
}//  $('#naverEditorFrame').contents().find('.se2_input_htmlsrc').html() 
async function registerDetail_1( driver, content){
	console.log("registerDetail", content, content.title )
	await driver.sleep(1000);
	await driver.executeScript( "$('#naverEditorFrame').contents().find('.se2_to_html').click() " )	

	var title = "$('#title').val('" + content.title + "')"
	await driver.executeScript( title ) 
	//제목 색 적용
	await driver.executeScript( "itemListToggle()" ) 	
	await driver.sleep(500);	
	await driver.executeScript( "$('.c_item_box > p:nth-child(2)').click()" ) //색 적용
	await driver.executeScript( "itemChange('font','bold')" )  //두꼐
	//await driver.executeScript( "$('#se2_tool > div > ul.se2_multy > li > button').click()" ) 
	await driver.executeScript( "itemResult('submit')" ) 
	await driver.sleep(500);	
	await driver.switchTo().alert().accept();
	await driver.sleep(500);
	//오락적용
	await driver.executeScript( "$('#subCateSelete').val('MED_001')" ) 
	
	//
	var recentFile = await _uploadfile.getRecentFile({ UploadFlag : false })
	if( recentFile.length == 0 ) return 

	//await driver.executeScript( "itemListToggle()" )
	var photo = '<br><img src="'+ recentFile[0].thumbnailPath[0] + '" width="100%"><br>' 	
	photo += '<br><img src="'+ recentFile[0].thumbnailPath[1] + '" width="100%"><br>' 	
	photo += '<br><img src="'+ recentFile[0].thumbnailPath[2] + '" width="100%"><br>' 	
	photo += '<br><img src="'+ recentFile[0].thumbnailPath[3] + '" width="100%"><br>' 	
	
	//var photo1 = '<br><img src="http://uimg.filemaru.com/main/data/2019/10/25/cus5_0_x5dud_100016_1572004422.png" width="100%"><br>'
	var setPhoto = "$('#naverEditorFrame').contents().find('.se2_input_htmlsrc')[0].value='"

	await driver.sleep(1000);
	await driver.executeScript( setPhoto + photo+"'"  ) 	

	await driver.sleep(1000);
	console.log('recentFile', recentFile)
	await driver.executeScript( "mmsv_Upload_Insert('file','choi077@naver.com')" )	
	await driver.sleep(3000);	

	var command = 'registerFile.ahk "'+ recentFile[0].realfile +'"'
	await exec( command,
	  async function callback(err, stdout, stderr){
		if (err){
		  console.error(err);
		}
		await driver.sleep(2500);	
		await driver.executeScript( "$('#upload_layer > div > form > div > input.submitBtn').click()")
		await driver.sleep(500);
		await driver.switchTo().alert().accept();
		await driver.sleep(500);
		await _uploadfile.SetUpload( recentFile[0].title, { UploadFlag: true } )
	});	

	
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

startinit()
startSchedule()
