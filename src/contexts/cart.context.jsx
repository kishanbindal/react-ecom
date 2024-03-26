import { createContext, useEffect, useState } from "react";

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

    console.log(cartItems)
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

export const CartProvider = ({children}) => {
    const [showCartDropDown, setShowCartDropDown] = useState(false);
    const [cartItems, setCartItems] = useState([]);
    const [cartCount, setCartCount] = useState(0);
    const [cartTotal, setCartTotal ] = useState(0);

    useEffect(() => {
        const newCartCount = cartItems.reduce((total, cartItem) => total+cartItem.quantity, 0);
        setCartCount(newCartCount);
    }, [cartItems])

    useEffect(() => {
        const newTotal = cartItems.reduce((total, cartItem) => total + (cartItem.price * cartItem.quantity), 0);
        setCartTotal(newTotal)
    }, [cartItems])

    const addItemToCart = (productToAdd) => {
        setCartItems(addCartItem(cartItems, productToAdd))
    }

    const clearCartItem = (productToClear) => {setCartItems(clearItemFromCart(cartItems, productToClear))};
    const reduceCartItem = (productToReduce) => {setCartItems(removeItemFromCart(cartItems, productToReduce))};

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

