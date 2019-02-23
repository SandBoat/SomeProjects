// 加载http模块
var http = require('https');
var cheerio = require('cheerio');

module.exports = function (url) {
    return new Promise((resolve, reject) => {
        http.get(url, function (res) {
            console.log('开始抓取.................');
            var html = '';
            // 获取页面数据
            res.on('data', function (data) {
                html += data;
            });

            // 数据获取结束
            res.on('end', function () {
                const $ = cheerio.load(html);
                // resolve($('.text-gray').text());
                resolve($.html());
            })
        }).on('error', function () {
            reject('获取数据出错！');
        });
    });
}