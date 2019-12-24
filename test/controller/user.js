'use strict'
const fs = require('fs')
const path = require('path')
const BaseController = require('./base')
// 自动生成路由代码，拷贝到router.js中配置
// router.get('/api/users', controller.UserController.getUserList)
// router.get('/api/users/:id', controller.UserController.getUserDetail)
// router.post('/api/users', controller.UserController.createUser)
// router.put('/api/users/:id', controller.UserController.modifyUser)
// router.delete('/api/users/:id', controller.UserController.deleteUser)

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
}

module.exports = UserController