'use strict'

const _ = require('lodash')
const moment = require('moment')
const utils = require('../../lib/utils')
const Service = require('qhkj-framework').Service

class AbTestService extends Service {
  constructor(ctx) {
    super(ctx, 'common')
  }
  
  
  async getAbTestList (params) {
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
    if (params.type) {
      conditions.push({ type: params.type })
    }
    if (params.enable) {
      conditions.push({ enable: JSON.parse(params.enable) })
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

    return await this.models.AbTest.findAndCountAll(queryParams)
  }

  async getAbTest (id) {
    return await this.models.AbTest.findByPk(id)
  }

  async addAbTest (data) {
    try {
      utils.checkInputParams([
        {value: data.name, error: '请填写name'},
        {value: data.type, error: '请填写type'},
      ])
    } catch (err) {
      this.throwException(400, err.message)
    }

    // do params check here!

    let abTest = await this.models.AbTest.create(data, {transaction: this.t})
    if (!abTest) {
      this.logger.error(`添加AB测试实验失败! ${err}`)
      this.throwException(400, '添加AB测试实验失败!')
    }
    return abTest
  }

  async modifyAbTest (id, data) {
    let exist = await this.models.AbTest.findByPk(id)
    if (!exist) {
      this.throwException(400, '无效的AB测试实验!')
      return
    }

    try {
      utils.checkInputParams([
        {value: data.name, error: '请填写name'},
        {value: data.type, error: '请填写type'},
      ])
    } catch (err) {
      this.throwException(400, err.message)
    }

    // add set data code here
    // e.g. exist.name = data.name

    exist.name = data.name
    exist.description = data.description
    exist.type = data.type
    exist.targets = data.targets
    exist.enable = data.enable

    return await exist.save({transaction: this.t})
  }  

  async deleteAbTest (id) {
    let exist = await this.models.AbTest.findByPk(id)
    if (!exist) {
      return
    }

    await this.models.AbTest.destroyById(exist.id, {transaction: this.t})
  }
  
  async getAbTargetList (params) {
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

    return await this.models.AbTarget.findAndCountAll(queryParams)
  }

  async getAbTarget (id) {
    return await this.models.AbTarget.findByPk(id)
  }

  async addAbTarget (data) {
    try {
      utils.checkInputParams([
        {value: data.name, error: '请填写name'},
      ])
    } catch (err) {
      this.throwException(400, err.message)
    }

    // do params check here!

    let abTarget = await this.models.AbTarget.create(data, {transaction: this.t})
    if (!abTarget) {
      this.logger.error(`添加AB测试指标失败! ${err}`)
      this.throwException(400, '添加AB测试指标失败!')
    }
    return abTarget
  }

  async modifyAbTarget (id, data) {
    let exist = await this.models.AbTarget.findByPk(id)
    if (!exist) {
      this.throwException(400, '无效的AB测试指标!')
      return
    }

    try {
      utils.checkInputParams([
        {value: data.name, error: '请填写name'},
      ])
    } catch (err) {
      this.throwException(400, err.message)
    }

    // add set data code here
    // e.g. exist.name = data.name

    exist.name = data.name
    exist.description = data.description

    return await exist.save({transaction: this.t})
  }  

  async deleteAbTarget (id) {
    let exist = await this.models.AbTarget.findByPk(id)
    if (!exist) {
      return
    }

    await this.models.AbTarget.destroyById(exist.id, {transaction: this.t})
  }
  
  async getAbGroupList (params) {
    let conditions = [
    ]
    
    // add custom query here
    // e.g. 
    // if (params.type) {
    //   conditions.push({type: params.type})
    // }

    if (params.abTestId) {
      conditions.push({ abTestId: params.abTestId })
    }
    if (params.name) {
      conditions.push({ name: params.name })
    }
    if (params.isDefault) {
      conditions.push({ isDefault: JSON.parse(params.isDefault) })
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

    return await this.models.AbGroup.findAndCountAll(queryParams)
  }

  async getAbGroup (id) {
    return await this.models.AbGroup.findByPk(id)
  }

  async addAbGroup (data) {
    try {
      utils.checkInputParams([
        {value: data.abTestId, error: '请填写abTestId'},
        {value: data.name, error: '请填写name'},
        {value: data.flowRatio, error: '请填写flowRatio'},
        {value: data.params, error: '请填写params'},
        {value: data.whiteList, error: '请填写whiteList'},
      ])
    } catch (err) {
      this.throwException(400, err.message)
    }

    // do params check here!

    let abGroup = await this.models.AbGroup.create(data, {transaction: this.t})
    if (!abGroup) {
      this.logger.error(`添加ab对照组失败! ${err}`)
      this.throwException(400, '添加ab对照组失败!')
    }
    return abGroup
  }

  async modifyAbGroup (id, data) {
    let exist = await this.models.AbGroup.findByPk(id)
    if (!exist) {
      this.throwException(400, '无效的ab对照组!')
      return
    }

    try {
      utils.checkInputParams([
        {value: data.abTestId, error: '请填写abTestId'},
        {value: data.name, error: '请填写name'},
        {value: data.flowRatio, error: '请填写flowRatio'},
        {value: data.params, error: '请填写params'},
        {value: data.whiteList, error: '请填写whiteList'},
      ])
    } catch (err) {
      this.throwException(400, err.message)
    }

    // add set data code here
    // e.g. exist.name = data.name

    exist.abTestId = data.abTestId
    exist.abTestName = data.abTestName
    exist.name = data.name
    exist.description = data.description
    exist.isDefault = data.isDefault
    exist.flowRatio = data.flowRatio
    exist.params = data.params
    exist.whiteList = data.whiteList
    exist.indicators = data.indicators

    return await exist.save({transaction: this.t})
  }  

  async deleteAbGroup (id) {
    let exist = await this.models.AbGroup.findByPk(id)
    if (!exist) {
      return
    }

    await this.models.AbGroup.destroyById(exist.id, {transaction: this.t})
  }
  
  async getAbAllocationList (params) {
    let conditions = [
    ]
    
    // add custom query here
    // e.g. 
    // if (params.type) {
    //   conditions.push({type: params.type})
    // }

    if (params.clientId) {
      conditions.push({ clientId: params.clientId })
    }
    if (params.abTestId) {
      conditions.push({ abTestId: params.abTestId })
    }
    if (params.abGroupId) {
      conditions.push({ abGroupId: params.abGroupId })
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

    return await this.models.AbAllocation.findAndCountAll(queryParams)
  }

  async getAbAllocation (id) {
    return await this.models.AbAllocation.findByPk(id)
  }

  async addAbAllocation (data) {
    try {
      utils.checkInputParams([
        {value: data.clientId, error: '请填写clientId'},
        {value: data.abTestId, error: '请填写abTestId'},
        {value: data.abGroupId, error: '请填写abGroupId'},
      ])
    } catch (err) {
      this.throwException(400, err.message)
    }

    // do params check here!

    let abAllocation = await this.models.AbAllocation.create(data, {transaction: this.t})
    if (!abAllocation) {
      this.logger.error(`添加AB测试分配记录失败! ${err}`)
      this.throwException(400, '添加AB测试分配记录失败!')
    }
    return abAllocation
  }

  async modifyAbAllocation (id, data) {
    let exist = await this.models.AbAllocation.findByPk(id)
    if (!exist) {
      this.throwException(400, '无效的AB测试分配记录!')
      return
    }

    try {
      utils.checkInputParams([
        {value: data.clientId, error: '请填写clientId'},
        {value: data.abTestId, error: '请填写abTestId'},
        {value: data.abGroupId, error: '请填写abGroupId'},
      ])
    } catch (err) {
      this.throwException(400, err.message)
    }

    // add set data code here
    // e.g. exist.name = data.name

    exist.clientId = data.clientId
    exist.abTestId = data.abTestId
    exist.abTestName = data.abTestName
    exist.abGroupId = data.abGroupId
    exist.abGroupName = data.abGroupName

    return await exist.save({transaction: this.t})
  }  

  async deleteAbAllocation (id) {
    let exist = await this.models.AbAllocation.findByPk(id)
    if (!exist) {
      return
    }

    await this.models.AbAllocation.destroyById(exist.id, {transaction: this.t})
  }
}

module.exports = AbTestService
