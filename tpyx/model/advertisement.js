'use strict'

const utils = require('./utils')

/**
 * @apiDefine advertisementRequestEntity 广告位请求实体
 * @apiParam { INTEGER } [channelId] (body参数) '渠道ID'
 * @apiParam { INTEGER } [position] (body参数) '广告位置'
 * @apiParam { STRING(30) } [title] (body参数) '文案'
 * @apiParam { STRING } [image] (body参数) '广告图'
 * @apiParam { INTEGER } [type] (body参数) '广告类型'
 * @apiParam { STRING(30) } [appId] (body参数) '小程序appId(紧跳转小程序需要)'
 * @apiParam { STRING } [link] (body参数) '跳转链接'
 * @apiParam { STRING(500) } [content] (body参数) '广告内容'
 * @apiParam { INTEGER } [order] (body参数) '广告顺序（个别广告位支持多个广告，因此需要设置展示顺序）'
 * @apiParam { BOOLEAN } [enable] (body参数) '是否启用'
 * @apiParam { JSON } [customFields] (body参数) '自定义字段'
*/

/**
 * @apiDefine advertisementResponseEntity 广告位响应实体
 * @apiSuccess { INTEGER } rows.id 'id'
 * @apiSuccess { INTEGER } rows.channelId '渠道ID'
 * @apiSuccess { INTEGER } rows.position '广告位置'
 * @apiSuccess { STRING(30) } rows.title '文案'
 * @apiSuccess { STRING } rows.image '广告图'
 * @apiSuccess { INTEGER } rows.type '广告类型'
 * @apiSuccess { STRING(30) } rows.appId '小程序appId(紧跳转小程序需要)'
 * @apiSuccess { STRING } rows.link '跳转链接'
 * @apiSuccess { STRING(500) } rows.content '广告内容'
 * @apiSuccess { INTEGER } rows.order '广告顺序（个别广告位支持多个广告，因此需要设置展示顺序）'
 * @apiSuccess { BOOLEAN } rows.enable '是否启用'
 * @apiSuccess { JSON } rows.customFields '自定义字段'
*/

module.exports = app => {
  const { STRING, INTEGER, DATE, DATEONLY, TEXT, JSON, FLOAT, DOUBLE, BOOLEAN } = app.Sequelize

  const Table = app.model.define('advertisement', {
    id: {
      type: INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    channelId: {
      type: INTEGER,
      comment: '渠道ID',
    },
    position: {
      type: INTEGER,
      comment: '广告位置',
    },
    title: {
      type: STRING(30),
      comment: '文案',
    },
    image: {
      type: STRING,
      comment: '广告图',
    },
    type: {
      type: INTEGER,
      comment: '广告类型',
    },
    appId: {
      type: STRING(30),
      comment: '小程序appId(紧跳转小程序需要)',
    },
    link: {
      type: STRING,
      comment: '跳转链接',
    },
    content: {
      type: STRING(500),
      comment: '广告内容',
    },
    order: {
      type: INTEGER,
      comment: '广告顺序（个别广告位支持多个广告，因此需要设置展示顺序）',
    },
    enable: {
      type: BOOLEAN,
      defaultValue: true,
      faker: true,
      comment: '是否启用',
    },
    customFields: {
      type: JSON,
      defaultValue: {},
      comment: '自定义字段',
    },
  }, {
    tableName: 'advertisement'
  })
  
  utils.extendModel(Table)
  return Table
}
