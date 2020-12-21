import * as actionTypes from '../actions/actionstypes';
const initialState = {
    loading: false
}

const leadReducer = (state = initialState, action) => {

    switch (action.type) {
        case actionTypes.FETCH_LEAD_LIST_START:
            return {
                ...state,
                loading: true
            }
        case actionTypes.FETCH_LEAD_LIST_SUCCESS:

            return {
                ...state,
                loading: false,
                error: false,
                leads: action.payload.leads,
                resultCount:action.payload.resultCount
            }
        case actionTypes.FETCH_LEAD_LIST_FAIL:
            return {
                ...state,
                loading: false,
                error: true,
                leads:0,
                resultCount:0

            }


        default:
            return state

    }


}
export default leadReducer;