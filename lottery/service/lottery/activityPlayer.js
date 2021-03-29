'use strict'

const _ = require('lodash')
const moment = require('moment')
const utils = require('../../lib/utils')
const Service = require('qhkj-framework').Service

class ActivityPlayerService extends Service {
  constructor(ctx) {
    super(ctx, 'lottery')
  }
  
  
  async getActivityPlayerList (params) {
    let conditions = [
    ]
    
    // add custom query here
    // e.g. 
    // if (params.type) {
    //   conditions.push({type: params.type})
    // }

    if (params.activityId) {
      conditions.push({ activityId: params.activityId })
    }
    if (params.playerId) {
      conditions.push({ playerId: params.playerId })
    }
    if (params.playerName) {
      conditions.push({ playerName: params.playerName })
    }
    if (params.isWinner) {
      conditions.push({ isWinner: JSON.parse(params.isWinner) })
    }
    if (params.isRealUser) {
      conditions.push({ isRealUser: JSON.parse(params.isRealUser) })
    }
    if (params.prizeLevel) {
      conditions.push({ prizeLevel: params.prizeLevel })
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

    return await this.models.ActivityPlayer.findAndCountAll(queryParams)
  }

  async getActivityPlayer (id) {
    return await this.models.ActivityPlayer.findByPk(id)
  }

  async addActivityPlayer (data) {
    try {
      utils.checkInputParams([
      ])
    } catch (err) {
      this.throwException(400, err.message)
    }

    // do params check here!

    let activityPlayer = await this.models.ActivityPlayer.create(data, {transaction: this.t})
    if (!activityPlayer) {
      this.logger.error(`添加参与抽奖用户记录失败! ${err}`)
      this.throwException(400, '添加参与抽奖用户记录失败!')
    }
    return activityPlayer
  }

  async modifyActivityPlayer (id, data) {
    let exist = await this.models.ActivityPlayer.findByPk(id)
    if (!exist) {
      this.throwException(400, '无效的参与抽奖用户记录!')
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

  async deleteActivityPlayer (id) {
    let exist = await this.models.ActivityPlayer.findByPk(id)
    if (!exist) {
      return
    }

    await this.models.ActivityPlayer.destroyById(exist.id, {transaction: this.t})
  }
  
  async getPreDrawInfoList (params) {
    let conditions = [
    ]
    
    // add custom query here
    // e.g. 
    // if (params.type) {
    //   conditions.push({type: params.type})
    // }

    if (params.activityId) {
      conditions.push({ activityId: params.activityId })
    }
    if (params.playerId) {
      conditions.push({ playerId: params.playerId })
    }
    if (params.playerName) {
      conditions.push({ playerName: params.playerName })
    }
    if (params.isRealUser) {
      conditions.push({ isRealUser: JSON.parse(params.isRealUser) })
    }
    if (params.prizeLevel) {
      conditions.push({ prizeLevel: params.prizeLevel })
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

    return await this.models.PreDrawInfo.findAndCountAll(queryParams)
  }

  async getPreDrawInfo (id) {
    return await this.models.PreDrawInfo.findByPk(id)
  }

  async addPreDrawInfo (data) {
    try {
      utils.checkInputParams([
      ])
    } catch (err) {
      this.throwException(400, err.message)
    }

    // do params check here!

    let preDrawInfo = await this.models.PreDrawInfo.create(data, {transaction: this.t})
    if (!preDrawInfo) {
      this.logger.error(`添加预开奖结果失败! ${err}`)
      this.throwException(400, '添加预开奖结果失败!')
    }
    return preDrawInfo
  }

  async modifyPreDrawInfo (id, data) {
    let exist = await this.models.PreDrawInfo.findByPk(id)
    if (!exist) {
      this.throwException(400, '无效的预开奖结果!')
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

  async deletePreDrawInfo (id) {
    let exist = await this.models.PreDrawInfo.findByPk(id)
    if (!exist) {
      return
    }

    await this.models.PreDrawInfo.destroyById(exist.id, {transaction: this.t})
  }
}

module.exports = ActivityPlayerService
