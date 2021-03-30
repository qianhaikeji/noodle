'use strict'

const utils = require('./utils')

/**
 * @apiDefine welfareUserRequestEntity 淘福利商城用户请求实体
 * @apiParam { STRING } [nickName] (body参数) '昵称'
 * @apiParam { STRING } [unionId] (body参数) 'unionId'
 * @apiParam { STRING } [openId] (body参数) 'openId'
 * @apiParam { DATE } [registerDatetime] (body参数) '注册时间'
 * @apiParam { DATE } [lastLoginDatetime] (body参数) '最后登录时间'
 * @apiParam { STRING } [userIcon] (body参数) '用户头像'
 * @apiParam { INTEGER } [coinBalance] (body参数) '福币余额'
 * @apiParam { INTEGER } [walletBalance] (body参数) '钱包余额'
 * @apiParam { INTEGER } [totalCoin] (body参数) '累计获取福币'
 * @apiParam { INTEGER } [totalPacket] (body参数) '累计获取红包'
 * @apiParam { INTEGER } [leftPacketChanceCount] (body参数) '剩余可抽取红包机会'
 * @apiParam { STRING } [phone] (body参数) '用户绑定手机号'
 * @apiParam { BOOLEAN } [isFollowedWxpub] (body参数) '是否关注了公众号'
 * @apiParam { INTEGER } [continousSigninCount] (body参数) '连续签到天数'
*/

/**
 * @apiDefine welfareUserResponseEntity 淘福利商城用户响应实体
 * @apiSuccess { INTEGER } rows.id 'id'
 * @apiSuccess { STRING } rows.nickName '昵称'
 * @apiSuccess { STRING } rows.unionId 'unionId'
 * @apiSuccess { STRING } rows.openId 'openId'
 * @apiSuccess { DATE } rows.registerDatetime '注册时间'
 * @apiSuccess { DATE } rows.lastLoginDatetime '最后登录时间'
 * @apiSuccess { STRING } rows.userIcon '用户头像'
 * @apiSuccess { INTEGER } rows.coinBalance '福币余额'
 * @apiSuccess { INTEGER } rows.walletBalance '钱包余额'
 * @apiSuccess { INTEGER } rows.totalCoin '累计获取福币'
 * @apiSuccess { INTEGER } rows.totalPacket '累计获取红包'
 * @apiSuccess { INTEGER } rows.leftPacketChanceCount '剩余可抽取红包机会'
 * @apiSuccess { STRING } rows.phone '用户绑定手机号'
 * @apiSuccess { BOOLEAN } rows.isFollowedWxpub '是否关注了公众号'
 * @apiSuccess { INTEGER } rows.continousSigninCount '连续签到天数'
*/

module.exports = app => {
  const { STRING, INTEGER, DATE, DATEONLY, TEXT, JSON, FLOAT, DOUBLE, BOOLEAN } = app.Sequelize

  const Table = app.model.define('welfareUser', {
    id: {
      type: INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    nickName: {
      type: STRING,
      comment: '昵称',
    },
    unionId: {
      type: STRING,
      comment: 'unionId',
    },
    openId: {
      type: STRING,
      comment: 'openId',
    },
    registerDatetime: {
      type: DATE,
      comment: '注册时间',
    },
    lastLoginDatetime: {
      type: DATE,
      comment: '最后登录时间',
    },
    userIcon: {
      type: STRING,
      comment: '用户头像',
    },
    coinBalance: {
      type: INTEGER,
      comment: '福币余额',
    },
    walletBalance: {
      type: INTEGER,
      comment: '钱包余额',
    },
    totalCoin: {
      type: INTEGER,
      comment: '累计获取福币',
    },
    totalPacket: {
      type: INTEGER,
      comment: '累计获取红包',
    },
    leftPacketChanceCount: {
      type: INTEGER,
      comment: '剩余可抽取红包机会',
    },
    phone: {
      type: STRING,
      comment: '用户绑定手机号',
    },
    isFollowedWxpub: {
      type: BOOLEAN,
      comment: '是否关注了公众号',
    },
    continousSigninCount: {
      type: INTEGER,
      comment: '连续签到天数',
    },
  }, {
    tableName: 'welfare_user'
  })
  
  utils.extendModel(Table)
  return Table
}
