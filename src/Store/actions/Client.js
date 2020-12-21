import {
    FETCH_CLIENT_START,
    FETCH_CLIENT_SUCCESS,
    FETCH_CLIENT_FAIL
} from "./actionstypes";

import axios from "axios";
import { elements } from "../../Cons";

export const clientFetchStart = (data) => {

    return {
        type: FETCH_CLIENT_START,

    }
}
export const clientFetchSuccess = (data) => {

    return {
        type: FETCH_CLIENT_SUCCESS,
        payload: data

    }
}
export const clientFetchFail = (data) => {

    return {
        type: FETCH_CLIENT_FAIL,
        payload: data

    }
}

export const fetchClientList=(data)=>{
    return (dispatch) => {
        dispatch(clientFetchStart());

        axios.post(`${elements.API_ENDPOINT}/clients`, data)
        .then(
            res => {
                dispatch(clientFetchSuccess(res.data));
            }
        )
        .catch(err => {
            dispatch(clientFetchFail(err));
        })

    }

}

export const findClient = (data)=>{
    return (dispatch) => {
        dispatch(clientFetchStart());

        axios.post(`${elements.API_ENDPOINT}/findClient`, data)
        .then(
            res => {
                dispatch(clientFetchSuccess(res.data));
            }
        )
        .catch(err => {
            dispatch(clientFetchFail(err));
        })

    }
}