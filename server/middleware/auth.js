import jwt from 'jsonwebtoken';
import ENV from '../config.js';


export const Auth = async(req, res, next) => {
    try {
        const token = req.headers.authorization.split(' ')[1];

        const decodedToken = await jwt.verify(token, ENV.JWT_SECRET);

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