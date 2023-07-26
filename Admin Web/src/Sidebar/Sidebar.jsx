import { useContext } from 'react';
import {
  BookFill,
  BoxArrowRight,
  DoorOpenFill,
  GridFill,
  PenFill,
  PersonFill,
} from 'react-bootstrap-icons';
import { NavLink, useNavigate } from 'react-router-dom';
import AuthContext from '../store/AuthContext';
import classes from './Sidebar.module.css';

const Sidebar = (props) => {
  const auth = useContext(AuthContext);
  const navigate = useNavigate();
  return (
    <div className={classes.container}>
      <div className={classes.sidebar}>
        <h4 className={classes.title}>Admin Page</h4>
        <p className="smaller">MAIN</p>
        <NavLink
          to="/"
          className={(nav) => (nav.isActive ? classes.active : classes.item)}
        >
          <GridFill />
          <span>Dashboard</span>
        </NavLink>
        <p className="smaller">LIST</p>
        <NavLink
          to="/users"
          className={(nav) => (nav.isActive ? classes.active : classes.item)}
        >
          <PersonFill />
          <span>User</span>
        </NavLink>
        <NavLink
          to="/products"
          className={(nav) => (nav.isActive ? classes.active : classes.item)}
        >
          <DoorOpenFill />
          <span>Products</span>
        </NavLink>
        <NavLink
          to="/historys"
          className={(nav) => (nav.isActive ? classes.active : classes.item)}
        >
          <BookFill />
          <span>History</span>
        </NavLink>
        <p className="smaller">NEW</p>
        <NavLink
          to="/add-product"
          className={(nav) => (nav.isActive ? classes.active : classes.item)}
        >
          <PenFill />
          <span>New Product</span>
        </NavLink>
        <p className="smaller">USER</p>
        <div
          className={classes.item}
          onClick={() => {
            navigate('/');
            auth.logout();
          }}
        >
          <BoxArrowRight />
          <span>Logout</span>
        </div>
      </div>
      <main>{props.children}</main>
    </div>
  );
};

export default Sidebar;
