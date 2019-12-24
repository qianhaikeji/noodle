
const fs = require('fs')
const path = require('path')
const nunjucks = require('nunjucks')

const templateDir = path.resolve(__dirname, '../../template')

function mkdirs(dirpath) {
  if (fs.existsSync(dirpath)) {
    return
  }

  const parentDir = path.dirname(dirpath)
  if (!fs.existsSync(parentDir)) {
    mkdirs(parentDir)
  }

  fs.mkdirSync(dirpath)
}

function initEnv () {
  var env = nunjucks.configure(templateDir, {
    autoescape: false,
    trimBlocks: true,
    lstripBlocks: true
  })
  env.addFilter('upperFirstLetter', (word) => {
    if (!word || word.length === 0) {
      return word
    }

    return word[0].toUpperCase() + word.slice(1)
  })
  return env
}

async function render (env, templateFile, dstFile, context, cover = false) {
  return new Promise((resolve, reject) => {
    if (fs.existsSync(dstFile) && !cover) {
      console.log(`${dstFile} 文件已存在，不再创建!`)
      resolve()
      return
    }

    env.render(templateFile, context, (err, res) => {
      if (err) {
        console.error(err)
        reject(err)
        return
      }

      fs.writeFileSync(`${dstFile}`, res)
      // console.log(res)
      console.log(`${dstFile} 创建完毕!`)
      resolve()
    })
  })
  
}

async function renderToBuff (env, templateFile, context) {
  return new Promise((resolve, reject) => {
    env.render(templateFile, context, (err, res) => {
      if (err) {
        console.error(err)
        reject(err)
        return
      }

      resolve(res)
    })
  })
  
}


module.exports = {
  mkdirs,
  initEnv,
  render,
  renderToBuff
}