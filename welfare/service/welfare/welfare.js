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
  
  async getWelfareOpenPacketRecordList (params) {
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

    return await this.models.WelfareOpenPacketRecord.findAndCountAll(queryParams)
  }

  async getWelfareOpenPacketRecord (id) {
    return await this.models.WelfareOpenPacketRecord.findByPk(id)
  }

  async addWelfareOpenPacketRecord (data) {
    try {
      utils.checkInputParams([
      ])
    } catch (err) {
      this.throwException(400, err.message)
    }

    // do params check here!

    let welfareOpenPacketRecord = await this.models.WelfareOpenPacketRecord.create(data, {transaction: this.t})
    if (!welfareOpenPacketRecord) {
      this.logger.error(`添加用户开红包记录失败! ${err}`)
      this.throwException(400, '添加用户开红包记录失败!')
    }
    return welfareOpenPacketRecord
  }

  async modifyWelfareOpenPacketRecord (id, data) {
    let exist = await this.models.WelfareOpenPacketRecord.findByPk(id)
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

  async deleteWelfareOpenPacketRecord (id) {
    let exist = await this.models.WelfareOpenPacketRecord.findByPk(id)
    if (!exist) {
      return
    }

    await this.models.WelfareOpenPacketRecord.destroyById(exist.id, {transaction: this.t})
  }
  
  async getWelfareCoinRecordList (params) {
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

    return await this.models.WelfareCoinRecord.findAndCountAll(queryParams)
  }

  async getWelfareCoinRecord (id) {
    return await this.models.WelfareCoinRecord.findByPk(id)
  }

  async addWelfareCoinRecord (data) {
    try {
      utils.checkInputParams([
      ])
    } catch (err) {
      this.throwException(400, err.message)
    }

    // do params check here!

    let welfareCoinRecord = await this.models.WelfareCoinRecord.create(data, {transaction: this.t})
    if (!welfareCoinRecord) {
      this.logger.error(`添加用户福币记录失败! ${err}`)
      this.throwException(400, '添加用户福币记录失败!')
    }
    return welfareCoinRecord
  }

  async modifyWelfareCoinRecord (id, data) {
    let exist = await this.models.WelfareCoinRecord.findByPk(id)
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

  async deleteWelfareCoinRecord (id) {
    let exist = await this.models.WelfareCoinRecord.findByPk(id)
    if (!exist) {
      return
    }

    await this.models.WelfareCoinRecord.destroyById(exist.id, {transaction: this.t})
  }
  
  async getWelfareWalletRecordList (params) {
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

    return await this.models.WelfareWalletRecord.findAndCountAll(queryParams)
  }

  async getWelfareWalletRecord (id) {
    return await this.models.WelfareWalletRecord.findByPk(id)
  }

  async addWelfareWalletRecord (data) {
    try {
      utils.checkInputParams([
      ])
    } catch (err) {
      this.throwException(400, err.message)
    }

    // do params check here!

    let welfareWalletRecord = await this.models.WelfareWalletRecord.create(data, {transaction: this.t})
    if (!welfareWalletRecord) {
      this.logger.error(`添加用户钱包记录失败! ${err}`)
      this.throwException(400, '添加用户钱包记录失败!')
    }
    return welfareWalletRecord
  }

  async modifyWelfareWalletRecord (id, data) {
    let exist = await this.models.WelfareWalletRecord.findByPk(id)
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

  async deleteWelfareWalletRecord (id) {
    let exist = await this.models.WelfareWalletRecord.findByPk(id)
    if (!exist) {
      return
    }

    await this.models.WelfareWalletRecord.destroyById(exist.id, {transaction: this.t})
  }
  
  async getWelfareTaskRecordList (params) {
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

    return await this.models.WelfareTaskRecord.findAndCountAll(queryParams)
  }

  async getWelfareTaskRecord (id) {
    return await this.models.WelfareTaskRecord.findByPk(id)
  }

  async addWelfareTaskRecord (data) {
    try {
      utils.checkInputParams([
      ])
    } catch (err) {
      this.throwException(400, err.message)
    }

    // do params check here!

    let welfareTaskRecord = await this.models.WelfareTaskRecord.create(data, {transaction: this.t})
    if (!welfareTaskRecord) {
      this.logger.error(`添加用户完成任务记录失败! ${err}`)
      this.throwException(400, '添加用户完成任务记录失败!')
    }
    return welfareTaskRecord
  }

  async modifyWelfareTaskRecord (id, data) {
    let exist = await this.models.WelfareTaskRecord.findByPk(id)
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

  async deleteWelfareTaskRecord (id) {
    let exist = await this.models.WelfareTaskRecord.findByPk(id)
    if (!exist) {
      return
    }

    await this.models.WelfareTaskRecord.destroyById(exist.id, {transaction: this.t})
  }
}

module.exports = WelfareService
