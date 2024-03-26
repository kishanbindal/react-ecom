import { useContext } from 'react';
import {ReactComponent as ShoppingIcon} from '../../assets/shopping-bag.svg';
import { CartContext } from '../../contexts/cart.context';
import './cart-icon.styles.scss';

const CartIcon = () => {

    const { showCartDropDown, setShowCartDropDown } = useContext(CartContext)

    const toggleCartDropDown = () => setShowCartDropDown(!showCartDropDown);

    return(
        <div className="cart-icon-container" onClick={toggleCartDropDown}>
            <ShoppingIcon className='shopping-icon'/>
            <span className='item-count'>0</span>
        </div>
    )
}

export default CartIcon