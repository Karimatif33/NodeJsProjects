const { User } = require('../models/user')
const express = require('express')
const router = express.Router()
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const mongoose = require('mongoose')

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
    const secret = process.env.secret
    if (!user) {
        return res.status(400).send('The user not found')
    }

    if (user && bcrypt.compareSync(req.body.password, user.passwordHash)) {
        const token = jwt.sign(
            {
                userId: user.id,
                isAdmin: user.isAdmin
            },
            secret,
            {expiresIn : '1h'}
        )
        res.status(200).send({ user: user.email, token: token })
        // console.log(token)
    } else {
        res.status(400).send('password Is wrong')
    }
})
router.delete(`/:id`, (req, res) => {
    if (!mongoose.isValidObjectId(req.params.id)) {
        return res.status(400).send('Invalid User Id')
    }
    User.findByIdAndRemove(req.params.id)
        .then((User) => {
            if (User) {
                return res.status(200).json({
                    success: true,
                    message: 'the User is deleted successfully',
                })
            } else {
                return res
                    .status(404)
                    .json({ success: false, message: 'the User not found' })
            }
        })
        .catch((err) => {
            return res.status(400).json({ success: false, error: err })
        })
})


router.get(`/get/count/user`, async (req, res) => {
    const userCount = await User.countDocuments({})
    if (!userCount) {
        res.status(500).json({
            success: false,
        })
    }
    res.send({ userCount: userCount })
})
module.exports = router
        