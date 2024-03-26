import { Fragment, useContext } from "react";
import { Outlet, Link } from "react-router-dom";
import './navigation.styles.scss';

import { ReactComponent as CrwnLogo} from '../../assets/crown.svg';
import { UserContext } from "../../contexts/user.context";
import { signOutUser } from "../../utils/firebase/firebase.utils";
import CartIcon from "../../components/cart-icon/cart-icon.component";
import CartDropdown from "../../components/cart-dropdown/cart-dropdown.component";
import { CartContext } from "../../contexts/cart.context";


// <Fragment /> similar to ng-container in angular
// Allows us to not have a structural 'parent' element similar to ng-container

const Navigation = () => {

    const { currentUser } = useContext(UserContext);
    const { showCartDropDown } = useContext(CartContext);

    return (
      <Fragment>
        <div className="navigation">
            <Link className="logo-container" to="/">
                <CrwnLogo className="logo"></CrwnLogo>
            </Link>
            <div className="nav-links-container">
                <Link className="nav-link" to='/shop'>
                    SHOP
                </Link>
                {
                    currentUser ? (
                        <span className="nav-link" onClick={signOutUser}>SIGN OUT</span>
                    ) : (
                    <Link className="nav-link" to="/auth">SIGN IN</Link>)
                }
                <CartIcon ></CartIcon>
            </div>
            {showCartDropDown && <CartDropdown />}
        </div>
        <Outlet />
      </Fragment>
    )
}

export default Navigation