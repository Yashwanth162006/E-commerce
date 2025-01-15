const mongoose = require('mongoose')
const validator = require('validator')
const bcrypt = require('bcryptjs')
const crypto = require('crypto')

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true,'user must give his name'],
        trim: true
    },
    email: {
        type: String,
        required: [true,'A unique email is compulsory'],
        trim: true,
        lowerCase: true,
        unique: [true,'User with this Email Id exists'],
        validate: [validator.isEmail,'This is not a valid Email format']
    },
    role: {
        type: String,
        enum: ['user','admin'],
        default: 'user'
    },
    password: {
        type: String,
        required: [true,'user must have a password'],
        trim: true,
        minlength: [8,'Secure password should have a minimum of 8 characters'],
        select: false
    },
    confirmPassword: {
        type: String,
        required: [true,'A password confirmation is necessary'],
        trim: true,
        validate: {
            validator: function(val){
                return val === this.password
            },
            message: 'Passwords did not match'
        }
    },
    passwordChangedAt: {
        type: Date,
        trim: true
    },
    passwordResetToken: String,
    passwordResetExpiresIn: Date,
})

userSchema.pre('save',async function(next){
    if(!this.isModified('password')) return next()
        
    this.password = await bcrypt.hash(this.password,12)
    this.confirmPassword = undefined
    next()
})
userSchema.methods.verifyPassword = async function(enteredPassword,userPassword){
    return bcrypt.compare(enteredPassword,userPassword)
}
userSchema.methods.passwordChangedAfter = async function(JWTTimeStamp){
    if(this.passwordChangedAt){
        const modified = parseInt(this.passwordChangedAt.getTime()/1000,10)
        return JWTTimeStamp<modified
    }
    return false
}
userSchema.methods.generatePasswordResetToken = async function(){
    const resetToken = crypto.randomBytes(32).toString('hex')
    this.passwordResetToken = crypto.createHash('sha256').update(resetToken).digest('hex')
    this.passwordResetExpiresIn = Date.now() + 10*60*1000
    return resetToken
}
const User = mongoose.model('User',userSchema)
module.exports = User