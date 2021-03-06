const nunjucks = require('nunjucks')
const fs = require('fs')
const path = require('path')
const _ = require('lodash')
const utils = require('./utils')

async function genPageCode (srcFile, dstPath, {cover = false, specModules=''}) {
  const {env, dstDir, json} = utils.prepare(srcFile, path.join(dstPath, 'pages'))
  const list = utils.fiterModules(json.models, specModules)
  for (let ele of list) {
    utils.normalizeModelJson(ele)
    const context = {
      model: ele
    }

    const filename = path.join(dstDir, _.upperFirst(ele.name)) + 'List.jsx'
    await utils.render(env, path.join('antd-pro', 'pageList.njk'), filename, context, cover)

    // 编辑实体时，使用详情页而不是modal
    if (ele.hasDetailPage) {
      const filename = path.join(dstDir, _.upperFirst(ele.name)) + '.jsx'
      await utils.render(env, path.join('antd-pro', 'pageDetail.njk'), filename, context, cover)
    }
  }
}

async function genModelListCode (srcFile, dstPath, {cover = false, specModules=''}) {
  const {env, dstDir, json} = utils.prepare(srcFile, path.join(dstPath, 'models'))
  const list = utils.fiterModules(json.models, specModules)
  for (let ele of list) {
    utils.normalizeModelJson(ele)

    const context = {
      model: ele
    }

    const filename = path.join(dstDir, ele.name) + 'List.js'
    await utils.render(env, path.join('antd-pro', 'modelList.njk'), filename, context, cover)
  }
}

async function genApiCode (srcFile, dstPath, {cover = false, specModules=''}) {
  const {env, dstDir, json} = utils.prepare(srcFile, path.join(dstPath, 'api'))
  const list = utils.fiterModules(json.models, specModules)
  for (let ele of list) {
    utils.normalizeModelJson(ele)
    const controller = _.find(json.controllers, it => it.models.includes(ele.name))
    if (!controller) {
      continue
    }

    const context = {
      model: ele,
      apiBase: controller.api.base
    }

    const filename = path.join(dstDir, ele.name) + '.js'
    await utils.render(env, path.join('antd-pro', 'api.njk'), filename, context, cover)
  }
}

async function genAllCode (...args) {
  await genApiCode(...args)
  await genModelListCode(...args)
  await genPageCode(...args)
}

module.exports = {
  api: genApiCode,
  model: genModelListCode,
  page: genPageCode,
  all: genAllCode
}



