import { CATEGORIES_ACTION_TYPES } from "./category.types";

export const CATEGORY_INTITAL_STATE = {
    categoriesMap: {}
}

export const categoriesReducer = (state = CATEGORY_INTITAL_STATE, action) => {
    const {type, payload} = action;
    console.log("Categories Action:", action);
    switch(type){
        case CATEGORIES_ACTION_TYPES.SET_CATEGORIES_MAP:
            return {
                ...state,
                categoriesMap: payload
            };
        default: 
            return state;
    }
}