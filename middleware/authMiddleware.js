const jwt = require('jsonwebtoken')


const requireAuth = (req, res, next) => {

    const token = req.cookies.jwt

    // check json web token exists and is verified
    if (token) {
        jwt.verify(token, 'ronin secret signature', (err, decodedToken) => {
            if (err) { //signatures dont match
                res.redirect('/login')
            }
            else {
                next()
            }
        })
    }
    else {
        res.redirect('/login')
    }


}


// check current user
const checkUser = (req, res, next) => {
    const token = req.cookies.jwt

    if (token) {
        jwt.verify(token, 'ronin secret signature', async (err, decodedToken) => {
            if (err) { //signatures dont match
                res.locals.user = null //this locals prop makes it available to te views

                next()

            }
            else {
                let user = await User.findById(decodedToken.id)
                res.locals.user = user //this locals prop makes it available to te views
                next()
            }
        })
    }
    else {
        res.locals.user = null //this locals prop makes it available to te views
        next()
    }
}

module.exports = { requireAuth, checkUser }