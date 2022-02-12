const User = require('../models/User')

// handle errors
const handleErrors = (err) => {
    let errors = { email: '', password: '' }

    // duplicate error code
    if (err.code === 11000) {
        errors.email = 'that email is already registered'
        return errors
    }

    // validation errors
    if (err.message.includes('user validation failed')) {
        Object.values(err.errors).forEach(({ properties }) => {//the object includes a properties attribute in which the message is mentioned. here we are tapping onto the properties attribute directly
            errors[properties.path] = properties.message // properties.path includes the path like email or password
            console.log(properties)
        })
    }

    return errors

}


module.exports.signup_get = (req, res) => {
    res.render('signup')
}

module.exports.login_get = (req, res) => {
    res.render('login')
}

module.exports.signup_post = async (req, res) => {
    const { email, password } = req.body

    try {
        const user = await User.create({ email, password })
        res.status(201).json(user)
    } catch (err) {
        const errors = handleErrors(err)
        res.status(400).json({ errors })
    }
}


module.exports.login_post = async (req, res) => {
    const { email, password } = req.body

    try {
        const user = await User.create({ email, password })

    } catch (err) {
        console.log(err)
    }
}

