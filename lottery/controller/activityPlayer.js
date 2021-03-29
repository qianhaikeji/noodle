'use strict'
const fs = require('fs')
const path = require('path')
const Controller = require('qhkj-framework').Controller

/**
 * @apiDefine activityPlayer
 * 参与抽奖用户记录
 */
class ActivityPlayerController extends Controller {
  constructor(ctx) {
    super(ctx)
  }

    
  /**
   * @api {get} /activityPlayers 获取参与抽奖用户记录列表
   * @apiVersion 1.0.0
   * @apiGroup activityPlayer
   * @apiDescription 获取参与抽奖用户记录列表
   * @apiParam { STRING } [activityId] (query参数) '活动id'
   * @apiParam { STRING } [playerId] (query参数) '用户id'
   * @apiParam { STRING } [playerName] (query参数) '用户名'
   * @apiParam { BOOLEAN } [isWinner] (query参数) '是否中奖'
   * @apiParam { BOOLEAN } [isRealUser] (query参数) '是否真实用户'
   * @apiParam { STRING } [prizeLevel] (query参数) '中奖等级'
   * @apiUse pagination
   * @apiUse pageResult
   * @apiUse activityPlayerResponseEntity
   */
  async getActivityPlayerList () {
    let res = await this.service.lottery.activityPlayer.getActivityPlayerList(this.queryParams)
    this.restful.success(res)
  }

  /**
   * @api {get} /activityPlayers/:id 获取参与抽奖用户记录详情
   * @apiVersion 1.0.0
   * @apiGroup activityPlayer
   * @apiDescription 获取参与抽奖用户记录详情
   * @apiParam {Integer} id (path参数)参与抽奖用户记录id
   * @apiUse activityPlayerResponseEntity
   */
  async getActivityPlayerDetail () {
    const { id } = this.pathParams
    const res = await this.service.lottery.activityPlayer.getActivityPlayer(id)
    this.restful.success(res)
  }


  /**
   * @api {post} /activityPlayers 创建参与抽奖用户记录
   * @apiVersion 1.0.0
   * @apiGroup activityPlayer
   * @apiDescription 创建参与抽奖用户记录
   * @apiUse activityPlayerRequestEntity
   * @apiUse activityPlayerResponseEntity
   */
  async createActivityPlayer () {
    const res = await this.service.lottery.activityPlayer.addActivityPlayer(this.requestBody)
    this.restful.created(res)
  }

  /**
   * @api {put} /activityPlayers/:id 修改参与抽奖用户记录
   * @apiVersion 1.0.0
   * @apiGroup activityPlayer
   * @apiDescription 修改参与抽奖用户记录
   * @apiParam {Integer} id (path参数)参与抽奖用户记录id
   * @apiUse activityPlayerRequestEntity
   * @apiUse activityPlayerResponseEntity
   */
  async modifyActivityPlayer () {
    const { id } = this.pathParams
    const res = await this.service.lottery.activityPlayer.modifyActivityPlayer(id, this.requestBody)
    this.restful.success(res)
  }

  /**
   * @api {delete} /activityPlayers/:id 删除参与抽奖用户记录
   * @apiVersion 1.0.0
   * @apiGroup activityPlayer
   * @apiDescription 根据 id 删除一条参与抽奖用户记录
   * @apiParam {Integer} id (path参数)参与抽奖用户记录id
   */
  async deleteActivityPlayer () {
    const { id } = this.pathParams
    await this.service.lottery.activityPlayer.deleteActivityPlayer(id)
    this.restful.deleted()
  }

    
  /**
   * @api {get} /preDrawInfos 获取预开奖结果列表
   * @apiVersion 1.0.0
   * @apiGroup activityPlayer
   * @apiDescription 获取预开奖结果列表
   * @apiParam { STRING } [activityId] (query参数) '活动id'
   * @apiParam { STRING } [playerId] (query参数) '用户id'
   * @apiParam { STRING } [playerName] (query参数) '用户名'
   * @apiParam { BOOLEAN } [isRealUser] (query参数) '是否真实用户'
   * @apiParam { STRING } [prizeLevel] (query参数) '中奖等级'
   * @apiUse pagination
   * @apiUse pageResult
   * @apiUse preDrawInfoResponseEntity
   */
  async getPreDrawInfoList () {
    let res = await this.service.lottery.activityPlayer.getPreDrawInfoList(this.queryParams)
    this.restful.success(res)
  }

  /**
   * @api {get} /preDrawInfos/:id 获取预开奖结果详情
   * @apiVersion 1.0.0
   * @apiGroup activityPlayer
   * @apiDescription 获取预开奖结果详情
   * @apiParam {Integer} id (path参数)预开奖结果id
   * @apiUse preDrawInfoResponseEntity
   */
  async getPreDrawInfoDetail () {
    const { id } = this.pathParams
    const res = await this.service.lottery.activityPlayer.getPreDrawInfo(id)
    this.restful.success(res)
  }





}

module.exports = ActivityPlayerController