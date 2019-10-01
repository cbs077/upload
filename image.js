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
const url = "http://www.filemaru.com/se2/photo_uploader/popup/photo_uploader_conv.html?basic=aHR0cDovL3d3dy5maWxlbWFydS5jb20vP2RvYz1saXN0X3N1YiZjYXRlPU1FRA==";

var exec = require('child_process').exec;		 

var TitleinfoArray ;	
var downfile  

var newDate = new Date();

var time = newDate.toFormat('YYMMDD');
var filenumber 

(async function example() {
	try {
		await driver.get(url);
	} finally {
		await driver.sleep(3000);
		await driver.quit(); 
		//await driver.quit();
	}
})()	
