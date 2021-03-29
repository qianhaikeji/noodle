'use strict'

const _ = require('lodash')
const moment = require('moment')
const utils = require('../../lib/utils')
const Service = require('qhkj-framework').Service

class DrawService extends Service {
  constructor(ctx) {
    super(ctx, 'draw')
  }
  
  
  async getDrawPrizeList (params) {
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
        [this.app.Sequelize.Op.and]: [
          ...conditions,
          queryParams.where
        ]
      }
    }

    return await this.models.DrawPrize.findAndCountAll(queryParams)
  }

  async getDrawPrize (id) {
    return await this.models.DrawPrize.findByPk(id)
  }

  async addDrawPrize (data) {
    try {
      utils.checkInputParams([
        {value: data.name, error: '请填写name'},
        {value: data.image, error: '请填写image'},
        {value: data.originalPrice, error: '请填写originalPrice'},
        {value: data.couponPrice, error: '请填写couponPrice'},
      ])
    } catch (err) {
      this.throwException(400, err.message)
    }

    // do params check here!

    let drawPrize = await this.models.DrawPrize.create(data, {transaction: this.t})
    if (!drawPrize) {
      this.logger.error(`添加转盘奖项失败! ${err}`)
      this.throwException(400, '添加转盘奖项失败!')
    }
    return drawPrize
  }

  async modifyDrawPrize (id, data) {
    let exist = await this.models.DrawPrize.findByPk(id)
    if (!exist) {
      this.throwException(400, '无效的转盘奖项!')
      return
    }

    try {
      utils.checkInputParams([
        {value: data.name, error: '请填写name'},
        {value: data.image, error: '请填写image'},
        {value: data.originalPrice, error: '请填写originalPrice'},
        {value: data.couponPrice, error: '请填写couponPrice'},
      ])
    } catch (err) {
      this.throwException(400, err.message)
    }

    // add set data code here
    // e.g. exist.name = data.name

    exist.name = data.name
    exist.image = data.image
    exist.originalPrice = data.originalPrice
    exist.couponPrice = data.couponPrice
    exist.couponLink = data.couponLink
    exist.goodsLink = data.goodsLink
    exist.wxaAppId = data.wxaAppId
    exist.wxaCouponLink = data.wxaCouponLink
    exist.wxaGoodsLink = data.wxaGoodsLink

    return await exist.save({transaction: this.t})
  }  

  async deleteDrawPrize (id) {
    let exist = await this.models.DrawPrize.findByPk(id)
    if (!exist) {
      return
    }

    await this.models.DrawPrize.destroyById(exist.id, {transaction: this.t})
  }
  
  async getChannelPrizeList (params) {
    let conditions = [
    ]
    
    // add custom query here
    // e.g. 
    // if (params.type) {
    //   conditions.push({type: params.type})
    // }

    if (params.channelId) {
      conditions.push({ channelId: params.channelId })
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

    return await this.models.ChannelPrize.findAndCountAll(queryParams)
  }

  async getChannelPrize (id) {
    return await this.models.ChannelPrize.findByPk(id)
  }

  async addChannelPrize (data) {
    try {
      utils.checkInputParams([
      ])
    } catch (err) {
      this.throwException(400, err.message)
    }

    // do params check here!

    let channelPrize = await this.models.ChannelPrize.create(data, {transaction: this.t})
    if (!channelPrize) {
      this.logger.error(`添加渠道奖品关系失败! ${err}`)
      this.throwException(400, '添加渠道奖品关系失败!')
    }
    return channelPrize
  }

  async modifyChannelPrize (id, data) {
    let exist = await this.models.ChannelPrize.findByPk(id)
    if (!exist) {
      this.throwException(400, '无效的渠道奖品关系!')
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

    exist.index = data.index
    exist.enable = data.enable
    exist.order = data.order

    return await exist.save({transaction: this.t})
  }  

  async deleteChannelPrize (id) {
    let exist = await this.models.ChannelPrize.findByPk(id)
    if (!exist) {
      return
    }

    await this.models.ChannelPrize.destroyById(exist.id, {transaction: this.t})
  }
}

module.exports = DrawService
