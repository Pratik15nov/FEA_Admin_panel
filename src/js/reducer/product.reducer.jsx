
const initialState = {
    list: [],
    totalCount: 0,
    page: 1,
    perPage: 10
};

function productReducer(state = initialState, action) {
    switch(action.type) {
        case 'FETCH_PRODUCT_FAILURE':
            return {...state, list: []};
        case 'FETCH_PRODUCT_SUCCESS':
            return {...state, 
                list: action.payload.list, 
                totalCount: action.payload.count
            };
      default:
        return state;
    }
  }
  
  
  export default productReducer;
  