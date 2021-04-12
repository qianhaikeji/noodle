'use strict'

const utils = require('./utils')

/**
 * @apiDefine prizeShowRequestEntity 中奖晒单请求实体
 * @apiParam { STRING } [playerName] (body参数) '用户名'
 * @apiParam { STRING } [playerIcon] (body参数) '用户头像'
 * @apiParam { STRING } [content] (body参数) '晒单内容'
 * @apiParam { JSON } [images] (body参数) '晒单图片'
 * @apiParam { DATE } [time] (body参数) '晒单日期'
*/

/**
 * @apiDefine prizeShowResponseEntity 中奖晒单响应实体
 * @apiSuccess { INTEGER } rows.id 'id'
 * @apiSuccess { STRING } rows.playerName '用户名'
 * @apiSuccess { STRING } rows.playerIcon '用户头像'
 * @apiSuccess { STRING } rows.content '晒单内容'
 * @apiSuccess { JSON } rows.images '晒单图片'
 * @apiSuccess { DATE } rows.time '晒单日期'
*/

module.exports = app => {
  const { STRING, INTEGER, DATE, DATEONLY, TEXT, JSON, FLOAT, DOUBLE, BOOLEAN } = app.Sequelize

  const Table = app.model.define('prizeShow', {
    id: {
      type: INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    playerName: {
      type: STRING,
      comment: '用户名',
    },
    playerIcon: {
      type: STRING,
      comment: '用户头像',
    },
    content: {
      type: STRING,
      comment: '晒单内容',
    },
    images: {
      type: JSON,
      defaultValue: [],
      comment: '晒单图片',
    },
    time: {
      type: DATE,
      comment: '晒单日期',
    },
  }, {
    tableName: 'prize_show'
  })
  
  utils.extendModel(Table)
  return Table
}
