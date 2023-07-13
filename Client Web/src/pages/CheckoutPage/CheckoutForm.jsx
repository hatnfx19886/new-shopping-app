import { useContext, useEffect, useState } from 'react';
import { Button, Modal } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import useHttp from '../../hooks/useHttp';
import AuthContext from '../../store/AuthContext';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import classes from './CheckoutForm.module.css';
import { cartActions } from '../../store';

const CheckoutForm = () => {
  const items = useSelector((state) => state.item);
  const total = useSelector((state) => state.cartTotal);
  const dispatch = useDispatch();
  const auth = useContext(AuthContext);
  const { isLoading, error, sendRequest } = useHttp();
  const navigate = useNavigate();
  const [err, setErr] = useState();
  const user = yup.object({
    fullName: yup.string().trim().required(),
    phone: yup.string().min(10).required(),
    address: yup.string().required(),
  });
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      fullName: auth.user.fullName,
      email: auth.user.email,
      phone: auth.user.phone,
      address: auth.user.address || '',
    },
    resolver: yupResolver(user),
  });

  const orderHandler = (data) => {
    // User can't change Email
    const user = {
      fullName: data.fullName,
      email: auth.user.email,
      phone: data.phone,
    };
    const order = {
      user,
      cart: items,
      address: data.address,
      total,
    };
    const requestConfig = {
      url: '/order/add',
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: order,
    };
    const applyData = (data) => {
      auth.user.fullName = user.fullName;
      auth.user.phone = user.phone;
      dispatch(cartActions.clear());
      data.message === 'Success' && setErr('Success');
    };
    !isLoading && sendRequest(requestConfig, applyData);
  };

  useEffect(() => {
    error && setErr(error);
  }, [error]);
  const closeHandler = () =>
    err === 'Success' ? navigate('/history', { replace: true }) : setErr();
  return (
    <>
      <form onSubmit={handleSubmit(orderHandler)} className={classes.form}>
        <label className="gray-color">
          FULL NAME: <span className="error"> *</span>
        </label>
        <input
          type="text"
          {...register('fullName')}
          placeholder="Enter Your Full Name Here!"
        />
        {errors.fullName && (
          <p className="error">
            {errors.fullName?.message.replace('fullName', 'FULL NAME')}
          </p>
        )}
        <label className="gray-color">EMAIL:</label>
        <input type="email" {...register('email')} disabled />
        <label className="gray-color">
          PHONE NUMBER: <span className="error"> *</span>
        </label>
        <input
          type="number"
          {...register('phone')}
          placeholder="Enter Your Phone Number Here!"
        />
        {errors.phone && (
          <p className="error">
            {errors.phone.message.replace('phone', 'PHONE NUMBER')}
          </p>
        )}
        <label className="gray-color">
          ADDRESS: <span className="error"> *</span>
        </label>
        <input
          type="text"
          {...register('address')}
          placeholder="Enter Your Address Here!"
        />
        {errors.address && (
          <p className="error">
            {errors.address.message.replace('address', 'ADDRESS')}
          </p>
        )}
        <Button disabled={isLoading} type="submit" variant="dark">
          {isLoading ? 'Loading ...' : ' Place Order'}
        </Button>
      </form>
      <Modal
        show={err}
        onHide={closeHandler}
        backdrop="static"
        keyboard={false}
      >
        <Modal.Header closeButton>
          <Modal.Title>WARNING</Modal.Title>
        </Modal.Header>
        <Modal.Body>{err}</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={closeHandler}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default CheckoutForm;
