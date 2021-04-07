'use strict'

const utils = require('./utils')

/**
 * @apiDefine welfareUserCoinRecordRequestEntity 用户福币记录请求实体
 * @apiParam { STRING } [userId] (body参数) '用户id'
 * @apiParam { STRING } [desc] (body参数) '记录描述'
 * @apiParam { DATE } [datetime] (body参数) '发生时间'
 * @apiParam { INTEGER } [count] (body参数) '数值'
 * @apiParam { JSON } [meta] (body参数) '魔术字段'
*/

/**
 * @apiDefine welfareUserCoinRecordResponseEntity 用户福币记录响应实体
 * @apiSuccess { INTEGER } rows.id 'id'
 * @apiSuccess { STRING } rows.userId '用户id'
 * @apiSuccess { STRING } rows.desc '记录描述'
 * @apiSuccess { DATE } rows.datetime '发生时间'
 * @apiSuccess { INTEGER } rows.count '数值'
 * @apiSuccess { JSON } rows.meta '魔术字段'
*/

module.exports = app => {
  const { STRING, INTEGER, DATE, DATEONLY, TEXT, JSON, FLOAT, DOUBLE, BOOLEAN } = app.Sequelize

  const Table = app.model.define('welfareUserCoinRecord', {
    id: {
      type: INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    userId: {
      type: STRING,
      comment: '用户id',
    },
    desc: {
      type: STRING,
      comment: '记录描述',
    },
    datetime: {
      type: DATE,
      comment: '发生时间',
    },
    count: {
      type: INTEGER,
      comment: '数值',
    },
    meta: {
      type: JSON,
      defaultValue: {},
      comment: '魔术字段',
    },
  }, {
    tableName: 'welfare_user_coin_record'
  })
  
  utils.extendModel(Table)
  return Table
}
