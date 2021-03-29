'use strict'
const fs = require('fs')
const path = require('path')
const Controller = require('qhkj-framework').Controller

/**
 * @apiDefine channelPrize
 * 渠道奖品关系
 */
class ChannelPrizeController extends Controller {
  constructor(ctx) {
    super(ctx)
  }

    
  /**
   * @api {get} /channelPrizes 获取渠道奖品关系列表
   * @apiVersion 1.0.0
   * @apiGroup channelPrize
   * @apiDescription 获取渠道奖品关系列表
   * @apiParam { INTEGER } [channelId] (query参数) '渠道ID'
   * @apiUse pagination
   * @apiUse pageResult
   * @apiUse channelPrizeResponseEntity
   */
  async getChannelPrizeList () {
    let res = await this.service.draw.draw.getChannelPrizeList(this.queryParams)
    this.restful.success(res)
  }

  /**
   * @api {get} /channelPrizes/:id 获取渠道奖品关系详情
   * @apiVersion 1.0.0
   * @apiGroup channelPrize
   * @apiDescription 获取渠道奖品关系详情
   * @apiParam {Integer} id (path参数)渠道奖品关系id
   * @apiUse channelPrizeResponseEntity
   */
  async getChannelPrizeDetail () {
    const { id } = this.pathParams
    const res = await this.service.draw.draw.getChannelPrize(id)
    this.restful.success(res)
  }


  /**
   * @api {post} /channelPrizes 创建渠道奖品关系
   * @apiVersion 1.0.0
   * @apiGroup channelPrize
   * @apiDescription 创建渠道奖品关系
   * @apiUse channelPrizeRequestEntity
   * @apiUse channelPrizeResponseEntity
   */
  async createChannelPrize () {
    const res = await this.service.draw.draw.addChannelPrize(this.requestBody)
    this.restful.created(res)
  }

  /**
   * @api {put} /channelPrizes/:id 修改渠道奖品关系
   * @apiVersion 1.0.0
   * @apiGroup channelPrize
   * @apiDescription 修改渠道奖品关系
   * @apiParam {Integer} id (path参数)渠道奖品关系id
   * @apiUse channelPrizeRequestEntity
   * @apiUse channelPrizeResponseEntity
   */
  async modifyChannelPrize () {
    const { id } = this.pathParams
    const res = await this.service.draw.draw.modifyChannelPrize(id, this.requestBody)
    this.restful.success(res)
  }

  /**
   * @api {delete} /channelPrizes/:id 删除渠道奖品关系
   * @apiVersion 1.0.0
   * @apiGroup channelPrize
   * @apiDescription 根据 id 删除一条渠道奖品关系
   * @apiParam {Integer} id (path参数)渠道奖品关系id
   */
  async deleteChannelPrize () {
    const { id } = this.pathParams
    await this.service.draw.draw.deleteChannelPrize(id)
    this.restful.deleted()
  }

}

module.exports = ChannelPrizeController