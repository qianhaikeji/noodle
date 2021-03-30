'use strict'

const utils = require('./utils')

/**
 * @apiDefine welfareWalletRecordRequestEntity 用户钱包记录请求实体
 * @apiParam { STRING } [userId] (body参数) '用户id'
 * @apiParam { STRING } [desc] (body参数) '记录描述'
 * @apiParam { DATE } [datetime] (body参数) '发生时间'
 * @apiParam { INTEGER } [money] (body参数) '金额'
 * @apiParam { JSON } [meta] (body参数) '魔术字段'
*/

/**
 * @apiDefine welfareWalletRecordResponseEntity 用户钱包记录响应实体
 * @apiSuccess { INTEGER } rows.id 'id'
 * @apiSuccess { STRING } rows.userId '用户id'
 * @apiSuccess { STRING } rows.desc '记录描述'
 * @apiSuccess { DATE } rows.datetime '发生时间'
 * @apiSuccess { INTEGER } rows.money '金额'
 * @apiSuccess { JSON } rows.meta '魔术字段'
*/

module.exports = app => {
  const { STRING, INTEGER, DATE, DATEONLY, TEXT, JSON, FLOAT, DOUBLE, BOOLEAN } = app.Sequelize

  const Table = app.model.define('welfareWalletRecord', {
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
    money: {
      type: INTEGER,
      comment: '金额',
    },
    meta: {
      type: JSON,
      defaultValue: {},
      comment: '魔术字段',
    },
  }, {
    tableName: 'welfare_wallet_record'
  })
  
  utils.extendModel(Table)
  return Table
}
