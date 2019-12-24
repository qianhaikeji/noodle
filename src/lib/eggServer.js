const fs = require('fs')
const path = require('path')
const _ = require('lodash')
const utils = require('./utils')

const MODEL_ATTRS = ['type', 'primaryKey', 'autoIncrement', 'allowNull', 'unique', 'faker', 'comment']

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

// todo: 处理多个model
async function genRouterCode (srcFile, dstPath, {cover = false, specModules=''}) {
  const absolutesrcPath = path.resolve(srcFile)
  const absoluteDstPath = path.resolve(dstPath)
  const env = utils.initEnv()

  const list = require(absolutesrcPath)

  const routerDir = path.join(absoluteDstPath)
  utils.mkdirs(routerDir)

  const specModuleList = !specModules || specModules.trim() === '' ? [] : specModules.split(',')
  for (let ele of list) {
    if (specModuleList.length > 0 && !_.includes(specModuleList, ele.modelName)) {
      continue
    }

    const filename = path.join(routerDir, 'router') + '.js'
    const content = await utils.renderToBuff(env, path.join('egg-server', 'routerContent.njk'), {
      controllerClass: _.upperFirst(ele.controller.name) + 'Controller',
      apiBase: ele.api.base,
      modelName: ele.modelName,
      creatable: ele.creatable,
      editable: ele.editable,
      deletable: ele.deletable
    })
    await utils.render(env, path.join('egg-server', 'routerFramework.njk'), filename, {content}, cover)
  }
}

// todo: 处理多个model公用一个service的场景
async function genServiceCode (srcFile, dstPath, {cover = false, specModules=''}) {
  const absolutesrcPath = path.resolve(srcFile)
  const absoluteDstPath = path.resolve(dstPath)
  const env = utils.initEnv()

  const list = require(absolutesrcPath)

  const serviceDir = path.join(absoluteDstPath, 'service')
  utils.mkdirs(serviceDir)

  const specModuleList = !specModules || specModules.trim() === '' ? [] : specModules.split(',')
  for (let ele of list) {
    if (specModuleList.length > 0 && !_.includes(specModuleList, ele.modelName)) {
      continue
    }

    const filename = path.join(serviceDir, ele.service.name) + '.js'
    const content = await utils.renderToBuff(env, path.join('egg-server', 'serviceContent.njk'), {
      modelName: ele.modelName,
      modelFields: ele.modelFields
    })
    await utils.render(env, path.join('egg-server', 'serviceFramework.njk'), filename, {
      serviceName: ele.service.name,
      serviceClass: _.upperFirst(ele.service.name) + 'Service',
      serviceNamespace: ele.service.namespace,
      content}, cover)
  }
}

async function genControllerCode (srcFile, dstPath, {cover = false, specModules=''}) {
  const absolutesrcPath = path.resolve(srcFile)
  const absoluteDstPath = path.resolve(dstPath)
  const env = utils.initEnv()

  const list = require(absolutesrcPath)

  const controllerDir = path.join(absoluteDstPath, 'controller')
  utils.mkdirs(controllerDir)

  const specModuleList = !specModules || specModules.trim() === '' ? [] : specModules.split(',')
  for (let ele of list) {
    if (specModuleList.length > 0 && !_.includes(specModuleList, ele.modelName)) {
      continue
    }

    const context = {
      controllerClass: _.upperFirst(ele.controller.name) + 'Controller',
      apiBase: ele.api.base,
      apiVersion: ele.api.version,
      apiGroupValue: ele.api.groupValue,
      apiGroupLabel: ele.api.groupLabel,
      servicePath: `${ele.service.namespace}.${ele.service.name}`,
      modelName: ele.modelName,
      modelText: ele.modelText,
      modelFields: ele.modelFields
    }

    const filename = path.join(controllerDir, ele.controller.name) + '.js'
    await utils.render(env, path.join('egg-server', 'controller.njk'), filename, context, cover)
  }
}

async function genModelCode (srcFile, dstPath, {cover = false, specModules=''}) {
  const absolutesrcPath = path.resolve(srcFile)
  const absoluteDstPath = path.resolve(dstPath)
  const env = utils.initEnv()

  const list = require(absolutesrcPath)

  const modelDir = path.join(absoluteDstPath, 'model')
  utils.mkdirs(modelDir)

  const specModuleList = !specModules || specModules.trim() === '' ? [] : specModules.split(',')
  for (let ele of list) {
    if (specModuleList.length > 0 && !_.includes(specModuleList, ele.modelName)) {
      continue
    }

    const context = {
      modelName: ele.modelName,
      modelText: ele.modelText,
      tableName: _.snakeCase(ele.modelName),
      fileds: _.reduce(ele.modelFields, (result, it) => {
        result[it.name] = _.pickBy(it,  (value, key) => MODEL_ATTRS.includes(key))
        return result
      }, {}),
    }

    const modelFilename = path.join(modelDir, ele.modelName) + '.js'
    await utils.render(env, path.join('egg-server', 'model.njk'), modelFilename, context, cover)
  }
  // console.log(result)
}

module.exports = {
  model: genModelCode,
  service: genServiceCode,
  controller: genControllerCode,
  router: genRouterCode
}



