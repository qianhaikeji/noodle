'use strict'

const utils = require('./utils')

/**
 * @apiDefine preDrawInfoRequestEntity 预开奖结果请求实体
 * @apiParam { STRING } [activityId] (body参数) '活动id'
 * @apiParam { STRING } [playerId] (body参数) '用户id'
 * @apiParam { STRING } [playerName] (body参数) '用户名'
 * @apiParam { STRING } [playerIcon] (body参数) '用户头像'
 * @apiParam { INTEGER } [assistCount] (body参数) '助力数'
 * @apiParam { BOOLEAN } [isRealUser] (body参数) '是否真实用户'
 * @apiParam { STRING } [prizeLevel] (body参数) '中奖等级'
 * @apiParam { JSON } [prize] (body参数) '奖品信息'
 * @apiParam { JSON } [recvAddr] (body参数) '收货地址'
*/

/**
 * @apiDefine preDrawInfoResponseEntity 预开奖结果响应实体
 * @apiSuccess { INTEGER } rows.id 'id'
 * @apiSuccess { STRING } rows.activityId '活动id'
 * @apiSuccess { STRING } rows.playerId '用户id'
 * @apiSuccess { STRING } rows.playerName '用户名'
 * @apiSuccess { STRING } rows.playerIcon '用户头像'
 * @apiSuccess { INTEGER } rows.assistCount '助力数'
 * @apiSuccess { BOOLEAN } rows.isRealUser '是否真实用户'
 * @apiSuccess { STRING } rows.prizeLevel '中奖等级'
 * @apiSuccess { JSON } rows.prize '奖品信息'
 * @apiSuccess { JSON } rows.recvAddr '收货地址'
*/

module.exports = app => {
  const { STRING, INTEGER, DATE, DATEONLY, TEXT, JSON, FLOAT, DOUBLE, BOOLEAN } = app.Sequelize

  const Table = app.model.define('preDrawInfo', {
    id: {
      type: INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    activityId: {
      type: STRING,
      comment: '活动id',
    },
    playerId: {
      type: STRING,
      comment: '用户id',
    },
    playerName: {
      type: STRING,
      comment: '用户名',
    },
    playerIcon: {
      type: STRING,
      comment: '用户头像',
    },
    assistCount: {
      type: INTEGER,
      comment: '助力数',
    },
    isRealUser: {
      type: BOOLEAN,
      defaultValue: true,
      comment: '是否真实用户',
    },
    prizeLevel: {
      type: STRING,
      comment: '中奖等级',
    },
    prize: {
      type: JSON,
      defaultValue: null,
      comment: '奖品信息',
    },
    recvAddr: {
      type: JSON,
      defaultValue: {},
      comment: '收货地址',
    },
  }, {
    tableName: 'pre_draw_info'
  })
  
  utils.extendModel(Table)
  return Table
}
