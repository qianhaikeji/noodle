'use strict'
/**
 * @param {Egg.Application} app - egg application
 */

module.exports = app => {
  const { router, controller, middleware } = app
  const jwtMiddleware = middleware.jwt()
  
  router.get('/api/welfareUsers', controller.welfareUser.getWelfareUserList)
  router.get('/api/welfareUsers/:id', controller.welfareUser.getWelfareUserDetail)

  
  router.get('/api/welfareOpenPacketRecords', controller.welfareOpenPacketRecord.getWelfareOpenPacketRecordList)
  router.get('/api/welfareOpenPacketRecords/:id', controller.welfareOpenPacketRecord.getWelfareOpenPacketRecordDetail)

  
  router.get('/api/welfareCoinRecords', controller.welfareCoinRecord.getWelfareCoinRecordList)
  router.get('/api/welfareCoinRecords/:id', controller.welfareCoinRecord.getWelfareCoinRecordDetail)

  
  router.get('/api/welfareWalletRecords', controller.welfareWalletRecord.getWelfareWalletRecordList)
  router.get('/api/welfareWalletRecords/:id', controller.welfareWalletRecord.getWelfareWalletRecordDetail)

  
  router.get('/api/welfareTaskRecords', controller.welfareTaskRecord.getWelfareTaskRecordList)
  router.get('/api/welfareTaskRecords/:id', controller.welfareTaskRecord.getWelfareTaskRecordDetail)

}
