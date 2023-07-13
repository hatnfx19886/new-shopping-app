import { useSelector } from 'react-redux';

import classes from './CheckoutOrder.module.css';
const CheckoutOrder = () => {
  const cartItem = useSelector((state) => state.item);
  const total = useSelector((state) => state.cartTotal);
  return (
    <div className={classes.order}>
      <h2>YOUR ORDER</h2>
      {cartItem.map((x) => (
        <div className={`flex-centered smaller ${classes.item}`} key={x.id}>
          <p className={classes.bold}>{x.name}</p>
          <p className="gray-color">{`${x.price.toLocaleString()} VND x ${
            x.quantity
          }`}</p>
        </div>
      ))}
      <div className="flex-centered">
        <p className={classes.bold}>TOTAL</p>
        <p className="larger">{`${total.toLocaleString()} VND`}</p>
      </div>
    </div>
  );
};

export default CheckoutOrder;
