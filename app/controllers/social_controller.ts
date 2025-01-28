 import User from '#models/user';
import type { HttpContext } from '@adonisjs/core/http'
import { cuid } from '@adonisjs/core/helpers'

export default class SocialController {

    githubRedirect({ally}: HttpContext){
        ally.use('github').redirect((req) => {
            req.scopes(['read:user'])
        })
    }

    async githubCallback({ally, session, response, auth}: HttpContext) {
        const gh = ally.use('github')

        // User has denied access by canceling the login flow
        if (gh.accessDenied()) {
            session.flash('error', 'You have denied the login process');
            return response.redirect().toRoute('auth.login')
        }

        // OAuth state verification failed. This happens when the CSRF cookie gets expired.
        if (gh.stateMisMatch()) {
            session.flash('error', 'We are unable to verify the request. Please try again');
            return response.redirect().toRoute('auth.login')
        }

        // GitHub responded with some error
        if (gh.hasError()) {
            session.flash('error', 'Github is unable to process the request. Please try again later');
            return response.redirect().toRoute('auth.login')
        }

        // Access user info
        const githubUser = await gh.user()
        if(!githubUser.email){
            githubUser.email = `${githubUser.original.login}@github.com`
        }
        const user = await User.findBy('email', githubUser.email)

        if(!user){
            const checkUser = await User.findBy('username', githubUser.original.login);
            if(!checkUser){
                const newUser = await User.create({ email: githubUser.email, username: githubUser.original.login, thumbnail: githubUser.avatarUrl})
                await auth.use("web").login(newUser)
                session.flash('success', 'Successfully Logged in!')
            } else {
                const newUser = await User.create({ email: githubUser.email, username: `${cuid().substring(0, 7)}@ghub`, thumbnail: githubUser.avatarUrl})
                await auth.use("web").login(newUser)
                session.flash("warning", "Your username was already taken. We've created a new one for you!")
            } 
        } else {
            await auth.use("web").login(user)
            session.flash('success', 'Successfully Logged in!')
        }

        return response.redirect().toRoute('home')
    }


}