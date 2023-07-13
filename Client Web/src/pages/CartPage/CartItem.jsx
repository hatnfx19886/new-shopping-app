import {
  CaretLeftFill,
  CaretRightFill,
  TrashFill,
} from 'react-bootstrap-icons';

import { useDispatch } from 'react-redux';
import { cartActions } from '../../store';

import classes from './CartItem.module.css';
const CartItem = (props) => {
  const dispatch = useDispatch();
  const removeHandler = () => {
    dispatch(cartActions.removeItem(props.index));
  };
  const incrementHandler = (e) => {
    props.item.quantity < props.item.available &&
      dispatch(cartActions.increment(props.index));
  };
  const decrementHandler = (e) => {
    props.item.quantity > 1 && dispatch(cartActions.decrement(props.index));
  };
  return (
    <>
      <div>
        <img src={props.item.src} alt={props.item.name} />
      </div>
      <p className="larger">{props.item.name}</p>
      <div className="gray-color smaller">
        <p>{props.item.price.toLocaleString()}</p>
        <p>VND</p>
      </div>
      <div>
        <CaretLeftFill
          className={`${
            props.item.quantity > 1 ? classes.action : 'gray-color'
          }`}
          onClick={decrementHandler}
        />
        <span className={classes.amount}>{props.item.quantity}</span>
        <CaretRightFill
          className={`${
            props.item.quantity < props.item.available && classes.action
          }`}
          onClick={incrementHandler}
        />
      </div>
      <div className="gray-color smaller">
        <p>{props.item.total.toLocaleString()}</p>
        <p>VND</p>
      </div>
      <TrashFill className={classes.trash} onClick={removeHandler} />
    </>
  );
};
export default CartItem;
