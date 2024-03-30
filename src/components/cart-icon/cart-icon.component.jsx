import { useContext } from 'react';
import { CartContext } from '../../contexts/cart.context';
import { CartIconContainer, ShoppingIcon, ItemCount } from './cart-icon.styles';


const CartIcon = () => {

    const { cartItems,showCartDropDown, setShowCartDropDown, cartCount } = useContext(CartContext)

    const toggleCartDropDown = () => setShowCartDropDown(!showCartDropDown);

    console.log("rendered", showCartDropDown)
    // let numberOfItems = 0;
    // cartItems.forEach( item => {
    //     numberOfItems += item.quantity;
    // })

    return(
        <CartIconContainer onClick={toggleCartDropDown}>
            <ShoppingIcon />
            <ItemCount>{cartCount}</ItemCount>
        </CartIconContainer>
    )
}

export default CartIcon