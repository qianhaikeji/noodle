'use strict'

const utils = require('./utils')

/**
 * @apiDefine activityRequestEntity 抽奖活动请求实体
 * @apiParam { STRING(30) } [title] (body参数) '活动标题'
 * @apiParam { TEXT } [intro] (body参数) '活动说明'
 * @apiParam { STRING } [thumbImage] (body参数) '列表题图'
 * @apiParam { INTEGER } [type] (body参数) '活动开奖类型，ENUM_ACTIVITY_TYPE'
 * @apiParam { JSON } [detailImages] (body参数) '活动详情图'
 * @apiParam { JSON } [galleryImages] (body参数) '活动画廊图'
 * @apiParam { JSON } [prizes] (body参数) '奖品列表'
 * @apiParam { DATE } [lotteryTime] (body参数) '开奖时间，当类型为按时间开奖时有效'
 * @apiParam { INTEGER } [lotteryPlayerCount] (body参数) '开奖人数，当类型为按人数开奖时有效'
 * @apiParam { BOOLEAN } [valid] (body参数) '是否启用活动'
 * @apiParam { BOOLEAN } [recommend] (body参数) '是否作为推荐活动'
 * @apiParam { BOOLEAN } [finished] (body参数) '是否已开奖'
*/

/**
 * @apiDefine activityResponseEntity 抽奖活动响应实体
 * @apiSuccess { INTEGER } rows.id 'id'
 * @apiSuccess { STRING(30) } rows.title '活动标题'
 * @apiSuccess { TEXT } rows.intro '活动说明'
 * @apiSuccess { STRING } rows.thumbImage '列表题图'
 * @apiSuccess { INTEGER } rows.type '活动开奖类型，ENUM_ACTIVITY_TYPE'
 * @apiSuccess { JSON } rows.detailImages '活动详情图'
 * @apiSuccess { JSON } rows.galleryImages '活动画廊图'
 * @apiSuccess { JSON } rows.prizes '奖品列表'
 * @apiSuccess { DATE } rows.lotteryTime '开奖时间，当类型为按时间开奖时有效'
 * @apiSuccess { INTEGER } rows.lotteryPlayerCount '开奖人数，当类型为按人数开奖时有效'
 * @apiSuccess { BOOLEAN } rows.valid '是否启用活动'
 * @apiSuccess { BOOLEAN } rows.recommend '是否作为推荐活动'
 * @apiSuccess { BOOLEAN } rows.finished '是否已开奖'
*/

module.exports = app => {
  const { STRING, INTEGER, DATE, DATEONLY, TEXT, JSON, FLOAT, DOUBLE, BOOLEAN } = app.Sequelize

  const Table = app.model.define('activity', {
    id: {
      type: INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    title: {
      type: STRING(30),
      comment: '活动标题',
    },
    intro: {
      type: TEXT,
      comment: '活动说明',
    },
    thumbImage: {
      type: STRING,
      comment: '列表题图',
    },
    type: {
      type: INTEGER,
      comment: '活动开奖类型，ENUM_ACTIVITY_TYPE',
    },
    detailImages: {
      type: JSON,
      defaultValue: [],
      comment: '活动详情图',
    },
    galleryImages: {
      type: JSON,
      defaultValue: [],
      comment: '活动画廊图',
    },
    prizes: {
      type: JSON,
      defaultValue: [],
      comment: '奖品列表',
    },
    lotteryTime: {
      type: DATE,
      comment: '开奖时间，当类型为按时间开奖时有效',
    },
    lotteryPlayerCount: {
      type: INTEGER,
      comment: '开奖人数，当类型为按人数开奖时有效',
    },
    valid: {
      type: BOOLEAN,
      defaultValue: true,
      faker: true,
      comment: '是否启用活动',
    },
    recommend: {
      type: BOOLEAN,
      defaultValue: false,
      comment: '是否作为推荐活动',
    },
    finished: {
      type: BOOLEAN,
      defaultValue: false,
      comment: '是否已开奖',
    },
  }, {
    tableName: 'activity'
  })
  
  utils.extendModel(Table)
  return Table
}
