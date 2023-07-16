import classes from './Information.module.css';

const Information = () => {
  return (
    <section className={classes.information}>
      <div className={`flex-centered ${classes.background}`}>
        <div>
          <h5>FREE SHIPPING</h5>
          <p>Free shipping worlwide</p>
        </div>
        <div>
          <h5>24 X 7 SERVICE</h5>
          <p>Free shipping worlwide</p>
        </div>
        <div>
          <h5>FESTIVAL OFFER</h5>
          <p>Free shipping worlwide</p>
        </div>
      </div>
      <div className={classes.sub + ' flex-centered'}>
        <div>
          <h5>LET'S BE FRIENDS!</h5>
          <p>Nisi nisi tempor consequat laboris nisi</p>
        </div>
        <form>
          <input type="email" placeholder="Enter your email address" />
          <button>Subscribe</button>
        </form>
      </div>
    </section>
  );
};

export default Information;
