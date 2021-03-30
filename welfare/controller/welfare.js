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
   * @api {get} /welfareOpenPacketRecords 获取用户开红包记录列表
   * @apiVersion 1.0.0
   * @apiGroup welfare
   * @apiDescription 获取用户开红包记录列表
   * @apiParam { STRING } [userId] (query参数) '用户id'
   * @apiParam { STRING } [awardType] (query参数) '红包中奖类型'
   * @apiParam { STRING } [awardValue] (query参数) '红包中奖内容（现金值、福币值、谢谢参与字符串等）'
   * @apiUse pagination
   * @apiUse pageResult
   * @apiUse welfareOpenPacketRecordResponseEntity
   */
  async getWelfareOpenPacketRecordList () {
    let res = await this.service.welfare.welfare.getWelfareOpenPacketRecordList(this.queryParams)
    this.restful.success(res)
  }

  /**
   * @api {get} /welfareOpenPacketRecords/:id 获取用户开红包记录详情
   * @apiVersion 1.0.0
   * @apiGroup welfare
   * @apiDescription 获取用户开红包记录详情
   * @apiParam {Integer} id (path参数)用户开红包记录id
   * @apiUse welfareOpenPacketRecordResponseEntity
   */
  async getWelfareOpenPacketRecordDetail () {
    const { id } = this.pathParams
    const res = await this.service.welfare.welfare.getWelfareOpenPacketRecord(id)
    this.restful.success(res)
  }





    
  /**
   * @api {get} /welfareCoinRecords 获取用户福币记录列表
   * @apiVersion 1.0.0
   * @apiGroup welfare
   * @apiDescription 获取用户福币记录列表
   * @apiParam { STRING } [userId] (query参数) '用户id'
   * @apiUse pagination
   * @apiUse pageResult
   * @apiUse welfareCoinRecordResponseEntity
   */
  async getWelfareCoinRecordList () {
    let res = await this.service.welfare.welfare.getWelfareCoinRecordList(this.queryParams)
    this.restful.success(res)
  }

  /**
   * @api {get} /welfareCoinRecords/:id 获取用户福币记录详情
   * @apiVersion 1.0.0
   * @apiGroup welfare
   * @apiDescription 获取用户福币记录详情
   * @apiParam {Integer} id (path参数)用户福币记录id
   * @apiUse welfareCoinRecordResponseEntity
   */
  async getWelfareCoinRecordDetail () {
    const { id } = this.pathParams
    const res = await this.service.welfare.welfare.getWelfareCoinRecord(id)
    this.restful.success(res)
  }





    
  /**
   * @api {get} /welfareWalletRecords 获取用户钱包记录列表
   * @apiVersion 1.0.0
   * @apiGroup welfare
   * @apiDescription 获取用户钱包记录列表
   * @apiParam { STRING } [userId] (query参数) '用户id'
   * @apiUse pagination
   * @apiUse pageResult
   * @apiUse welfareWalletRecordResponseEntity
   */
  async getWelfareWalletRecordList () {
    let res = await this.service.welfare.welfare.getWelfareWalletRecordList(this.queryParams)
    this.restful.success(res)
  }

  /**
   * @api {get} /welfareWalletRecords/:id 获取用户钱包记录详情
   * @apiVersion 1.0.0
   * @apiGroup welfare
   * @apiDescription 获取用户钱包记录详情
   * @apiParam {Integer} id (path参数)用户钱包记录id
   * @apiUse welfareWalletRecordResponseEntity
   */
  async getWelfareWalletRecordDetail () {
    const { id } = this.pathParams
    const res = await this.service.welfare.welfare.getWelfareWalletRecord(id)
    this.restful.success(res)
  }





    
  /**
   * @api {get} /welfareTaskRecords 获取用户完成任务记录列表
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
   * @apiUse welfareTaskRecordResponseEntity
   */
  async getWelfareTaskRecordList () {
    let res = await this.service.welfare.welfare.getWelfareTaskRecordList(this.queryParams)
    this.restful.success(res)
  }

  /**
   * @api {get} /welfareTaskRecords/:id 获取用户完成任务记录详情
   * @apiVersion 1.0.0
   * @apiGroup welfare
   * @apiDescription 获取用户完成任务记录详情
   * @apiParam {Integer} id (path参数)用户完成任务记录id
   * @apiUse welfareTaskRecordResponseEntity
   */
  async getWelfareTaskRecordDetail () {
    const { id } = this.pathParams
    const res = await this.service.welfare.welfare.getWelfareTaskRecord(id)
    this.restful.success(res)
  }





}

module.exports = WelfareController