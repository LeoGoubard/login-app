import jwt from 'jsonwebtoken';
import * as dotenv from 'dotenv';
dotenv.config({ path: "../vars/.env" })


export const Auth = async(req, res, next) => {
    try {
        const token = req.headers.authorization.split(' ')[1];

        const decodedToken = await jwt.verify(token, process.env.JWT_SECRET);

        req.user = decodedToken

        next()
    } catch (error) {
        res.status(401).json({ error: "Authentication Failed" })
    }
}

export const localVariables = (req, res, next) => {
    req.app.locals = {
        OTP: null,
        resetSession: false
    }

    next()
}