import { createStore, combineReducers } from 'redux';

const SET_PROFILE = "SET_PROFILE";

export const setProfile = (id: any) => {
    return {
        type: SET_PROFILE,
        id
    }
}


const reducer = (state = [], action:any) => {
    switch(action.type) {
        case SET_PROFILE:
            return [{id: action.id}, ...state]
        default:
            return state;
    }
}

const store = createStore(combineReducers({reducer}));

export const actionCreators = {
    setProfile
}

export default store;