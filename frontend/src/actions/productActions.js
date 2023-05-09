import axios from "axios"
import {  productsRequest, productsSuccess, productsFail} from '../slices/productsSlice'
import {  productRequest, productSuccess, productFail} from '../slices/productSlice'




export const getProducts = (keyword, price, category , rating,currentPage)=> async (dispatch)=>{
    try{
        dispatch(productsRequest())
        let link =`/api/v1/products?page=${currentPage}`;

        if(keyword){
            link += `&keyword=${keyword}`

        }
        if(price){
            link += `&price[gte]=${price[0]}&price[lte]=${price[1]}`

        }
        if(category){
            link += `&category=${category}`

        }

        if(rating){
            link += `&rating=${rating}`

        }

        const { data } =await axios.get(link);
        dispatch(productsSuccess( data ))
        
    }
    catch(error){
        //handle error
         dispatch(productsFail(error.response.data.message))

    }


}




export const getProduct = id => async (dispatch)=>{
    try{
        dispatch(productRequest())
        const { data } =await axios.get(`/api/v1/products/${id}`);
        dispatch(productSuccess( data ))
        
    }
    catch(error){
        //handle error
         dispatch(productFail(error.response.data.message))

    }


}