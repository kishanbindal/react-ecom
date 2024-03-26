import { useContext } from 'react';
import {ReactComponent as ShoppingIcon} from '../../assets/shopping-bag.svg';
import { CartContext } from '../../contexts/cart.context';
import './cart-icon.styles.scss';

const CartIcon = () => {

    const { cartItems,showCartDropDown, setShowCartDropDown, cartCount } = useContext(CartContext)

    const toggleCartDropDown = () => setShowCartDropDown(!showCartDropDown);

    // let numberOfItems = 0;
    // cartItems.forEach( item => {
    //     numberOfItems += item.quantity;
    // })

    return(
        <div className="cart-icon-container" onClick={toggleCartDropDown}>
            <ShoppingIcon className='shopping-icon'/>
            <span className='item-count'>{cartCount}</span>
        </div>
    )
}

export default CartIcon