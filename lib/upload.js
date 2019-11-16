
var programList = require( '../config/filelist.js' ).fileList
const _ = require('underscore');
var uploadfile = require('../models/upload');

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
// 요일 -> 날짜 변환
changeDaytoDate = function( day ){
	var myDate = new Date();
	var dayLabel = new Date( ).getDay() // 0 일 6 토
	day = day - dayLabel
	var dateOffset = (24*60*60*1000) * 1; //1 days
	var time1 =  myDate.setTime(myDate.getTime() - dateOffset)
	time1 = new Date( time1 ).toFormat('YYMMDD');

	console.log("util.changeDaytoDate", time1 )
	return time1
}
exports.changeDaytoDate = changeDaytoDate

function FindUpload( query ){
	console.log( 'FindUpload', query )
	return new Promise( function( resolve, reject){
		uploadfile.find( query , function(err, res ){
			if(err) return console.error(err);
			resolve( res )
			//console.dir(book);
		});
	})
}
exports.FindUpload = FindUpload

function SetUpload( title, query ){
	console.log( 'FindUpload', query )
	return new Promise( function( resolve, reject){
		uploadfile.update({ title: title } ,{ $set: query } , function(err, res ){
			if(err) return console.error(err);
			console.log( 'res', res )
			resolve( res )
			//console.dir(book);
		});
	})
}
exports.SetUpload = SetUpload

function completeThumbnail( title, thumbnailPath  ){
	console.log( 'completeThumbnail', title )
	return new Promise( function( reslove, reject ){
	  uploadfile.update({ title: title },{ $set :{ 'thumbnailPath' : thumbnailPath,'thumbnailflag': true  }}).then( function( res ){
		console.log( 'res', res )
		reslove( res )
	  })
	})
  }
exports.completeThumbnail = completeThumbnail

function getRecentFile( query ){
	return new Promise( function( reslove, reject ){
	  uploadfile.find( query ).sort({published_date : -1 }).limit(1).then( function( res ){
		  reslove( res )
	  })
	})
  }
exports.getRecentFile = getRecentFile
  