const { Order } = require('../models/order')
const { OrderItem } = require('../models/order-item')

const express = require('express')
const router = express.Router()

router.get(`/`, async (req, res) => {
    const orderList = await Order.find()
        .populate('user', 'name')
        .populate({
            path: 'orderItems',
            populate: { path: 'product', populate: 'category' },
        })
        .sort({ dateOrdered: -1 })
    if (!orderList) {
        res.status(500).json({
            success: false,
        })
    }
    res.send(orderList)
})

router.get(`/:id`, async (req, res) => {
    const order = await Order.findById(req.params.id)
        .populate('user', 'name')
        .populate({ path: 'orderItems', populate: 'product' })
    if (!order) {
        res.status(500).json({
            success: false,
        })
    }
    res.send(order)
})

router.post(`/`, async (req, res) => {
    const orderItemsIds = Promise.all(
        req.body.orderItems.map(async (orderitem) => {
            let newOrderItem = new OrderItem({
                quantity: orderitem.quantity,
                product: orderitem.product,
            })
            newOrderItem = await newOrderItem.save()
            return newOrderItem._id
        })
    )
    const orderItemsIdsResolved = await orderItemsIds

    const totalPrices = await Promise.all(
        orderItemsIdsResolved.map(async (orderItemsId) => {
            const orderItem = await OrderItem.findById(orderItemsId).populate(
                'product',
                'price'
            )
            const totalPrice = orderItem.product.price * orderItem.quantity
            return totalPrice
        })
    )
    const totalPrice = totalPrices.reduce((a, b) => a + b, 0)
    console.log(totalPrice)
    let order = new Order({
        orderItems: orderItemsIdsResolved,
        shippingAddress1: req.body.shippingAddress1,
        shippingAddress2: req.body.shippingAddress2,
        city: req.body.city,
        zip: req.body.zip,
        country: req.body.country,
        phone: req.body.phone,
        status: req.body.status,
        totalPrice: totalPrice,
        user: req.body.user,
    })
    order = await order.save()
    if (!order) return res.status(400).send('the order cannot be created!')
    res.send(order)
})

router.put(`/:id`, async (req, res) => {
    const order = await Order.findByIdAndUpdate(
        req.params.id,

        {
            status: req.body.status,
        },
        { new: true }
    )
    if (!order) return res.status(404).send('the order cannot be ubdated!')
    res.send(order)
})

router.delete(`/:id`, (req, res) => {
    Order.findByIdAndRemove(req.params.id)
        .then(async (order) => {
            if (order) {
                await order.orderItems.map(async (orderitem) => {
                    await OrderItem.findByIdAndRemove(orderitem)
                })
                return res.status(200).json({
                    success: true,
                    message: 'the order is deleted successfully',
                })
            } else {
                return res
                    .status(404)
                    .json({ success: false, message: 'the order not found' })
            }
        })
        .catch((err) => {
            return res.status(400).json({ success: false, error: err })
        })
})

router.get(`/get/totalsals`, async (req, res) => {
    const totalsals = await Order.aggregate([
        { $group: { _id: null, totalsales: { $sum: '$totalPrice' } } },
    ])
    if (!totalsals) {
        return res.status(400).send('The order sales cannot be geneated')
    }
    res.send({ totalsals: totalsals.pop().totalsales })
})

router.get(`/get/count`, async (req, res) => {
    const orderCount = await Order.countDocuments({})
    if (!orderCount) {
        res.status(500).json({
            success: false,
        })
    }
    res.send({ orderCount: orderCount })
})
module.exports = router
