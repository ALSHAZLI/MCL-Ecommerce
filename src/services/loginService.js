import DBConnection from "../configs/DBConnection";
import bcrypt from "bcryptjs";
const jwt = require("jsonwebtoken");

let handleLogin = (phone, password) => {
    return new Promise(async (resolve, reject) => {
        //check email is exist or not
        let user = await findUserByEmail(phone);
        if (user) {
            //compare password
            await bcrypt.compare(password, user.password).then((isMatch) => {
                if (isMatch) {
                    resolve(true);
                    
                } else {
                    reject(`The password that you've entered is incorrect`);
                }
            });
        } else {
            res.status(401).json({
                message:"Fillera 222222 !!!!",
                
            })
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