var http = require('http');
var LCPP = require('./GetLeetCode');
const LC_URL = 'https://leetcode-cn.com/problemset/all/';

http.createServer(function (request, response) {
    // 发送 HTTP 头部 
    // HTTP 状态值: 200 : OK
    // 内容类型: text/plain
    response.writeHead(200, { "Content-Type": "text/html;charset=UTF-8" })

    // 发送响应数据 "Hello World"
    LCPP(LC_URL).then(data => response.end(data));
}).listen(8888);

// console.log('Server running at http://127.0.0.1:8888/');
// LCPP(LC_URL).then(data => console.log(data));