const fs = require('fs')
const path = require('path')
const _ = require('lodash')
const utils = require('./utils')

const MODEL_ATTRS = ['type', 'primaryKey', 'autoIncrement', 'allowNull', 'unique', 'faker', 'comment']

async function genModelCode (srcFile, dstPath, {cover = false, specModules=''}) {
  const {env, dstDir, json} = utils.prepare(srcFile, path.join(dstPath, 'model'))
  const list = utils.fiterModules(json.models, specModules)
  for (let ele of list) {
    const context = {
      modelName: ele.name,
      modelText: ele.label,
      tableName: _.snakeCase(ele.name),
      fields: _.reduce(ele.fields, (result, it) => {
        result[it.name] = _.pickBy(it,  (value, key) => MODEL_ATTRS.includes(key))
        return result
      }, {}),
    }

    const filename = path.join(dstDir, ele.name) + '.js'
    await utils.render(env, path.join('egg-server', 'model.njk'), filename, context, cover)
  }
}

async function genRouterCode (srcFile, dstPath, {cover = false, specModules=''}) {
  const {env, dstDir, json} = utils.prepare(srcFile, dstPath)
  const list = utils.fiterModules(json.controllers, specModules)

  const renderContents = []
  for (let ele of list) {
    for (let modelName of ele.models) {
      const model = _.find(json.models, ['name', modelName])
      if (!model) {
        continue
      }

      const content = await utils.renderToBuff(env, path.join('egg-server', 'routerContent.njk'), {
        controllerClass: _.upperFirst(ele.name) + 'Controller',
        apiBase: ele.api.base,
        model
      })
      renderContents.push(content)
    }
  }

  const filename = path.join(dstDir, 'router') + '.js'
  await utils.render(env, path.join('egg-server', 'routerFramework.njk'), filename, {list: renderContents}, cover)
}

async function genServiceCode (srcFile, dstPath, {cover = false, specModules=''}) {
  const {env, dstDir, json} = utils.prepare(srcFile, path.join(dstPath, 'service'))
  const list = utils.fiterModules(json.services, specModules)
  for (let ele of list) {
    const renderContents = []
    for (let modelName of ele.models) {
      const model = _.find(json.models, ['name', modelName])
      if (!model) {
        continue
      }

      const content = await utils.renderToBuff(env, path.join('egg-server', 'serviceContent.njk'), {
        model
      })
      renderContents.push(content)
    }


    let serviceDir = path.join(dstDir, ele.namespace)
    utils.mkdirs(serviceDir)
    const filename = path.join(serviceDir, ele.name) + '.js'
    await utils.render(env, path.join('egg-server', 'serviceFramework.njk'), filename, {
      serviceName: ele.name,
      serviceClass: _.upperFirst(ele.name) + 'Service',
      serviceNamespace: ele.namespace,
      list: renderContents
    }, cover)
  }
}

async function genControllerCode (srcFile, dstPath, {cover = false, specModules=''}) {
  const {env, dstDir, json} = utils.prepare(srcFile, path.join(dstPath, 'controller'))
  const list = utils.fiterModules(json.controllers, specModules)
  for (let ele of list) {
    const renderContents = []
    for (let modelName of ele.models) {
      const model = _.find(json.models, ['name', modelName])
      if (!model) {
        continue
      }

      const service = _.find(json.services, ele => ele.models.includes(model.name))

      const content = await utils.renderToBuff(env, path.join('egg-server', 'controllerContent.njk'), {
        apiBase: ele.api.base,
        apiVersion: ele.api.version,
        apiGroupValue: ele.api.groupValue,
        apiGroupLabel: ele.api.groupLabel,
        servicePath: `${service.namespace}.${service.name}`,
        model
      })
      renderContents.push(content)
    }

    const filename = path.join(dstDir, ele.name) + '.js'
    await utils.render(env, path.join('egg-server', 'controllerFramework.njk'), filename, {
      controllerClass: _.upperFirst(ele.name) + 'Controller',
      apiGroupValue: ele.api.groupValue,
      apiGroupLabel: ele.api.groupLabel,
      list: renderContents
    }, cover)
  }
}

async function genAllCode (...args) {
  await genRouterCode(...args)
  await genModelCode(...args)
  await genServiceCode(...args)
  await genControllerCode(...args)
}

module.exports = {
  model: genModelCode,
  service: genServiceCode,
  controller: genControllerCode,
  router: genRouterCode,
  all: genAllCode
}



