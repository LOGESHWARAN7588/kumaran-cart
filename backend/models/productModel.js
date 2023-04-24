const  mongoose = require('mongoose');

const productschema = new mongoose.Schema({
    name:{
        type: String,
        required: [true, "please enter product name"],
        trim : true,
        maxLength: [100, "product name cannot exceed 100 characters"]
    },
    price:{
        type: Number,
        required : true,
        default:1000
        

    },
    description:{
        type : String,
        required:[true,"please enter product description"]
    },
    ratings:{
        type: String,
        default:0
    },
    images:[
        {
            image:{
                type: String,
                required: true
            }

        }
    ],
    category:{
        type: String,
        required:[true, "Please enter product category"],
        enum:{
            values:[
                'Electronics',
                'Mobile Phones',
                'Laptops',
                'Accessories',
                'Headphones',
                'Food',
                'Books',
                'Clothes/shoes',
                'Beauty/Health',
                'sports',
                'Outdoor',
                'Home'
            ],
            message:"Please enter correct category"
        }
    },
    seller:{
        type: String,
        required:[true, "Please enter product seller"]
    },
    stock:{
        type: Number,
        required:[true, "Please enter product stock"],
        maxLength: [20,'product stock cannot exceed 20']
    },
    numOfReviews:{
        type: Number,
        default:0
    },
    reviews:[
        {
            name:{
                type: String,
                required: true
            },
            ratings:{
                type:String,
                required:true
            },
            Comment:{
                type: String,
                required:true
            }
        }
    ],
    createdAt:{
        type: Date,
        default:Date.now()
    }
    

})

let  schema =  mongoose.model('Product', productschema )

module.exports =schema