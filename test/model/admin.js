'use strict'

const utils = require('./utils')

/**
 * @apiDefine adminRequestEntity 管理员请求实体
 * @apiParam { INTEGER } [id] (body参数) '字段说明'
 * @apiParam { INTEGER } [name] (body参数) '字段说明'
*/

/**
 * @apiDefine adminResponseEntity 管理员响应实体
 * @apiSuccess { INTEGER } rows.id '字段说明'
 * @apiSuccess { INTEGER } rows.name '字段说明'
*/

module.exports = app => {
  const { STRING, INTEGER, DATE, DATEONLY, TEXT, JSON, FLOAT, DOUBLE, BOOLEAN } = app.Sequelize

  const Table = app.model.define('admin', {
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
    tableName: 'admin'
  })
  
  utils.extendModel(Table)
  return Table
}
