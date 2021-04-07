'use strict'

const utils = require('./utils')

/**
 * @apiDefine welfareUserOpenPacketRecordRequestEntity 用户开红包记录请求实体
 * @apiParam { STRING } [userId] (body参数) '用户id'
 * @apiParam { STRING } [awardType] (body参数) '红包中奖类型'
 * @apiParam { STRING } [awardValue] (body参数) '红包中奖内容（现金值、福币值、谢谢参与字符串等）'
 * @apiParam { DATE } [datetime] (body参数) '开红包时间'
*/

/**
 * @apiDefine welfareUserOpenPacketRecordResponseEntity 用户开红包记录响应实体
 * @apiSuccess { INTEGER } rows.id 'id'
 * @apiSuccess { STRING } rows.userId '用户id'
 * @apiSuccess { STRING } rows.awardType '红包中奖类型'
 * @apiSuccess { STRING } rows.awardValue '红包中奖内容（现金值、福币值、谢谢参与字符串等）'
 * @apiSuccess { DATE } rows.datetime '开红包时间'
*/

module.exports = app => {
  const { STRING, INTEGER, DATE, DATEONLY, TEXT, JSON, FLOAT, DOUBLE, BOOLEAN } = app.Sequelize

  const Table = app.model.define('welfareUserOpenPacketRecord', {
    id: {
      type: INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    userId: {
      type: STRING,
      comment: '用户id',
    },
    awardType: {
      type: STRING,
      comment: '红包中奖类型',
    },
    awardValue: {
      type: STRING,
      comment: '红包中奖内容（现金值、福币值、谢谢参与字符串等）',
    },
    datetime: {
      type: DATE,
      comment: '开红包时间',
    },
  }, {
    tableName: 'welfare_user_open_packet_record'
  })
  
  utils.extendModel(Table)
  return Table
}
