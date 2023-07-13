import { Link } from 'react-router-dom';
import classes from './Banner.module.css';

const Banner = () => {
  return (
    <section className={classes.banner}>
      <img src="./img/banner1.jpg" alt="Banner Boutique" />
      <div className={classes.content}>
        <p className="gray-color">NEW INSPIRATION 2022</p>
        <h3>20% OFF ON NEW SEASON</h3>
        <Link to="/shop">
          <button>Browse collections</button>
        </Link>
      </div>
    </section>
  );
};

export default Banner;
