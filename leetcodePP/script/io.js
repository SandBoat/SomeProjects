const fs = require("fs");
const path = require("path");

const TEMPLATE_FULL_PATH = path.join(__dirname, "../template/README.md"); // 模板存放位置

// 预先读取文件并缓存
let templateContent = "";
const readTemplate = function() {
  fs.readFile(TEMPLATE_FULL_PATH, function(err, data) {
    if (err) return err;

    templateContent = data.toString();
  });
};

const write = function({ title, content }, path, filename, isAdd = false) {
  if (!path || !filename) throw new Error("no path or filename");
  try {
    const fullePath = path + filename;
    if (!fs.existsSync(path)) {
      fs.mkdirSync(path);
    }

    const outputStr = templateContent
      .replace("${title}", title)
      .replace("${content}", content);

    writerStream = fs.createWriteStream(fullePath, {
      flags: isAdd ? "a" : "w"
    });
    writerStream.write(outputStr, "utf-8");
    writerStream.end();
  } catch (err) {
    console.error(err);
  }
};

module.exports = {
  readTemplate,
  write
};
