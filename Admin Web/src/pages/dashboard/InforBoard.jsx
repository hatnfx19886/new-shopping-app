import classes from './InforBoard.module.css';

const InforBoard = () => {
  return (
    <div className={classes.container}>
      <div className={classes.item}>
        <div>
          <h6>2</h6>
          <p>Clients</p>
        </div>
        <div className="larger">
          <span>
            <p>+</p>
          </span>
        </div>
      </div>
      <div className={classes.item}>
        <div>
          <span>
            <h6>44.779.000</h6>
          </span>
          <span>VND</span>
          <p>Earnings of Month</p>
        </div>
      </div>
      <div className={classes.item}>
        <div>
          <h6>2</h6>
          <p>New Order</p>
        </div>
      </div>
    </div>
  );
};

export default InforBoard;
