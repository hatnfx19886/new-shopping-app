import { Link } from 'react-router-dom';
import classes from './Categories.module.css';

const Categories = () => {
  return (
    <section className={classes.categories}>
      <p className="gray-color">CAREFULLY CREATED COLLECTIONS</p>
      <h5>BROWSE OUR CATEGORIES</h5>
      <div className="flex-centered">
        <Link to="/shop">
          <img src="./img/product_1.png" alt="iPhone" />
        </Link>
        <Link to="/shop">
          <img src="./img/product_2.png" alt="iPhone" />
        </Link>
      </div>
      <div className="flex-centered">
        <Link to="/shop">
          <img src="./img/product_3.png" alt="iPhone" />
        </Link>
        <Link to="/shop">
          <img src="./img/product_4.png" alt="iPhone" />
        </Link>
        <Link to="/shop">
          <img src="./img/product_5.png" alt="iPhone" />
        </Link>
      </div>
    </section>
  );
};

export default Categories;
