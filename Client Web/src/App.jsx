import React, { Suspense } from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';
import Layout from './Layout/Layout';
import { Spinner } from 'react-bootstrap';
import ScrollToTop from './UI/ScrollToTop';
import { useContext } from 'react';
import AuthContext from './store/AuthContext';

const CartPage = React.lazy(() => import('./pages/CartPage/CartPage'));
const CheckoutPage = React.lazy(() =>
  import('./pages/CheckoutPage/CheckoutPage')
);
const DetailPage = React.lazy(() => import('./pages/DetailPage/DetailPage'));
const HistoryPage = React.lazy(() => import('./pages/HistoryPage/HistoryPage'));
const HomePage = React.lazy(() => import('./pages/HomePage/HomePage'));
const LoginPage = React.lazy(() => import('./pages/LoginPage/LoginPage'));
const OrderDetail = React.lazy(() => import('./pages/HistoryPage/OrderDetail'));
const RegisterPage = React.lazy(() =>
  import('./pages/RegisterPage/RegisterPage')
);
const ShopPage = React.lazy(() => import('./pages/ShopPage/ShopPage'));

const App = () => {
  const auth = useContext(AuthContext);
  return (
    <Layout>
      <Suspense fallback={<Spinner variant="dark" />}>
        <ScrollToTop />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/shop" element={<ShopPage />} />
          <Route path="/detail/:id" element={<DetailPage />} />
          <Route
            path="/cart"
            element={auth.isLogedIn ? <CartPage /> : <Navigate to="/login" />}
          />
          <Route
            path="/checkout"
            element={
              auth.isLogedIn ? <CheckoutPage /> : <Navigate to="/login" />
            }
          />
          <Route
            path="/login"
            element={
              auth.isLogedIn ? <Navigate to="/" replace /> : <LoginPage />
            }
          />
          <Route path="/register" element={<RegisterPage />} />
          <Route
            path="/history"
            element={
              auth.isLogedIn ? (
                <HistoryPage />
              ) : (
                <Navigate to="/login" replace />
              )
            }
          />
          <Route
            path="/history/detail/:id"
            element={
              auth.isLogedIn ? (
                <OrderDetail />
              ) : (
                <Navigate to="/login" replace />
              )
            }
          />
          <Route path="*" element={<h1>404 Page Not Found</h1>} />
        </Routes>
      </Suspense>
    </Layout>
  );
};

export default App;
