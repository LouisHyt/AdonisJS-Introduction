import vine, { SimpleMessagesProvider } from '@vinejs/vine'

vine.messagesProvider = new SimpleMessagesProvider({
    'password.confirmed' : "The passwords must be the same!"
})

export const registerUserValidator = vine.compile(
    vine.object({
        username: vine.string().trim().minLength(4).unique(async (db, value) => {
            const users = await db.from('users').where('username', value).first();
            return !users
        }),
        email: vine.string().email().unique(async (db, value) => {
            const users = await db.from('users').where('email', value).first();
            return !users
        }),
        password: vine.string().minLength(7).confirmed({
            confirmationField: "password_confirm"
        }),
        password_confirm: vine.string(),
        thumbnail: vine.file({extnames: ["jpg", "png", "webp"], size: "8mb"}).optional()
    })
)

export const loginUserValidator = vine.compile(
    vine.object({
        email: vine.string().email(),
        password: vine.string().minLength(7)
    })
)