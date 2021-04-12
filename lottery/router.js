'use strict'
/**
 * @param {Egg.Application} app - egg application
 */

module.exports = app => {
  const { router, controller, middleware } = app
  const jwtMiddleware = middleware.jwt()
  
  router.get('/api/activitys', controller.activity.getActivityList)
  router.get('/api/activitys/:id', controller.activity.getActivityDetail)
  router.post('/api/activitys', controller.activity.createActivity)
  router.put('/api/activitys/:id', controller.activity.modifyActivity)
  router.delete('/api/activitys/:id', controller.activity.deleteActivity)

  
  router.get('/api/activityPlayers', controller.activityPlayer.getActivityPlayerList)
  router.get('/api/activityPlayers/:id', controller.activityPlayer.getActivityPlayerDetail)
  router.post('/api/activityPlayers', controller.activityPlayer.createActivityPlayer)
  router.put('/api/activityPlayers/:id', controller.activityPlayer.modifyActivityPlayer)
  router.delete('/api/activityPlayers/:id', controller.activityPlayer.deleteActivityPlayer)

  
  router.get('/api/preDrawInfos', controller.preDrawInfo.getPreDrawInfoList)
  router.get('/api/preDrawInfos/:id', controller.preDrawInfo.getPreDrawInfoDetail)

  
  router.get('/api/prizeShows', controller.prizeShow.getPrizeShowList)
  router.get('/api/prizeShows/:id', controller.prizeShow.getPrizeShowDetail)
  router.post('/api/prizeShows', controller.prizeShow.createPrizeShow)
  router.put('/api/prizeShows/:id', controller.prizeShow.modifyPrizeShow)
  router.delete('/api/prizeShows/:id', controller.prizeShow.deletePrizeShow)

}
