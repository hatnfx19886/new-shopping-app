import { useEffect, useRef, useState } from 'react';
import { CSSTransition } from 'react-transition-group';
import AddToCart from './AddToCart';
import classes from './DetailInformation.module.css';

const DetailInformation = (props) => {
  const [img, setImg] = useState();
  const [transition, setTransition] = useState();
  const nodeRef = useRef(null);
  const changeImgHandler = (e) => {
    setTransition(false);
    setImg(e.target.src);
  };
  useEffect(() => {
    setTransition(false);
    return setTransition(true);
  }, [img]);
  return (
    <div className={classes.information}>
      <div className={classes['img-list']}>
        <img
          src={props.item.img1}
          alt={props.item.name}
          onClick={changeImgHandler}
        />
        <img
          src={props.item.img2}
          alt={props.item.name}
          onClick={changeImgHandler}
        />
        <img
          src={props.item.img3}
          alt={props.item.name}
          onClick={changeImgHandler}
        />
        <img
          src={props.item.img4}
          alt={props.item.name}
          onClick={changeImgHandler}
        />
      </div>
      <CSSTransition
        in={transition}
        timeout={500}
        classNames="scale"
        nodeRef={nodeRef}
      >
        <img
          src={img || props.item.img1}
          alt={props.item.name}
          ref={nodeRef}
          className={classes.img}
        />
      </CSSTransition>
      <div>
        <h2>{props.item.name}</h2>
        <p className="gray-color larger">
          {Number(props.item.price).toLocaleString() + ' VND'}
        </p>
        <p className="gray-color">{props.item.short_desc}</p>
        <span>CATEGORY: </span>
        <span className="gray-color">{props.item.category + 's'}</span>
        {props.item.count > 0 ? (
          <>
            <p>
              Count:
              <span className={classes.qty}>{props.item.count}</span>
            </p>
            <AddToCart item={props.item} id={props.id} />
          </>
        ) : (
          <img
            src="https://webdoctor.vn/wp-content/uploads/2017/08/sold-out-png-8.jpg"
            alt="Sold Old"
            width="80%"
          />
        )}
      </div>
    </div>
  );
};

export default DetailInformation;
