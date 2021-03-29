'use strict'

const utils = require('./utils')

/**
 * @apiDefine channelPrizeRequestEntity 渠道奖品关系请求实体
 * @apiParam { INTEGER } [channelId] (body参数) '渠道ID'
 * @apiParam { INTEGER } [prizeId] (body参数) '奖品ID'
 * @apiParam { INTEGER } [index] (body参数) '奖项编号(从左上开始顺时针)'
 * @apiParam { BOOLEAN } [enable] (body参数) '是否启用'
 * @apiParam { INTEGER } [order] (body参数) '中奖顺序'
 * @apiParam { JSON } [customFields] (body参数) '自定义字段'
*/

/**
 * @apiDefine channelPrizeResponseEntity 渠道奖品关系响应实体
 * @apiSuccess { INTEGER } rows.id 'id'
 * @apiSuccess { INTEGER } rows.channelId '渠道ID'
 * @apiSuccess { INTEGER } rows.prizeId '奖品ID'
 * @apiSuccess { INTEGER } rows.index '奖项编号(从左上开始顺时针)'
 * @apiSuccess { BOOLEAN } rows.enable '是否启用'
 * @apiSuccess { INTEGER } rows.order '中奖顺序'
 * @apiSuccess { JSON } rows.customFields '自定义字段'
*/

module.exports = app => {
  const { STRING, INTEGER, DATE, DATEONLY, TEXT, JSON, FLOAT, DOUBLE, BOOLEAN } = app.Sequelize

  const Table = app.model.define('channelPrize', {
    id: {
      type: INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    channelId: {
      type: INTEGER,
      comment: '渠道ID',
    },
    prizeId: {
      type: INTEGER,
      comment: '奖品ID',
    },
    index: {
      type: INTEGER,
      comment: '奖项编号(从左上开始顺时针)',
    },
    enable: {
      type: BOOLEAN,
      defaultValue: false,
      faker: false,
      comment: '是否启用',
    },
    order: {
      type: INTEGER,
      comment: '中奖顺序',
    },
    customFields: {
      type: JSON,
      defaultValue: {},
      comment: '自定义字段',
    },
  }, {
    tableName: 'channel_prize'
  })
  
  utils.extendModel(Table)
  return Table
}
