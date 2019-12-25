'use strict'
const fs = require('fs')
const path = require('path')
const BaseController = require('./base')

/**
 * @apiDefine user
 * 用户
 */
class UserController extends BaseController {
  constructor(ctx) {
    super(ctx)
  }

    
  /**
   * @api {get} /users 获取用户列表
   * @apiVersion 1.0.0
   * @apiGroup user
   * @apiDescription 获取用户列表
   * @apiParam { INTEGER } [name] (query参数) '字段说明'
   * @apiUse pagination
   * @apiUse pageResult
   * @apiUse userResponseEntity
   */
  async getUserList () {
    let res = await this.service.common.user.getUserList(this.queryParams)
    this.restful.success(res)
  }

  /**
   * @api {get} /users/:id 获取用户详情
   * @apiVersion 1.0.0
   * @apiGroup user
   * @apiDescription 获取用户详情
   * @apiParam {Integer} id (path参数)用户id
   * @apiUse userResponseEntity
   */
  async getUserDetail () {
    const { id } = this.pathParams
    const res = await this.service.common.user.getUser(id)
    this.restful.success(res)
  }


  /**
   * @api {post} /users 创建用户
   * @apiVersion 1.0.0
   * @apiGroup user
   * @apiDescription 创建用户
   * @apiUse userRequestEntity
   * @apiUse userResponseEntity
   */
  async createUser () {
    const res = await this.service.common.user.addUser(this.requestBody)
    this.restful.created(res)
  }

  /**
   * @api {put} /users/:id 修改用户
   * @apiVersion 1.0.0
   * @apiGroup user
   * @apiDescription 修改用户
   * @apiParam {Integer} id (path参数)用户id
   * @apiUse userRequestEntity
   * @apiUse userResponseEntity
   */
  async modifyUser () {
    const { id } = this.pathParams
    const res = await this.service.common.user.modifyUser(id, this.requestBody)
    this.restful.success(res)
  }

  /**
   * @api {delete} /users/:id 删除用户
   * @apiVersion 1.0.0
   * @apiGroup user
   * @apiDescription 根据 id 删除一条用户
   * @apiParam {Integer} id (path参数)用户id
   */
  async deleteUser () {
    const { id } = this.pathParams
    await this.service.common.user.deleteUser(id)
    this.restful.deleted()
  }

    
  /**
   * @api {get} /admins 获取管理员列表
   * @apiVersion 1.0.0
   * @apiGroup user
   * @apiDescription 获取管理员列表
   * @apiParam { INTEGER } [name] (query参数) '字段说明'
   * @apiUse pagination
   * @apiUse pageResult
   * @apiUse adminResponseEntity
   */
  async getAdminList () {
    let res = await this.service.common.user.getAdminList(this.queryParams)
    this.restful.success(res)
  }

  /**
   * @api {get} /admins/:id 获取管理员详情
   * @apiVersion 1.0.0
   * @apiGroup user
   * @apiDescription 获取管理员详情
   * @apiParam {Integer} id (path参数)管理员id
   * @apiUse adminResponseEntity
   */
  async getAdminDetail () {
    const { id } = this.pathParams
    const res = await this.service.common.user.getAdmin(id)
    this.restful.success(res)
  }


  /**
   * @api {post} /admins 创建管理员
   * @apiVersion 1.0.0
   * @apiGroup user
   * @apiDescription 创建管理员
   * @apiUse adminRequestEntity
   * @apiUse adminResponseEntity
   */
  async createAdmin () {
    const res = await this.service.common.user.addAdmin(this.requestBody)
    this.restful.created(res)
  }

  /**
   * @api {put} /admins/:id 修改管理员
   * @apiVersion 1.0.0
   * @apiGroup user
   * @apiDescription 修改管理员
   * @apiParam {Integer} id (path参数)管理员id
   * @apiUse adminRequestEntity
   * @apiUse adminResponseEntity
   */
  async modifyAdmin () {
    const { id } = this.pathParams
    const res = await this.service.common.user.modifyAdmin(id, this.requestBody)
    this.restful.success(res)
  }

  /**
   * @api {delete} /admins/:id 删除管理员
   * @apiVersion 1.0.0
   * @apiGroup user
   * @apiDescription 根据 id 删除一条管理员
   * @apiParam {Integer} id (path参数)管理员id
   */
  async deleteAdmin () {
    const { id } = this.pathParams
    await this.service.common.user.deleteAdmin(id)
    this.restful.deleted()
  }

}

module.exports = UserController