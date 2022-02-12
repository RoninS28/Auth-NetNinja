const mongoose = require('mongoose')
const { isEmail } = require('validator')

const userSchema = new mongoose.Schema({
    email: {
        type: String,
        required: [true, 'Please enter an email'],// suppose the value is false, that msg is triggered
        unique: true, // for unique property we cannot put tru false like the one above. hence we access the err.codes
        lowercase: true,
        validate: [isEmail, 'Please enter a validate email']
    },
    password: {
        type: String,
        required: [true, 'Please enter a password'],
        minlength: [6, 'Minimum password length is 6 characters']
    }
})


const User = mongoose.model('User', userSchema)
module.exports = User