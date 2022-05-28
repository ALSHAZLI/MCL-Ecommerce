const express = require('express');
const loginController = require('../controllers/loginController');
const catController = require('../controllers/catController');
import DBConnection from "../configs/DBConnection";
import bcrypt from "bcryptjs";
const jwt = require("jsonwebtoken");
const { createTokens, validateToken } = require("../services/JWT");

const RegisterController = require('../controllers/registerController');
import homePageController from "../controllers/homePageController";
import auth from "../validation/authValidation";
import passport from "passport";
import initPassportLocal from "../controllers/passportLocalController";
// Init all passport
// initPassportLocal();

const router = express.Router();

let initWebRoutes = (app) => {
    router.get("/", loginController.checkLoggedIn, homePageController.handleHelloWorld,validateToken);
    router.get("/login",loginController.checkLoggedOut, loginController.getPageLogin);
    
    // router.get("/login",loginController.getPageLogin);

    // router.post("/login",loginController.handleLogin);
    router.post("/login",async (req, res) => {

        const { phone, password } = req.body;

        let user = await findUserByEmail(phone);
        if (user) {

        await bcrypt.compare(password, user.password).then((isMatch) => {
            if (isMatch) {
                // resolve(true);
                const accessToken = createTokens(user);

                res.cookie("access-token", accessToken, {
                    maxAge: 60 * 60 * 24 * 30 * 1000,
                    httpOnly: true,
                 });

            res.json("LOGGED IN");
            } else {
                // reject(`The password that you've entered is incorrect`);
                res
                    .status(400)
                    .json({ error: "Wrong phone and Password Combination!" });
            }
        });

      }  else {
        res.status(401).json({
            message:"Fillera 222222 !!!!",
            
        })
        // reject(`This user email "${phone}" doesn't exist`);
        console.log(`This user email "${phone}" doesn't exist`);
    }  
    }
    );

    router.post("/cat",catController.createNewCat);
    router.get("/cat",catController.getCat);
    
    router.get("/register",RegisterController.getPageRegister);
    router.post("/register",
         RegisterController.createNewUser
        );
    router.post("/logout", loginController.postLogOut);
 
    return app.use('/',router);
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


module.exports = initWebRoutes;





// import express from "express";
// import homePageController from "../controllers/homePageController";
// import registerController from "../controllers/registerController";
// import loginController from "../controllers/loginController";
// import auth from "../validation/authValidation";
// import passport from "passport";
// import initPassportLocal from "../controllers/passportLocalController";

// // Init all passport
// initPassportLocal();

// let router = express.Router();

// let initWebRoutes = (app) => {
//     router.get("/", loginController.checkLoggedIn, homePageController.handleHelloWorld);
//     router.get("/login",loginController.checkLoggedOut, loginController.getPageLogin);
//     router.post("/login", passport.authenticate("local", {
//         successRedirect: "/",
//         failureRedirect: "/login",
//         successFlash: true,
//         failureFlash: true
//     }));

//     router.get("/register", registerController.getPageRegister);
//     router.post("/register", auth.validateRegister, registerController.createNewUser);
//     router.post("/logout", loginController.postLogOut);
//     return app.use("/", router);
// };
// module.exports = initWebRoutes;
