import ReactDOM from 'react-dom';
import { Button, Col, Row } from 'react-bootstrap';
import classes from './DetailModal.module.css';
import { Link } from 'react-router-dom';
import { Cart3 } from 'react-bootstrap-icons';

const Popup = (props) => {
  return (
    <div className={classes.detail_modal} ref={props.nodeRef}>
      <Row>
        <Col>
          <img src={props.item.img1} alt={props.item.name} />
        </Col>
        <Col>
          <p className={classes.close} onClick={props.action}>
            x
          </p>
          <h5>{props.item.name}</h5>
          <p className="gray-color">
            {Number(props.item.price).toLocaleString() + ' VND'}
          </p>
          <p className="gray-color smaller">{props.item.short_desc}</p>
          <Link to={`/detail/${props.item._id}`}>
            <Button variant="dark" onClick={props.action}>
              <Cart3 />
              <span>View Detail</span>
            </Button>
          </Link>
        </Col>
      </Row>
    </div>
  );
};

const DetailModal = (props) => {
  return ReactDOM.createPortal(
    <Popup item={props.item} action={props.action} nodeRef={props.nodeRef} />,
    document.getElementById('popup')
  );
};

export default DetailModal;
