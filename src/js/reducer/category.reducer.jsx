
const initialState = {
    list: [],
    totalCount: 0,
    page: 1,
    perPage: 10
};

function categoryReducer(state = initialState, action) {
    switch(action.type) {
        case 'FETCH_CATEGORY_FAILURE':
            return {...state, list: []};
        case 'FETCH_CATEGORY_SUCCESS':
            return {...state, 
                list: action.payload.list, 
                totalCount: action.payload.count
            };
        case 'UPDATE_PAGE_NUMBER': 
            return {...state,
                page: action.payload
            };
      default:
        return state;
    }
  }
  
export default categoryReducer;
  