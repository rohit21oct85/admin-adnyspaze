import {
    GET_WAREHOUSSE_DATA,
    GET_WAREHOUSSE_DATA_RECIEVED,
    GET_WAREHOUSSE_DATA_FAIL,
    CHANGE_WAREHOUSE_STATUS_START,
    CHANGE_WAREHOUSE_STATUS_SUCCESS,
    CHANGE_WAREHOUSE_STATUS_FAIL
} from "./actionstypes";
import axios from "axios";
import {elements} from "../../Cons";


export const fecthWarehouseState = (data) => {

    return {
        type: GET_WAREHOUSSE_DATA
    }
}
export const fecthWarehouseSuccess = (data) => {


    return {
        type: GET_WAREHOUSSE_DATA_RECIEVED,
        payload: data
    }
}
export const fecthWarehouseFailed = (data) => {
     return {
        type: GET_WAREHOUSSE_DATA_FAIL,
        payload: data
    }
}
export const fecthWarehouse = (formdata) => {
   return (dispatch) => {
        dispatch(fecthWarehouseState());

        axios.post(`${elements.API_ENDPOINT}/warehouses`, formdata)
        .then(
            res => {
                dispatch(fecthWarehouseSuccess(res.data));
            }
        )
        .catch(err => {
            dispatch(fecthWarehouseFailed(err));
        })

    }
}
// change warehouse status
export const changeWarehouseStatusStart = (data) => {

    return {
        type: CHANGE_WAREHOUSE_STATUS_START,

    }
}
export const changeWarehouseStatusSuccess = (data) => {

    return {
        type: CHANGE_WAREHOUSE_STATUS_SUCCESS,
        payload: data
    }
}
export const changeWarehouseStatusFail = (data) => {

    return {
        type: CHANGE_WAREHOUSE_STATUS_FAIL,
        payload: data
    }
}
export const toggleWareHouseStatus=(data)=>{
    return (dispatch) => {
        dispatch(changeWarehouseStatusStart());

        axios.post(`${elements.API_ENDPOINT}/changewarehousestatus`, data)
        .then(
            res => {
                dispatch(changeWarehouseStatusSuccess(res.data));
            }
        )
        .catch(err => {
            console.log(err)
            dispatch(changeWarehouseStatusFail(err));
        })

    }

}