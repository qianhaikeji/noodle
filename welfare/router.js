'use strict'
/**
 * @param {Egg.Application} app - egg application
 */

module.exports = app => {
  const { router, controller, middleware } = app
  const jwtMiddleware = middleware.jwt()
  
  router.get('/api/welfareUsers', controller.welfareUser.getWelfareUserList)
  router.get('/api/welfareUsers/:id', controller.welfareUser.getWelfareUserDetail)

  
  router.get('/api/welfareUserOpenPacketRecords', controller.welfareUserOpenPacketRecord.getWelfareUserOpenPacketRecordList)
  router.get('/api/welfareUserOpenPacketRecords/:id', controller.welfareUserOpenPacketRecord.getWelfareUserOpenPacketRecordDetail)

  
  router.get('/api/welfareUserCoinRecords', controller.welfareUserCoinRecord.getWelfareUserCoinRecordList)
  router.get('/api/welfareUserCoinRecords/:id', controller.welfareUserCoinRecord.getWelfareUserCoinRecordDetail)

  
  router.get('/api/welfareUserWalletRecords', controller.welfareUserWalletRecord.getWelfareUserWalletRecordList)
  router.get('/api/welfareUserWalletRecords/:id', controller.welfareUserWalletRecord.getWelfareUserWalletRecordDetail)

  
  router.get('/api/welfareUserTaskRecords', controller.welfareUserTaskRecord.getWelfareUserTaskRecordList)
  router.get('/api/welfareUserTaskRecords/:id', controller.welfareUserTaskRecord.getWelfareUserTaskRecordDetail)

}
