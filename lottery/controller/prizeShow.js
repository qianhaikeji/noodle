'use strict'
const fs = require('fs')
const path = require('path')
const Controller = require('qhkj-framework').Controller

/**
 * @apiDefine prizeShow
 * 中奖晒单记录
 */
class PrizeShowController extends Controller {
  constructor(ctx) {
    super(ctx)
  }

    
  /**
   * @api {get} /prizeShows 获取中奖晒单列表
   * @apiVersion 1.0.0
   * @apiGroup prizeShow
   * @apiDescription 获取中奖晒单列表
   * @apiUse pagination
   * @apiUse pageResult
   * @apiUse prizeShowResponseEntity
   */
  async getPrizeShowList () {
    let res = await this.service.lottery.prizeShow.getPrizeShowList(this.queryParams)
    this.restful.success(res)
  }

  /**
   * @api {get} /prizeShows/:id 获取中奖晒单详情
   * @apiVersion 1.0.0
   * @apiGroup prizeShow
   * @apiDescription 获取中奖晒单详情
   * @apiParam {Integer} id (path参数)中奖晒单id
   * @apiUse prizeShowResponseEntity
   */
  async getPrizeShowDetail () {
    const { id } = this.pathParams
    const res = await this.service.lottery.prizeShow.getPrizeShow(id)
    this.restful.success(res)
  }


  /**
   * @api {post} /prizeShows 创建中奖晒单
   * @apiVersion 1.0.0
   * @apiGroup prizeShow
   * @apiDescription 创建中奖晒单
   * @apiUse prizeShowRequestEntity
   * @apiUse prizeShowResponseEntity
   */
  async createPrizeShow () {
    const res = await this.service.lottery.prizeShow.addPrizeShow(this.requestBody)
    this.restful.created(res)
  }

  /**
   * @api {put} /prizeShows/:id 修改中奖晒单
   * @apiVersion 1.0.0
   * @apiGroup prizeShow
   * @apiDescription 修改中奖晒单
   * @apiParam {Integer} id (path参数)中奖晒单id
   * @apiUse prizeShowRequestEntity
   * @apiUse prizeShowResponseEntity
   */
  async modifyPrizeShow () {
    const { id } = this.pathParams
    const res = await this.service.lottery.prizeShow.modifyPrizeShow(id, this.requestBody)
    this.restful.success(res)
  }

  /**
   * @api {delete} /prizeShows/:id 删除中奖晒单
   * @apiVersion 1.0.0
   * @apiGroup prizeShow
   * @apiDescription 根据 id 删除一条中奖晒单
   * @apiParam {Integer} id (path参数)中奖晒单id
   */
  async deletePrizeShow () {
    const { id } = this.pathParams
    await this.service.lottery.prizeShow.deletePrizeShow(id)
    this.restful.deleted()
  }

}

module.exports = PrizeShowController