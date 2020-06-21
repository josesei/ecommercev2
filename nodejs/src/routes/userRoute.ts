const express = require('express');
const userRouter = express.Router();
const jwt = require('jsonwebtoken');
const crypto = require("crypto");
const bcrypt = require("bcrypt");
const _ = require("lodash");
const nodemailer = require("nodemailer");
import { User, IUser, ISession } from "../models/user";
require("dotenv").config({ path: '../.env' });

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


const generateAccessAuthToken = (id:string) =>{
    const expiresInAccess:number = (Number(process.env.EXPIRY_MINUTES_REFRESH_TOKEN) * 60 * 1000);
    const expiresAccess:Date = new Date(Date.now() + expiresInAccess);
    const payload = {    
        subject: id
    };
    const accessToken = jwt.sign(payload, process.env.JWT_SECRET, {expiresIn: expiresInAccess} );  
    return {token:accessToken, expires:expiresAccess}
}

const auth = (req:any, res:any, next:any)=> {
    const accessToken = req.cookies.accessToken;
    const refreshToken = req.cookies.refreshToken;
    const id = req.body.id;

    if(accessToken){
        jwt.verify(accessToken, process.env.JWT_SECRET,(err:any, decoded:any)=>{
            if(!err){
                if(decoded.subject){
                    req.verifiedUserId = decoded.subject; //id directly from the jwt verified token, do not use request id when using access token
                    next();
                }               
            }
        });
    }

    if(!req.verifiedUserId){ //if access token is invalid, then check refresh token
        if(refreshToken){
            if(id){
                User.findById(id, (err:any, existingUser:IUser)=>{
                    if(err){
                        res.status(500).send(err);
                    } else{
                        if(existingUser){
                            let sessions: Array<ISession> = existingUser.session;
                            let i = 0;
                            let sessionValid: boolean = false
                            while(i<= sessions.length && (!sessionValid)){
                                if(sessions[i].token === refreshToken){
                                    if(new Date(sessions[i].expiresAt).getTime() > Date.now()){
                                        sessionValid = true;
                                    }
                                }
                            }
                            if(sessionValid){
                                const accessTokenAndExpiry = generateAccessAuthToken(id);
                                req.verifiedUserId = id;
                                res.cookie('accessToken', accessTokenAndExpiry.token,
                                {
                                domain: process.env.DOMAIN,
                                //httpOnly: true, 
                                //secure: true, 
                                expires: accessTokenAndExpiry.expires
                                });
                                next();
                            }
                            else{
                                res.status(401).send("Invalid refresh token");
                            }
                        }
                        else{
                            res.status(404).send("User with id "+ id + " not found");
                        }
                    }
                });
            } else {
                res.status(400).send("User id not specified");
            }
        } else if(!accessToken){
            res.status(401).send("No authentication credentials were provided");
        } else{
            res.status(401).send("Invalid credentials")
        }
    }
}

const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    auth:{
        type: 'OAuth2',
        user: process.env.GMAIL_USER,
        clientId: process.env.GMAIL_OAUTH_CLIENT_ID,
        clientSecret: process.env.GMAIL_OAUTH_CLIENT_SECRET,
        refreshToken: process.env.GMAIL_OAUTH_REFRESH_TOKEN,
        accessToken: process.env.GMAIL_OAUTH_ACCESS_TOKEN
    }
  });

userRouter.post("/signup", function (req:any, res:any){

    let userDataCustomer = req.body;
    const finalUserData = {
        email: userDataCustomer.email,
        password: userDataCustomer.password,
        givenName: userDataCustomer.givenName,
        familyName: userDataCustomer.familyName,
    }
    if(userDataCustomer.email && userDataCustomer.password && userDataCustomer.givenName && userDataCustomer.familyName){
        const user = new User(finalUserData);
        User.findOne( {email: userDataCustomer.email}, (err:any, existingUser:IUser) => {
            if(!existingUser){
                user.save((err:any, registeredUser: IUser)=>{
                    if(err){
                        res.status(400).send(err);
                    } else {
                        jwt.sign(
                            {
                              email: registeredUser.email,
                            },
                            process.env.EMAIL_SECRET,
                            {
                              expiresIn: '30m',
                            },
                            (err:any, emailToken:any) => {
                              const confirmationUrl = `http://localhost:3000/user/confirmation/${emailToken}`;
                    
                              transporter.sendMail({
                                to: userDataCustomer.email,
                                subject: 'Confirmation Email - ecommercev2',
                                html: `Please click on this link to confirm your email address: <a href="${confirmationUrl}">${confirmationUrl}</a>`,
                              });
                            },
                          );
                        res.status(200).send("User registration successful");          
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



userRouter.patch("/user/confirmation/:confirmationToken", (req:any, res:any)=>{
    const confirmationToken = req.params.confirmationToken;
    if(confirmationToken){
        jwt.verify(confirmationToken, process.env.EMAIL_SECRET,(err:any, decoded:any)=>{
            if(!err){
                if(decoded.email){
                    User.findOne({email: decoded.email}, (err:any, unconfirmedUser:IUser)=>{
                        if(err){
                            res.status(500).send("err");
                        }
                        else{
                            if(unconfirmedUser){
                                if(unconfirmedUser.isVerified.valueOf()){
                                    res.status(401).send("Email already confirmed");
                                }
                                else{
                                    unconfirmedUser.isVerified = true;
                                    unconfirmedUser.save((err:any, unconfirmedUser:IUser)=>{
                                        if(err){
                                            res.status(500).send("err");
                                        }
                                        else{
                                            res.status(200).send("E-mail confirmation successful");
                                        }
                                    });
                                }
                            }
                            else{
                                res.status(401).send("Invalid or expired confirmation link");
                            }
                        }
                    });
                }
                else{
                    res.status(401).send("Invalid or expired confirmation link"); 
                }
            }
        });
    }
    else{
        res.status(401).send("Invalid confirmation link");
    }
});




userRouter.post("/login", (req:any, res:any)=>{
    const email = req.body.email;
    const password = req.body.password;

    if(email && password){
        User.findOne({email: email}, (err:any, existingUser:IUser)=>{
            if(err){
                res.status(500).send(err);
            }
            else{
                if(existingUser){
                    if(existingUser.isVerified){
                        bcrypt.compare(password, existingUser.password, (err:any, bcryptResult:any)=>{
                            if(err){
                                res.status(401).send("Invalid credentials");
                            }
                            else{
                                if(bcryptResult){
                                    generateRefreshAuthToken().then((refreshToken)=>{
                                        const expiresRefresh:Date = new Date(Date.now() + (Number(process.env.EXPIRY_DAYS_REFRESH_TOKEN) * 24 * 60 * 60 * 1000));
                                        existingUser.session.push({
                                            "token": refreshToken,
                                            "expiresAt": expiresRefresh
                                        });
                                        existingUser.save(function(err:any, existingUser:any){
                                            if(err){
                                                res.status(500).send(err);
                                            }
                                            else{
                                                const accessTokenAndExpiry = generateAccessAuthToken(existingUser._id.toString());
        
                                                res.cookie('refreshToken', refreshToken,
                                                {
                                                domain: process.env.DOMAIN,
                                                //httpOnly: true, 
                                                //secure: true, 
                                                expires: expiresRefresh
                                                });
        
                                                res.cookie('accessToken', accessTokenAndExpiry.token,
                                                {
                                                domain: process.env.DOMAIN,
                                                //httpOnly: true, 
                                                //secure: true, 
                                                expires: accessTokenAndExpiry.expires
                                                })
        
                                                res.status(200).send({id: existingUser._id});
                                            }
                                        }); 
                                    }).catch(e=>{
                                        res.status(500).send("Failed to save session to the database "+e);
                                    });
                                }
                                else{
                                    res.status(401).send("Invalid credentials");
                                }
                            }
                      
                        });
                    }
                    else{
                        res.status(401).send("E-mail verification needed. Please confirm your account with the link sent to your e-mail or request a new link")
                    }
                }
                else{
                    res.status(401).send("Invalid credentials");
                }
            }
        });
    }
    else{
        res.status(401).send("Invalid credentials")
    }
});


userRouter.get("/user", auth, (req:any, res:any)=>{
    const id = req.verifiedUserId;

    User.findById(id, (err:any, existingUser:IUser)=>{
        if(existingUser){
            res.status(200).send(existingUser);
        }
        else{
            res.status(401).send("User with id: "+ id + " not found");
        }
    });
});

userRouter.patch("/user", auth, (req:any, res:any)=>{
    let update = req.body;
    User.findById( req.verifiedUserId, (err:any, existingUser:IUser) => {
        if(!err){
            if(existingUser){
                if(update.email){
                    //need to add verification procedure
                    existingUser.email = update.email;
                }
                if(update.givenName){
                    existingUser.givenName = update.givenName;
                }
                if(update.familyName){
                    existingUser.familyName = update.familyName;
                }
                if(update.nationality){
                    existingUser.nationality = update.nationality;
                }
                if(update.gender){
                    existingUser.gender = update.gender;
                }
                if(update.birthDate){
                    existingUser.birthDate = update.birthDate;
                }
                existingUser.save((err:any, updatedUser: IUser)=>{
                    if(err){
                        res.status(500).send(err)
                    }else{
                        res.status(200).send("Changes saved successfully")
                    }
                });
            }
            else{
                res.status(401).send("Invalid credentials");
            }
        }
        else{
            res.status(404).send("The user does not exist")
        }
    });
});



module.exports = userRouter;
