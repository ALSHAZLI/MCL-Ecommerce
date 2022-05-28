import DBConnection from "./../configs/DBConnection";
import catService from "./../services/catService";
import { validationResult } from "express-validator";

let getCat = async function (req, res,next) {
    try {
            
        
        DBConnection.query(
            ' SELECT * FROM cat',(err,rows,fields)=>{
                if(!err){
                 
                  return  res.status(201).json({
                       message:"sucsess geting categories #####",
                       rows
                    })
                    
                    // console.log("sucsess geting categories #####")
                }else{
                    console.log(err)
                    res.status(404).json({
                        message:"Went Somseing Wrong !!!!",
                        error: err
                     })
                }
            }
        );
    } catch (error) {
           console.log(`sorry the is ErrOr ${error}`); 
    }
}


let createNewCat = async function (req, res,next) {
  //validate required fields
  let errorsArr = [];
  let validationErrors = validationResult(req);
  if (!validationErrors.isEmpty()) {
    let errors = Object.values(validationErrors.mapped());
    errors.forEach((item) => {
      errorsArr.push(item.msg);
    });
    req.flash("errors", errorsArr);
    // return res.send("errorrrrrrrrr");
  }
  //create a new user
    let catItem = {
        name: req.body.name,
        image: req.body.image,
        
    };
    try {
        await catService.createNewCat(catItem);
        console.log(catItem);
        return res.send(catItem);
       
    
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
        return console.log(err);
    
    }
};
module.exports = {
    createNewCat: createNewCat,
    getCat : getCat
};


