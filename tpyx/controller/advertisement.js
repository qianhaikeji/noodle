'use strict'
const fs = require('fs')
const path = require('path')
const Controller = require('qhkj-framework').Controller

/**
 * @apiDefine advertisement
 * 广告
 */
class AdvertisementController extends Controller {
  constructor(ctx) {
    super(ctx)
  }

    
  /**
   * @api {get} /advertisements 获取广告位列表
   * @apiVersion 1.0.0
   * @apiGroup advertisement
   * @apiDescription 获取广告位列表
   * @apiParam { INTEGER } [channelId] (query参数) '渠道ID'
   * @apiParam { INTEGER } [position] (query参数) '广告位置'
   * @apiParam { INTEGER } [type] (query参数) '广告类型'
   * @apiUse pagination
   * @apiUse pageResult
   * @apiUse advertisementResponseEntity
   */
  async getAdvertisementList () {
    let res = await this.service.common.advertisement.getAdvertisementList(this.queryParams)
    this.restful.success(res)
  }

  /**
   * @api {get} /advertisements/:id 获取广告位详情
   * @apiVersion 1.0.0
   * @apiGroup advertisement
   * @apiDescription 获取广告位详情
   * @apiParam {Integer} id (path参数)广告位id
   * @apiUse advertisementResponseEntity
   */
  async getAdvertisementDetail () {
    const { id } = this.pathParams
    const res = await this.service.common.advertisement.getAdvertisement(id)
    this.restful.success(res)
  }


  /**
   * @api {post} /advertisements 创建广告位
   * @apiVersion 1.0.0
   * @apiGroup advertisement
   * @apiDescription 创建广告位
   * @apiUse advertisementRequestEntity
   * @apiUse advertisementResponseEntity
   */
  async createAdvertisement () {
    const res = await this.service.common.advertisement.addAdvertisement(this.requestBody)
    this.restful.created(res)
  }

  /**
   * @api {put} /advertisements/:id 修改广告位
   * @apiVersion 1.0.0
   * @apiGroup advertisement
   * @apiDescription 修改广告位
   * @apiParam {Integer} id (path参数)广告位id
   * @apiUse advertisementRequestEntity
   * @apiUse advertisementResponseEntity
   */
  async modifyAdvertisement () {
    const { id } = this.pathParams
    const res = await this.service.common.advertisement.modifyAdvertisement(id, this.requestBody)
    this.restful.success(res)
  }

  /**
   * @api {delete} /advertisements/:id 删除广告位
   * @apiVersion 1.0.0
   * @apiGroup advertisement
   * @apiDescription 根据 id 删除一条广告位
   * @apiParam {Integer} id (path参数)广告位id
   */
  async deleteAdvertisement () {
    const { id } = this.pathParams
    await this.service.common.advertisement.deleteAdvertisement(id)
    this.restful.deleted()
  }

}

module.exports = AdvertisementController