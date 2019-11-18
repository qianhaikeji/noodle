const nunjucks = require('nunjucks')
const fs = require('fs')
const path = require('path')
const _ = require('lodash')
const serviceList = require('./service.json')
const controllerList = require('./controller.json')

const codeDir = path.join(__dirname)
var env = nunjucks.configure(__dirname)
env.addFilter('upperFirstLetter', (word) => {
  if (!word || word.length === 0) {
    return word
  }

  return word[0].toUpperCase() + word.slice(1)
})

function parseModel () {
  const modelDir = path.join(__dirname, '../app/model')

  const mockApp = {
    model: {
      define: (modelName, model) => {
        return {
          name: modelName,
          attrs: _.keys(model)
        }
      }
    },
    Sequelize: {
      STRING: () => {}
    }
  }

  if (!fs.existsSync(modelDir)) {
    console.log('还没有创建model目录')
    return
  }

  const modelFiles = fs.readdirSync(modelDir)
  const modelDict = []
  for (let mf of modelFiles) {
    if (path.basename(mf) === 'utils.js') {
      continue
    }
    const modelFunc = require(path.join(modelDir, mf))
    const modelData = modelFunc(mockApp)
    modelDict[modelData.name] = modelData.attrs
  }
  return modelDict
}

function generateServiceCode () {
  for (let service of serviceList) {
    const dir = path.join(codeDir, 'service', service.namespace)
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir)
    }
  
    const filename = path.join(dir, service.serviceName) + '.js'
    if (fs.existsSync(filename)) {
      console.log(`${filename} 文件已存在，不再创建!`)
      continue
    }
  
    const context = {
      ...service,
      modelAttrs: modelDict[service.modelName]
    }
    nunjucks.render(path.join(__dirname, 'service.njk'), context, (err, res) => {
      if (err) {
        console.error(err)
        return
      }
      fs.writeFileSync(`${filename}`, res)
      // console.log(res)
  
      console.log(`${filename} 创建完毕!`)
    })
  }
}


// controller比较复杂，暂时先放在Temp中，手动合并
function generateControllerCode () {
  for (let controller of controllerList) {
    const dir = path.join(__dirname, '_controllerTemp')
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir)
    }
  
    const filename = path.join(dir, controller.controllerName) + '.js'
    if (fs.existsSync(filename)) {
      console.log(`${filename} 文件已存在，不再创建!`)
      continue
    }
  
    const context = {
      ...controller,
    }
    nunjucks.render(path.join(__dirname, 'controller.njk'), context, (err, res) => {
      if (err) {
        console.error(err)
        return
      }
      fs.writeFileSync(`${filename}`, res)
      // console.log(res)
  
      console.log(`${filename} 创建完毕!`)
    })
  }
}

const modelDict = parseModel()
// console.log(modelDict)

generateServiceCode()

// generateControllerCode()



