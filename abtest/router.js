'use strict'
/**
 * @param {Egg.Application} app - egg application
 */

module.exports = app => {
  const { router, controller, middleware } = app
  const jwtMiddleware = middleware.jwt()
  
  router.get('/api/admin/abTests', controller.abTest.getAbTestList)
  router.get('/api/admin/abTests/:id', controller.abTest.getAbTestDetail)
  router.post('/api/admin/abTests', controller.abTest.createAbTest)
  router.put('/api/admin/abTests/:id', controller.abTest.modifyAbTest)
  router.delete('/api/admin/abTests/:id', controller.abTest.deleteAbTest)

  
  router.get('/api/admin/abTargets', controller.abTarget.getAbTargetList)
  router.get('/api/admin/abTargets/:id', controller.abTarget.getAbTargetDetail)
  router.post('/api/admin/abTargets', controller.abTarget.createAbTarget)
  router.put('/api/admin/abTargets/:id', controller.abTarget.modifyAbTarget)
  router.delete('/api/admin/abTargets/:id', controller.abTarget.deleteAbTarget)

  
  router.get('/api/admin/abGroups', controller.abGroup.getAbGroupList)
  router.get('/api/admin/abGroups/:id', controller.abGroup.getAbGroupDetail)
  router.post('/api/admin/abGroups', controller.abGroup.createAbGroup)
  router.put('/api/admin/abGroups/:id', controller.abGroup.modifyAbGroup)
  router.delete('/api/admin/abGroups/:id', controller.abGroup.deleteAbGroup)

  
  router.get('/api/admin/abAllocations', controller.abAllocation.getAbAllocationList)
  router.get('/api/admin/abAllocations/:id', controller.abAllocation.getAbAllocationDetail)
  router.put('/api/admin/abAllocations/:id', controller.abAllocation.modifyAbAllocation)
  router.delete('/api/admin/abAllocations/:id', controller.abAllocation.deleteAbAllocation)

}
