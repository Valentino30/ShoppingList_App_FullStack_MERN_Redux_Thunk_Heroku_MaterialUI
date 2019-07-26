const express = require('express')
const router = express.Router()
const User = require('../../models/User')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const config = require('config')


router.post('/', (req, res) => {

    const email = req.body.email
    const password = req.body.password

    if(!email) return res.status(400).json({"message": "Please enter email"})
    if(!password) return res.status(400).json({"message": "Please enter password"})
    
    User 
        .findOne({email})
        .then(user => {
                if (user) return res.status(400).json({ "message": "User already registered, login instead"})
            })
        .catch(err => console.log(err))
    

    const user = new User({
        email,
        password
    })

    bcrypt.genSalt(10, (err, salt) => {
        bcrypt.hash(user.password, salt, (err, hash) => {
            if(err) throw err

            user.password = hash

            user
                    .save()
                    .then(user => {
                        jwt.sign(
                            { id: user._id },
                            config.get('jwtSecret'),
                            { expiresIn: 3600 },
                            (err, token) => {
                                if(err) throw err

                                res.json({
                                    token,
                                    user
                                })
                            }
                        )
                    })
                    .catch(err => console.log(err))
        })
    })
})

module.exports = router