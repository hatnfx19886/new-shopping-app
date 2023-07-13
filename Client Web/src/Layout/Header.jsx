import { useContext } from 'react';
import { CaretDownFill, Cart4, PersonFill } from 'react-bootstrap-icons';
import { NavLink } from 'react-router-dom';
import AuthContext from '../store/AuthContext';
import classes from './Header.module.css';

const Header = () => {
  const authCtx = useContext(AuthContext);
  const logoutHandler = () => {
    authCtx.logout();
  };
  return (
    <header className={`flex-centered ${classes.header}`}>
      <nav>
        <NavLink
          to="/"
          className={(nav) => (nav.isActive ? classes.active : '')}
        >
          Home
        </NavLink>
        <NavLink
          to="/shop"
          className={(nav) => (nav.isActive ? classes.active : '')}
        >
          Shop
        </NavLink>
      </nav>
      <h1>BOUTIQUE</h1>
      <nav>
        <NavLink
          to="/cart"
          className={(nav) => (nav.isActive ? classes.active : '')}
        >
          <Cart4 />
          <span>Cart</span>
        </NavLink>
        {!authCtx.isLogedIn && (
          <NavLink
            to="/login"
            className={(nav) => (nav.isActive ? classes.active : '')}
          >
            <PersonFill />
            <span>Login</span>
          </NavLink>
        )}
        {authCtx.isLogedIn && (
          <>
            <NavLink
              to="/history"
              className={(nav) => (nav.isActive ? classes.active : '')}
            >
              History
            </NavLink>
            <div>
              <PersonFill />
              <span>{authCtx.user.fullName}</span>
              <CaretDownFill style={{ color: '#000', fontSize: '16px' }} />
            </div>
            <span onClick={logoutHandler} className={classes.logout}>
              (Logout)
            </span>
          </>
        )}
      </nav>
    </header>
  );
};

export default Header;
