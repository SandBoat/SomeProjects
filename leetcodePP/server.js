/**
 * leetcode 题库抓取
 */
const fs = require('fs');
const puppeteer = require('puppeteer');
const LEETCODE_URL = 'https://leetcode-cn.com/problemset/all/';
const TARGET_REQUEST_URL = 'https://leetcode-cn.com/graphql'; // 目标请求url
const TARGET_FILE = './result/result.json'; // 数据存放文件

const writeFile = (data, fileName = 'xx.html') => {
    try {
        writerStream = fs.createWriteStream(fileName);
        writerStream.write(JSON.stringify(data), 'utf-8');
        writerStream.end();
    } catch (err) {
        console.error(err);
    }
}

(async () => {
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    await page.on('response', responsey => {
        if (responsey.url() === TARGET_REQUEST_URL) { // 拦截目标请求结果
            responsey.text().then(ret => {
                try {
                    ret = JSON.parse(ret);
                    if (ret.data.translations) {
                        writeFile(ret.data.translations.map(t => t.title), TARGET_FILE);
                        console.log('抓取结束...................');
                        browser.close();
                    }
                } catch (err) {
                    console.error(err);
                }
            });
        }
    });
    await page.goto(LEETCODE_URL); // 访问题库页面
    // await browser.close();
})();