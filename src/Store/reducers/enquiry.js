import * as actionTypes from '../actions/actionstypes';
const initialState = {
    loading: false
}

const enquiryReducer = (state = initialState, action) => {

    switch (action.type) {
        case actionTypes.FETCH_ENQUIRY_LIST_START:
            return {
                ...state,
                loading: true
            }
        case actionTypes.FETCH_ENQUIRY_LIST_SUCCESS:

            return {
                ...state,
                loading: false,
                error: false,
                enquries: action.payload.leads,
                resultCount:action.payload.resultCount
            }
        case actionTypes.FETCH_ENQUIRY_LIST_FAIL:
            return {
                ...state,
                loading: false,
                error: true,
                enquries: 0,
                resultCount:0

            }



        default:
            return state

    }


}
export default enquiryReducer;