const express = require('express');
const loginController = require('../controllers/loginController');
const homeController = require('../controllers/homePageController');

const RegisterController = require('../controllers/registerController');
import homePageController from "../controllers/homePageController";
import auth from "../validation/authValidation";
import passport from "passport";
import initPassportLocal from "../controllers/passportLocalController";
// Init all passport
initPassportLocal();

const router = express.Router();

let initWebRoutes = (app) => {
    router.get("/", loginController.checkLoggedIn, homePageController.handleHelloWorld);
    router.get("/login",loginController.checkLoggedOut, loginController.getPageLogin);
    
    // router.get("/login",loginController.getPageLogin);
    router.post("/login", passport.authenticate("local", {
        successRedirect: "/",
        failureRedirect: "/login",
        successFlash: true,
        failureFlash: true
    }));
    router.get("/register",RegisterController.getPageRegister);
    router.post("/register",
         RegisterController.createNewUser
        );
    router.post("/logout", loginController.postLogOut);
 
    return app.use('/',router);
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
