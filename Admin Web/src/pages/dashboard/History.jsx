import { useEffect, useState } from 'react';
import { Spinner } from 'react-bootstrap';
import useHttp from '../../hooks/useHttp';
import classes from './History.module.css';

const History = () => {
  const [list, setList] = useState([]);
  const { isLoading, error, sendRequest } = useHttp();
  useEffect(() => {
    const requestConfig = {
      url: '/',
    };
    const applyData = (data) => setList(data);
    sendRequest(requestConfig, applyData);
  }, []);
  return (
    <>
      {isLoading && <Spinner variant="dark" />}
      {!isLoading && error && <h5 className="centered">{error}</h5>}
      {!isLoading && !error && (
        <div className={classes.container}>
          <h3>History</h3>
          <div className={classes.table}>
            <div className={classes.row}>
              <p>ID User</p>
              <p>Name</p>
              <p>Phone</p>
              <p>Address</p>
              <p>Total</p>
              <p>Delivery</p>
              <p>Status</p>
              <p>Detail</p>
            </div>
            {list.map((x) => (
              <div className={classes.row} key={x._id}>
                <p>{x.user._id}</p>
                <p>{x.user.fullName}</p>
                <p>{x.user.phone}</p>
                <p>{x.address}</p>
                <p>{x.total.toLocaleString()}</p>
                <p>{x.delivery}</p>
                <p>{x.status}</p>
                <p className={classes.view}>View</p>
              </div>
            ))}
          </div>
        </div>
      )}
    </>
  );
};

export default History;
