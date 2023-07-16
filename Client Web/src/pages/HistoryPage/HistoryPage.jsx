import { useEffect, useState } from 'react';
import { Spinner } from 'react-bootstrap';
import { ArrowRight } from 'react-bootstrap-icons';
import { useCookies } from 'react-cookie';
import { useNavigate } from 'react-router-dom';
import useHttp from '../../hooks/useHttp';
import classes from './HistoryPage.module.css';

const HistoryPage = () => {
  const navigate = useNavigate();
  const { isLoading, error, sendRequest } = useHttp();
  const [orderList, setOrderList] = useState([]);
  useEffect(() => {
    const requestConfig = {
      url: '/order/user',
    };
    const applyData = (data) => setOrderList(data || []);
    sendRequest(requestConfig, applyData);
  }, []);
  return (
    <>
      <div className="flex-centered header">
        <h1>HISTORY</h1>
        <p className="gray-color">HISTORY</p>
      </div>
      <div>
        {isLoading && <Spinner variant="dark" />}
        {!isLoading && error && <p className="centered">{error}</p>}
        {!isLoading && !error && orderList.length > 0 && (
          <div className={classes.container}>
            <div className={classes.head}>
              <b>id order</b>
              <b>id user</b>
              <b>name</b>
              <b>phone</b>
              <b>address</b>
              <b>total</b>
              <b>delivery</b>
              <b>status</b>
              <b>detail</b>
            </div>
            {orderList.map((x) => (
              <div className={classes.row} key={x._id}>
                <p className="break">{x._id}</p>
                <p className="break">{x.user._id}</p>
                <p>{x.user.fullName}</p>
                <p>{x.user.phone}</p>
                <p>{x.address}</p>
                <p>{x.total.toLocaleString() + ' VND'}</p>
                <p>{x.delivery}</p>
                <p>{x.status}</p>
                <p
                  className={classes.detail}
                  onClick={() => navigate(`/history/detail/${x._id}`)}
                >
                  View
                  <ArrowRight />
                </p>
              </div>
            ))}
          </div>
        )}
        {!isLoading && !error && orderList.length === 0 && (
          <h5 className="centered">You don't have any order</h5>
        )}
      </div>
    </>
  );
};

export default HistoryPage;
