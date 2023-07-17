import { useContext, useEffect, useState } from 'react';
import { Button, Modal } from 'react-bootstrap';
import useHttp from '../../hooks/useHttp';
import AuthContext from '../../store/AuthContext';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import classes from './Login.module.css';

const Login = () => {
  const auth = useContext(AuthContext);
  const { isLoading, error, sendRequest } = useHttp();
  const [err, setErr] = useState();
  const form = yup.object({
    email: yup.string().email().required(),
    password: yup.string().min(6).required(),
  });
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ resolver: yupResolver(form) });

  const loginHandler = (data) => {
    const requestConfig = {
      url: '/user/login',
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: data,
    };
    const applyData = (user) => auth.login(user);
    sendRequest(requestConfig, applyData);
  };
  useEffect(() => {
    error && setErr(error);
  }, [error]);

  return (
    <div className={classes.form}>
      <h2>Login</h2>
      <form onSubmit={handleSubmit(loginHandler)}>
        <label>Email:</label>
        <input type="email" {...register('email')} />
        {errors.email && <p className="error">{errors.email.message}</p>}
        <label>Password:</label>
        <input type="password" {...register('password')} />
        {errors.password && <p className="error">{errors.password.message}</p>}
        <Button type="submit" disabled={isLoading}>
          {isLoading ? 'Loading ...' : 'Login'}
        </Button>
        <Modal
          show={err}
          onHide={() => setErr()}
          backdrop="static"
          keyboard={false}
        >
          <Modal.Header closeButton>
            <Modal.Title>Waring !</Modal.Title>
          </Modal.Header>
          <Modal.Body className="centered">{err}</Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={() => setErr()}>
              Close
            </Button>
          </Modal.Footer>
        </Modal>
      </form>
    </div>
  );
};

export default Login;
