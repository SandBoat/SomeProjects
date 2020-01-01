/*
 * @Description: leetcode 题库抓取
 * @Author: ymt<mengtao.yan@hand-china.com>
 * @Version: 1.0.0
 * @Date: 2019-12-30 19:35:01
 * @LastEditors  : ymt
 * @LastEditTime : 2020-01-01 17:02:04
 * @Copyright: Copyright (c) 2019, Hand
 */
const { isFunction, get } = require("lodash");
const axios = require("axios");

const TARGET_REQUEST_ALL_URL = "https://leetcode-cn.com/api/problems/all/"; // 目标请求url
const TARGET_REQUEST_URL = "https://leetcode-cn.com/graphql/"; // 目标请求url
const TARGET_PATH = "../result/"; // 数据存放文件

const getProblemDetail = function(title_slug) {
  return axios
    .get(TARGET_REQUEST_URL, {
      params: {
        operationName: "questionData",
        variables: {
          titleSlug: title_slug
        },
        query:
          "query questionData($titleSlug: String!) {\n  question(titleSlug: $titleSlug) {\n    questionId\n    questionFrontendId\n    boundTopicId\n    title\n    titleSlug\n    content\n    translatedTitle\n    translatedContent\n    isPaidOnly\n    difficulty\n    likes\n    dislikes\n    isLiked\n    similarQuestions\n    contributors {\n      username\n      profileUrl\n      avatarUrl\n      __typename\n    }\n    langToValidPlayground\n    topicTags {\n      name\n      slug\n      translatedName\n      __typename\n    }\n    companyTagStats\n    codeSnippets {\n      lang\n      langSlug\n      code\n      __typename\n    }\n    stats\n    hints\n    solution {\n      id\n      canSeeDetail\n      __typename\n    }\n    status\n    sampleTestCase\n    metaData\n    judgerAvailable\n    judgeType\n    mysqlSchemas\n    enableRunCode\n    envInfo\n    book {\n      id\n      bookName\n      pressName\n      description\n      bookImgUrl\n      pressImgUrl\n      productUrl\n      __typename\n    }\n    isSubscribed\n    __typename\n  }\n}\n"
      }
    })
    .then(res => {
      // const idx = `0000${index}`.slice(`0000${index}`.length - 4);
      // write(
      //   get(res, "data.data.question.translatedContent"),
      //   TARGET_PATH,
      //   `NO_${idx}_${get(res, "data.data.question.translatedTitle", "")}.md`
      // );
      return {
        name: get(res, "data.data.question.translatedTitle", ""),
        content: get(res, "data.data.question.translatedContent")
      };
    });
};

const defaultAllProcessor = res => {
  const problems = get(res, "data.stat_status_pairs", []);
  const result = problems.reverse().map((p, index) => ({
    title: get(p, "stat.question__title"),
    title_slug: get(p, "stat.question__title_slug"),
    difficulty: get(p, "difficulty.level"),
    index: index + 1
  }));
  return result;
};

const getAllProblem = function(processor = defaultAllProcessor) {
  if (process && !isFunction(processor)) throw new Error("processor illegal");

  return axios.get(TARGET_REQUEST_ALL_URL, {}).then(res => {
    return processor(res);
  });
};

module.exports = {
  getProblemDetail,
  getAllProblem
};
