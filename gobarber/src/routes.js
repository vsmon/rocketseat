const {Router} = require('express')

const UserController = require('./app/controllers/userController')

const routes = new Router()

routes.post('/user', UserController.store)

module.exports = routes