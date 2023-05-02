import axios from "axios"
import {  productRequest, productSuccess, productFail} from '../slices/productSlice'



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