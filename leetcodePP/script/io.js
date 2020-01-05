/*
 * @Description: file content
 * @Author: ymt<mengtao.yan@hand-china.com>
 * @Version: 1.0.0
 * @Date: 2020-01-01 16:28:12
 * @LastEditors  : ymt
 * @LastEditTime : 2020-01-05 15:09:47
 * @Copyright: Copyright (c) 2019, Hand
 */
const fs = require("fs");
const path = require("path");

const TEMPLATE_FULL_PATH = path.join(__dirname, "../template/README.md"); // 模板存放位置

// 递归创建目录 异步方法
const mkdirs = (dirname, callback) => {
  fs.exists(dirname, function (exists) {
    if (exists) {
      callback();
    } else {
      // console.log(path.dirname(dirname));
      mkdirs(path.dirname(dirname), function () {
        fs.mkdir(dirname, callback);
        console.log(
          "在" + path.dirname(dirname) + "目录创建好" + dirname + "目录"
        );
      });
    }
  });
};

const delDir = path => {
  let files = [];
  if (fs.existsSync(path)) {
    files = fs.readdirSync(path);
    files.forEach((file, index) => {
      let curPath = path + "/" + file;
      if (fs.statSync(curPath).isDirectory()) {
        delDir(curPath); //递归删除文件夹
      } else {
        fs.unlinkSync(curPath); //删除文件
      }
    });
    fs.rmdirSync(path);
  }
};

// 预先读取文件并缓存
let templateContent = "";
const readTemplate = function () {
  fs.readFile(TEMPLATE_FULL_PATH, function (err, data) {
    if (err) return err;

    templateContent = data.toString();
  });
};

const contentWrite = function (data, path, filename, isAdd = false) {
  if (!path || !filename) throw new Error("no path or filename");

  mkdirs(path, () => {
    try {
      const fullePath = path + filename;
      writerStream = fs.createWriteStream(fullePath, {
        flags: isAdd ? "a" : "w"
      });
      writerStream.write(data, "utf-8");
      writerStream.end();
    } catch (err) {
      console.error(err);
    }
  });
};

const templateWrite = function ({ title, content }, path, filename, isAdd = false) {
  if (!path || !filename) throw new Error("no path or filename");

  const outputStr = templateContent
    .replace("${title}", title)
    .replace("${content}", content);

  contentWrite(outputStr, path, filename, isAdd);
};

module.exports = {
  mkdirs,
  delDir,
  readTemplate,
  contentWrite,
  templateWrite
};