import {
    FETCH_ENQUIRY_LIST_START,
    FETCH_ENQUIRY_LIST_SUCCESS,
    FETCH_ENQUIRY_LIST_FAIL
} from "./actionstypes";

import axios from "axios";
import { elements } from "../../Cons";

export const enquiryFetchStart = (data) => {

    return {
        type: FETCH_ENQUIRY_LIST_START,

    }
}
export const enquiryFetchSuccess = (data) => {

    return {
        type: FETCH_ENQUIRY_LIST_SUCCESS,
        payload: data

    }
}
export const enquiryFetchFail = (data) => {

    return {
        type: FETCH_ENQUIRY_LIST_FAIL,
        payload: data

    }
}

export const fetchEnquiryList=(data)=>{
    return (dispatch) => {
        dispatch(enquiryFetchStart());

        axios.post(`${elements.API_ENDPOINT}/contact`, data)
        .then(
            res => {
                dispatch(enquiryFetchSuccess(res.data));
            }
        )
        .catch(err => {
            dispatch(enquiryFetchFail(err));
        })

    }

}