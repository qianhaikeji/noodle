'use strict'
const fs = require('fs')
const path = require('path')
const Controller = require('qhkj-framework').Controller

/**
 * @apiDefine activity
 * 抽奖活动
 */
class ActivityController extends Controller {
  constructor(ctx) {
    super(ctx)
  }

    
  /**
   * @api {get} /activitys 获取抽奖活动列表
   * @apiVersion 1.0.0
   * @apiGroup activity
   * @apiDescription 获取抽奖活动列表
   * @apiParam { STRING(30) } [title] (query参数) '活动标题'
   * @apiParam { INTEGER } [type] (query参数) '活动开奖类型，ENUM_ACTIVITY_TYPE'
   * @apiParam { BOOLEAN } [valid] (query参数) '是否启用活动'
   * @apiParam { BOOLEAN } [recommend] (query参数) '是否作为推荐活动'
   * @apiParam { BOOLEAN } [finished] (query参数) '是否已开奖'
   * @apiUse pagination
   * @apiUse pageResult
   * @apiUse activityResponseEntity
   */
  async getActivityList () {
    let res = await this.service.lottery.activity.getActivityList(this.queryParams)
    this.restful.success(res)
  }

  /**
   * @api {get} /activitys/:id 获取抽奖活动详情
   * @apiVersion 1.0.0
   * @apiGroup activity
   * @apiDescription 获取抽奖活动详情
   * @apiParam {Integer} id (path参数)抽奖活动id
   * @apiUse activityResponseEntity
   */
  async getActivityDetail () {
    const { id } = this.pathParams
    const res = await this.service.lottery.activity.getActivity(id)
    this.restful.success(res)
  }


  /**
   * @api {post} /activitys 创建抽奖活动
   * @apiVersion 1.0.0
   * @apiGroup activity
   * @apiDescription 创建抽奖活动
   * @apiUse activityRequestEntity
   * @apiUse activityResponseEntity
   */
  async createActivity () {
    const res = await this.service.lottery.activity.addActivity(this.requestBody)
    this.restful.created(res)
  }

  /**
   * @api {put} /activitys/:id 修改抽奖活动
   * @apiVersion 1.0.0
   * @apiGroup activity
   * @apiDescription 修改抽奖活动
   * @apiParam {Integer} id (path参数)抽奖活动id
   * @apiUse activityRequestEntity
   * @apiUse activityResponseEntity
   */
  async modifyActivity () {
    const { id } = this.pathParams
    const res = await this.service.lottery.activity.modifyActivity(id, this.requestBody)
    this.restful.success(res)
  }

  /**
   * @api {delete} /activitys/:id 删除抽奖活动
   * @apiVersion 1.0.0
   * @apiGroup activity
   * @apiDescription 根据 id 删除一条抽奖活动
   * @apiParam {Integer} id (path参数)抽奖活动id
   */
  async deleteActivity () {
    const { id } = this.pathParams
    await this.service.lottery.activity.deleteActivity(id)
    this.restful.deleted()
  }

}

module.exports = ActivityController