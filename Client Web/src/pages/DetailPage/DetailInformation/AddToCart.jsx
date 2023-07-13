import { useState } from 'react';
import { Button } from 'react-bootstrap';
import { CaretLeftFill, CaretRightFill } from 'react-bootstrap-icons';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { cartActions } from '../../../store';

import classes from './AddToCart.module.css';

const AddToCart = (props) => {
  const cartItem = useSelector((state) => state.item);
  const dispatch = useDispatch();
  const [quantity, setQuantity] = useState(1);
  const isAdded = cartItem.find((x) => x.id === props.id);
  const decrementHandler = () => {
    quantity > 1 && setQuantity((x) => x - 1);
  };
  const incrementHandler = () => {
    quantity < props.item.count && setQuantity((x) => x + 1);
  };
  const addItemHandler = () => {
    const item = {
      id: props.id,
      src: props.item.img1,
      name: props.item.name,
      price: Number(props.item.price),
      quantity,
      total: props.item.price * quantity,
      available: props.item.count,
    };
    dispatch(cartActions.addItem(item));
  };
  return isAdded ? (
    <div className={classes.added}>
      <p>This product is added to your cart</p>
      <Link to="/cart">Go to Cart</Link>
    </div>
  ) : (
    <div className={classes.add}>
      <span className={classes.quantity}>
        <span className="gray-color">QUANTITY</span>
        <CaretLeftFill
          icon="fa-solid fa-caret-left"
          className={`${quantity > 1 ? classes.action : 'gray-color'} ${
            classes.increment
          }`}
          onClick={decrementHandler}
        />
        <span className={classes.amount}>{quantity}</span>
        <CaretRightFill
          className={`${quantity < props.item.count && classes.action}`}
          onClick={incrementHandler}
        />
      </span>
      <Button variant="dark" onClick={addItemHandler}>
        Add to cart
      </Button>
    </div>
  );
};

export default AddToCart;
