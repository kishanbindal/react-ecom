import { createContext, useReducer } from "react";

import { createAction } from '../utils/reducer/reducer.utils.js';

export const addCartItem = (cartItems, productToAdd) => {
    const existingCartItem = cartItems.find(
        (cartItem) => cartItem.id === productToAdd.id
    )

    if (existingCartItem){
        return cartItems.map((cartItem) => 
            cartItem.id === productToAdd.id 
            ? {...cartItem, quantity: cartItem.quantity + 1} : cartItem
        )
    }

    return [...cartItems, {...productToAdd, quantity: 1}]
}

const removeItemFromCart = (cartItems, itemToRemove) => {

    const existingCartItem = cartItems.find(
        (cartItem) => cartItem.id === itemToRemove.id
    )

    if (existingCartItem.quantity === 1){
        return clearItemFromCart(cartItems, itemToRemove)
    }

    return cartItems.map((cartItem) => 
        cartItem.id === itemToRemove.id ?{...cartItem, quantity: cartItem.quantity- 1} : cartItem
    )
}

export const clearItemFromCart = (cartItems, itemToRemove) => cartItems.filter((cartItem) => cartItem.id !== itemToRemove.id);


export const CartContext = createContext({
    showCartDropDown: false,
    setShowCartDropDown: () => {},
    cartItems: [],
    setCartItems: () => {},
    addItemToCart: () => {},
    removeItemFromCart: () => {},
    clearItemFromCart: () => {},
    cartCount : 0,
    cartTotal: 0
}); 

export const INTITIAL_CART_STATE = {
    cartCount: 0, 
    cartItems: [],
    showCartDropDown: false,
    cartTotal: 0,
}

export const CART_ACTION_TYPES = {
    UPDATE_CART_ITEMS : 'UPDATE_CART_ITEMS',
    TOGGLE_DROPDOWN : 'TOGGLE_DROPDOWN',
};

const cartReducer = (state, action) => {
    const { type, payload } = action;

    switch(type) {
        case CART_ACTION_TYPES.UPDATE_CART_ITEMS:
            return {
                ...state,
                ...payload
            }
        case CART_ACTION_TYPES.TOGGLE_DROPDOWN:
            return {
                ...state, 
                ...payload
            }
        default:
            throw new Error(`Unhandled type of ${type} in cartReducer`);
    }
}


export const CartProvider = ({children}) => {

    const [{cartItems, cartCount, cartTotal, showCartDropDown}, dispatch] = useReducer(cartReducer, INTITIAL_CART_STATE);

    const setShowCartDropDown = () => {
        const action =createAction(CART_ACTION_TYPES.TOGGLE_DROPDOWN, {showCartDropDown: !showCartDropDown})
        dispatch(action);
    }

    const updateCartItemsReducer = (newCartItems) => {
        const newTotal = newCartItems.reduce((total, cartItem) => total + (cartItem.price * cartItem.quantity), 0);
        const newCartCount = newCartItems.reduce((total, cartItem) => total+cartItem.quantity, 0);
        const action = createAction(CART_ACTION_TYPES.UPDATE_CART_ITEMS, {
            cartItems: newCartItems,
            cartTotal: newTotal,
            cartCount: newCartCount
        })
        dispatch(action);
    }

    const addItemToCart = (productToAdd) => {
        const newCartItems = addCartItem(cartItems, productToAdd)
        updateCartItemsReducer(newCartItems);
    }

    const clearCartItem = (productToClear) => {
        const newCartItems = clearItemFromCart(cartItems, productToClear);
        updateCartItemsReducer(newCartItems);
    };
    const reduceCartItem = (productToReduce) => {
        const newCartItems= removeItemFromCart(cartItems, productToReduce)
        updateCartItemsReducer(newCartItems);
    };

    const value={
        showCartDropDown, 
        setShowCartDropDown, 
        cartItems, 
        addItemToCart, 
        cartCount, 
        clearCartItem, 
        reduceCartItem,
        cartTotal
    }

    return(
        <CartContext.Provider value={value}>{children}</CartContext.Provider>
    )
}

