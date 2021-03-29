'use strict'
/**
 * @param {Egg.Application} app - egg application
 */

module.exports = app => {
  const { router, controller, middleware } = app
  const jwtMiddleware = middleware.jwt()
  
  router.get('/api/channels', controller.channel.getChannelList)
  router.get('/api/channels/:id', controller.channel.getChannelDetail)
  router.post('/api/channels', controller.channel.createChannel)
  router.put('/api/channels/:id', controller.channel.modifyChannel)
  router.delete('/api/channels/:id', controller.channel.deleteChannel)

  
  router.get('/api/advertisements', controller.advertisement.getAdvertisementList)
  router.get('/api/advertisements/:id', controller.advertisement.getAdvertisementDetail)
  router.post('/api/advertisements', controller.advertisement.createAdvertisement)
  router.put('/api/advertisements/:id', controller.advertisement.modifyAdvertisement)
  router.delete('/api/advertisements/:id', controller.advertisement.deleteAdvertisement)

  
  router.get('/api/drawPrizes', controller.drawPrize.getDrawPrizeList)
  router.get('/api/drawPrizes/:id', controller.drawPrize.getDrawPrizeDetail)
  router.post('/api/drawPrizes', controller.drawPrize.createDrawPrize)
  router.put('/api/drawPrizes/:id', controller.drawPrize.modifyDrawPrize)
  router.delete('/api/drawPrizes/:id', controller.drawPrize.deleteDrawPrize)

  
  router.get('/api/channelPrizes', controller.channelPrize.getChannelPrizeList)
  router.get('/api/channelPrizes/:id', controller.channelPrize.getChannelPrizeDetail)
  router.post('/api/channelPrizes', controller.channelPrize.createChannelPrize)
  router.put('/api/channelPrizes/:id', controller.channelPrize.modifyChannelPrize)
  router.delete('/api/channelPrizes/:id', controller.channelPrize.deleteChannelPrize)

}
