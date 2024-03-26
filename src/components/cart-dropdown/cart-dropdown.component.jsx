import { useContext } from 'react';
import { CartContext } from '../../contexts/cart.context';
import Button from '../button/button.component';
import './cart-dropdown.styles.scss';
import CartItem from '../cart-item/cart-item.component';
import { useNavigate } from 'react-router-dom';


const CartDropdown = () => {

    const { cartItems, showCartDropDown, setShowCartDropDown } = useContext(CartContext)
    let navigate = useNavigate();
    
    const navigateToCheckout = () => {
        setShowCartDropDown(!showCartDropDown);
        navigate('checkout');
    }

    return(
        <div className='cart-dropdown-container'>
            <div className="cart-items">
                {
                    cartItems.length ? (
                        cartItems.map((cartItem) =>
                            <CartItem key={cartItem.id} cartItem={cartItem}/>
                        )
                    ) : (
                        <span className='empty-message'>Cart is empty</span>
                    )
                }
            </div>
            <Button 
                className="" 
                buttonType="button" 
                buttonText="Go to checkout"
                onClick={navigateToCheckout}    
            />
        </div>
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