const express= require('express');
const app=express();
const path=require('path');
const mongoose = require('mongoose');
const seedDB=require('./seed');
const ejsMate=require('ejs-mate');
const methodOverride=require('method-override');// this package is  for edit the product
const flash=require('connect-flash');// for showing the flash message
const session=require('express-session');
const passport=require('passport');
const LocalStrategy=require('passport-local');
const User=require('./models/User');
const server = require('net').createServer();

const productRoutes=require("./routes/product");
const reviewRoutes=require("./routes/review");
const authRoutes=require("./routes/auth");
const cartRoutes=require("./routes/cart")
const otherRoutes=require("./routes/other")
const { Console } = require('console');

app.use(methodOverride('_method')); 
mongoose.connect('mongodb://127.0.0.1:27017/shopping-app')

.then(()=>{
    console.log("database is connected ");
})

.catch((err)=>{
    console.log(err);
})


let configSission={
    secret:'this is a secret',
    resave:false,
    saveUninitialized:true,
    cookie:{
        httpOnly:true,
        expires:Date.now()+1000*60*60*24*7,
        maxAge:1000*60*60*24*7

    }
    
}
app.set('view engine','ejs');// we  are setting our view engine to only read ejs files 
app.set('views',path.join(__dirname,'views'));
app.use(express.static(path.join(__dirname,'public')));
app.use(express.urlencoded({extended:true}));
app.use (session(configSission));

app.use(passport.initialize());
app.use(passport.session());
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());



// seedDB()
app.engine('ejs',ejsMate);// we are telling that we are using ejs mate as our view engine


app.use((req,res,next)=>{
    res.locals.currentUser=req.user;
    // res.locals.success=req.flash('success');
    // res.locals.error=req.flash('error');
    next();
});

// passport use 


passport.use(new LocalStrategy(User.authenticate())
);


app.use(productRoutes);
app.use(reviewRoutes);// hr incoming request pr reviewRoutes ko call krdo
app.use(authRoutes);
app.use(cartRoutes);
app.use(otherRoutes);
let port = process.env.PORT || 8080; // Use environment variable or default port

function startServer() {
  app.listen(port, () => {
    console.log(`Server listening on port ${port}`);
  })
  .on('error', (err) => {
    if (err.code === 'EADDRINUSE') {
      console.error(`Port ${port} already in use, retrying...`);
      port++; // Increment port number on error
      startServer(); // Restart the server with the new port
    } else {
      console.error(err); // Handle other errors
      process.exit(1); // Exit the application on unexpected errors
    }
  });
}

app.get('/',(req,res) => {
    res.render('home')
})

startServer();