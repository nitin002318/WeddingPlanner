const mongoose=require('mongoose');

const  productSchema = new mongoose.Schema({
    name :{
        type:String,
        required:[true,'Please provide a name for the product'],
        trim: true
    },
    img:{
        type: String,
        trim: true

    },
    price:{
        type:Number,
        // min:0,
        required:true                                                                                                                                                                    
    },
    desc:{
        type:String,
        trim:true
    },
    reviews:[
    {
        type:mongoose.Schema.Types.ObjectId,// ye humko bta rha h ki hum object ki id le rhe h 
        ref:'Review'// or ye bta rha rha h ki konse model se lke rhe h 
    }
    ],
    author:{
        type:mongoose.Schema.Types.ObjectId,// ye humko bta rha h ki hum object ki id le rhe h 
        ref:'User'// or ye bta rha rha h ki konse model se lke rhe h 
    }
 })

    
 

let Product=mongoose.model('Product', productSchema);
module.exports=Product;