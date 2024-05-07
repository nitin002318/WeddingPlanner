const express = require('express');
const router = express.Router();
const { isLoggedIn } = require('../middleware');
const User = require('../models/User'); // Import the User model
const Product = require('../models/Product'); // Import the Product model

router.get('/user/guest', isLoggedIn, async (req, res) => {
    res.render('other/guest');
});

router.post('/user/addToCart/:category/:productId', isLoggedIn, async (req, res) => {
    const { category, productId } = req.params;
    const userId = req.user._id;
    
    try {
        // You can directly push the product ID into the user's cart
        const user = await User.findById(userId);
        user.cart.push({ category, productId }); // Push an object containing category and productId
        await user.save();
        
        // Send a success response
        res.sendStatus(200);
    } catch (error) {
        console.error('Error:', error);
        // Send an error response
        res.status(500).send('Failed to add product to cart');
    }
});
router.get('/other/invite', isLoggedIn,async (req, res) => {
    res.render('other/inv');
});


router.get('/other/theme', isLoggedIn,async (req, res) => {
    res.render('other/the');
});



module.exports = router;
