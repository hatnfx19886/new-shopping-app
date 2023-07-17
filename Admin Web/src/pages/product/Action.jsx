import { useState } from 'react';
import { Button, Modal } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import useHttp from '../../hooks/useHttp';

const Action = (props) => {
  const [show, setShow] = useState(false);
  const { isLoading, error, sendRequest } = useHttp();
  const navigate = useNavigate();
  const deleteHandler = () => {
    const requestConfig = {
      url: `/product/delete/${props.id}`,
    };
    const applyData = () => {
      setShow(false);
      props.deleteHandler(props.id);
    };
    sendRequest(requestConfig, applyData);
  };
  return (
    <>
      <Button
        variant="success"
        onClick={() => navigate('/products/add', { state: { id: props.id } })}
      >
        Update
      </Button>
      <Button variant="danger" onClick={() => setShow(true)}>
        Delete
      </Button>
      <Modal
        show={show}
        onHide={() => setShow(false)}
        backdrop="static"
        keyboard={false}
      >
        <Modal.Header closeButton>
          <Modal.Title>Delete Product</Modal.Title>
        </Modal.Header>
        <Modal.Body className="centered">
          <p>{props.name} will be deleted.</p>
          <b> Are you sure ?</b>
          {!isLoading && error && <p>{error}</p>}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShow(false)}>
            Cancel
          </Button>
          <Button variant="primary" onClick={deleteHandler}>
            Delete
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default Action;
