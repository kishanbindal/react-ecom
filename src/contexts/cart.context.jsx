import { createContext, useState } from "react";

export const CartContext = createContext({
    showCartDropDown: false,
    setShowCartDropDown: () => {},
    cartItems: [],
    setCartItems: () => {}
}); 

export const CartProvider = ({children}) => {
    const [showCartDropDown, setShowCartDropDown] = useState(false);
    const [cartItems, setCartItems] = useState([]);

    const value={showCartDropDown, setShowCartDropDown, cartItems, setCartItems}

    return(
        <CartContext.Provider value={value}>{children}</CartContext.Provider>
    )
}

