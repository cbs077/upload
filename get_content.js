var request = require("request");
//var fs = require('fs');
//var iconv  = require('iconv-lite');
//var Iconv1  = require('iconv').Iconv;;
var cheerio = require('cheerio')
//const charset = require('charset')
//var myJSON = require("JSON");

function getPoint() {
        return new Promise( function( resolve, reject){
                var result
                var options = { method: 'GET',
                url: 'http://www.filemaru.com/',
                encoding: "utf-8",
                qs: { doc: 'mypage_sellerUpload' },
                headers:
                { 'Postman-Token': 'c9184ec0-c503-475a-aa68-734a91148ca1',
                'cache-control': 'no-cache',
                Cookie: 'G_ENABLED_IDPS=google; m_grade=1; mid=0719i619a7193a19f6198719b619c719j6195919e919e9191a194719i6195719a719; nick=%EC%A1%B0%ED%9D%94%EC%82%AC%EB%9E%8C; Usr=choi077%40naver.com; grade=1; credit=5%7C%7C1; adult=1; coupon=5; memo_cnt=3; LogChk=Y; PHPSESSID=emd9uq45tuneslkki7g70n4iu0; bns_cash=50; cmn_cash=5750; total_cash=5800',
                'Accept-Language': 'ko-KR,ko;q=0.9,en-US;q=0.8,en;q=0.7',
                //'Accept-Encoding': 'gzip, deflate',
                Referer: 'http://www.filemaru.com/?doc=mypage_sellerUpload',
                Accept: 'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3',
                'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/73.0.3683.86 Safari/537.36',
                'Upgrade-Insecure-Requests': '1',
                'Cache-Control': 'no-cache',
                Pragma: 'no-cache',
                Connection: 'keep-alive' }
                };

                request(options, function (error, response, body) {
                        var result = body
                        //console.log( 'body', body )
                        var $ = cheerio.load(result);
                        result = $('#loginbox > div > ul > li:nth-child(5) > b').text()
                        var ID = $("#mbox > div > div > div.my_abox > form:nth-child(2) > table > tbody > tr:nth-child(2) > td:nth-child(2)").text()
                        var ID1 = $("#mbox > div > div > div.my_abox > form:nth-child(2) > table > tbody > tr:nth-child(3) > td:nth-child(2)").text()
                        var ID2 = $("#mbox > div > div > div.my_abox > form:nth-child(2) > table > tbody > tr:nth-child(4) > td:nth-child(2)").text()
                        var ID3 = $("#mbox > div > div > div.my_abox > form:nth-child(2) > table > tbody > tr:nth-child(5) > td:nth-child(2)").text()
						var downCount = $("#mbox > div > div > div.my_abox > form:nth-child(2) > table > tbody > tr:nth-child(2) > td:nth-child(7)").text()
                        console.log('포인트:', result);
                        console.log('번호:', ID);
                        console.log('다운로드수:', downCount);
                        var res = { id: [ID,ID1,ID2,ID3 ] }
                        resolve( res )

                });
        })
        return result
}
exports.getPoint=getPoint

getPoint()

