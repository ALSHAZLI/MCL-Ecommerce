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




let createNewCat = (data) => {
    return new Promise(async (resolve, reject) => {
        
            // hash password
            let salt = bcrypt.genSaltSync(10);
            let catItem = {
                name: data.name,
                image: data.image,
                
            };

            //create a new account
            DBConnection.query(
                ' INSERT INTO cat set ? ', catItem,
                function(err, rows) {
                    if (err) {
                        reject(false)
                        resolve("Create a new catItem Fulier ***********");
                        console.log(err);
                        
                        
                    }
                    resolve("Create a new Ct successful");
                    console.log("Create a new Ct successful");
                }
            );
        
    });
};


module.exports = {
    createNewCat: createNewCat,
    
};