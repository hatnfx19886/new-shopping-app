import { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
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
        <div className={classes.item} onClick={() => navigate('/')}>
          <span>Dashboard</span>
        </div>
        <p className="smaller">LIST</p>
        <div className={classes.item}>
          <span>User</span>
        </div>
        <div className={classes.item} onClick={() => navigate('/products')}>
          <span>Products</span>
        </div>
        <div className={classes.item}>
          <span>History</span>
        </div>
        <p className="smaller">NEW</p>
        <div className={classes.item} onClick={() => navigate('/products/add')}>
          <span>New Product</span>
        </div>
        <p className="smaller">USER</p>
        <div
          className={classes.item}
          onClick={() => {
            navigate('/');
            auth.logout();
          }}
        >
          <span>Logout</span>
        </div>
      </div>
      <main>{props.children}</main>
    </div>
  );
};

export default Sidebar;
