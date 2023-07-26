import { useEffect, useState } from 'react';
import { Table, Spinner } from 'react-bootstrap';
import useHttp from '../../hooks/useHttp';
import classes from './History.module.css';

const History = () => {
  const [list, setList] = useState([]);
  const { isLoading, error, sendRequest } = useHttp();
  useEffect(() => {
    const requestConfig = {
      url: '/',
    };
    const applyData = (data) => setList(data);
    sendRequest(requestConfig, applyData);
  }, []);
  return (
    <>
      {isLoading && <Spinner variant="dark" />}
      {!isLoading && error && <h5 className="centered">{error}</h5>}
      {!isLoading && !error && (
        <div className={classes.container}>
          <h3>History</h3>
          <Table striped bordered>
            <thead>
              <tr>
                <th>ID User</th>
                <th>Name</th>
                <th>Phone</th>
                <th>Address</th>
                <th>Total</th>
                <th>Delivery</th>
                <th>Status</th>
                <th>Detail</th>
              </tr>
            </thead>
            <tbody>
              {list.map((x) => (
                <tr key={x._id}>
                  <td>{x.user._id}</td>
                  <td>{x.user.fullName}</td>
                  <td>{x.user.phone}</td>
                  <td>{x.address}</td>
                  <td>{x.total.toLocaleString()}</td>
                  <td>{x.delivery}</td>
                  <td>{x.status}</td>
                  <td className={classes.view}>View</td>
                </tr>
              ))}
            </tbody>
          </Table>
        </div>
      )}
    </>
  );
};

export default History;
