'use strict'

const _ = require('lodash')
const moment = require('moment')
const utils = require('../../lib/utils')
const Service = require('qhkj-framework').Service

class PrizeShowService extends Service {
  constructor(ctx) {
    super(ctx, 'lottery')
  }
  
  
  async getPrizeShowList (params) {
    let conditions = [
    ]
    
    // add custom query here
    // e.g. 
    // if (params.type) {
    //   conditions.push({type: params.type})
    // }


    let queryParams = this.formatPageParams(params)
    if (conditions.length > 0) {
      queryParams.where = {
        [this.app.Sequelize.Op.and]: [
          ...conditions,
          queryParams.where
        ]
      }
    }

    return await this.models.PrizeShow.findAndCountAll(queryParams)
  }

  async getPrizeShow (id) {
    return await this.models.PrizeShow.findByPk(id)
  }

  async addPrizeShow (data) {
    try {
      utils.checkInputParams([
        {value: data.playerName, error: '请填写playerName'},
        {value: data.playerIcon, error: '请填写playerIcon'},
        {value: data.content, error: '请填写content'},
        {value: data.time, error: '请填写time'},
      ])
    } catch (err) {
      this.throwException(400, err.message)
    }

    // do params check here!

    let prizeShow = await this.models.PrizeShow.create(data, {transaction: this.t})
    if (!prizeShow) {
      this.logger.error(`添加中奖晒单失败! ${err}`)
      this.throwException(400, '添加中奖晒单失败!')
    }
    return prizeShow
  }

  async modifyPrizeShow (id, data) {
    let exist = await this.models.PrizeShow.findByPk(id)
    if (!exist) {
      this.throwException(400, '无效的中奖晒单!')
      return
    }

    try {
      utils.checkInputParams([
        {value: data.playerName, error: '请填写playerName'},
        {value: data.playerIcon, error: '请填写playerIcon'},
        {value: data.content, error: '请填写content'},
        {value: data.time, error: '请填写time'},
      ])
    } catch (err) {
      this.throwException(400, err.message)
    }

    // add set data code here
    // e.g. exist.name = data.name

    exist.playerName = data.playerName
    exist.playerIcon = data.playerIcon
    exist.content = data.content
    exist.images = data.images
    exist.time = data.time

    return await exist.save({transaction: this.t})
  }  

  async deletePrizeShow (id) {
    let exist = await this.models.PrizeShow.findByPk(id)
    if (!exist) {
      return
    }

    await this.models.PrizeShow.destroyById(exist.id, {transaction: this.t})
  }
}

module.exports = PrizeShowService
