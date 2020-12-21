import * as actionTypes from '../actions/actionstypes';


const initialState = {
    isAuthenticated: localStorage.getItem("token") ? true : false,
    token:localStorage.getItem("token") ?localStorage.getItem("token") :null,
    error: false
}

const loginReducer = (state = initialState, action) => {

    switch (action.type) {
        case actionTypes.LOGIN_REQUEST_SENT:
            return {
                ...state,
                loading: true
            }
        case actionTypes.LOGIN_REQUEST_SUCCESS:

            return {
                ...state,
                loading: false,
                isAuthenticated: true,
                error:false,
                userData: action.payload,
                token:action.payload.token
            }
        case actionTypes.LOGIN_REQUEST_FAIL:
            return {
                ...state,
                loading: false,
                error: true,
                isAuthenticated:false,
                data: action.payload

            }

        case actionTypes.LOGOUT_REQUEST_SENT:
            return {
                ...state,
                loading: true
            }
        case actionTypes.LOGOUT_REQUEST_SUCCESS:
            return {
                ...state,
                loading: false,
                isAuthenticated: false,
            }
        case actionTypes.LOGOUT_REQUEST_FAIL:
            return {
                ...state,
                loading: false
            }

        default:
            return state

    }


}
export default loginReducer;