import { Fragment } from "react";
import { Outlet, Link } from "react-router-dom";
import './navigation.styles.scss';

import { ReactComponent as CrwnLogo} from '../../assets/crown.svg';

// <Fragment /> similar to ng-container in angular
// Allows us to not have a structural 'parent' element similar to ng-container

const Navigation = () => {
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
                <Link className="nav-link" to='/sign-in'>
                    SIGN IN
                </Link>
            </div>
        </div>
        <Outlet />
      </Fragment>
    )
}

export default Navigation