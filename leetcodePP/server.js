/*
 * @Description: leetcode 题库抓取
 * @Author: ymt<mengtao.yan@hand-china.com>
 * @Version: 1.0.0
 * @Date: 2019-12-30 19:35:01
 * @LastEditors  : ymt
 * @LastEditTime : 2020-01-05 15:26:32
 * @Copyright: Copyright (c) 2019, Hand
 */
const {
  readTemplate,
  contentWrite,
  templateWrite,
  delDir
} = require("./script/io");
const { getAllProblem, getProblemDetail } = require("./script/request");
const _ = require("lodash");

const DATA_PATH = "./result/";
const DIFFICULTY_LEVEL = ["", "简单", "中等", "困难"];

(async () => {
  // 初始化读取模板
  readTemplate();
  // 清空目录
  delDir(DATA_PATH);

  // 获取全部题目
  getAllProblem().then(all => {
    const list = [];
    all.slice(100, 200).forEach(({ title_slug, title, index, difficulty }) => {
      getProblemDetail(title_slug).then(({ name, content }) => {
        const idx = `0000${index}`;
        const fileName = `NO_${idx.slice(idx.length - 4)}_${name.replace(
          " ",
          ""
        )}`;
        const titleName = `${idx.slice(idx.length - 4)} ${name}`;

        // 生成详细 README
        templateWrite(
          {
            title: name,
            content: content
          },
          `${DATA_PATH}/${fileName}/`,
          "README.md"
        );

        list.push({
          key: index,
          value: `| [${titleName}](./code/com/leetcode/solutions/${fileName}) | - | ${DIFFICULTY_LEVEL[difficulty]} |`
        });

        if (100 === list.length) {
          // 生成列表 README
          const data = _.sortBy(list, "key")
            .map(item => item.value)
            .join("\n");
          contentWrite(
            `| 题目&解法 | 时间复杂度 | 难易度 |\n| --- | --- | --- |\n` + data,
            DATA_PATH,
            "list.md"
          );
        }
      });
    });
  });
})();
