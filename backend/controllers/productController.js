const Product = require('../models/productModel')
const ErrorHandler = require('../utils/errorHandler')
const catchAsyncError = require('../middlewares/catchAsyncError')
const APIFeatures = require('../utils/apiFeatures');


// Get product - /api/v1/products
exports.getProducts = catchAsyncError( async (req, res, next)=>{
    const resPerPage = 2;
    const apiFeatures = new APIFeatures(Product.find(), req.query). search().filter().paginate(resPerPage);
    
    const products = await apiFeatures.query;

    res.status(200).json({
        success: true,
        count: products.length,
        products
    })
})

//Create Product - /api/v1/products/new
exports.newProduct = catchAsyncError (async (req, res, next)=>{
    const product =  await Product.create(req.body);
    res.status(201).json({
        success: true,
        product
    })
});

//Get single product - /api/v1/products/:id
exports.getSingleProduct = async(req, res, next)=>{
    const product = await Product.findById(req.params.id);

    if(!product){

        return next(new ErrorHandler('Product not found test', 400));
     }

    res.status(201).json({
        success: true,
        product
    })

   

   
}

//Update Product - /api/v1/products/:id
exports.updateProduct = async (req, res, next)=>{
    let product = await Product.findById(req.params.id);

    if(!product){
        return res.status(404).json({
            success: false,
            message: "Product not found"
        });
    }

    product = await Product.findByIdAndUpdate(req.params.id, req.body,{
            new: true,
            runValidators: true

    })

    res.status(200).json({
        success: true,
        product
    })

}

// Delete product - /api/v1/products/:id
exports.deleteProduct = async (req, res, next)=>{
    const product = await Product.findById(req.params.id);

    if(!product){
        return res.status(404).json({
            success: false,
            message: "Product not found"
        });

    }
     
    await Product. deleteOne();

    res.status(200).json({
        success: true,
        message: "Product Deleted!"
    })
}

