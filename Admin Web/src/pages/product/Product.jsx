import { useState, useEffect } from 'react';
import { Spinner, Table } from 'react-bootstrap';
import useHttp from '../../hooks/useHttp';
import Action from './Action';

const Product = () => {
  const [list, setList] = useState([]);
  const [products, setProducts] = useState([]);
  const { isLoading, error, sendRequest } = useHttp();
  const deleteHandler = (id) => {
    setList((prev) => prev.filter((x) => x._id !== id));
    setProducts((prev) => prev.filter((x) => x._id !== id));
  };
  useEffect(() => {
    const requestConfig = {
      url: '/product',
    };
    const applyData = (data) => {
      setList(data);
      setProducts(data);
    };
    sendRequest(requestConfig, applyData);
  }, []);
  return (
    <>
      <h2>Products</h2>
      {isLoading && <Spinner variant="dark" />}
      {!isLoading && error && <h5 className="centered">{error}</h5>}
      {!isLoading && !error && (
        <>
          <input
            style={{ padding: '0.5rem', width: '20%' }}
            type="text"
            placeholder="Enter Search!"
            onChange={(e) =>
              setProducts(
                list.filter((x) =>
                  x.name.toLowerCase().includes(e.target.value.toLowerCase())
                )
              )
            }
          />
          <Table striped>
            <thead>
              <tr>
                <th>ID</th>
                <th>Name</th>
                <th>Price</th>
                <th>Image</th>
                <th>Category</th>
                <th>Count</th>
                <th>Edit</th>
              </tr>
            </thead>
            <tbody>
              {products.map((x) => (
                <tr key={x._id}>
                  <td>{x._id}</td>
                  <td>{x.name}</td>
                  <td>{x.price.toLocaleString()}</td>
                  <td>
                    <img src={x.img1} alt="" width="120px" />
                  </td>
                  <td>{x.category}</td>
                  <td>{x.count}</td>
                  <td>
                    <Action
                      id={x._id}
                      name={x.name}
                      deleteHandler={deleteHandler}
                    />
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        </>
      )}
    </>
  );
};

export default Product;
