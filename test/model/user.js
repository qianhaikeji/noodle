'use strict'

const utils = require('./utils')

/**
 * @apiDefine userRequestEntity 用户请求实体
 * @apiParam { INTEGER } [id] (body参数) '字段说明'
 * @apiParam { INTEGER } [name] (body参数) '字段说明'
*/

/**
 * @apiDefine userResponseEntity 用户响应实体
 * @apiSuccess { INTEGER } rows.id '字段说明'
 * @apiSuccess { INTEGER } rows.name '字段说明'
*/

module.exports = app => {
  const { STRING, INTEGER, DATE, DATEONLY, TEXT, JSON, FLOAT, DOUBLE, BOOLEAN } = app.Sequelize

  const Table = app.model.define('user', {
    id: {
      type: INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
      unique: true,
      faker: `faker.internet.userName()`,
      comment: '字段说明',
    },
    name: {
      type: INTEGER,
      allowNull: false,
      unique: true,
      faker: `faker.internet.userName()`,
      comment: '字段说明',
    },
  }, {
    tableName: 'user'
  })
  
  utils.extendModel(Table)
  return Table
}
