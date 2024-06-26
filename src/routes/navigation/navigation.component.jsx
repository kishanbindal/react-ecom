import { Fragment, useContext } from "react";
import { Outlet } from "react-router-dom";
import { useSelector } from 'react-redux';
import { selectCurrentUser } from '../../store/user/user.selector';

import { ReactComponent as CrwnLogo} from '../../assets/crown.svg';
import { signOutUser } from "../../utils/firebase/firebase.utils";
import CartIcon from "../../components/cart-icon/cart-icon.component";
import CartDropdown from "../../components/cart-dropdown/cart-dropdown.component";
import { CartContext } from "../../contexts/cart.context";

import { NavigationContainer, LogoContainer, NavLinks, NavLink } from './navigation.styles';


// <Fragment /> similar to ng-container in angular
// Allows us to not have a structural 'parent' element similar to ng-container

const Navigation = () => {

    const currentUser = useSelector(selectCurrentUser);
    const { showCartDropDown } = useContext(CartContext);

    return (
      <Fragment>
        <NavigationContainer>
            <LogoContainer to="/">
                <CrwnLogo className="logo"></CrwnLogo>
            </LogoContainer>
            <NavLinks>
                <NavLink to="/shop">SHOP</NavLink>
                {
                    currentUser ? (
                        <NavLink as="span" className="nav-link" onClick={signOutUser}>SIGN OUT</NavLink>
                    ) : (
                        <NavLink to="/auth">SIGN IN</NavLink>
                    )
                }
                <CartIcon></CartIcon>
            </NavLinks>
            {showCartDropDown && <CartDropdown/>}
        </NavigationContainer>
        <Outlet />
      </Fragment>
    )
}

export default Navigation