import { useContext } from 'react';
import { CartContext } from '../../contexts/cart.context';
import Button from '../button/button.component';

import CartItem from '../cart-item/cart-item.component';
import { useNavigate } from 'react-router-dom';
import { 
    CartDropdownContainer, 
    EmptyMessage, 
    CartItems } from './cart-dropdown.styles';


const CartDropdown = () => {

    const { cartItems, showCartDropDown, setShowCartDropDown } = useContext(CartContext)
    let navigate = useNavigate();
    
    const navigateToCheckout = () => {
        setShowCartDropDown(!showCartDropDown);
        navigate('checkout');
    }

    return(
        <CartDropdownContainer>
            <CartItems>
                {
                    cartItems.length ? (
                        cartItems.map((cartItem) =>
                            <CartItem key={cartItem.id} cartItem={cartItem}/>
                        )
                    ) : (
                        <EmptyMessage className='empty-message'>Cart is empty</EmptyMessage>
                    )
                }
            </CartItems>

            <Button 
                className="" 
                buttonType="button"
                buttonText="Go to checkout"
                onClick={navigateToCheckout}
            />
        </CartDropdownContainer>
    );
};

export default CartDropdown;

/*
Product {
    id
    name
    imageUrl
    price
}

CartItem {
    id,
    name,
    imageUrl,
    price,
    quantity
}

*/