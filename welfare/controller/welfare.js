'use strict'
const fs = require('fs')
const path = require('path')
const Controller = require('qhkj-framework').Controller

/**
 * @apiDefine welfare
 * 淘福利商城
 */
class WelfareController extends Controller {
  constructor(ctx) {
    super(ctx)
  }

    
  /**
   * @api {get} /welfareUsers 获取淘福利商城用户列表
   * @apiVersion 1.0.0
   * @apiGroup welfare
   * @apiDescription 获取淘福利商城用户列表
   * @apiParam { STRING } [nickName] (query参数) '昵称'
   * @apiParam { STRING } [unionId] (query参数) 'unionId'
   * @apiParam { STRING } [openId] (query参数) 'openId'
   * @apiParam { STRING } [phone] (query参数) '用户绑定手机号'
   * @apiParam { BOOLEAN } [isNewUser] (query参数) '是否为新用户'
   * @apiParam { BOOLEAN } [isBindUserPhone] (query参数) '是否绑定手机号'
   * @apiParam { STRING } [invitorId] (query参数) '邀请者userId'
   * @apiUse pagination
   * @apiUse pageResult
   * @apiUse welfareUserResponseEntity
   */
  async getWelfareUserList () {
    let res = await this.service.welfare.welfare.getWelfareUserList(this.queryParams)
    this.restful.success(res)
  }

  /**
   * @api {get} /welfareUsers/:id 获取淘福利商城用户详情
   * @apiVersion 1.0.0
   * @apiGroup welfare
   * @apiDescription 获取淘福利商城用户详情
   * @apiParam {Integer} id (path参数)淘福利商城用户id
   * @apiUse welfareUserResponseEntity
   */
  async getWelfareUserDetail () {
    const { id } = this.pathParams
    const res = await this.service.welfare.welfare.getWelfareUser(id)
    this.restful.success(res)
  }





    
  /**
   * @api {get} /welfareUserOpenPacketRecords 获取用户开红包记录列表
   * @apiVersion 1.0.0
   * @apiGroup welfare
   * @apiDescription 获取用户开红包记录列表
   * @apiParam { STRING } [userId] (query参数) '用户id'
   * @apiParam { STRING } [awardType] (query参数) '红包中奖类型'
   * @apiParam { STRING } [awardValue] (query参数) '红包中奖内容（现金值、福币值、谢谢参与字符串等）'
   * @apiUse pagination
   * @apiUse pageResult
   * @apiUse welfareUserOpenPacketRecordResponseEntity
   */
  async getWelfareUserOpenPacketRecordList () {
    let res = await this.service.welfare.welfare.getWelfareUserOpenPacketRecordList(this.queryParams)
    this.restful.success(res)
  }

  /**
   * @api {get} /welfareUserOpenPacketRecords/:id 获取用户开红包记录详情
   * @apiVersion 1.0.0
   * @apiGroup welfare
   * @apiDescription 获取用户开红包记录详情
   * @apiParam {Integer} id (path参数)用户开红包记录id
   * @apiUse welfareUserOpenPacketRecordResponseEntity
   */
  async getWelfareUserOpenPacketRecordDetail () {
    const { id } = this.pathParams
    const res = await this.service.welfare.welfare.getWelfareUserOpenPacketRecord(id)
    this.restful.success(res)
  }





    
  /**
   * @api {get} /welfareUserCoinRecords 获取用户福币记录列表
   * @apiVersion 1.0.0
   * @apiGroup welfare
   * @apiDescription 获取用户福币记录列表
   * @apiParam { STRING } [userId] (query参数) '用户id'
   * @apiUse pagination
   * @apiUse pageResult
   * @apiUse welfareUserCoinRecordResponseEntity
   */
  async getWelfareUserCoinRecordList () {
    let res = await this.service.welfare.welfare.getWelfareUserCoinRecordList(this.queryParams)
    this.restful.success(res)
  }

  /**
   * @api {get} /welfareUserCoinRecords/:id 获取用户福币记录详情
   * @apiVersion 1.0.0
   * @apiGroup welfare
   * @apiDescription 获取用户福币记录详情
   * @apiParam {Integer} id (path参数)用户福币记录id
   * @apiUse welfareUserCoinRecordResponseEntity
   */
  async getWelfareUserCoinRecordDetail () {
    const { id } = this.pathParams
    const res = await this.service.welfare.welfare.getWelfareUserCoinRecord(id)
    this.restful.success(res)
  }





    
  /**
   * @api {get} /welfareUserWalletRecords 获取用户钱包记录列表
   * @apiVersion 1.0.0
   * @apiGroup welfare
   * @apiDescription 获取用户钱包记录列表
   * @apiParam { STRING } [userId] (query参数) '用户id'
   * @apiUse pagination
   * @apiUse pageResult
   * @apiUse welfareUserWalletRecordResponseEntity
   */
  async getWelfareUserWalletRecordList () {
    let res = await this.service.welfare.welfare.getWelfareUserWalletRecordList(this.queryParams)
    this.restful.success(res)
  }

  /**
   * @api {get} /welfareUserWalletRecords/:id 获取用户钱包记录详情
   * @apiVersion 1.0.0
   * @apiGroup welfare
   * @apiDescription 获取用户钱包记录详情
   * @apiParam {Integer} id (path参数)用户钱包记录id
   * @apiUse welfareUserWalletRecordResponseEntity
   */
  async getWelfareUserWalletRecordDetail () {
    const { id } = this.pathParams
    const res = await this.service.welfare.welfare.getWelfareUserWalletRecord(id)
    this.restful.success(res)
  }





    
  /**
   * @api {get} /welfareUserTaskRecords 获取用户完成任务记录列表
   * @apiVersion 1.0.0
   * @apiGroup welfare
   * @apiDescription 获取用户完成任务记录列表
   * @apiParam { STRING } [userId] (query参数) '用户id'
   * @apiParam { STRING } [taskDateStr] (query参数) '任务日期'
   * @apiParam { INTEGER } [taskType] (query参数) '任务类型'
   * @apiParam { INTEGER } [status] (query参数) '任务状态: 1-待处理, 2-处理成功, 3-处理失败'
   * @apiParam { BOOLEAN } [awarded] (query参数) '是否奖励'
   * @apiUse pagination
   * @apiUse pageResult
   * @apiUse welfareUserTaskRecordResponseEntity
   */
  async getWelfareUserTaskRecordList () {
    let res = await this.service.welfare.welfare.getWelfareUserTaskRecordList(this.queryParams)
    this.restful.success(res)
  }

  /**
   * @api {get} /welfareUserTaskRecords/:id 获取用户完成任务记录详情
   * @apiVersion 1.0.0
   * @apiGroup welfare
   * @apiDescription 获取用户完成任务记录详情
   * @apiParam {Integer} id (path参数)用户完成任务记录id
   * @apiUse welfareUserTaskRecordResponseEntity
   */
  async getWelfareUserTaskRecordDetail () {
    const { id } = this.pathParams
    const res = await this.service.welfare.welfare.getWelfareUserTaskRecord(id)
    this.restful.success(res)
  }





}

module.exports = WelfareController