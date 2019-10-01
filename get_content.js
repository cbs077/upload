var request = require("request");
var fs = require('fs');
var iconv  = require('iconv-lite');
var Iconv1  = require('iconv').Iconv;;
var cheerio = require('cheerio')
const charset = require('charset')
var myJSON = require("JSON");

exports.getPoint = function () {
        var result
        var options = { method: 'GET',
          url: 'http://www.filemaru.com/',
          encoding: "utf-8",
          qs: { doc: 'mypage_sellerUpload' },
          headers:
		   { 'Postman-Token': 'c9184ec0-c503-475a-aa68-734a91148ca1',
             'cache-control': 'no-cache',
             Cookie: 'G_ENABLED_IDPS=google; m_grade=1; mid=0719i619a7193a19f6198719b619c719j6195919e919e9191a194719i619571$
             'Accept-Language': 'ko-KR,ko;q=0.9,en-US;q=0.8,en;q=0.7',
             //'Accept-Encoding': 'gzip, deflate',
             Referer: 'http://www.filemaru.com/?doc=mypage_sellerUpload',
             Accept: 'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,image/apng,*/*;q=0.8,application/sig$
             'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/73.0.36$
             'Upgrade-Insecure-Requests': '1',
             'Cache-Control': 'no-cache',
             Pragma: 'no-cache',
             Connection: 'keep-alive'
			}
		};

        request(options, function (error, response, body) {
           if (error) throw new Error(error);
           var result = body
           var $ = cheerio.load(result);
           //result = $('#loginbox > div > ul > li:nth-child(5) > b').text()
			#mbox > div > div > div.my_abox > form:nth-child(2) > table > tbody > tr:nth-child(7) > td.tit > a > span
           console.log('포인트:', result);
        });

        return result
}


