
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

function checkVaildFilebytitle( list, listRegex ){
	var result =''

	//190925 런닝맨
	//console.log( 'checkVaildFilebytitle', list )
	_.each( list, function( title ){
		var regex = new RegExp( listRegex.keyword );
		var validTitle = regex.test( title )	
		//console.log( 'checkVaildFilebytitle', title )
		if( validTitle ){   // #제목	검증	
			regex = new RegExp(  listRegex.date )
			var validDate = regex.test( title )

			console.log( 'checkVaildFilebytitle2',title,  validDate )
			if( validDate ){   // #시간 검증
				result = title	
				return result
			}
		}		
	})		
	return result
}
exports.checkVaildFilebytitle=checkVaildFilebytitle