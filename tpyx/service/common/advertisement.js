'use strict'

const _ = require('lodash')
const moment = require('moment')
const utils = require('../../lib/utils')
const Service = require('qhkj-framework').Service

class AdvertisementService extends Service {
  constructor(ctx) {
    super(ctx, 'common')
  }
  
  
  async getAdvertisementList (params) {
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
    if (params.position) {
      conditions.push({ position: params.position })
    }
    if (params.type) {
      conditions.push({ type: params.type })
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

    return await this.models.Advertisement.findAndCountAll(queryParams)
  }

  async getAdvertisement (id) {
    return await this.models.Advertisement.findByPk(id)
  }

  async addAdvertisement (data) {
    try {
      utils.checkInputParams([
        {value: data.channelId, error: '请填写channelId'},
      ])
    } catch (err) {
      this.throwException(400, err.message)
    }

    // do params check here!

    let advertisement = await this.models.Advertisement.create(data, {transaction: this.t})
    if (!advertisement) {
      this.logger.error(`添加广告位失败! ${err}`)
      this.throwException(400, '添加广告位失败!')
    }
    return advertisement
  }

  async modifyAdvertisement (id, data) {
    let exist = await this.models.Advertisement.findByPk(id)
    if (!exist) {
      this.throwException(400, '无效的广告位!')
      return
    }

    try {
      utils.checkInputParams([
        {value: data.channelId, error: '请填写channelId'},
      ])
    } catch (err) {
      this.throwException(400, err.message)
    }

    // add set data code here
    // e.g. exist.name = data.name

    exist.channelId = data.channelId
    exist.position = data.position
    exist.title = data.title
    exist.image = data.image
    exist.type = data.type
    exist.appId = data.appId
    exist.link = data.link
    exist.content = data.content
    exist.order = data.order
    exist.enable = data.enable

    return await exist.save({transaction: this.t})
  }  

  async deleteAdvertisement (id) {
    let exist = await this.models.Advertisement.findByPk(id)
    if (!exist) {
      return
    }

    await this.models.Advertisement.destroyById(exist.id, {transaction: this.t})
  }
}

module.exports = AdvertisementService
