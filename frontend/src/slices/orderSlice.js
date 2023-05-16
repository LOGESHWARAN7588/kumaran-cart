import { createSlice } from "@reduxjs/toolkit";




const orderSlice = createSlice({
    name: 'order',
    initialState:{
        orderDetail: {},
        userOrders: []


    },
    reducers:{
        createOrderRequest(state, action) {
            return {
                ...state,
                loading: true,
                
            }
        },
        createOrderSuccess(state, action) {
            return {
                ...state,
                loading: false,
                orderDetail: action.payload
            }
        },
        createOrderFail(state, action) {
            return {
                ...state,
                loading: false,
                error: action.payload
            }
        }
       
    }

});

const{ actions, reducer }= orderSlice; 

export const{
   createOrderFail,
   createOrderRequest,
   createOrderSuccess

} = actions;
export default reducer;