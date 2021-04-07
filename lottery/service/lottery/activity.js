'use strict'

const _ = require('lodash')
const moment = require('moment')
const utils = require('../../lib/utils')
const Service = require('qhkj-framework').Service

class ActivityService extends Service {
  constructor(ctx) {
    super(ctx, 'lottery')
  }
  
  
  async getActivityList (params) {
    let conditions = [
    ]
    
    // add custom query here
    // e.g. 
    // if (params.type) {
    //   conditions.push({type: params.type})
    // }

    if (params.title) {
      conditions.push({ title: params.title })
    }
    if (params.type) {
      conditions.push({ type: params.type })
    }
    if (params.valid) {
      conditions.push({ valid: JSON.parse(params.valid) })
    }
    if (params.recommend) {
      conditions.push({ recommend: JSON.parse(params.recommend) })
    }
    if (params.finished) {
      conditions.push({ finished: JSON.parse(params.finished) })
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

    return await this.models.Activity.findAndCountAll(queryParams)
  }

  async getActivity (id) {
    return await this.models.Activity.findByPk(id)
  }

  async addActivity (data) {
    try {
      utils.checkInputParams([
        {value: data.title, error: '请填写title'},
      ])
    } catch (err) {
      this.throwException(400, err.message)
    }

    // do params check here!

    let activity = await this.models.Activity.create(data, {transaction: this.t})
    if (!activity) {
      this.logger.error(`添加抽奖活动失败! ${err}`)
      this.throwException(400, '添加抽奖活动失败!')
    }
    return activity
  }

  async modifyActivity (id, data) {
    let exist = await this.models.Activity.findByPk(id)
    if (!exist) {
      this.throwException(400, '无效的抽奖活动!')
      return
    }

    try {
      utils.checkInputParams([
        {value: data.title, error: '请填写title'},
      ])
    } catch (err) {
      this.throwException(400, err.message)
    }

    // add set data code here
    // e.g. exist.name = data.name

    exist.title = data.title
    exist.intro = data.intro
    exist.thumbImage = data.thumbImage
    exist.type = data.type
    exist.detailImages = data.detailImages
    exist.galleryImages = data.galleryImages
    exist.prizes = data.prizes
    exist.lotteryTime = data.lotteryTime
    exist.lotteryPlayerCount = data.lotteryPlayerCount
    exist.valid = data.valid
    exist.recommend = data.recommend

    return await exist.save({transaction: this.t})
  }  

  async deleteActivity (id) {
    let exist = await this.models.Activity.findByPk(id)
    if (!exist) {
      return
    }

    await this.models.Activity.destroyById(exist.id, {transaction: this.t})
  }
}

module.exports = ActivityService
