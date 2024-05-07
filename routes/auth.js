const express=require('express');
const passport=require('passport');
const User=require('../models/User');

const router=express.Router();


// to  show the signin form

router.get('/register',(req,res)=>{
    res.render('auth/signup');
})

// to really register a user into db
router.post('/register', async (req, res) => {
    try {
        let { email, password, username,role} = req.body;
        const user = new User({ email, username,role});
        const newUser = await User.register(user, password);
        req.login(newUser, function (err) {
            if (err) {
                return next(err);
            }
            return res.redirect('/products');
        });
    } catch (error) {
        // Handle any errors that occur during the registration process
        console.log(error)
        return res.redirect('/products');
    }
});


// to get login form 
router.get('/login',(req,res)=>{
    res.render('auth/login');
})

//to actually login  to db
router.post('/login', passport.authenticate('local', {
    failureRedirect: '/login'
}), (req, res) => {
    res.redirect('/products');
});

 
router.get('/logout', (req, res) => {
    req.logout(() => { // Assuming req.logout() accepts a callback
        res.redirect('/');
    });
});


   
module.exports=router;