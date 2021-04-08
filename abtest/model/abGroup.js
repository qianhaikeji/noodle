'use strict'

const utils = require('./utils')

/**
 * @apiDefine abGroupRequestEntity ab对照组请求实体
 * @apiParam { INTEGER } [abTestId] (body参数) '实验ID'
 * @apiParam { STRING } [abTestName] (body参数) '实验名称'
 * @apiParam { STRING } [name] (body参数) '对照组名称'
 * @apiParam { STRING } [description] (body参数) '对照组描述'
 * @apiParam { STRING } [isDefault] (body参数) '是否默认'
 * @apiParam { FLOAT } [flowRatio] (body参数) '流量比例'
 * @apiParam { JSON } [params] (body参数) '实验参数'
 * @apiParam { JSON } [whiteList] (body参数) '白名单'
 * @apiParam { INTEGER } [allocTimes] (body参数) '对照组分配次数'
 * @apiParam { JSON } [indicators] (body参数) '指标结果'
 * @apiParam { JSON } [customFields] (body参数) '自定义字段'
*/

/**
 * @apiDefine abGroupResponseEntity ab对照组响应实体
 * @apiSuccess { INTEGER } rows.id 'id'
 * @apiSuccess { INTEGER } rows.abTestId '实验ID'
 * @apiSuccess { STRING } rows.abTestName '实验名称'
 * @apiSuccess { STRING } rows.name '对照组名称'
 * @apiSuccess { STRING } rows.description '对照组描述'
 * @apiSuccess { STRING } rows.isDefault '是否默认'
 * @apiSuccess { FLOAT } rows.flowRatio '流量比例'
 * @apiSuccess { JSON } rows.params '实验参数'
 * @apiSuccess { JSON } rows.whiteList '白名单'
 * @apiSuccess { INTEGER } rows.allocTimes '对照组分配次数'
 * @apiSuccess { JSON } rows.indicators '指标结果'
 * @apiSuccess { JSON } rows.customFields '自定义字段'
*/

module.exports = app => {
  const { STRING, INTEGER, DATE, DATEONLY, TEXT, JSON, FLOAT, DOUBLE, BOOLEAN } = app.Sequelize

  const Table = app.model.define('abGroup', {
    id: {
      type: INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    abTestId: {
      type: INTEGER,
      comment: '实验ID',
    },
    abTestName: {
      type: STRING,
      comment: '实验名称',
    },
    name: {
      type: STRING,
      comment: '对照组名称',
    },
    description: {
      type: STRING,
      comment: '对照组描述',
    },
    isDefault: {
      type: STRING,
      comment: '是否默认',
    },
    flowRatio: {
      type: FLOAT,
      comment: '流量比例',
    },
    params: {
      type: JSON,
      defaultValue: {},
      comment: '实验参数',
    },
    whiteList: {
      type: JSON,
      defaultValue: [],
      comment: '白名单',
    },
    allocTimes: {
      type: INTEGER,
      defaultValue: 0,
      comment: '对照组分配次数',
    },
    indicators: {
      type: JSON,
      defaultValue: {},
      comment: '指标结果',
    },
    customFields: {
      type: JSON,
      defaultValue: {},
      comment: '自定义字段',
    },
  }, {
    tableName: 'ab_group'
  })
  
  utils.extendModel(Table)
  return Table
}
