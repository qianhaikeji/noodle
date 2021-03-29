'use strict'
const fs = require('fs')
const path = require('path')
const Controller = require('qhkj-framework').Controller

/**
 * @apiDefine drawPrize
 * 奖品
 */
class DrawPrizeController extends Controller {
  constructor(ctx) {
    super(ctx)
  }

    
  /**
   * @api {get} /drawPrizes 获取转盘奖项列表
   * @apiVersion 1.0.0
   * @apiGroup drawPrize
   * @apiDescription 获取转盘奖项列表
   * @apiParam { STRING } [name] (query参数) '奖项名'
   * @apiUse pagination
   * @apiUse pageResult
   * @apiUse drawPrizeResponseEntity
   */
  async getDrawPrizeList () {
    let res = await this.service.draw.draw.getDrawPrizeList(this.queryParams)
    this.restful.success(res)
  }

  /**
   * @api {get} /drawPrizes/:id 获取转盘奖项详情
   * @apiVersion 1.0.0
   * @apiGroup drawPrize
   * @apiDescription 获取转盘奖项详情
   * @apiParam {Integer} id (path参数)转盘奖项id
   * @apiUse drawPrizeResponseEntity
   */
  async getDrawPrizeDetail () {
    const { id } = this.pathParams
    const res = await this.service.draw.draw.getDrawPrize(id)
    this.restful.success(res)
  }


  /**
   * @api {post} /drawPrizes 创建转盘奖项
   * @apiVersion 1.0.0
   * @apiGroup drawPrize
   * @apiDescription 创建转盘奖项
   * @apiUse drawPrizeRequestEntity
   * @apiUse drawPrizeResponseEntity
   */
  async createDrawPrize () {
    const res = await this.service.draw.draw.addDrawPrize(this.requestBody)
    this.restful.created(res)
  }

  /**
   * @api {put} /drawPrizes/:id 修改转盘奖项
   * @apiVersion 1.0.0
   * @apiGroup drawPrize
   * @apiDescription 修改转盘奖项
   * @apiParam {Integer} id (path参数)转盘奖项id
   * @apiUse drawPrizeRequestEntity
   * @apiUse drawPrizeResponseEntity
   */
  async modifyDrawPrize () {
    const { id } = this.pathParams
    const res = await this.service.draw.draw.modifyDrawPrize(id, this.requestBody)
    this.restful.success(res)
  }

  /**
   * @api {delete} /drawPrizes/:id 删除转盘奖项
   * @apiVersion 1.0.0
   * @apiGroup drawPrize
   * @apiDescription 根据 id 删除一条转盘奖项
   * @apiParam {Integer} id (path参数)转盘奖项id
   */
  async deleteDrawPrize () {
    const { id } = this.pathParams
    await this.service.draw.draw.deleteDrawPrize(id)
    this.restful.deleted()
  }

}

module.exports = DrawPrizeController