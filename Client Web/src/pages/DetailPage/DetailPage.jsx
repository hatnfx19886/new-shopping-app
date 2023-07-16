import { useEffect, useState } from 'react';
import { Spinner } from 'react-bootstrap';
import { useParams } from 'react-router-dom';
import useHttp from '../../hooks/useHttp';
import ProductList from '../ShopPage/ProductList/ProductList';
import DetailDescription from './DetailDescription/DetailDescription';
import DetailInformation from './DetailInformation/DetailInformation';
import classes from './DetailPage.module.css';

const DetailPage = () => {
  const { isLoading, error, sendRequest } = useHttp();
  // Get id from url
  const { id } = useParams();
  const [item, setItem] = useState({});
  const [relatedList, setRelatedList] = useState([]);
  useEffect(() => {
    const requestConfig = {
      url: `/product/find/${id}`,
    };
    const applyData = (data) => {
      setItem(data.product);
      setRelatedList(data.relatedList);
    };
    sendRequest(requestConfig, applyData);
  }, [id]);
  return (
    <>
      {isLoading && <Spinner variant="dark" />}
      {!isLoading && error && item && <h2 className="centered">{error}</h2>}
      {!isLoading && !error && item && (
        <div className={classes.detail}>
          <DetailInformation item={item} id={id} />
          <DetailDescription item={item} />
          <div className={classes.related}>
            <h4>RELATED PRODUCTS</h4>
            {relatedList.length === 0 ? (
              <p>No Related Product</p>
            ) : (
              <ProductList list={relatedList} />
            )}
          </div>
        </div>
      )}
      {/* when user input a wrong id on url */}
      {!item && <h2 className="centered">No product found</h2>}
    </>
  );
};

export default DetailPage;
