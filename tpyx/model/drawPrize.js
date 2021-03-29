'use strict'

const utils = require('./utils')

/**
 * @apiDefine drawPrizeRequestEntity 转盘奖项请求实体
 * @apiParam { STRING } [name] (body参数) '奖项名'
 * @apiParam { STRING } [image] (body参数) '图片路径'
 * @apiParam { INTEGER } [originalPrice] (body参数) '商品原价'
 * @apiParam { INTEGER } [couponPrice] (body参数) '优惠券额'
 * @apiParam { STRING } [couponLink] (body参数) '优惠券链接'
 * @apiParam { STRING } [goodsLink] (body参数) '商品优惠后链接'
 * @apiParam { STRING } [wxaAppId] (body参数) '优惠券小程序appId'
 * @apiParam { STRING } [wxaCouponLink] (body参数) '优惠券小程序链接'
 * @apiParam { STRING } [wxaGoodsLink] (body参数) '商品优惠后小程序链接'
 * @apiParam { JSON } [customFields] (body参数) '自定义字段'
*/

/**
 * @apiDefine drawPrizeResponseEntity 转盘奖项响应实体
 * @apiSuccess { INTEGER } rows.id 'id'
 * @apiSuccess { STRING } rows.name '奖项名'
 * @apiSuccess { STRING } rows.image '图片路径'
 * @apiSuccess { INTEGER } rows.originalPrice '商品原价'
 * @apiSuccess { INTEGER } rows.couponPrice '优惠券额'
 * @apiSuccess { STRING } rows.couponLink '优惠券链接'
 * @apiSuccess { STRING } rows.goodsLink '商品优惠后链接'
 * @apiSuccess { STRING } rows.wxaAppId '优惠券小程序appId'
 * @apiSuccess { STRING } rows.wxaCouponLink '优惠券小程序链接'
 * @apiSuccess { STRING } rows.wxaGoodsLink '商品优惠后小程序链接'
 * @apiSuccess { JSON } rows.customFields '自定义字段'
*/

module.exports = app => {
  const { STRING, INTEGER, DATE, DATEONLY, TEXT, JSON, FLOAT, DOUBLE, BOOLEAN } = app.Sequelize

  const Table = app.model.define('drawPrize', {
    id: {
      type: INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    name: {
      type: STRING,
      comment: '奖项名',
    },
    image: {
      type: STRING,
      comment: '图片路径',
    },
    originalPrice: {
      type: INTEGER,
      comment: '商品原价',
    },
    couponPrice: {
      type: INTEGER,
      comment: '优惠券额',
    },
    couponLink: {
      type: STRING,
      comment: '优惠券链接',
    },
    goodsLink: {
      type: STRING,
      comment: '商品优惠后链接',
    },
    wxaAppId: {
      type: STRING,
      comment: '优惠券小程序appId',
    },
    wxaCouponLink: {
      type: STRING,
      comment: '优惠券小程序链接',
    },
    wxaGoodsLink: {
      type: STRING,
      comment: '商品优惠后小程序链接',
    },
    customFields: {
      type: JSON,
      defaultValue: {},
      comment: '自定义字段',
    },
  }, {
    tableName: 'draw_prize'
  })
  
  utils.extendModel(Table)
  return Table
}
