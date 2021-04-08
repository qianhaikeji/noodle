'use strict'

const utils = require('./utils')

/**
 * @apiDefine abTestRequestEntity AB测试实验请求实体
 * @apiParam { STRING } [name] (body参数) '实验名称'
 * @apiParam { STRING } [description] (body参数) '实验描述'
 * @apiParam { INTEGER } [type] (body参数) '实验类型(客户端实验、服务端实验)'
 * @apiParam { JSON } [targets] (body参数) '指标'
 * @apiParam { BOOLEAN } [enable] (body参数) '是否启用'
 * @apiParam { JSON } [customFields] (body参数) '自定义字段'
*/

/**
 * @apiDefine abTestResponseEntity AB测试实验响应实体
 * @apiSuccess { INTEGER } rows.id 'id'
 * @apiSuccess { STRING } rows.name '实验名称'
 * @apiSuccess { STRING } rows.description '实验描述'
 * @apiSuccess { INTEGER } rows.type '实验类型(客户端实验、服务端实验)'
 * @apiSuccess { JSON } rows.targets '指标'
 * @apiSuccess { BOOLEAN } rows.enable '是否启用'
 * @apiSuccess { JSON } rows.customFields '自定义字段'
*/

module.exports = app => {
  const { STRING, INTEGER, DATE, DATEONLY, TEXT, JSON, FLOAT, DOUBLE, BOOLEAN } = app.Sequelize

  const Table = app.model.define('abTest', {
    id: {
      type: INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    name: {
      type: STRING,
      comment: '实验名称',
    },
    description: {
      type: STRING,
      comment: '实验描述',
    },
    type: {
      type: INTEGER,
      comment: '实验类型(客户端实验、服务端实验)',
    },
    targets: {
      type: JSON,
      defaultValue: [],
      comment: '指标',
    },
    enable: {
      type: BOOLEAN,
      defaultValue: false,
      faker: false,
      comment: '是否启用',
    },
    customFields: {
      type: JSON,
      defaultValue: {},
      comment: '自定义字段',
    },
  }, {
    tableName: 'ab_test'
  })
  
  utils.extendModel(Table)
  return Table
}
