const express = require('express');
const router = express.Router();
const {isLoggedIn}=require('../middleware');
const Product=require('../models/Product');
const User=require('../models/User');

router.get('/user/cart', isLoggedIn, async (req, res) => {
    let user = await User.findById(req.user._id).populate('cart');
    // Logging all product data
    try {
        const products = await Product.find();
        console.log(products);
    } catch (err) {
        console.error("Error logging product data:", err);
    }
    res.render('cart/cart', { user, Product });
});

// to add product to cart 

router.post('/user/:productId/add',isLoggedIn, async (req, res) => {
    let { productId } = req.params;
    let userId = req.user._id; // No need to destructure _id
    let product = await Product.findById(productId);
    let user = await User.findById(userId);
    user.cart.push(product);
    await user.save();
    res.redirect('/user/cart');
});


module.exports=router;