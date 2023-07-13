import { useEffect, useState } from 'react';
import { Spinner } from 'react-bootstrap';
import { ChevronDoubleLeft, ChevronDoubleRight } from 'react-bootstrap-icons';
import useHttp from '../../hooks/useHttp';
import CategoryList from './CategoryList/CategoryList';
import ProductList from './ProductList/ProductList';

import classes from './ShopPage.module.css';

const ShopPage = () => {
  const [list, setList] = useState([]);
  const [filteredList, setFilteredList] = useState([]);
  const [filtering, setFiltering] = useState(false);
  const { isLoading, error, sendRequest } = useHttp();
  useEffect(() => {
    const requestConfig = {
      url: '/product',
    };
    const applyData = (data) => setList(data);
    sendRequest(requestConfig, applyData);
  }, [sendRequest]);
  const changeListHandler = (e) => {
    // All products
    if (e === 'All') {
      setFiltering(false);
    }
    // Product filtered by category
    else {
      setFiltering(true);
      setFilteredList(list.filter((x) => x.category === e.toLowerCase()));
    }
  };
  return (
    <>
      <div className="flex-centered header">
        <h1>SHOP</h1>
        <p className="gray-color">SHOP</p>
      </div>
      <div className={classes.container}>
        <CategoryList changeListHandler={changeListHandler} />
        <div>
          <div className={`flex-centered ${classes['shoplist-header']}`}>
            <input type="text" placeholder="Enter Search Here!" />
            <select>
              <option>Default sorting</option>
            </select>
          </div>
          {isLoading && <Spinner variant="dark" />}
          {!isLoading && error && <h2>error</h2>}
          <ProductList list={filtering ? filteredList : list} />
          {filtering && filteredList.length === 0 && <h2>No product</h2>}
          <div className={classes['shoplist-footer']}>
            <ChevronDoubleLeft icon="fa-solid fa-angles-left" />
            <span>1</span>
            <ChevronDoubleRight icon="fa-solid fa-angles-right" />
            <p className="gray-color">Showing 1 of 1 results</p>
          </div>
        </div>
      </div>
    </>
  );
};

export default ShopPage;
