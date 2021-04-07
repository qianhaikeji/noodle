'use strict'

const _ = require('lodash')
const moment = require('moment')
const utils = require('../../lib/utils')
const Service = require('qhkj-framework').Service

class WelfareService extends Service {
  constructor(ctx) {
    super(ctx, 'welfare')
  }
  
  
  async getWelfareUserList (params) {
    let conditions = [
    ]
    
    // add custom query here
    // e.g. 
    // if (params.type) {
    //   conditions.push({type: params.type})
    // }

    if (params.nickName) {
      conditions.push({ nickName: params.nickName })
    }
    if (params.unionId) {
      conditions.push({ unionId: params.unionId })
    }
    if (params.openId) {
      conditions.push({ openId: params.openId })
    }
    if (params.phone) {
      conditions.push({ phone: params.phone })
    }
    if (params.isNewUser) {
      conditions.push({ isNewUser: JSON.parse(params.isNewUser) })
    }
    if (params.isBindUserPhone) {
      conditions.push({ isBindUserPhone: JSON.parse(params.isBindUserPhone) })
    }
    if (params.invitorId) {
      conditions.push({ invitorId: params.invitorId })
    }

    let queryParams = this.formatPageParams(params)
    if (conditions.length > 0) {
      queryParams.where = {
        [this.app.Sequelize.Op.and]: [
          ...conditions,
          queryParams.where
        ]
      }
    }

    return await this.models.WelfareUser.findAndCountAll(queryParams)
  }

  async getWelfareUser (id) {
    return await this.models.WelfareUser.findByPk(id)
  }

  async addWelfareUser (data) {
    try {
      utils.checkInputParams([
      ])
    } catch (err) {
      this.throwException(400, err.message)
    }

    // do params check here!

    let welfareUser = await this.models.WelfareUser.create(data, {transaction: this.t})
    if (!welfareUser) {
      this.logger.error(`添加淘福利商城用户失败! ${err}`)
      this.throwException(400, '添加淘福利商城用户失败!')
    }
    return welfareUser
  }

  async modifyWelfareUser (id, data) {
    let exist = await this.models.WelfareUser.findByPk(id)
    if (!exist) {
      this.throwException(400, '无效的淘福利商城用户!')
      return
    }

    try {
      utils.checkInputParams([
      ])
    } catch (err) {
      this.throwException(400, err.message)
    }

    // add set data code here
    // e.g. exist.name = data.name


    return await exist.save({transaction: this.t})
  }  

  async deleteWelfareUser (id) {
    let exist = await this.models.WelfareUser.findByPk(id)
    if (!exist) {
      return
    }

    await this.models.WelfareUser.destroyById(exist.id, {transaction: this.t})
  }
  
  async getWelfareUserOpenPacketRecordList (params) {
    let conditions = [
    ]
    
    // add custom query here
    // e.g. 
    // if (params.type) {
    //   conditions.push({type: params.type})
    // }

    if (params.userId) {
      conditions.push({ userId: params.userId })
    }
    if (params.awardType) {
      conditions.push({ awardType: params.awardType })
    }
    if (params.awardValue) {
      conditions.push({ awardValue: params.awardValue })
    }

    let queryParams = this.formatPageParams(params)
    if (conditions.length > 0) {
      queryParams.where = {
        [this.app.Sequelize.Op.and]: [
          ...conditions,
          queryParams.where
        ]
      }
    }

    return await this.models.WelfareUserOpenPacketRecord.findAndCountAll(queryParams)
  }

  async getWelfareUserOpenPacketRecord (id) {
    return await this.models.WelfareUserOpenPacketRecord.findByPk(id)
  }

  async addWelfareUserOpenPacketRecord (data) {
    try {
      utils.checkInputParams([
      ])
    } catch (err) {
      this.throwException(400, err.message)
    }

    // do params check here!

    let welfareUserOpenPacketRecord = await this.models.WelfareUserOpenPacketRecord.create(data, {transaction: this.t})
    if (!welfareUserOpenPacketRecord) {
      this.logger.error(`添加用户开红包记录失败! ${err}`)
      this.throwException(400, '添加用户开红包记录失败!')
    }
    return welfareUserOpenPacketRecord
  }

  async modifyWelfareUserOpenPacketRecord (id, data) {
    let exist = await this.models.WelfareUserOpenPacketRecord.findByPk(id)
    if (!exist) {
      this.throwException(400, '无效的用户开红包记录!')
      return
    }

    try {
      utils.checkInputParams([
      ])
    } catch (err) {
      this.throwException(400, err.message)
    }

    // add set data code here
    // e.g. exist.name = data.name


    return await exist.save({transaction: this.t})
  }  

  async deleteWelfareUserOpenPacketRecord (id) {
    let exist = await this.models.WelfareUserOpenPacketRecord.findByPk(id)
    if (!exist) {
      return
    }

    await this.models.WelfareUserOpenPacketRecord.destroyById(exist.id, {transaction: this.t})
  }
  
  async getWelfareUserCoinRecordList (params) {
    let conditions = [
    ]
    
    // add custom query here
    // e.g. 
    // if (params.type) {
    //   conditions.push({type: params.type})
    // }

    if (params.userId) {
      conditions.push({ userId: params.userId })
    }

    let queryParams = this.formatPageParams(params)
    if (conditions.length > 0) {
      queryParams.where = {
        [this.app.Sequelize.Op.and]: [
          ...conditions,
          queryParams.where
        ]
      }
    }

    return await this.models.WelfareUserCoinRecord.findAndCountAll(queryParams)
  }

  async getWelfareUserCoinRecord (id) {
    return await this.models.WelfareUserCoinRecord.findByPk(id)
  }

  async addWelfareUserCoinRecord (data) {
    try {
      utils.checkInputParams([
      ])
    } catch (err) {
      this.throwException(400, err.message)
    }

    // do params check here!

    let welfareUserCoinRecord = await this.models.WelfareUserCoinRecord.create(data, {transaction: this.t})
    if (!welfareUserCoinRecord) {
      this.logger.error(`添加用户福币记录失败! ${err}`)
      this.throwException(400, '添加用户福币记录失败!')
    }
    return welfareUserCoinRecord
  }

  async modifyWelfareUserCoinRecord (id, data) {
    let exist = await this.models.WelfareUserCoinRecord.findByPk(id)
    if (!exist) {
      this.throwException(400, '无效的用户福币记录!')
      return
    }

    try {
      utils.checkInputParams([
      ])
    } catch (err) {
      this.throwException(400, err.message)
    }

    // add set data code here
    // e.g. exist.name = data.name


    return await exist.save({transaction: this.t})
  }  

  async deleteWelfareUserCoinRecord (id) {
    let exist = await this.models.WelfareUserCoinRecord.findByPk(id)
    if (!exist) {
      return
    }

    await this.models.WelfareUserCoinRecord.destroyById(exist.id, {transaction: this.t})
  }
  
  async getWelfareUserWalletRecordList (params) {
    let conditions = [
    ]
    
    // add custom query here
    // e.g. 
    // if (params.type) {
    //   conditions.push({type: params.type})
    // }

    if (params.userId) {
      conditions.push({ userId: params.userId })
    }

    let queryParams = this.formatPageParams(params)
    if (conditions.length > 0) {
      queryParams.where = {
        [this.app.Sequelize.Op.and]: [
          ...conditions,
          queryParams.where
        ]
      }
    }

    return await this.models.WelfareUserWalletRecord.findAndCountAll(queryParams)
  }

  async getWelfareUserWalletRecord (id) {
    return await this.models.WelfareUserWalletRecord.findByPk(id)
  }

  async addWelfareUserWalletRecord (data) {
    try {
      utils.checkInputParams([
      ])
    } catch (err) {
      this.throwException(400, err.message)
    }

    // do params check here!

    let welfareUserWalletRecord = await this.models.WelfareUserWalletRecord.create(data, {transaction: this.t})
    if (!welfareUserWalletRecord) {
      this.logger.error(`添加用户钱包记录失败! ${err}`)
      this.throwException(400, '添加用户钱包记录失败!')
    }
    return welfareUserWalletRecord
  }

  async modifyWelfareUserWalletRecord (id, data) {
    let exist = await this.models.WelfareUserWalletRecord.findByPk(id)
    if (!exist) {
      this.throwException(400, '无效的用户钱包记录!')
      return
    }

    try {
      utils.checkInputParams([
      ])
    } catch (err) {
      this.throwException(400, err.message)
    }

    // add set data code here
    // e.g. exist.name = data.name


    return await exist.save({transaction: this.t})
  }  

  async deleteWelfareUserWalletRecord (id) {
    let exist = await this.models.WelfareUserWalletRecord.findByPk(id)
    if (!exist) {
      return
    }

    await this.models.WelfareUserWalletRecord.destroyById(exist.id, {transaction: this.t})
  }
  
  async getWelfareUserTaskRecordList (params) {
    let conditions = [
    ]
    
    // add custom query here
    // e.g. 
    // if (params.type) {
    //   conditions.push({type: params.type})
    // }

    if (params.userId) {
      conditions.push({ userId: params.userId })
    }
    if (params.taskDateStr) {
      conditions.push({ taskDateStr: params.taskDateStr })
    }
    if (params.taskType) {
      conditions.push({ taskType: params.taskType })
    }
    if (params.status) {
      conditions.push({ status: params.status })
    }
    if (params.awarded) {
      conditions.push({ awarded: JSON.parse(params.awarded) })
    }

    let queryParams = this.formatPageParams(params)
    if (conditions.length > 0) {
      queryParams.where = {
        [this.app.Sequelize.Op.and]: [
          ...conditions,
          queryParams.where
        ]
      }
    }

    return await this.models.WelfareUserTaskRecord.findAndCountAll(queryParams)
  }

  async getWelfareUserTaskRecord (id) {
    return await this.models.WelfareUserTaskRecord.findByPk(id)
  }

  async addWelfareUserTaskRecord (data) {
    try {
      utils.checkInputParams([
      ])
    } catch (err) {
      this.throwException(400, err.message)
    }

    // do params check here!

    let welfareUserTaskRecord = await this.models.WelfareUserTaskRecord.create(data, {transaction: this.t})
    if (!welfareUserTaskRecord) {
      this.logger.error(`添加用户完成任务记录失败! ${err}`)
      this.throwException(400, '添加用户完成任务记录失败!')
    }
    return welfareUserTaskRecord
  }

  async modifyWelfareUserTaskRecord (id, data) {
    let exist = await this.models.WelfareUserTaskRecord.findByPk(id)
    if (!exist) {
      this.throwException(400, '无效的用户完成任务记录!')
      return
    }

    try {
      utils.checkInputParams([
      ])
    } catch (err) {
      this.throwException(400, err.message)
    }

    // add set data code here
    // e.g. exist.name = data.name


    return await exist.save({transaction: this.t})
  }  

  async deleteWelfareUserTaskRecord (id) {
    let exist = await this.models.WelfareUserTaskRecord.findByPk(id)
    if (!exist) {
      return
    }

    await this.models.WelfareUserTaskRecord.destroyById(exist.id, {transaction: this.t})
  }
}

module.exports = WelfareService
