const { User } = require('../models/user')
const express = require('express')
const router = express.Router()
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

router.get(`/`, async (req, res) => {
    const usertList = await User.find().select('-passwordHash')
    if (!usertList) {
        res.status(500).json({
            success: false,
        })
    }
    res.send(usertList)
})

router.get(`/:id`, async (req, res) => {
    const user = await User.findById(req.params.id).select('-passwordHash')
    if (!user) {
        res.status(500).json({
            success: false,
            message: 'the user the given Id was not found',
        })
    }
    res.status(200).send(user)
})

router.post(`/`, async (req, res) => {
    let user = new User({
        name: req.body.name,
        email: req.body.email,
        color: req.body.color,
        passwordHash: bcrypt.hashSync(req.body.password, 10),
        phone: req.body.phone,
        isAdmin: req.body.isAdmin,
        street: req.body.street,
        apartment: req.body.apartment,
        zip: req.body.zip,
        city: req.body.city,
        country: req.body.country,
    })
    user = await user.save()
    if (!user) return res.status(404).send('the user cannot be created!')
    res.send(user)
})

router.post(`/login`, async (req, res) => {
    const user = await User.findOne({ email: req.body.email })
    if (!user) {
        return res.status(400).send('The user not found')
    }

    if (user && bcrypt.compareSync(req.body.password, user.passwordHash)) {
        const token = jwt.sign(
            
        )
        res.status(200).send('user auth')
    } else {
        res.status(400).send('password Is wrong')
    }
})
module.exports = router
 