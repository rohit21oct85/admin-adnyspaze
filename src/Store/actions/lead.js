import {
    FETCH_LEAD_LIST_FAIL,
    FETCH_LEAD_LIST_START,
    FETCH_LEAD_LIST_SUCCESS
} from "./actionstypes";

import axios from "axios";
import { elements } from "../../Cons";

export const leadFetchStart = (data) => {

    return {
        type: FETCH_LEAD_LIST_START,

    }
}
export const leadFetchSuccess = (data) => {

    return {
        type: FETCH_LEAD_LIST_SUCCESS,
        payload: data

    }
}
export const leadFetchFail = (data) => {

    return {
        type: FETCH_LEAD_LIST_FAIL,
        payload: data

    }
}

export const fetchLeadList=(data)=>{
    return (dispatch) => {
        dispatch(leadFetchStart());

        axios.post(`${elements.API_ENDPOINT}/leads`, data)
        .then(
            res => {
                dispatch(leadFetchSuccess(res.data));
            }
        )
        .catch(err => {
            dispatch(leadFetchFail(err));
        })

    }

}