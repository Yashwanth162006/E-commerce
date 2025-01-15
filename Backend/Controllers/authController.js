const User = require('../Models/userModel')
const jwt = require('jsonwebtoken')
const {promisify} = require('util')
const sendEmail = require('../utils/email')
const crypto = require('crypto')
const {ValidationError} = require('mongoose')

exports.signup = async(req,res)=>{
    try{
        const newUser = await User.create({
            name: req.body.name,
            email: req.body.email,
            password: req.body.password,
            confirmPassword: req.body.confirmPassword,
            passwordChangedAt: req.body.passwordChangedAt
        })
        const token = await jwt.sign({id: newUser._id},process.env.JWT_Secret,{
            expiresIn: process.env.JWT_Expire_time
        })
        const userName = newUser.name.split(' ')[0]
        res.status(200).json({
            status: 'success',
            message: 'signedup scuccessfully',
            token,
            userName,
            role: newUser.role
        })
    }catch(err){
        console.log(err)
        if (err.name === 'ValidationError') {
            const errors = {};
            
            for (const field in err.errors) {
              errors[field] = err.errors[field].message;
            }
            const {email,password,confirmPassword} = errors
            // Return the errors to the client
            if(email){
                return res.status(400).json({
                    status: 'fail',
                    message: email
                  });
            }
            if(password){
                return res.status(400).json({
                    status: 'fail',
                    message: password
                  });
            }
            if(confirmPassword){
                return res.status(400).json({
                    status: 'fail',
                    message: confirmPassword
                  });
            }
          }
          if(err.name === 'MongoServerError'){
            return res.status(400).json({
                status: 'fail',
                message: 'Email Id already exists'
              });
          }
          return res.status(400).json({
            status: 'fail',
            message: 'SignUp failed'
          });
    }
}
exports.login = async(req,res)=>{
    try{
        const {email,password} = req.body
        console.log(email,password)
        const user = await User.findOne({email: email}).select('+password')
        
        const correct = await user.verifyPassword(password,user.password)
        if(!user || !correct){
            return res.status(404).json({
                status: 'fail',
                message: 'invalid email or password'
            })
        }
        const token = jwt.sign({id: user._id},process.env.JWT_Secret,{
            expiresIn: process.env.JWT_Expire_time
        })
        const userName = user.name.split(' ')[0]
        res.status(200).json({
            status: 'success',
            message: 'Login successfull',
            token,
            userName,
            role: user.role
        })
    }catch(err){
        console.log(err)
        res.status(404).json({
            status: 'fail',
            message: 'Login Failed'
        })
    }
}

exports.protect = async(req,res,next)=>{
    try{
        //Retriving the token from header
        let token
        if(req.headers.authorization && req.headers.authorization.startsWith('Bearer')){
            token = req.headers.authorization.split(' ')[1]
        }
        if(!token){
            return next(res.status(404).json({
                status: 'fail',
                message: 'No token'
            }))
        }
        //Verifying the token
        const decoded = await promisify(jwt.verify)(token,process.env.JWT_Secret)
        console.log(decoded)
        //Verifying wether user is deleted after login
        const freshUser = await User.findById(decoded.id)
        if(!freshUser){
            return next(res.status(404).json({
                status: 'fail',
                message: 'user corresponding to this toke does not exist'
            }))
        }
        //Verifying wether password is changed after login
        const passwordChangedAfter = await freshUser.passwordChangedAfter(decoded.iat)
        if(passwordChangedAfter){
            return next(res.status(404).json({
                status: 'fail',
                message: 'Password Changed after login so please login again'
            }))
        }
        req.user = freshUser
        next()
    }catch(err){
        console.log(err)
        res.status(404).json({
            status: 'fail',
            message: 'Not Logged In'
        })
    }
}

exports.sendToken = async(req,res)=>{
    try{
        //Find the user
        const user = await User.findOne({email: req.body.email})
        if(!user){
            return res.status(404).json({
                status: 'fail',
                message: 'User not found'
            })
        }
        //Generate a random token
        const resetToken = await user.generatePasswordResetToken()
        await user.save({validateBeforeSave: false})

        //send the token via a mail
        const message = `This is your password reset token ${resetToken}`
        try{
            await sendEmail({
                email: req.body.email,
                subject: 'This password reset token is valid for 10 min',
                message
            })
            res.status(200).json({
                status: 'success',
                message: `Password reset mail is sent to ${req.body.email}`
            })
        }catch(err){
            console.log(err)
            res.status(404).json({
                status: 'fail',
                message: 'There was an error sending the mail'
            })
        }
    }catch(err){
        console.log(err)
        res.status(404).json({
            status: 'fail',
            message: err
        })
    }
}

exports.resetPassword = async(req,res)=>{
    try{
        const hashedToken = crypto.createHash('sha256').update(req.body.resetToken).digest('hex')
        const user = await User.findOne({passwordResetToken: hashedToken,passwordResetExpiresIn: {$gte: Date.now()}})

        if(!user){
            return res.status(404).json({
                status: 'fail',
                message: 'Invalid token'
            })
        }
        user.password = req.body.newPassword
        user.confirmPassword = req.body.confirmNewPassword
        user.passwordResetToken = undefined
        user.passwordResetExpiresIn = undefined
        await user.save()

        user.passwordChangedAt = Date.now() - 10000
        res.status(200).json({
            status: 'success',
            message: 'reset successful'
        })
    }catch(err){
        console.log(err)
        if (err.name === 'ValidationError') {
            const errors = {};
            
            for (const field in err.errors) {
              errors[field] = err.errors[field].message;
            }
            const {password,confirmPassword} = errors
            // Return the errors to the client
            if(password){
                return res.status(400).json({
                    status: 'fail',
                    message: password
                  });
            }
            if(confirmPassword){
                return res.status(400).json({
                    status: 'fail',
                    message: confirmPassword
                  });
            }
          }
        res.status(404).json({
            status: 'fail',
            message: 'reset failed'
        })
    }
}
exports.updatePassword = async (req,res)=>{
    try{
        const user = await User.findOne(req.user._id).select('+password')
        console.log(user)
        const correct = await user.verifyPassword(req.body.currentPassword,user.password)
        if(!correct){
            return res.status(401).json({
                status: 'fail',
                message: 'Invalid current password'
            })
        }
        user.password = req.body.newPassword
        user.confirmPassword = req.body.confirmNewPassword
        const token = jwt.sign({id: user._id},process.env.JWT_Secret,{
            expiresIn: process.env.JWT_Expire_time
        })
        user.passwordChangedAt = Date.now() - 10000
        await user.save()
        res.status(200).json({
            status: 'success',
            token,
            message: 'Password changed'
        })
    }catch(err){
        console.log(err)
        if(err.name === 'ValidationError'){
            const errors = {}
            for(const field in err.errors){
                errors[field] = err.errors[field].message
            }
            const {password,confirmPassword} = errors
            if(password){
                return res.status(400).json({
                    status: 'fail',
                    message: password
                  });
            }
            if(confirmPassword){
                return res.status(400).json({
                    status: 'fail',
                    message: confirmPassword
                  });
            }
        }
        res.status(404).json({
            status: 'fail',
            message: 'Password update failed'
        })
    }
}
exports.isAdmin = async(req,res,next)=>{
    try{
        const role = req.user.role
        if(role === 'admin') next()
        else{
            return res.status(401).json({
                status: 'fail',
                message: 'Not authorised'
            })
        }
    }catch(err){
        res.status(401).json({
            status: 'fail',
            message: 'Not Authorised'
        })
    }
}