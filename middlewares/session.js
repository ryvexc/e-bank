import MongoStore from 'connect-mongo';
import { getMongoClient } from './database';
import nextSession from 'next-session'
import { promisifyStore } from 'next-session/lib/compat'

const mongoStore = MongoStore.create({
    clientPromise: getMongoClient(),
    stringify: false,
})

const getSession = nextSession({
    store: promisifyStore(mongoStore),
    cookie: {
        httpOnly: true,
        secure: process.env.NODE_ENV == "production",
        maxAge: 2 * 7 * 24 * 60 * 60,
        path: "/",
        sameSite: "strict"
    },
    touchAfter: 1 * 7 * 24 * 60 * 60
})

export default async function (req, res, next) {
    await getSession(req, res)
    next()
}