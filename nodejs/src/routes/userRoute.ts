const express = require('express');
const userRouter = express.Router();
const jwt = require('jsonwebtoken');
const crypto = require("crypto");
import { User, IUser } from "../models/user";
require("dotenv").config({ path: '../.env' });


//Creation of a new user
userRouter.post("/signup", function (req:any, res:any){
    let userDataCustomer = req.body;
    const finalUserData = {
        email: userDataCustomer.email,
        password: userDataCustomer.password,
        session: [],
        registrationDate: Date.now(),
        givenName: userDataCustomer.givenName,
        familyName: userDataCustomer.familyName,
        savedCart: [],
        order: [],
        address: [],
        nationality: null,
        gender: null,
        birthDate: null
    }
    if(userDataCustomer.email && userDataCustomer.password && userDataCustomer.givenName && userDataCustomer.familyName){
        const user = new User(finalUserData);
        User.findOne( {email: userDataCustomer.email}, (err:any, existingUser:IUser) => {
            if(!existingUser){
                user.save((err:any, registeredUser: IUser)=>{
                    if(err){
                        res.status(400).send(err);
                    } else {
                        generateRefreshAuthToken().then((refreshToken)=>{
                            const expiresRefresh:Date = new Date(Date.now() + (Number(process.env.EXPIRY_DAYS_REFRESH_TOKEN) * 24 * 60 * 60 * 1000));
                            registeredUser.session.push({
                                "token": refreshToken,
                                "expiresAt": expiresRefresh
                            });
                            registeredUser.save(function(err:any, result:any){
                                if(err){
                                    res.status(500).send(err);
                                }
                                else{
                                    const expiresAccess:Date = new Date(Date.now() + (Number(process.env.EXPIRY_MINUTES_REFRESH_TOKEN) * 60 * 1000));
                                    const payload = { 
                                        subject: registeredUser._id,
                                        expiresAt: expiresAccess
                                    };
                                    const accessToken = jwt.sign(payload, process.env.JWT_SECRET);                                

                                    res.cookie('refeshToken', refreshToken,
                                    {
                                    domain: process.env.DOMAIN,
                                    httpOnly: true, 
                                    secure: true, 
                                    expires: expiresRefresh
                                    });

                                    res.cookie('accessToken', accessToken,
                                    {
                                    domain: process.env.DOMAIN,
                                    httpOnly: true, 
                                    secure: true, 
                                    expires: expiresAccess
                                    })

                                    res.status(200).send();
                                }
                            }); 
                        }).catch(e=>{
                            console.log("Failed to save session to the database");
                        });                 
                    }
                });
            }
            else{
                res.status(401).send("The email "+ userDataCustomer.email + " is already in use. Please choose another one");
            }
        });
    }
    else{
        res.status(400).send("Error in the request body, check control field names and data types");
    }
});

//Get user based on email or id
userRouter.get("/user", (req:any, res:any)=>{
    const email = req.body.email;
    const userId = req.body.id;

    if(email){
        User.findOne({email: email}, (err:any, user:IUser)=>{
            if(user){
                res.status(200).send(user);
            }
            else{
                res.status(401).send("User with email "+ email + " not found");
            }
        });
        
    }
    else if(userId){
        User.findById(userId, (err:any, user:IUser)=>{
            if(user){
                res.status(200).send(user);
            }
            else{
                res.status(401).send("User with id "+ userId + " not found");
            }
        });
    }
    else{
        res.status(400).send("Error in the request body, check control field names and data types");
    }
});

userRouter.patch("/user", (req:any, res:any)=>{
    let userDataToUpdate = req.body;
    if(userDataToUpdate.email && userDataToUpdate.givenName && userDataToUpdate.familyName 
    && userDataToUpdate.nationality && userDataToUpdate.gender && userDataToUpdate.birthDate){
    User.findOne( {email: userDataToUpdate.email}, (err:any, existingUser:IUser) => {
        if(!err){
            if(existingUser){
                existingUser.email = userDataToUpdate.email;
                existingUser.givenName = userDataToUpdate.givenName;
                existingUser.familyName = userDataToUpdate.familyName;
                existingUser.nationality =userDataToUpdate.nationality;
                existingUser.gender = userDataToUpdate.gender;
                existingUser.birthDate = userDataToUpdate.birthDate;
                existingUser.save((err:any, updatedUser: IUser)=>{
                    if(err){
                        res.status(500).send(err)
                    }else{
                        res.status(200).send("Changes saved successfully")
                    }
                });
            }
            else{
                res.status(401).send("Not authenticated");
            }
        }
        else{
            res.status(404).send("The user does not exist")
        }
    });
    }
});

const generateRefreshAuthToken = async () =>{
    return new Promise((resolve, reject) => {
        crypto.randomBytes(64, (err:any, buf:any) => {
            if (!err && buf) {
                // no error
                let token = buf.toString('hex');
                return resolve(token);
            }
        })
    })
}



module.exports = userRouter;
