'use strict'

const utils = require('./utils')

/**
 * @apiDefine welfareDailyTaskRequestEntity 用户完成任务记录请求实体
 * @apiParam { STRING } [userId] (body参数) '用户id'
 * @apiParam { DATE } [taskDate] (body参数) '任务时间'
 * @apiParam { STRING } [taskDateStr] (body参数) '任务日期'
 * @apiParam { INTEGER } [taskType] (body参数) '任务类型'
 * @apiParam { STRING } [taskDesc] (body参数) '任务描述'
 * @apiParam { INTEGER } [status] (body参数) '任务状态: 1-待处理, 2-处理成功, 3-处理失败'
 * @apiParam { JSON } [errors] (body参数) '失败原因'
 * @apiParam { BOOLEAN } [awarded] (body参数) '是否奖励'
 * @apiParam { STRING } [awardDesc] (body参数) '奖励处理的描述，比如当超出了奖励上限时，可记录不给用户奖励的原因'
*/

/**
 * @apiDefine welfareDailyTaskResponseEntity 用户完成任务记录响应实体
 * @apiSuccess { INTEGER } rows.id 'id'
 * @apiSuccess { STRING } rows.userId '用户id'
 * @apiSuccess { DATE } rows.taskDate '任务时间'
 * @apiSuccess { STRING } rows.taskDateStr '任务日期'
 * @apiSuccess { INTEGER } rows.taskType '任务类型'
 * @apiSuccess { STRING } rows.taskDesc '任务描述'
 * @apiSuccess { INTEGER } rows.status '任务状态: 1-待处理, 2-处理成功, 3-处理失败'
 * @apiSuccess { JSON } rows.errors '失败原因'
 * @apiSuccess { BOOLEAN } rows.awarded '是否奖励'
 * @apiSuccess { STRING } rows.awardDesc '奖励处理的描述，比如当超出了奖励上限时，可记录不给用户奖励的原因'
*/

module.exports = app => {
  const { STRING, INTEGER, DATE, DATEONLY, TEXT, JSON, FLOAT, DOUBLE, BOOLEAN } = app.Sequelize

  const Table = app.model.define('welfareDailyTask', {
    id: {
      type: INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    userId: {
      type: STRING,
      comment: '用户id',
    },
    taskDate: {
      type: DATE,
      comment: '任务时间',
    },
    taskDateStr: {
      type: STRING,
      comment: '任务日期',
    },
    taskType: {
      type: INTEGER,
      comment: '任务类型',
    },
    taskDesc: {
      type: STRING,
      comment: '任务描述',
    },
    status: {
      type: INTEGER,
      comment: '任务状态: 1-待处理, 2-处理成功, 3-处理失败',
    },
    errors: {
      type: JSON,
      defaultValue: {},
      comment: '失败原因',
    },
    awarded: {
      type: BOOLEAN,
      comment: '是否奖励',
    },
    awardDesc: {
      type: STRING,
      comment: '奖励处理的描述，比如当超出了奖励上限时，可记录不给用户奖励的原因',
    },
  }, {
    tableName: 'welfare_daily_task'
  })
  
  utils.extendModel(Table)
  return Table
}
