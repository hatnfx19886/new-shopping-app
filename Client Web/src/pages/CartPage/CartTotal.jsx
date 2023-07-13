import { Button } from 'react-bootstrap';
import { GiftFill } from 'react-bootstrap-icons';
import { useSelector } from 'react-redux';
import classes from './CartTotal.module.css';

const CartTotal = () => {
  const cartTotal = useSelector((state) => state.cartTotal);
  return (
    <div className={classes.total}>
      <h3>CART TOTAL</h3>
      <div className={`flex-centered ${classes.sub}`}>
        <p className={classes.bold}>SUBTOTAL</p>
        <p className="gray-color smaller">
          {cartTotal.toLocaleString() + ' VND'}
        </p>
      </div>
      <div className="flex-centered">
        <p className={classes.bold}>TOTAL</p>
        <p className="larger">{cartTotal.toLocaleString() + ' VND'}</p>
      </div>
      <form>
        <input type="text" placeholder="Enter your coupon" />
        <Button variant="dark">
          <GiftFill /> Apply coupon
        </Button>
      </form>
    </div>
  );
};

export default CartTotal;
