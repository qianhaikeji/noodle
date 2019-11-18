
const fs = require('fs')
const path = require('path')

function mkdirs(dirpath) {
  if (!fs.existsSync(path.dirname(dirpath))) {
    mkdirs(path.dirname(dirpath));
  }
  fs.mkdirSync(dirpath);
}


module.exports = {
  mkdirs
}