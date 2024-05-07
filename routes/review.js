const express=require('express');
const router=express.Router();
const Product=require('../models/Product'); 
const Review=require('../models/Review');
const {validateReview}=require('../middleware');

router.post('/products/:id/review',async(req,res)=>{
    let {id}=req.params;
    let {rating,comment}=req.body;
    const product=await Product.findById(id);// HERE WE ARE FINDING THE PRODUCT BY ID
    const review=new Review({rating,comment});// NOW WE ARE CREATING A NEW REVIEW
    product.reviews.push(review);
    await review.save();
    await product.save();  
   
    res.redirect(`/products/${id}`);
})

module.exports=router;