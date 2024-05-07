  const{productSchema,reviewSchema}=require('./schema')
  const Product = require("./models/Product");


  const validateProduct=(req,res,next)=>{
    let {name,img,price,desc}=req.body;
    const {error}=productSchema.validate({name,img,price,desc});
    if(error){
        return res.render('error');
    }
    next();
  }
  const validateReview=(req,res,next)=>{
    let {comment,rate}=req.body;
    const {error}=reviewSchema.validate({comment,rate});
    if(error){
        return res.render('error');
    }
    next();
  }

  const isLoggedIn = (req, res, next) => {
    if (!req.isAuthenticated()) {
        // Redirect unauthenticated users only if the request is not for the home page
        if (req.originalUrl !== '/') {
            return res.redirect('/login');
        }
    }
    next();
}


const isSeller=(req,res,next)=>{

  if(!req.user.role){
    return res.redirect('/products');
  }
  else if(req.user.role!=='seller'){
    return res.redirect('/products');
  }
  next();
}

const isProductAuthor=async(req,res,next)=>{
  let {id}=req.params;
  const product=await Product.findById(id);
  if(!product.author.equals(req.user._id)){
    return res.redirect('/products');
  }
  next();
}



  module.exports={
      isProductAuthor,
      isSeller,
      validateProduct,
      validateReview,
      isLoggedIn
  }