import {
  ADD_LOADING,
  REMOVE_LOADING,
  SET_BOARD,
  BoardTypes
} from '../actions/types';
  
const initialState = {
  loading:[],
  boardType: "uninitialized"
};

export default function(state = initialState, action: any) {
  const {loading} = state;

  switch (action.type) {
    case ADD_LOADING:
      return {
        ...state,
        loading: [...loading, ...action.payload]
      };
    case REMOVE_LOADING:
      return {
        ...state,
        loading: loading.filter(loadingType => {
          if (action.payload.includes(loadingType)) {
            return false;
          } else {
            return true
          }
        })
      };
    case SET_BOARD:
      return{
        ...state,
        boardType:action.payload

      }
    default:
      return state;
      
  }
}
