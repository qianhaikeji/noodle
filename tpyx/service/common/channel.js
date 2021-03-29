'use strict'

const _ = require('lodash')
const moment = require('moment')
const utils = require('../../lib/utils')
const Service = require('qhkj-framework').Service

class ChannelService extends Service {
  constructor(ctx) {
    super(ctx, 'common')
  }
  
  
  async getChannelList (params) {
    let conditions = [
    ]
    
    // add custom query here
    // e.g. 
    // if (params.type) {
    //   conditions.push({type: params.type})
    // }

    if (params.pId) {
      conditions.push({ pId: params.pId })
    }
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

    return await this.models.Channel.findAndCountAll(queryParams)
  }

  async getChannel (id) {
    return await this.models.Channel.findByPk(id)
  }

  async addChannel (data) {
    try {
      utils.checkInputParams([
        {value: data.name, error: '请填写name'},
      ])
    } catch (err) {
      this.throwException(400, err.message)
    }

    // do params check here!

    let channel = await this.models.Channel.create(data, {transaction: this.t})
    if (!channel) {
      this.logger.error(`添加渠道失败! ${err}`)
      this.throwException(400, '添加渠道失败!')
    }
    return channel
  }

  async modifyChannel (id, data) {
    let exist = await this.models.Channel.findByPk(id)
    if (!exist) {
      this.throwException(400, '无效的渠道!')
      return
    }

    try {
      utils.checkInputParams([
        {value: data.pId, error: '请填写pId'},
        {value: data.name, error: '请填写name'},
      ])
    } catch (err) {
      this.throwException(400, err.message)
    }

    // add set data code here
    // e.g. exist.name = data.name

    exist.pId = data.pId
    exist.name = data.name
    exist.umengId = data.umengId
    exist.baiduId = data.baiduId

    return await exist.save({transaction: this.t})
  }  

  async deleteChannel (id) {
    let exist = await this.models.Channel.findByPk(id)
    if (!exist) {
      return
    }

    await this.models.Channel.destroyById(exist.id, {transaction: this.t})
  }
}

module.exports = ChannelService
