import UserModel from '../model/User.model.js';
import bcrypt from 'bcrypt';
import jwt from "jsonwebtoken"
import ENV from "../config.js";

export const verifyUser = async(req, res, next) => {
    try {
        const { username } = req.method == 'GET' ? req.query : req.body;

        let isExist = await UserModel.findOne({ username });

        if(!isExist) return res.status(404).send({ error: "Can't find User!" });
        next();
    } catch (error) {
        return res.status(404).send({ error: "Authentication Error"})
    }
}

export const register = async(req,res) => {

    try {
        const { username, password, profile, email } = req.body;        

        // check the existing user
        const isUser = await UserModel.findOne({ username })
        if(isUser) {
            return res.status(500).send({ error: "Please use unique Username" })
        };

        // check for existing email
        const isEmail = await UserModel.findOne({ email })
        if(isEmail) {
            return res.status(500).send({ error: "Please use unique Email" })
        };


        Promise.all([!isEmail, !isUser])
            .then(() => {
                if(password){
                    bcrypt.hash(password, 10)
                        .then( hashedPassword => {
                            
                            const user = new UserModel({
                                username,
                                password: hashedPassword,
                                profile: profile || '',
                                email
                            });

                            // return save result as a response
                            user.save()
                                .then(result => res.status(201).send({ msg: "User Register Successfully"}))
                                .catch(error => res.status(500).send({error}))

                        }).catch(error => {
                            return res.status(500).send({
                                error : "Enable to hashed password"
                            })
                        })
                }
            }).catch(error => {
                return res.status(500).send({ error })
            })


    } catch (error) {
        return res.status(500).send(error);
    }

}


export const login = async(req,res) => {
   
    const { username, password } = req.body;

    try {
        UserModel.findOne({ username })
            .then(user => {
                bcrypt.compare(password, user.password)
                    .then(passwordCheck => {
                        if(!passwordCheck) return res.status(400).send({ error: "Don't have Password"});

                        // create jwt token
                        const token = jwt.sign({
                                        userId: user._id,
                                        username : user.username
                                    }, ENV.JWT_SECRET , { expiresIn : "24h"});
                        return res.status(200).send({
                            msg: "Login Successful... !",
                            username: user.username,
                            token
                        });                                    

                    })
                    .catch(error =>{
                        return res.status(400).send({ error: "Password does not Match"})
                    })
            })
            .catch( error => {
                return res.status(404).send({ error : "Username not Found"});
            })

    } catch (error) {
        return res.status(500).send({ error});
    }
}

export const getUser = async(req, res) => {
    const { username } = req.params;

    try {
        if(!username) return res.status(501).send({ error: "Invalid Username" })

        const userFound = await UserModel.findOne({ username });

        if(!userFound) res.status(500).send({ error: "Couldn't Find the User" })

        const { password, ...rest } = Object.assign({}, userFound.toJSON());

        return res.status(201).send(rest);

    } catch (error) {
        return res.status(404).send({ error: "Cannot Find User Data" })
    }
}

export const updatUser = async(req, res) => {
    try {
        const { userId } = req.user
        if (userId) {
            const body = req.body;
            const updatedUser = await UserModel.updateOne({ _id: userId }, body)

            if(updatedUser) {
                return res.status(201).send({ msg: "Record Updated... !" })
            }
        } else {
            return res.status(401).send({ error: "User Not Found... !" });
        }
    } catch (error) {
        return res.status(404).send({ error: "Cannot Find User Data" })
    }
}

export const generateOTP = async(req, res) => {
    res.json('generateOTP route')
}

export const verifyOTP = async(req, res) => {
    res.json('verifyOTP route')
}

export const createResetSession = async(req, res) => {
    res.json('createResetSession route')
}

export const resetPassword = async(req, res) => {
    res.json('resetPassword route')
}