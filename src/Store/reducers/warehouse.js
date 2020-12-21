import * as actionTypes from '../actions/actionstypes';
const initialState = {
    loading: false
}

const warehouseReducer = (state = initialState, action) => {

    switch (action.type) {
        case actionTypes.GET_WAREHOUSSE_DATA:
            return {
                ...state,
                loading: true
            }
        case actionTypes.GET_WAREHOUSSE_DATA_RECIEVED:

            return {
                ...state,
                loading: false,
                error: false,
                warehouses:action.payload.warehouses,
                resultCount: action.payload.resultCount
            }
        case actionTypes.GET_WAREHOUSSE_DATA_FAIL:
            return {
                ...state,
                loading: false,
                error: true,
                data: action.payload,
                warehouses:null,
                resultCount: null

            }
        case actionTypes.CHANGE_WAREHOUSE_STATUS_START:
            return {
                ...state,
                loading: true,
                error: false

            }
        case actionTypes.CHANGE_WAREHOUSE_STATUS_SUCCESS:
             const warehouses = [...state.warehouses];

                warehouses.forEach((el,i)=>{
                    if(el._id === action.payload.id){
                        el.status = action.payload.status
                    }
                });

            return {
                ...state,
                loading: false,
                error: false,
                warehouses:warehouses
             }
             default:
            return state

    }


}
export default warehouseReducer;