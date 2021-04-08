'use strict'

const utils = require('./utils')

/**
 * @apiDefine abTargetRequestEntity AB测试指标请求实体
 * @apiParam { STRING } [name] (body参数) '指标名称'
 * @apiParam { STRING } [description] (body参数) '指标描述'
 * @apiParam { JSON } [customFields] (body参数) '自定义字段'
*/

/**
 * @apiDefine abTargetResponseEntity AB测试指标响应实体
 * @apiSuccess { INTEGER } rows.id 'id'
 * @apiSuccess { STRING } rows.name '指标名称'
 * @apiSuccess { STRING } rows.description '指标描述'
 * @apiSuccess { JSON } rows.customFields '自定义字段'
*/

module.exports = app => {
  const { STRING, INTEGER, DATE, DATEONLY, TEXT, JSON, FLOAT, DOUBLE, BOOLEAN } = app.Sequelize

  const Table = app.model.define('abTarget', {
    id: {
      type: INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    name: {
      type: STRING,
      comment: '指标名称',
    },
    description: {
      type: STRING,
      comment: '指标描述',
    },
    customFields: {
      type: JSON,
      defaultValue: {},
      comment: '自定义字段',
    },
  }, {
    tableName: 'ab_target'
  })
  
  utils.extendModel(Table)
  return Table
}
