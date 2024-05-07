const mongoose=require('mongoose');

const Product=require('./models/Product');


const products=[
    {
        name:"The Amaltaas Fort",
        img:"https://cdn0.weddingwire.in/vendor/2950/3_2/960/jpeg/4_15_462950-170832637284481.webp",
        price:1900000,
        desc:"Jaipur "
    },
    {
        name:"The Florece",
        img:"https://cdn0.weddingwire.in/vendor/2048/3_2/960/png/1_15_452048-171369177541879.webp",
        price:390000,
        desc:"Delhi"
    },
    {
        name:"Hotel Metropolis",
        img:"https://cdn0.weddingwire.in/vendor/9620/original/960/jpeg/c530adf9-7d71-406e-baa9-b1601ab2178a_15_419620-169555719979744.webp",
        price:250000,
        desc:"Mumbai "
    },
    {
        name:"Radisson Blu, Pune Kharadi",
        img:"https://www.zankyou.co.in/images/card-main/685/7211/800/571/w/546878/-/1513695415.jpg.webp",
        price:310000,
        desc:"Pune"
    }
]
async function seedDB(){
    await Product.insertMany(products);
    console.log("data seeded ");
}
module.exports=seedDB;