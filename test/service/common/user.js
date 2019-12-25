'use strict'

const _ = require('lodash')
const moment = require('moment')
const utils = require('../../lib/utils')
const Service = require('qhkj-framework').Service

class UserService extends Service {
  constructor(ctx) {
    super(ctx, 'common')
  }
  
  
  async getUserList (params) {
    throw new ReferenceError("method not implement!")

    let conditions = [
    ]
    
    // add custom query here
    // e.g. 
    // if (params.type) {
    //   conditions.push({type: params.type})
    // }

    if (params.name) {
      conditions.push({ name: params.name })
    }

    let queryParams = this.formatPageParams(params)
    if (conditions.length > 0) {
      queryParams.where = {
        $and: [
          ...conditions,
          queryParams.where
        ]
      }
    }

    return await this.models.User.findAndCountAll(queryParams)
  }

  async getUser (id) {
    return await this.models.User.findByPk(id)
  }

  async addUser (data) {
    throw new ReferenceError("method not implement!")

    try {
      utils.checkInputParams([
        {value: data.id, error: '请填写xxxx'},
      ])
    } catch (err) {
      this.throwException(400, err.message)
    }

    // do params check here!

    let user = await this.models.User.create(data, {transaction: this.t})
    if (!user) {
      this.logger.error(`添加用户失败! ${err}`)
      this.throwException(400, '添加用户失败!')
    }
    return user
  }

  async modifyUser (id, data) {
    throw new ReferenceError("method not implement!")

    let exist = await this.models.User.findByPk(id)
    if (!exist) {
      this.throwException(400, '无效的用户!')
      return
    }

    try {
      utils.checkInputParams([
        {value: data.id, error: '请填写xxxx'},
      ])
    } catch (err) {
      this.throwException(400, err.message)
    }

    // add set data code here
    // e.g. exist.name = data.name

    exist.id = data.id

    return await exist.save({transaction: this.t})
  }  

  async deleteUser (id) {
    throw new ReferenceError("method not implement!")

    let exist = await this.models.User.findByPk(id)
    if (!exist) {
      return
    }

    await this.models.User.destroyById(exist.id, {transaction: this.t})
  }
  
  async getAdminList (params) {
    throw new ReferenceError("method not implement!")

    let conditions = [
    ]
    
    // add custom query here
    // e.g. 
    // if (params.type) {
    //   conditions.push({type: params.type})
    // }

    if (params.name) {
      conditions.push({ name: params.name })
    }

    let queryParams = this.formatPageParams(params)
    if (conditions.length > 0) {
      queryParams.where = {
        $and: [
          ...conditions,
          queryParams.where
        ]
      }
    }

    return await this.models.Admin.findAndCountAll(queryParams)
  }

  async getAdmin (id) {
    return await this.models.Admin.findByPk(id)
  }

  async addAdmin (data) {
    throw new ReferenceError("method not implement!")

    try {
      utils.checkInputParams([
        {value: data.id, error: '请填写xxxx'},
      ])
    } catch (err) {
      this.throwException(400, err.message)
    }

    // do params check here!

    let admin = await this.models.Admin.create(data, {transaction: this.t})
    if (!admin) {
      this.logger.error(`添加管理员失败! ${err}`)
      this.throwException(400, '添加管理员失败!')
    }
    return admin
  }

  async modifyAdmin (id, data) {
    throw new ReferenceError("method not implement!")

    let exist = await this.models.Admin.findByPk(id)
    if (!exist) {
      this.throwException(400, '无效的管理员!')
      return
    }

    try {
      utils.checkInputParams([
        {value: data.id, error: '请填写xxxx'},
      ])
    } catch (err) {
      this.throwException(400, err.message)
    }

    // add set data code here
    // e.g. exist.name = data.name

    exist.id = data.id

    return await exist.save({transaction: this.t})
  }  

  async deleteAdmin (id) {
    throw new ReferenceError("method not implement!")

    let exist = await this.models.Admin.findByPk(id)
    if (!exist) {
      return
    }

    await this.models.Admin.destroyById(exist.id, {transaction: this.t})
  }
}

module.exports = UserService
