import { useNavigate } from 'react-router-dom';
import classes from './ProductList.module.css';

const ProductList = (props) => {
  const navigate = useNavigate();
  const toDetailHandler = (e) => {
    navigate(`/detail/${e.target.id}`);
  };
  return (
    <div className="flex-centered wrap">
      {props.list.map((x) => (
        <div className={classes['product-list']} key={Math.random()}>
          <img src={x.img1} alt={x.name} onClick={toDetailHandler} id={x._id} />
          <p className="centered">{x.name}</p>
          <p className="gray-color centered">
            {Number(x.price).toLocaleString() + ' VND'}
          </p>
        </div>
      ))}
    </div>
  );
};

export default ProductList;
