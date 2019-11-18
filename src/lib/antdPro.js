const nunjucks = require('nunjucks')
const fs = require('fs')
const path = require('path')
const _ = require('lodash')
const utils = require('./utils')

const templateDir = path.resolve(__dirname, '../../template/antd-pro')

// controller比较复杂，暂时先放在Temp中，手动合并
function genApiCode (srcFile, dstPath, {cover = false}) {
  const absolutesrcPath = path.resolve(srcFile)
  const absoluteDstPath = path.resolve(dstPath)

  const data = fs.readFileSync(absolutesrcPath, 'utf8')
  // console.log(data)
  const regx = new RegExp(/router\.(.*)\('(\/api.*)'.*controller\.(.*)\.(.*)\)/g)

  const list = []
  while ((match = regx.exec(data)) !== null) {
    list.push({
      method: match[1],
      path: match[2],
      module: match[3],
      func: match[4],
    })
    // console.log(`Found ${match[0]} start=${match.index} end=${regexp.lastIndex}.`);
    // expected output: "Found football start=6 end=14."
    // expected output: "Found foosball start=16 end=24."
  }

  const groupList = _
    .chain(list)
    .groupBy('module')
    .value()

  utils.mkdirs(absoluteDstPath)

  for (let module in groupList) {
    const filename = path.join(absoluteDstPath, module) + '.js'
    const context = {
      apiList: _.map(groupList[module], api => {
        const urlRegx = new RegExp(/:(.+?)(\/|$)/g)
        const pathParams = _.map(api.path.match(urlRegx), ele => ele.replace(/(:|\/)/g, ''))
        // /api/platform/admins/:id/exchanges/abc/:pid => /api/platform/admins/${id}/exchanges/abc/${pid}
        api.path = api.path.replace(urlRegx, '${$1}$2')
        api.pathParams = pathParams
        // console.log(api)
        return api
      })
    }

    if (fs.existsSync(filename) && !cover) {
      console.log(`${filename} 文件已存在，不再创建!`)
      continue
    }

    nunjucks.render(path.join(templateDir, 'api.njk'), context, (err, res) => {
      if (err) {
        console.error(err)
        return
      }
      fs.writeFileSync(`${filename}`, res)
      // console.log(res)
  
      console.log(`${filename} 创建完毕!`)
    })
  }
  // console.log(result)
}

module.exports = {
  genApiCode
}



