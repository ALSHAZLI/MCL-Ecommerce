import DBConnection from "./../configs/DBConnection";
import bcrypt from "bcryptjs";
const express =require("express");
import res from "express/lib/response";
let app = express();


//  function createNewUser  (data)   {
//     return new Promise(async (resolve, reject) => {
//         // check email is exist or not
//         let isEmailExist = await checkExistEmail(data.phone);
//         if (isEmailExist) {
//             reject(`This email "${data.phone}" has already exist. Please choose an other Phone`);
//         } else {
//             // hash password
//             let salt = bcrypt.genSaltSync(10);
//             let userItem = {
//                 fullname: data.fullname,
//                 phone: data.phone,
//                 password: bcrypt.hashSync(data.password, salt),
//             };

//             //create a new account
//             DBConnection.query(
//                 ' INSERT INTO users set ? ', userItem
                
//             ).then(result =>{
//                 res.status(201).json({
//                     message:"User Created Successfully"
//                 })
//             }).catch(err =>{
//                 res.status(201).json({
//                     message:"Went Somseing Wrong !!!!"
//                 })
//             })
//         }
//     });
// };




let createNewUser = (data) => {
    return new Promise(async (resolve, reject) => {
        // check email is exist or not
        let isEmailExist = await checkExistEmail(data.phone);


        if (isEmailExist) {
            reject(`This email "${data.phone}" has already exist. Please choose an other Phone`);
            console.log(`This email "${data.phone}" has already exist. Please choose an other Phone`);
            
           
            
        } else {
            // hash password
            let salt = bcrypt.genSaltSync(10);
            let userItem = {
                fullname: data.fullname,
                phone: data.phone,
                password: bcrypt.hashSync(data.password, salt),
            };

            //create a new account
            DBConnection.query(
                ' INSERT INTO users set ? ', userItem,
                function(err, rows) {
                    if (err) {
                        reject(false)
                        resolve("Create a new user Fulier ***********");
                        console.log(err);
                        
                        
                    }
                    resolve("Create a new user successful");
                    console.log("Create a new user successful");
                }
            );
        }
    });
};

let checkExistEmail = (phone) => {
    return new Promise( (resolve, reject) => {
        try {
            DBConnection.query(
                ' SELECT * FROM `users` WHERE `phone` = ?  ', phone,
                function(err, rows) {
                    if (err) {
                        reject(err)
                        console.log(err);
                    }
                    if (rows.length > 0) {
                        resolve(true)
                    } else {
                        resolve(false)
                    }
                }
            );
        } catch (err) {
            reject(err);
        }
    });
};
module.exports = {
    createNewUser: createNewUser,
    checkExistEmail: checkExistEmail
};
