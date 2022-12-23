import { Router } from 'express'
import UsersController from '../controllers/usersController.js'

class UsersRouter {
  router = Router()
  usersController = new UsersController()

  constructor() {
    this.intializeRoutes()
  }
  intializeRoutes() {
    this.router.route('/').get(this.usersController.welcome)
    this.router.route('/signup').post(this.usersController.signUp)
    this.router.route('/signin').post(this.usersController.signIn)
    this.router.route('/updateProfile').post(this.usersController.updateProfile)
  }
}
export default new UsersRouter().router