import nextConnect from "next-connect";
import isEmail from "validator/lib/isemail";
import normalizeEmail from "validator/lib/normalizeEmail";
import bcrypt from 'bcryptjs';
import middleware from "@/middlewares/middleware";
import { extractUser } from "@/lib/api-helpers";

const handler = nextConnect()
handler.use(middleware)

handler.post(async (req, res) => {
    const { name, password } = req.body
    const email = normalizeEmail(req.body.email)
    if (!isEmail(email)) {
        res.statusCode(400).send('The email you entered is invalid.')
        return
    }
    if (!password || !name) {
        res.statusCode(400).send('Missing field(s')
        return
    }
    if ((await req.db.collection('users').countDocuments({ email })) > 0) {
        res.statusCode(403).send('The email has already been used')
    }
    const PasswordHash = await bcrypt.hash(password, 25)
    const user = await req.db.collection('users').insertOne({ email, password: PasswordHash, name }).then(({ ops }) => ops[0])
    req.login(user, (err) => {
        if (err) throw err
        res.statusCode(201).json({
            user: extractUser(req)
        })
    })
})

export default handler;