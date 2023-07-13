import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import CartItem from './CartItem';
import classes from './CartPage.module.css';
import CartTotal from './CartTotal';
import { ArrowLeft, ArrowRight } from 'react-bootstrap-icons';

const CartPage = () => {
  const cartItem = useSelector((state) => state.item);
  return (
    <>
      <div className="flex-centered header ">
        <h1>CART</h1>
        <p className="gray-color">CART</p>
      </div>
      <h3>SHOPPING CART</h3>
      <div className={classes.container}>
        {cartItem.length === 0 ? (
          <div className={classes.zero}>
            <p>Your cart is empty</p>
            <Link to="/shop">Go to Shop</Link>
          </div>
        ) : (
          <div>
            <div className={classes.cartHeader}>
              <p>image</p>
              <p>product</p>
              <p>price</p>
              <p>quantity</p>
              <p>total</p>
              <p>remove</p>
            </div>
            <div className={classes.cartContainer}>
              {cartItem.map((x, index) => (
                <CartItem item={x} index={index} key={x.id} />
              ))}
            </div>
            <div className={`flex-centered ${classes.footer}`}>
              <div className={classes.checkout}>
                <ArrowLeft />
                <Link to="/shop">Continue shopping</Link>
              </div>
              <div className={classes.checkout}>
                <Link to="/checkout">Process to checkout</Link>
                <ArrowRight />
              </div>
            </div>
          </div>
        )}
        <CartTotal />
      </div>
    </>
  );
};

export default CartPage;
