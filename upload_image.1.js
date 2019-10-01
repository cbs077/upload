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
const url = "http://www.filemaru.com/se2/photo_uploader/popup/photo_uploader_conv.html?";
var exec = require('child_process').exec;		 

var TitleinfoArray ;	
var downfile  
var filenumber
var uploadList = []
var newDate = new Date();

async function startUrl(){
	await driver.get(url);

}

var programList = require( './config/filelist.js').fileList

var filenumber 
var downloadList = []

var testflag = false
var testDay = 3
var testTime = '190626'
var uploadtitle  = ''
startUrl()
