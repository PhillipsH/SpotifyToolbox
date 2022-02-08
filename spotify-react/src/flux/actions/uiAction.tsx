import {ADD_LOADING, REMOVE_LOADING, SET_BOARD} from './types';

// export const addLoading = (loadingType) => (dispatch: Function) => {
//     return({
//         type:ADD_LOADING,
//         payload:loadingType
//     })
// };

export const addLoading = (loadingType) => {
    return({
        type:ADD_LOADING,
        payload:loadingType
    })
};

export const removeLoading = (loadingType) => {
    return({
        type:REMOVE_LOADING,
        payload:loadingType
    })
};

export const setBoard = (boardType) => {
    return({
        type:SET_BOARD,
        payload:boardType
    })
};
