'use strict'
const fs = require('fs')
const path = require('path')
const Controller = require('qhkj-framework').Controller

/**
 * @apiDefine abTest
 * AB测试
 */
class AbTestController extends Controller {
  constructor(ctx) {
    super(ctx)
  }

    
  /**
   * @api {get} /admin/abTests 获取AB测试实验列表
   * @apiVersion 1.0.0
   * @apiGroup abTest
   * @apiDescription 获取AB测试实验列表
   * @apiParam { STRING } [name] (query参数) '实验名称'
   * @apiParam { INTEGER } [type] (query参数) '实验类型(客户端实验、服务端实验)'
   * @apiParam { BOOLEAN } [enable] (query参数) '是否启用'
   * @apiUse pagination
   * @apiUse pageResult
   * @apiUse abTestResponseEntity
   */
  async getAbTestList () {
    let res = await this.service.common.abTest.getAbTestList(this.queryParams)
    this.restful.success(res)
  }

  /**
   * @api {get} /admin/abTests/:id 获取AB测试实验详情
   * @apiVersion 1.0.0
   * @apiGroup abTest
   * @apiDescription 获取AB测试实验详情
   * @apiParam {Integer} id (path参数)AB测试实验id
   * @apiUse abTestResponseEntity
   */
  async getAbTestDetail () {
    const { id } = this.pathParams
    const res = await this.service.common.abTest.getAbTest(id)
    this.restful.success(res)
  }


  /**
   * @api {post} /admin/abTests 创建AB测试实验
   * @apiVersion 1.0.0
   * @apiGroup abTest
   * @apiDescription 创建AB测试实验
   * @apiUse abTestRequestEntity
   * @apiUse abTestResponseEntity
   */
  async createAbTest () {
    const res = await this.service.common.abTest.addAbTest(this.requestBody)
    this.restful.created(res)
  }

  /**
   * @api {put} /admin/abTests/:id 修改AB测试实验
   * @apiVersion 1.0.0
   * @apiGroup abTest
   * @apiDescription 修改AB测试实验
   * @apiParam {Integer} id (path参数)AB测试实验id
   * @apiUse abTestRequestEntity
   * @apiUse abTestResponseEntity
   */
  async modifyAbTest () {
    const { id } = this.pathParams
    const res = await this.service.common.abTest.modifyAbTest(id, this.requestBody)
    this.restful.success(res)
  }

  /**
   * @api {delete} /admin/abTests/:id 删除AB测试实验
   * @apiVersion 1.0.0
   * @apiGroup abTest
   * @apiDescription 根据 id 删除一条AB测试实验
   * @apiParam {Integer} id (path参数)AB测试实验id
   */
  async deleteAbTest () {
    const { id } = this.pathParams
    await this.service.common.abTest.deleteAbTest(id)
    this.restful.deleted()
  }

    
  /**
   * @api {get} /admin/abTargets 获取AB测试指标列表
   * @apiVersion 1.0.0
   * @apiGroup abTest
   * @apiDescription 获取AB测试指标列表
   * @apiParam { STRING } [name] (query参数) '指标名称'
   * @apiUse pagination
   * @apiUse pageResult
   * @apiUse abTargetResponseEntity
   */
  async getAbTargetList () {
    let res = await this.service.common.abTest.getAbTargetList(this.queryParams)
    this.restful.success(res)
  }

  /**
   * @api {get} /admin/abTargets/:id 获取AB测试指标详情
   * @apiVersion 1.0.0
   * @apiGroup abTest
   * @apiDescription 获取AB测试指标详情
   * @apiParam {Integer} id (path参数)AB测试指标id
   * @apiUse abTargetResponseEntity
   */
  async getAbTargetDetail () {
    const { id } = this.pathParams
    const res = await this.service.common.abTest.getAbTarget(id)
    this.restful.success(res)
  }


  /**
   * @api {post} /admin/abTargets 创建AB测试指标
   * @apiVersion 1.0.0
   * @apiGroup abTest
   * @apiDescription 创建AB测试指标
   * @apiUse abTargetRequestEntity
   * @apiUse abTargetResponseEntity
   */
  async createAbTarget () {
    const res = await this.service.common.abTest.addAbTarget(this.requestBody)
    this.restful.created(res)
  }

  /**
   * @api {put} /admin/abTargets/:id 修改AB测试指标
   * @apiVersion 1.0.0
   * @apiGroup abTest
   * @apiDescription 修改AB测试指标
   * @apiParam {Integer} id (path参数)AB测试指标id
   * @apiUse abTargetRequestEntity
   * @apiUse abTargetResponseEntity
   */
  async modifyAbTarget () {
    const { id } = this.pathParams
    const res = await this.service.common.abTest.modifyAbTarget(id, this.requestBody)
    this.restful.success(res)
  }

  /**
   * @api {delete} /admin/abTargets/:id 删除AB测试指标
   * @apiVersion 1.0.0
   * @apiGroup abTest
   * @apiDescription 根据 id 删除一条AB测试指标
   * @apiParam {Integer} id (path参数)AB测试指标id
   */
  async deleteAbTarget () {
    const { id } = this.pathParams
    await this.service.common.abTest.deleteAbTarget(id)
    this.restful.deleted()
  }

    
  /**
   * @api {get} /admin/abGroups 获取ab对照组列表
   * @apiVersion 1.0.0
   * @apiGroup abTest
   * @apiDescription 获取ab对照组列表
   * @apiParam { INTEGER } [abTestId] (query参数) '实验ID'
   * @apiParam { STRING } [name] (query参数) '对照组名称'
   * @apiParam { STRING } [isDefault] (query参数) '是否默认'
   * @apiUse pagination
   * @apiUse pageResult
   * @apiUse abGroupResponseEntity
   */
  async getAbGroupList () {
    let res = await this.service.common.abTest.getAbGroupList(this.queryParams)
    this.restful.success(res)
  }

  /**
   * @api {get} /admin/abGroups/:id 获取ab对照组详情
   * @apiVersion 1.0.0
   * @apiGroup abTest
   * @apiDescription 获取ab对照组详情
   * @apiParam {Integer} id (path参数)ab对照组id
   * @apiUse abGroupResponseEntity
   */
  async getAbGroupDetail () {
    const { id } = this.pathParams
    const res = await this.service.common.abTest.getAbGroup(id)
    this.restful.success(res)
  }


  /**
   * @api {post} /admin/abGroups 创建ab对照组
   * @apiVersion 1.0.0
   * @apiGroup abTest
   * @apiDescription 创建ab对照组
   * @apiUse abGroupRequestEntity
   * @apiUse abGroupResponseEntity
   */
  async createAbGroup () {
    const res = await this.service.common.abTest.addAbGroup(this.requestBody)
    this.restful.created(res)
  }

  /**
   * @api {put} /admin/abGroups/:id 修改ab对照组
   * @apiVersion 1.0.0
   * @apiGroup abTest
   * @apiDescription 修改ab对照组
   * @apiParam {Integer} id (path参数)ab对照组id
   * @apiUse abGroupRequestEntity
   * @apiUse abGroupResponseEntity
   */
  async modifyAbGroup () {
    const { id } = this.pathParams
    const res = await this.service.common.abTest.modifyAbGroup(id, this.requestBody)
    this.restful.success(res)
  }

  /**
   * @api {delete} /admin/abGroups/:id 删除ab对照组
   * @apiVersion 1.0.0
   * @apiGroup abTest
   * @apiDescription 根据 id 删除一条ab对照组
   * @apiParam {Integer} id (path参数)ab对照组id
   */
  async deleteAbGroup () {
    const { id } = this.pathParams
    await this.service.common.abTest.deleteAbGroup(id)
    this.restful.deleted()
  }

    
  /**
   * @api {get} /admin/abAllocations 获取AB测试分配记录列表
   * @apiVersion 1.0.0
   * @apiGroup abTest
   * @apiDescription 获取AB测试分配记录列表
   * @apiParam { STRING } [clientId] (query参数) '用户标识'
   * @apiParam { STRING } [abTestId] (query参数) '实验ID'
   * @apiParam { DATE } [abGroupId] (query参数) '对照组ID'
   * @apiUse pagination
   * @apiUse pageResult
   * @apiUse abAllocationResponseEntity
   */
  async getAbAllocationList () {
    let res = await this.service.common.abTest.getAbAllocationList(this.queryParams)
    this.restful.success(res)
  }

  /**
   * @api {get} /admin/abAllocations/:id 获取AB测试分配记录详情
   * @apiVersion 1.0.0
   * @apiGroup abTest
   * @apiDescription 获取AB测试分配记录详情
   * @apiParam {Integer} id (path参数)AB测试分配记录id
   * @apiUse abAllocationResponseEntity
   */
  async getAbAllocationDetail () {
    const { id } = this.pathParams
    const res = await this.service.common.abTest.getAbAllocation(id)
    this.restful.success(res)
  }



  /**
   * @api {put} /admin/abAllocations/:id 修改AB测试分配记录
   * @apiVersion 1.0.0
   * @apiGroup abTest
   * @apiDescription 修改AB测试分配记录
   * @apiParam {Integer} id (path参数)AB测试分配记录id
   * @apiUse abAllocationRequestEntity
   * @apiUse abAllocationResponseEntity
   */
  async modifyAbAllocation () {
    const { id } = this.pathParams
    const res = await this.service.common.abTest.modifyAbAllocation(id, this.requestBody)
    this.restful.success(res)
  }

  /**
   * @api {delete} /admin/abAllocations/:id 删除AB测试分配记录
   * @apiVersion 1.0.0
   * @apiGroup abTest
   * @apiDescription 根据 id 删除一条AB测试分配记录
   * @apiParam {Integer} id (path参数)AB测试分配记录id
   */
  async deleteAbAllocation () {
    const { id } = this.pathParams
    await this.service.common.abTest.deleteAbAllocation(id)
    this.restful.deleted()
  }

}

module.exports = AbTestController