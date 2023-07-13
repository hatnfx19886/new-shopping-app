import { useContext, useEffect, useState } from 'react';
import { Button, Modal } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import useHttp from '../../hooks/useHttp';
import AuthContext from '../../store/AuthContext';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import classes from './LoginPage.module.css';

const LoginPage = () => {
  const user = yup.object({
    email: yup.string().email().required(),
    password: yup.string().min(9).required(),
  });
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm({
    resolver: yupResolver(user),
  });
  const { isLoading, error, sendRequest } = useHttp();
  const auth = useContext(AuthContext);
  const [err, setErr] = useState();
  const navigate = useNavigate();

  const loginHandler = (data) => {
    const requestConfig = {
      url: '/user/signin',
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: data,
    };
    const applyData = (user) => {
      auth.login(user);
      navigate(-1, { replace: true });
    };
    !isLoading && sendRequest(requestConfig, applyData);
  };

  const closeHandler = () => {
    setErr();
    setValue('password', '');
  };
  useEffect(() => {
    error && setErr(error);
  }, [error]);
  return (
    <div className={classes.banner}>
      <div className={classes.container}>
        <h1>Sign In</h1>
        <form onSubmit={handleSubmit(loginHandler)} className={classes.form}>
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
          <Button
            disabled={isLoading}
            variant="secondary"
            size="lg"
            type="submit"
          >
            {isLoading ? 'Loading ...' : 'SIGN IN'}
          </Button>
        </form>
        <p className="gray-color">
          Creat an account?
          <Link to="/register"> Sign up</Link>
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
        <Modal.Body>{err}</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={closeHandler}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default LoginPage;
