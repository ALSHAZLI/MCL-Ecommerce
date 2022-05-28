// let getPageLogin = (req, res) => {
//     return res.render('login.ejs');
//         // errors: req.flash("errors")
// };


// module.exports = {
//     getPageLogin:getPageLogin,
// }




import { validationResult } from "express-validator";
import loginService from "../services/loginService";

let getPageLogin = (req, res) => {
    return res.render("login.ejs", {
        errors: req.flash("errors")
    });
};

let handleLogin = async (req, res) => {
    let errorsArr = [];
    let validationErrors = validationResult(req);
    if (!validationErrors.isEmpty()) {
        let errors = Object.values(validationErrors.mapped());
        errors.forEach((item) => {
            errorsArr.push(item.msg);
        });
        
        req.flash("errors", errorsArr);
        return res.redirect("/login");
    }

    try {
        await loginService.handleLogin(req.body.phone, req.body.password);
        var token = jwt.sign({
            phone : user.phone,
            Userid : user.id
        },'secret',function (error,token){
            res.status(201).json({
                message:"sucssss !!!!",
                token : token
            })
            }
        )
        return res.redirect("/");
    } catch (err) {
        // console.log("balablabalbalablla"); 
        req.flash("errors", err);
        res.status(400).send(err);
        // return res.redirect("/login");
      
    }
};

let checkLoggedIn = (req, res, next) => {
    if (!req.isAuthenticated()) {
        return res.redirect("/login");
    }
    next();
};

let checkLoggedOut = (req, res, next) => {
    if (req.isAuthenticated()) {
        return res.redirect("/");
    }
    next();
};

let postLogOut = (req, res) => {
    req.session.destroy(function(err) {
        return res.redirect("/login");
    });
};

module.exports = {
    getPageLogin: getPageLogin,
    handleLogin: handleLogin,
    checkLoggedIn: checkLoggedIn,
    checkLoggedOut: checkLoggedOut,
    postLogOut: postLogOut
};
