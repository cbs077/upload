var cron = require('node-cron');

var counter = 1;
myFunction() 
function myFunction() {
    //alert(counter);

    // create options object here
    //var options = {
    //    host:'www.host.com',
    //    path:'/path/'+counter
    //};
    //makeRequest(options, counter);
	console.log('start')
	bitprice()
    setTimeout(myFunction, 100);    
    
}

var bitPrice = [] 
var myAvgIncome = 10000
var myAvgbuyPrice = 1000
var myBitCount = 10 
var CurBitprice = 1000
var CurMoney = 10000
var PricePos =1000
var value
//  평균단가 * 갯수 + 현재돈
function bitprice(){
	value = Math.floor(Math.random() * 21) + -10
	CurBitprice = CurBitprice + value;		 // 1 ~ 10
	
	if( ( CurBitprice - PricePos ) / PricePos * 100 > 5 ){	
		myBitCount = myBitCount - 100	
		CurMoney = CurMoney + ( CurBitprice * 100 )
		PricePos = CurBitprice				
	}else if( (CurBitprice - PricePos ) / PricePos * 100  < -5 ){
		myBitCount = myBitCount + 100	
		CurMoney = CurMoney - ( CurBitprice * 100 )
		PricePos = CurBitprice	
	}
	console.log( 't', ( CurBitprice - PricePos ) / PricePos * 100 , )
	getCurIncome()
	//bitPrice.push( 
	//if( (CurBitprice - myAvgbuyPrice )/myAvgbuyPrice * 100 < -5 ){
	//	CurBitprice 
	//}	
}
function getCurIncome(){
	var total = (CurBitprice * myBitCount) + CurMoney
	console.log( 'total',PricePos, value,CurBitprice ,myBitCount, total )
}
function strategy(){
	


}