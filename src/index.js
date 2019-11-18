const path = require('path');
const chalk = require('chalk');

const log = console.log;
const initCommand = require('./command');

class Creation{
  constructor(){
    this._rootPath = path.resolve(__dirname, '..');
    this._tplPath = path.resolve(__dirname, '..', 'template');
  }
  do(){
    // 初始化
    initCommand();

    log('');
  }
}

module.exports = Creation