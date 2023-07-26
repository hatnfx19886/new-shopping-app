import React, { useContext } from 'react';
import { Routes, Route } from 'react-router-dom';
import Sidebar from './Sidebar/Sidebar';
import AuthContext from './store/AuthContext';
import ScrollToTop from './UI/ScrollToTop';
import { Suspense } from 'react';
import { Button, Spinner } from 'react-bootstrap';

const Login = React.lazy(() => import('./pages/login/Login'));
const Dashboard = React.lazy(() => import('./pages/dashboard/Dashboard'));
const Product = React.lazy(() => import('./pages/product/Product'));
const NewProduct = React.lazy(() => import('./pages/product/NewProduct'));

const App = () => {
  const auth = useContext(AuthContext);
  if (!auth.isLogedIn) {
    return <Login />;
  } else if (auth.role === 'admin') {
    return (
      <Sidebar>
        <Suspense fallback={<Spinner variant="dark" />}>
          <ScrollToTop />
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/products" element={<Product />} />
            <Route path="/add-product" element={<NewProduct />} />
            <Route path="*" element={<h1>404 Page Not Found</h1>} />
          </Routes>
        </Suspense>
      </Sidebar>
    );
  } else
    return (
      <div className="centered">
        <h3>App LiveChat will coming soon</h3>
        <Button onClick={() => auth.logout()}>Logout</Button>
      </div>
    );
};

export default App;
