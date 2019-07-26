const express = require('express')
const User = require('../../models/User')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const config = require('config')
const auth = require('../../middleware/auth')

const router = express.Router()

router.post('/', (req, res) => {

    const email = req.body.email
    const password = req.body.password

    if (!email) return res.status(404).json({ "message": "Please insert email" })
    if (!password) return res.status(404).json({ "message": "Please insert password" })

    User
        .findOne({email})
        .then(user => {
            if (!user) return res.status(404).json({ "message": "User not found, change email or register new user"})

            bcrypt
                    .compare(password, user.password)
                    .then(isMatch => {
                        if (!isMatch) return res.status(400).json({ "message": "Incorrect password, try again" })

                        if (isMatch) {
                            jwt.sign(
                                {id: user._id},
                                config.get('jwtSecret'),
                                {expiresIn: 3600},
                                (err, token) => {
                                    if(err) throw err

                                    res.json({
                                        token,
                                        user
                                    })
                                }
                            )
                        }
                    })
        })
        .catch(err => console.log(err))
})

router.get('/user', auth, (req, res) => {
    
    User
        .findById(req.user.id)
        .select('-password')
        .then(user => res.json(user))
        .catch(err => console.log(err))
})

module.exports = router