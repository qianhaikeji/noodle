'use strict'

const utils = require('./utils')

/**
 * @apiDefine channelRequestEntity 渠道请求实体
 * @apiParam { STRING } [pId] (body参数) '渠道Id'
 * @apiParam { STRING } [name] (body参数) '渠道名'
 * @apiParam { STRING } [umengId] (body参数) '友盟统计站点Id'
 * @apiParam { STRING } [baiduId] (body参数) '百度统计站点Id'
 * @apiParam { JSON } [customFields] (body参数) '自定义字段'
*/

/**
 * @apiDefine channelResponseEntity 渠道响应实体
 * @apiSuccess { INTEGER } rows.id 'id'
 * @apiSuccess { STRING } rows.pId '渠道Id'
 * @apiSuccess { STRING } rows.name '渠道名'
 * @apiSuccess { STRING } rows.umengId '友盟统计站点Id'
 * @apiSuccess { STRING } rows.baiduId '百度统计站点Id'
 * @apiSuccess { JSON } rows.customFields '自定义字段'
*/

module.exports = app => {
  const { STRING, INTEGER, DATE, DATEONLY, TEXT, JSON, FLOAT, DOUBLE, BOOLEAN } = app.Sequelize

  const Table = app.model.define('channel', {
    id: {
      type: INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    pId: {
      type: STRING,
      comment: '渠道Id',
    },
    name: {
      type: STRING,
      comment: '渠道名',
    },
    umengId: {
      type: STRING,
      comment: '友盟统计站点Id',
    },
    baiduId: {
      type: STRING,
      comment: '百度统计站点Id',
    },
    customFields: {
      type: JSON,
      defaultValue: {},
      comment: '自定义字段',
    },
  }, {
    tableName: 'channel'
  })
  
  utils.extendModel(Table)
  return Table
}
