const products = require('../data/products.json');
const product = require('../models/productModel');
const dotenv = require('dotenv');
const connectDatabase = require('../config/database')

dotenv.config({path: 'backend/config/config.env'});
connectDatabase();

const seedProducts = async ()=>{

    try{
   await product.deleteMany();
   console.log('Product delected!');
    await product.insertMany(products);
    console.log('All product added!');

    }catch(error){
        console.log(error.message);
        }
}

seedProducts();