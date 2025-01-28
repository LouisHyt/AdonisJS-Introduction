/*
|--------------------------------------------------------------------------
| Routes file
|--------------------------------------------------------------------------
|
| The routes file is used for defining the HTTP routes.
|
*/

import AuthController from '#controllers/auth_controller'
import router from '@adonisjs/core/services/router'
import { middleware } from '#start/kernel'
import SocialController from '#controllers/social_controller'

router.on('/').render('pages/home').as("home")

router.get("/register", [AuthController, 'register']).as("auth.register").use(middleware.guest())
router.post("/register", [AuthController, 'handleRegister']).use(middleware.guest())
router.get("/login", [AuthController, 'login']).as("auth.login").use(middleware.guest())
router.post("/login", [AuthController, 'handleLogin']).as("auth.handle_login").use(middleware.guest())
router.delete("/logout", [AuthController, 'handleLogout']).as("auth.logout").use(middleware.auth())

router.get("/dashboard", () => {}).use(middleware.auth()).as("dashboard")


//socials OAuth
router.get("/auth/github/redirect", [SocialController, 'githubRedirect']).as("auth.github.redirect").use(middleware.guest())
router.get("/auth/github/callback", [SocialController, 'githubCallback']).as("auth.github.callback").use(middleware.guest())