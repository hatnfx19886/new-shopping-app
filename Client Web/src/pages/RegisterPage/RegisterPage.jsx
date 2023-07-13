import { useEffect } from 'react';
import { useState } from 'react';
import { Button, Modal } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import useHttp from '../../hooks/useHttp';
import classes from '../LoginPage/LoginPage.module.css';

const RegisterPage = () => {
  const [err, setErr] = useState();
  const user = yup.object({
    fullName: yup.string().trim().required(),
    email: yup.string().email().required(),
    password: yup.string().min(9).required(),
    phone: yup.string().min(10).required(),
  });
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ resolver: yupResolver(user) });
  const { isLoading, error, sendRequest } = useHttp();

  const navigate = useNavigate();

  const registerHandler = (data) => {
    const requestConfig = {
      url: '/user/signup',
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: data,
    };
    const applyData = () => navigate('/login', { replace: true });
    !isLoading && sendRequest(requestConfig, applyData);
  };

  const closeHandler = () => setErr();

  useEffect(() => {
    error && setErr(error);
  }, [error]);
  return (
    <div className={classes.banner}>
      <div className={classes.container}>
        <h1>Sign Up</h1>
        <form onSubmit={handleSubmit(registerHandler)} className={classes.form}>
          <div>
            <label>
              Full Name <span className="error"> *</span>
            </label>
            <input type="text" {...register('fullName')} />
            {errors.fullName && (
              <p className="error">
                {errors.fullName?.message.replace('fullName', 'Full Name')}
              </p>
            )}
          </div>
          <div>
            <label>
              Email <span className="error"> *</span>
            </label>
            <input type="email" {...register('email')} />
            {errors.email && (
              <p className="error">
                {errors.email.message.replace('email', 'Email')}
              </p>
            )}
          </div>
          <div>
            <label>
              Password <span className="error"> *</span>
            </label>
            <input type="password" {...register('password')} />
            {errors.password && (
              <p className="error">
                {errors.password.message.replace('password', 'Password')}
              </p>
            )}
          </div>
          <div>
            <label>
              Phone <span className="error"> *</span>
            </label>
            <input type="number" {...register('phone')} />
            {errors.phone && (
              <p className="error">
                {errors.phone.message.replace('phone', 'Phone')}
              </p>
            )}
          </div>
          <Button
            disabled={isLoading}
            variant="secondary"
            size="lg"
            type="submit"
          >
            {isLoading ? 'Loading ...' : 'SIGN UP'}
          </Button>
        </form>
        <p className="gray-color">
          Login ?<Link to="/login"> Click</Link>
        </p>
      </div>
      <Modal
        show={err}
        onHide={closeHandler}
        backdrop="static"
        keyboard={false}
      >
        <Modal.Header closeButton>
          <Modal.Title>WARNING</Modal.Title>
        </Modal.Header>
        <Modal.Body> {err} </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={closeHandler}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default RegisterPage;
