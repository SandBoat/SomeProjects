/*
 * @Description: leetcode 题库抓取
 * @Author: ymt<mengtao.yan@hand-china.com>
 * @Version: 1.0.0
 * @Date: 2019-12-30 19:35:01
 * @LastEditors  : ymt
 * @LastEditTime : 2020-01-01 17:02:47
 * @Copyright: Copyright (c) 2019, Hand
 */
const { get } = require("lodash");
const { readTemplate, write } = require("./script/io");
const { getAllProblem, getProblemDetail } = require("./script/request");

const DATA_PATH = "./result/";

(async () => {
  // 初始化读取模板
  readTemplate();
  // 获取全部题目
  getAllProblem().then(all => {
    all.slice(0, 10).forEach(({ title_slug, title, index }) => {
      getProblemDetail(title_slug).then(({ name, content }) => {
        const fileName = `NO_${index}_${name}.md`;

        write(
          {
            title: title,
            content: content
          },
          DATA_PATH,
          fileName
        );
      });
    });
  });
})();
