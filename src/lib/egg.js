const fs = require('fs')
const path = require('path')
const _ = require('lodash')
const utils = require('./utils')

function parseModel (modelDir) {
  const mockApp = {
    model: {
      define: (modelName, model) => {
        const attrs = []
        for (let key in model) {
          if (key === 'id') {
            continue
          }

          const typeAttr = model[key] instanceof Object ? model[key].type() : model[key]
          const fieldType = typeAttr instanceof Function ? typeAttr() : typeAttr
          attrs.push({
            field: key,
            type: fieldType
          })
        }
        return {
          name: modelName,
          attrs: attrs,
          prototype: {}
        }
      }
    },
    Sequelize: {
      STRING: () => 'string',
      INTEGER: () => 'int',
      DATE: () => 'date',
      JSON: () => 'json',
      DOUBLE: () => 'double',
      BOOLEAN: () => 'boolean',
    }
  }

  const modelFiles = fs.readdirSync(modelDir)
  // console.log(modelFiles)
  const modelDict = []
  for (let mf of _.take(modelFiles, 1)) {
    if (path.basename(mf) === 'utils.js') {
      continue
    }
    const modelFunc = require(path.join(modelDir, mf))
    const modelData = modelFunc(mockApp)
    modelDict[modelData.name] = modelData.attrs
  }
  return modelDict
}

module.exports = {
}



