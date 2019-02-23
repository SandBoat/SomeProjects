# LeetCode 题库爬取脚本

基于 `puppeteer` 的 [LeetCode](https://leetcode-cn.com/) 题库爬取脚本

- 使用 `puppeteer` 模拟浏览器，访问 leetcode 题库(https://leetcode-cn.com/problemset/all/)
- 截获请求`'https://leetcode-cn.com/graphql'`
- 获取请求返回数据，导出到文件夹`./result`下