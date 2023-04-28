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

    req.body.user = req.user.id;
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

//Create Review - api/v1/review
exports.createReview = catchAsyncError (async (req, res, next)=>{

    const { productId, rating, comment} = req.body;

    const review ={
        user: req.user.id,
      rating,
        comment
    }

    const product = await Product.findById(productId);
    
//finding user review exists
    const isReviewed =  product.reviews.find(review =>{
        return review.user.toString() == req.user.id.toString()
    })


    if(isReviewed){
        //updateing the review
        product.reviews.forEach(review =>{
            if(review.user.toString() == req.user.id.toString()){
                review.comment = comment,
                review.rating = rating
            }
        })
    }
    else{

        //creating the review
        product.reviews.push(review);
        product.numOfReviews = product.reviews.length;

    }

    //find the average of the product reviews
    product.rating = product.reviews.reduce((acc, review) =>{
        return review.rating +acc;
    },0)/ product.reviews.length;
   product.rating =  isNaN (product.rating)?0:product.rating;

   await product.save({validateBeforeSave: false});

   res.status(200).json({
    success: true
})



})

//Get Review - api/v1/reviews?id={productId}
exports.getReviews = catchAsyncError (async (req, res, next)=>{
    const product = await Product.findById(req.query.id);

    
   res.status(200).json({
    success: true,
    reviews: product.reviews
})
})

//Delete Reviews - api/v1/review
exports.deleteReview = catchAsyncError (async (req, res, next)=>{
    const product = await Product.findById(req.query.productId);
    
    //filtering the reviews which does match the deleting reviews id
    
    const reviews= product.reviews.filter(review =>{
        return review._id.toString() !== req.query.id.toString()
    });
   

    //number of reviews
    const numOfReviews = reviews.length;
    //finding the average with the filtered reviews
   
    let rating = reviews.reduce((acc, review) =>{
        return review.rating + acc;
    },0)/ reviews.length;
    rating = isNaN(rating)?0:rating;

    //save the product document
    await Product.findByIdAndUpdate(req.query.productId, {
        reviews,
        numOfReviews,
        rating
    })
    res.status(200).json({
        success: true
    })

});

