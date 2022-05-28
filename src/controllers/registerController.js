import registerService from "./../services/registerService";
import { validationResult } from "express-validator";

let getPageRegister = (req, res) => {
  return res.render("register.ejs", {
    errors: req.flash("errors"),
  });   
};
let conn = async function (req,res,next){
  console.log('conn function nnnnnn dont cear');
}

let createNewUser = async function (req, res,next) {
  //validate required fields
  let errorsArr = [];
  let validationErrors = validationResult(req);
  if (!validationErrors.isEmpty()) {
    let errors = Object.values(validationErrors.mapped());
    errors.forEach((item) => {
      errorsArr.push(item.msg);
    });
    req.flash("errors", errorsArr);
    return res.redirect("/register");
  }
  //create a new user
    let newUser = {
        fullname: req.body.fullname,
        phone: req.body.phone,
        password: req.body.password,
    };
    try {
        await registerService.createNewUser(newUser);
         
        return res.redirect("/login");
    
    } catch (err) { 
      
    
      
      
      // if(err){      
      // return res.redirect("/register");
            
      //   }else{
      //     res.status(404).json({
      //       message:"Went Somseing Wrong !!!!"
      //   })
      //   }
    
        // doesn't call 
      // **********************************************************
      
        req.flash("errors", err);
        return res.redirect("/register");
    
    }
};
module.exports = {
  getPageRegister: getPageRegister,
  createNewUser: createNewUser,
};

// import registerService from "./../services/registerService";
// import { validationResult } from "express-validator";

// let getPageRegister = (req, res) => {
//     return res.render("register.ejs", {
//         errors: req.flash("errors")
//     });
// };

// let createNewUser = async (req, res) => {
//     //validate required fields
//     let errorsArr = [];
//     let validationErrors = validationResult(req);
//     if (!validationErrors.isEmpty()) {
//         let errors = Object.values(validationErrors.mapped());
//         errors.forEach((item) => {
//             errorsArr.push(item.msg);
//         });
//         req.flash("errors", errorsArr);
//         
//     }

//     //create a new user
//     let newUser = {
//         fullname: req.body.fullName,
//         email: req.body.email,
//         password: req.body.password
//     };
//     try {
//         await registerService.createNewUser(newUser);
//         return res.redirect("/login");
//     } catch (err) {
//         req.flash("errors", err);
//         return res.redirect("/register");
//     }
// };
// module.exports = {
//     getPageRegister: getPageRegister,
//     createNewUser: createNewUser
// };
