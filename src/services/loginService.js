import DBConnection from "../configs/DBConnection";
import bcrypt from "bcryptjs";
const jwt = require("jsonwebtoken");
const { createTokens, validateToken } = require("./JWT");
const cookieParser = require("cookie-parser");
const express =require("express");
let app = express();
app.use(cookieParser());
app.use(express.json());
let handleLogin = (phone, password,req, res,next) => {
    return new Promise(async (resolve, reject) => {
        //check email is exist or not
        let user = await findUserByEmail(phone);
        if (user) {
            var self = this;
            //compare password
            await bcrypt.compare(password, user.password).then((isMatch) => {
                if (isMatch) {
                    resolve(true);
                    const accessToken = createTokens(user);

                    res.cookie("access-token", accessToken, {
                        maxAge: 60 * 60 * 24 * 30 * 1000,
                        httpOnly: true,
                     });

                res.json("LOGGED IN");
                } else {
                    reject(`The password that you've entered is incorrect`);
                    res
                        .status(400)
                        .json({ error: "Wrong Username and Password Combination!" });
                }
            });
        } else {
            // res.status(401).json({
            //     message:"Fillera 222222 !!!!",
                
            // })
            reject(`This user email "${phone}" doesn't exist`);
            console.log(`This user email "${phone}" doesn't exist`);
        }
    });
};


let findUserByEmail = (phone) => {
    return new Promise( async (resolve, reject)  => {
        
        try {
            DBConnection.query(
                ' SELECT * FROM `users` WHERE `phone` = ?  ', phone,
                function(err, rows) {
                    if (err) {
                        reject(err)
                        console.log(`the is err ${err}`);
                        
                        
                    }
                    let user = rows[0]
                    resolve(user)
                    
                       
                    
                    // console.log('email was founded @@@@');
                }
            );
        } catch (err) {
            reject(err);
            console.log(` gyeghdgchd ${err} vvvvvvvvv`)
        }
    });
};

let findUserById = (id) => {
    return new Promise((resolve, reject) => {
        try {
            DBConnection.query(
                ' SELECT * FROM `users` WHERE `id` = ?  ', id,
                function(err, rows) {
                    if (err) {
                        reject(err)
                    }
                    let user = rows[0];
                    resolve(user);
                }
            );
        } catch (err) {
            reject(err);
        }
    });
};

let comparePassword = (password, userObject) => {
    return new Promise(async (resolve, reject) => {
        try {
            await bcrypt.compare(password, userObject.password).then((isMatch) => {
                if (isMatch) {
                    resolve(true);
                } else {
                    resolve(`The password that you've entered is incorrect`);
                }
            });
        } catch (e) {
            reject(e);
        }
    });
};

module.exports = {
    handleLogin: handleLogin,
    findUserByEmail: findUserByEmail,
    findUserById: findUserById,
    comparePassword: comparePassword
};