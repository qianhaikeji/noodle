'use strict'
/**
 * @param {Egg.Application} app - egg application
 */

module.exports = app => {
  const { router, controller, middleware } = app
  const jwtMiddleware = middleware.jwt()
  
  router.get('/api/users', controller.UserController.getUserList)
  router.get('/api/users/:id', controller.UserController.getUserDetail)
  router.post('/api/users', controller.UserController.createUser)
  router.put('/api/users/:id', controller.UserController.modifyUser)
  router.delete('/api/users/:id', controller.UserController.deleteUser)

  
  router.get('/api/admins', controller.UserController.getAdminList)
  router.get('/api/admins/:id', controller.UserController.getAdminDetail)
  router.post('/api/admins', controller.UserController.createAdmin)
  router.put('/api/admins/:id', controller.UserController.modifyAdmin)
  router.delete('/api/admins/:id', controller.UserController.deleteAdmin)

}
