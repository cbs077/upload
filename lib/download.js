
var programList = require( '../config/filelist.js' ).fileList
const _ = require('underscore');

// 아내의 맛.E51.190618.720p-NEXT, 제목 검증 , 키워드, 날짜
checkDownloadfile = function ( title ) {
	var checkflag = false
	var myDate = new Date();
	var dateOffset = (24*60*60*1000) * 1; //5 days
	var time = myDate.toFormat('YYMMDD');
	var time1 =  myDate.setTime(myDate.getTime() - dateOffset)
	time1 = new Date( time1 ).toFormat('YYMMDD');
	time  = time + '|' + time1	

	_.each( programList, function( list ){
		var regex = new RegExp( list.title );
		console.log('util.checkDownloadfile', regex, title)
		if( regex.test( title )){ // keyworkd
			regex = new RegExp(  time  );  
			if( regex.test( title )){  // date
				console.log('util.checkDownloadfile1', regex, title)
				checkflag = true
			}
		}			 		
	})
	return checkflag
};
exports.checkDownloadfile = checkDownloadfile
function findupload(){

}
exports.checkDownloadfile = checkDownloadfile

