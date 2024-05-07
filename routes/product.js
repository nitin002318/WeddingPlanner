const express = require('express');
const bodyParser = require('body-parser');
const Product = require("../models/Product");
const router = express.Router();
const Review = require('../models/Review');
const { validateProduct ,isLoggedIn,isSeller,isProductAuthor} = require('../middleware');
// Add body-parser middleware
router.use(bodyParser.urlencoded({ extended: true }));
router.use(bodyParser.json());

router.get('/products', isLoggedIn,async (req, res) => {
    try {
        let products = await Product.find({});
        res.render('products/index', { products });
    } catch (error) {
        console.error('Error fetching products:', error);
        res.status(500).send('Error fetching products');
    }
});

// to show the new form to add a new product
router.get('/product/new', isLoggedIn,(req, res) => {
    res.render('products/new');
});

router.get('/product/home', async (req, res) => {
    res.render('home'); // Render the "home.ejs" view file
});

// Assuming you're using Express.js



// Route to handle search
// Route to handle search
router.get('/products/search', async (req, res) => {
    try {
        const query = req.query.query; // Get the search query from the URL query parameter
        const products = await Product.find({ desc: { $regex: query, $options: 'i' } }); // Perform a case-insensitive search on the product description
        res.render('products', { products }); // Render your template with the search results
    } catch (err) {
        console.error(err);
        res.status(500).send('Server Error');
    }
});


module.exports = router;


// to actually add a product

router.post('/products',validateProduct,isLoggedIn,isSeller, async (req, res) => {
    try {
        let { name, img, price, desc } = req.body;
        await Product.create({ name, img, price, desc,author:req.user._id });
        res.redirect('/products');
    } catch (error) {
        console.error('Error creating product:', error);
        res.status(500).send('Error creating product');
    }
});
// to show a particular product
router.get('/products/:id',isLoggedIn, async (req, res) => {
    try {
        let { id } = req.params;
        let foundProduct = await Product.findById(id).populate('reviews');

        if (!foundProduct) {
            return res.status(404).send('Product not found');
        }

        res.render('products/show', {foundProduct}); //,msg:req.flash('msg')
    } catch (error) {
        console.error('Error finding product:', error);
        res.status(500).send('Error finding product');
    }
});

// to get the form to edit the product
router.get('/products/:id/edit', isLoggedIn,async (req, res) => {
    try {
        let { id } = req.params;
        let foundProduct = await Product.findById(id);

        if (!foundProduct) {
            return res.status(404).send('Product not found');
        }

        res.render('products/edit', { foundProduct });
    } catch (error) {
        console.error('Error finding product:', error);
        res.status(500).send('Error finding product');
    }
});

// TO really edit the product
router.patch('/products/:id', validateProduct,isLoggedIn,async (req, res) => {
    try {
        let { id } = req.params;
        let { name, img, price, desc } = req.body;

        await Product.findByIdAndUpdate(id, { name, img, price, desc });
       
        res.redirect(`/products/${id}`);
    } catch (error) {
        console.error('Error editing product:', error);
        res.status(500).send('Error editing product');
    }
});

// to delete a product
// Assuming isProductAuthor middleware is defined and properly exported

// Import the Product model

router.delete('/products/:id', isLoggedIn, isProductAuthor, async (req, res) => {
    try {
        let { id } = req.params;
        const product = await Product.findById(id);

        for (let reviewId of product.reviews) {
            await Review.findByIdAndDelete(reviewId);
        }

        await Product.findByIdAndDelete(id);
        res.redirect('/products');
    } catch (error) {
        console.error('Error deleting product:', error);
        res.status(500).send('Error deleting product');
    }
});



module.exports = router;
