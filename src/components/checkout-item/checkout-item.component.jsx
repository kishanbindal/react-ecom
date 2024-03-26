import { useContext } from 'react';
import './checkout-item.styles.scss'
import { CartContext } from '../../contexts/cart.context';

const CheckoutItem = ({cartItem}) => {
    const {imageUrl, name, quantity, price} = cartItem;
    
    const { addItemToCart, clearCartItem, reduceCartItem } = useContext(CartContext);

    const incrementQuantityHandler = () => addItemToCart(cartItem)
    const clearItemHandler = () => clearCartItem(cartItem);
    const decrementItemHandler = () => reduceCartItem(cartItem);

    return (
        <div className='checkout-item-container'>
            <div className='image-container'>
                <img src={imageUrl} alt={`${name}`} />
            </div>
            <span className="name">{name}</span>
            <span className='quantity'>
                <div className="arrow" onClick={decrementItemHandler}> &#10094;</div>
                <span className='value'>{quantity}</span>
                <div className="arrow" onClick={ incrementQuantityHandler }> &#10095;</div>
            </span>
            <span className='price'>{price}</span>
            <div className='remove-button' onClick={clearItemHandler}>
                &#10005;
            </div>
         </div>
    )
}

export default CheckoutItem;