'use strict'

const utils = require('./utils')

/**
 * @apiDefine abAllocationRequestEntity AB测试分配记录请求实体
 * @apiParam { STRING } [clientId] (body参数) '用户标识'
 * @apiParam { INTEGER } [abTestId] (body参数) '实验ID'
 * @apiParam { STRING } [abTestName] (body参数) '实验名称'
 * @apiParam { INTEGER } [abGroupId] (body参数) '对照组ID'
 * @apiParam { STRING } [abGroupName] (body参数) '对照组名称'
 * @apiParam { JSON } [customFields] (body参数) '自定义字段'
*/

/**
 * @apiDefine abAllocationResponseEntity AB测试分配记录响应实体
 * @apiSuccess { INTEGER } rows.id 'id'
 * @apiSuccess { STRING } rows.clientId '用户标识'
 * @apiSuccess { INTEGER } rows.abTestId '实验ID'
 * @apiSuccess { STRING } rows.abTestName '实验名称'
 * @apiSuccess { INTEGER } rows.abGroupId '对照组ID'
 * @apiSuccess { STRING } rows.abGroupName '对照组名称'
 * @apiSuccess { JSON } rows.customFields '自定义字段'
*/

module.exports = app => {
  const { STRING, INTEGER, DATE, DATEONLY, TEXT, JSON, FLOAT, DOUBLE, BOOLEAN } = app.Sequelize

  const Table = app.model.define('abAllocation', {
    id: {
      type: INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    clientId: {
      type: STRING,
      comment: '用户标识',
    },
    abTestId: {
      type: INTEGER,
      comment: '实验ID',
    },
    abTestName: {
      type: STRING,
      comment: '实验名称',
    },
    abGroupId: {
      type: INTEGER,
      comment: '对照组ID',
    },
    abGroupName: {
      type: STRING,
      comment: '对照组名称',
    },
    customFields: {
      type: JSON,
      defaultValue: {},
      comment: '自定义字段',
    },
  }, {
    tableName: 'ab_allocation'
  })
  
  utils.extendModel(Table)
  return Table
}
