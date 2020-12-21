import * as actionTypes from '../actions/actionstypes';
const initialState = {
    loading: false,

}

const clientReducer = (state = initialState, action) => {

    switch (action.type) {
        case actionTypes.FETCH_CLIENT_START:
            return {
                ...state,
                loading: true
            }
        case actionTypes.FETCH_CLIENT_SUCCESS:

            return {
                ...state,
                loading: false,
                error:false,
                data: action.payload
            }
        case actionTypes.FETCH_CLIENT_FAIL:
            return {
                ...state,
                loading: false,
                error: true

         }




        default:
            return state

    }


}
export default clientReducer;