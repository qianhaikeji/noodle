'use strict'
const fs = require('fs')
const path = require('path')
const Controller = require('qhkj-framework').Controller

/**
 * @apiDefine channel
 * 渠道
 */
class ChannelController extends Controller {
  constructor(ctx) {
    super(ctx)
  }

    
  /**
   * @api {get} /channels 获取渠道列表
   * @apiVersion 1.0.0
   * @apiGroup channel
   * @apiDescription 获取渠道列表
   * @apiParam { STRING } [pId] (query参数) '渠道Id'
   * @apiParam { STRING } [name] (query参数) '渠道名'
   * @apiUse pagination
   * @apiUse pageResult
   * @apiUse channelResponseEntity
   */
  async getChannelList () {
    let res = await this.service.common.channel.getChannelList(this.queryParams)
    this.restful.success(res)
  }

  /**
   * @api {get} /channels/:id 获取渠道详情
   * @apiVersion 1.0.0
   * @apiGroup channel
   * @apiDescription 获取渠道详情
   * @apiParam {Integer} id (path参数)渠道id
   * @apiUse channelResponseEntity
   */
  async getChannelDetail () {
    const { id } = this.pathParams
    const res = await this.service.common.channel.getChannel(id)
    this.restful.success(res)
  }


  /**
   * @api {post} /channels 创建渠道
   * @apiVersion 1.0.0
   * @apiGroup channel
   * @apiDescription 创建渠道
   * @apiUse channelRequestEntity
   * @apiUse channelResponseEntity
   */
  async createChannel () {
    const res = await this.service.common.channel.addChannel(this.requestBody)
    this.restful.created(res)
  }

  /**
   * @api {put} /channels/:id 修改渠道
   * @apiVersion 1.0.0
   * @apiGroup channel
   * @apiDescription 修改渠道
   * @apiParam {Integer} id (path参数)渠道id
   * @apiUse channelRequestEntity
   * @apiUse channelResponseEntity
   */
  async modifyChannel () {
    const { id } = this.pathParams
    const res = await this.service.common.channel.modifyChannel(id, this.requestBody)
    this.restful.success(res)
  }

  /**
   * @api {delete} /channels/:id 删除渠道
   * @apiVersion 1.0.0
   * @apiGroup channel
   * @apiDescription 根据 id 删除一条渠道
   * @apiParam {Integer} id (path参数)渠道id
   */
  async deleteChannel () {
    const { id } = this.pathParams
    await this.service.common.channel.deleteChannel(id)
    this.restful.deleted()
  }

}

module.exports = ChannelController