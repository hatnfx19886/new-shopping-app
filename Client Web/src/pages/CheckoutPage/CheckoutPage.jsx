import CheckoutForm from './CheckoutForm';
import CheckoutOrder from './CheckoutOrder';
import classes from './CheckoutPage.module.css';

const CheckoutPage = () => {
  return (
    <>
      <div className="flex-centered header ">
        <h1>CHECK OUT</h1>
        <div>
          <span>HOME / CART /</span>
          <span className="gray-color"> CHECK OUT</span>
        </div>
      </div>
      <h2>BILLING DETAILS</h2>
      <div className={classes.container}>
        <CheckoutForm />
        <CheckoutOrder />
      </div>
    </>
  );
};

export default CheckoutPage;
