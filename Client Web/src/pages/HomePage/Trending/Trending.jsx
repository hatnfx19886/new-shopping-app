import { useEffect, useRef, useState } from 'react';
import { Spinner } from 'react-bootstrap';
import { CSSTransition } from 'react-transition-group';
import Overlay from '../../../UI/Overlay';
import DetailModal from './DetailModal';
import useHttp from '../../../hooks/useHttp';
import classes from './Trending.module.css';
import '../../../UI/transition.css';

const Trending = () => {
  const [trendingList, setTrendingList] = useState([]);
  const { isLoading, error, sendRequest } = useHttp();
  const [detail, setDetail] = useState({});
  const [showDetail, setShowDetail] = useState(false);
  const [transition, setTransition] = useState();
  const nodeRef = useRef(null);
  // Get data from API
  useEffect(() => {
    const requestConfig = {
      url: '/',
    };
    const applyData = (data) => setTrendingList(data);
    sendRequest(requestConfig, applyData);
  }, []);
  const showDetailHandler = (e) => {
    setShowDetail(true);
    setDetail(trendingList.find((x) => x._id === e.target.id));
    // User can't scroll when detail show
    document.querySelector('body').classList.add('overflow-hidden');
    setTimeout(() => {
      setTransition(true);
    }, 1);
  };
  const closeDetailHandler = () => {
    setTransition(false);
    document.querySelector('body').classList.remove('overflow-hidden');
    setTimeout(() => {
      setShowDetail(false);
    }, 300);
  };
  return (
    <section className={classes.trending}>
      <p className="gray-color">MADE THE HARD WAY</p>
      <h5>TOP TRENDING PRODUCTS</h5>
      {isLoading && <Spinner animation="border" variant="dark" />}
      {!isLoading && error && <h5 className="centered">{error}</h5>}
      {!isLoading && !error && (
        <div className="flex-centered wrap">
          {trendingList.map((x) => (
            <div className={classes['trending-list']} key={x._id}>
              <img
                src={x.img1}
                alt={x.name}
                onClick={showDetailHandler}
                id={x._id}
              />
              <p className="centered">{x.name}</p>
              <p className="gray-color centered">
                {x.price.toLocaleString() + ' VND'}
              </p>
            </div>
          ))}
        </div>
      )}
      {showDetail && (
        <CSSTransition
          in={transition}
          timeout={300}
          classNames="float-down-up"
          nodeRef={nodeRef}
        >
          <DetailModal
            item={detail}
            action={closeDetailHandler}
            nodeRef={nodeRef}
          />
        </CSSTransition>
      )}
      {showDetail && <Overlay />}
    </section>
  );
};

export default Trending;
