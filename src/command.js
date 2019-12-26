const commander = require('commander');
const chalk = require('chalk');

const packageJson = require('../package.json');
const log = console.log;

const eggServer = require('./lib/eggServer')
const antdPro = require('./lib/antdPro')

function initCommand(){
  commander.version(packageJson.version)

  commander
    .command('egg-server <template> <src> <dst>')
    .option('-c --cover', '覆盖原来的文件')
    .option('-s --specModules <specModules>', '指定模块，数组')
    .description('自动生成egg server. template: [service, controller, model, router, all] src: 原数据 dst：代码输出路径')
    .action(function(cmd, src, dst, options){
      if (!eggServer[cmd]) {
        console.log(`无效的命令：${cmd}`);
        return
      }

      eggServer[cmd](src, dst, options)
      console.log(`${cmd}, ${src}, ${dst}, ${options}`);
    }).on('--help', function() {
      console.log('');
      console.log('Examples:');
      console.log('');
      console.log('  $ noodle egg-server service ./service.json ./app/');
    })

  commander
    .command('antd-pro <template> <src> <dst>')
    .option('-c --cover', '覆盖原来的文件')
    .option('-s --specModules <specModules>', '指定模块，数组')
    .description('自动生成antd-pro代码. template: [api, page, model, all] src: 原数据 dst：代码输出路径')
    .action(function(cmd, src, dst, options){
      console.log(`${cmd}, ${src}, ${dst}, ${options}`);

      if (!antdPro[cmd]) {
        console.log(`无效的命令：${cmd}`);
        return
      }

      antdPro[cmd](src, dst, options)
    }).on('--help', function() {
      console.log('');
      console.log('Examples:');
      console.log('');
      console.log('  $ noodle antd-pro api ./touter.js ./api/');
    })

  commander.parse(process.argv);
}

module.exports = initCommand;