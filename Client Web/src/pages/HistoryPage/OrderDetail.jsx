import { useEffect } from 'react';
import { useState } from 'react';
import { Spinner } from 'react-bootstrap';
import { useParams } from 'react-router-dom';
import useHttp from '../../hooks/useHttp';
import classes from './OrderDetail.module.css';

const OrderDetail = () => {
  const { id } = useParams();
  const { isLoading, error, sendRequest } = useHttp();
  const [order, setOrder] = useState({});
  useEffect(() => {
    const requestConfig = {
      url: `/order/find/${id}`,
    };
    const applyData = (data) => setOrder(data);
    sendRequest(requestConfig, applyData);
  }, [sendRequest, id]);
  return (
    <>
      {isLoading && <Spinner variant="dark" />}
      {!isLoading && error && order && <h2 className="centered">{error}</h2>}
      {!isLoading && !error && order && (
        <div className={classes.container}>
          <h2>INFORMATION ORDER</h2>
          <div className="smaller gray-color">
            <p>ID User: {order.user?._id}</p>
            <p>Full Name: {order.user?.fullName}</p>
            <p>Phone: {order.user?.phone}</p>
            <p>Address: {order.address}</p>
            <p>Total: {order.total?.toLocaleString() + ' VND'}</p>
          </div>
          <div className={classes.head}>
            <p>id product</p>
            <p>image</p>
            <p>name</p>
            <p>price</p>
            <p>count</p>
          </div>
          {order.cart?.map((x) => (
            <div className={classes.row} key={x.product?._id}>
              <p className="break">{x.product?._id}</p>
              <img src={x.product?.img1} alt={x.product?.name} width="100%" />
              <p>{x.product?.name}</p>
              <p>{x.product?.price.toLocaleString() + ' VND'}</p>
              <p>{x.quantity}</p>
            </div>
          ))}
        </div>
      )}
      {!order && <h2 className="centered">No order found</h2>}
    </>
  );
};

export default OrderDetail;
