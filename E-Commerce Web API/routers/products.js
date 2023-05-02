const { Product } = require('../models/product')
const { Category } = require('../models/category')
const express = require('express')
const router = express.Router()
const mongoose = require('mongoose')

router.get(`/`, async (req, res) => {
    const productList = await Product.find().populate('category')
    if (!productList) {
        res.status(500).json({
            success: false,
        })
    }
    res.send(productList)
})
router.get(`/:id`, async (req, res) => {
    const productList = await Product.findById(req.params.id).populate(
        'category'
    )
    if (!productList) {
        res.status(500).json({
            success: false,
        })
    }
    res.send(productList)
})

router.post(`/`, async (req, res) => {
    const category = await Category.findById(req.body.category)
    if (!category) return res.status(400).send('Invalid category')
    let product = new Product({
        name: req.body.name,
        description: req.body.description,
        richDescription: req.body.richDescription,
        image: req.body.image,
        brand: req.body.brand,
        price: req.body.price,
        category: req.body.category,
        countInStock: req.body.countInStock,
        rating: req.body.rating,
        numReviews: req.body.numReviews,
        isFeatured: req.body.isFeatured,
    })
    product = await product.save()
    console.log('product created')
    if (!product) return res.status(500).send('the product cannot be created!')
    res.send(product)
})

router.put(`/:id`, async (req, res) => {
    if (!mongoose.isValidObjectId(req.params.id)) {
        return res.status(400).send('Invalid Product Id')
    }
    const category = await Category.findById(req.body.category)
    if (!category) return res.status(400).send('Invalid category')
    const product = await Product.findByIdAndUpdate(
        req.params.id,

        {
            name: req.body.name,
            description: req.body.description,
            richDescription: req.body.richDescription,
            image: req.body.image,
            brand: req.body.brand,
            price: req.body.price,
            category: req.body.category,
            countInStock: req.body.countInStock,
            rating: req.body.rating,
            numReviews: req.body.numReviews,
            isFeatured: req.body.isFeatured,
        },
        { new: true }
    )
    if (!product) return res.status(404).send('the product cannot be ubdated!')
    res.send(product)
})

router.delete(`/:id`, (req, res) => {
    if (!mongoose.isValidObjectId(req.params.id)) {
        return res.status(400).send('Invalid Product Id')
    }
    Product.findByIdAndRemove(req.params.id)
        .then((Product) => {
            if (Product) {
                return res.status(200).json({
                    success: true,
                    message: 'the Product is deleted successfully',
                })
            } else {
                return res
                    .status(404)
                    .json({ success: false, message: 'the Product not found' })
            }
        })
        .catch((err) => {
            return res.status(400).json({ success: false, error: err })
        })
})

module.exports = router
