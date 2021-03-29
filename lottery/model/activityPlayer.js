'use strict'

const utils = require('./utils')

/**
 * @apiDefine activityPlayerRequestEntity 参与抽奖用户记录请求实体
 * @apiParam { STRING } [activityId] (body参数) '活动id'
 * @apiParam { STRING } [playerId] (body参数) '用户id'
 * @apiParam { STRING } [playerName] (body参数) '用户名'
 * @apiParam { STRING } [playerIcon] (body参数) '用户头像'
 * @apiParam { STRING } [assistWXACode] (body参数) '助力二维码'
 * @apiParam { INTEGER } [assistCount] (body参数) '助力数'
 * @apiParam { BOOLEAN } [isWinner] (body参数) '是否中奖'
 * @apiParam { BOOLEAN } [isRealUser] (body参数) '是否真实用户'
 * @apiParam { STRING } [prizeLevel] (body参数) '中奖等级'
 * @apiParam { JSON } [prize] (body参数) '奖品信息'
 * @apiParam { JSON } [recvAddr] (body参数) '收货地址'
*/

/**
 * @apiDefine activityPlayerResponseEntity 参与抽奖用户记录响应实体
 * @apiSuccess { INTEGER } rows.id 'id'
 * @apiSuccess { STRING } rows.activityId '活动id'
 * @apiSuccess { STRING } rows.playerId '用户id'
 * @apiSuccess { STRING } rows.playerName '用户名'
 * @apiSuccess { STRING } rows.playerIcon '用户头像'
 * @apiSuccess { STRING } rows.assistWXACode '助力二维码'
 * @apiSuccess { INTEGER } rows.assistCount '助力数'
 * @apiSuccess { BOOLEAN } rows.isWinner '是否中奖'
 * @apiSuccess { BOOLEAN } rows.isRealUser '是否真实用户'
 * @apiSuccess { STRING } rows.prizeLevel '中奖等级'
 * @apiSuccess { JSON } rows.prize '奖品信息'
 * @apiSuccess { JSON } rows.recvAddr '收货地址'
*/

module.exports = app => {
  const { STRING, INTEGER, DATE, DATEONLY, TEXT, JSON, FLOAT, DOUBLE, BOOLEAN } = app.Sequelize

  const Table = app.model.define('activityPlayer', {
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
    assistWXACode: {
      type: STRING,
      comment: '助力二维码',
    },
    assistCount: {
      type: INTEGER,
      comment: '助力数',
    },
    isWinner: {
      type: BOOLEAN,
      defaultValue: false,
      comment: '是否中奖',
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
    tableName: 'activity_player'
  })
  
  utils.extendModel(Table)
  return Table
}
