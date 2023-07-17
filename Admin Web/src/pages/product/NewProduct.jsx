import { useLocation, useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import { Button, Modal } from 'react-bootstrap';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import useHttp from '../../hooks/useHttp';
import classes from './NewProduct.module.css';

const NewProduct = () => {
  const id = useLocation().state?.id;
  const navigate = useNavigate();
  const { isLoading, setIsLoading, error, setError, sendRequest } = useHttp();

  const validType = ['jpg', 'png', 'bmp', 'tip', 'webp', 'heic'];
  const isValidType = (fileList) =>
    Array.from(fileList).every((file) =>
      validType.includes(file.name.toLowerCase().split('.').pop())
    );
  const isValidQuantity = (fileList) => fileList && fileList.length === 4;
  const formValid = yup.object({
    name: yup.string().trim().required(),
    category: yup.string().trim().lowercase().required(),
    shortDesc: yup.string().required(),
    longDesc: yup.string().required(),
    price: yup.number().positive().integer().required(),
    count: yup.number().positive().integer().required(),
    images:
      !id &&
      yup
        .mixed()
        .required()
        .test('is-valid-type', 'Not valid image type', (value) =>
          isValidType(value)
        )
        .test('is-valid-quantity', 'Please choose 4 files', (value) =>
          isValidQuantity(value)
        ),
  });

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(formValid),
  });

  const addProduct = async (data) => {
    setIsLoading(true);
    const images = data.images;
    const imgs = [];
    const formData = new FormData();
    formData.set('key', process.env.REACT_APP_IMGBB_API_KEY);
    for (let i = 0; i < images.length; i++) {
      formData.set('image', images[i]);
      try {
        const res = await fetch(`https://api.imgbb.com/1/upload`, {
          method: 'POST',
          body: formData,
        });
        if (!res.ok) {
          throw new Error('Failed');
        }
        const body = await res.json();
        imgs.push(body.data.url);
      } catch {
        setIsLoading(false);
        return setError('Failed to upload images. Please try again!');
      }
    }
    const product = {
      name: data.name,
      category: data.category,
      img1: imgs[0],
      img2: imgs[1],
      img3: imgs[2],
      img4: imgs[3],
      long_desc: data.longDesc,
      short_desc: data.shortDesc,
      price: data.price,
      count: data.count,
    };
    const requestConfig = {
      url: '/product/add',
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: product,
    };
    const applyData = (res) => {
      res.message === 'Success' && setError('Success');
    };
    sendRequest(requestConfig, applyData);
  };
  const updateProduct = (data) => {
    const product = {
      name: data.name,
      category: data.category,
      long_desc: data.longDesc,
      short_desc: data.shortDesc,
      price: data.price,
      count: data.count,
    };
    const requestConfig = {
      url: `/product/update/${id}`,
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: product,
    };
    const applyData = (res) => {
      res.message === 'Success' && setError('Success');
    };
    sendRequest(requestConfig, applyData);
  };
  const closeHandler = () =>
    error === 'Success' ? navigate('/products') : setError();
  useEffect(() => {
    const requestConfig = {
      url: `/product/find/${id}`,
    };
    const applyData = (data) => {
      setValue('name', data.name);
      setValue('category', data.category);
      setValue('shortDesc', data.short_desc);
      setValue('longDesc', data.long_desc);
      setValue('price', data.price);
      setValue('count', data.count);
    };
    id && sendRequest(requestConfig, applyData);
  }, [id]);
  return (
    <>
      <h3>{id ? 'Update Product' : 'New Product'}</h3>
      <form
        className={classes.form}
        onSubmit={!isLoading && handleSubmit(id ? updateProduct : addProduct)}
      >
        <label>Product Name</label>
        <input type="text" {...register('name')} />
        {errors.name && (
          <p className="error">
            {errors.name.message.replace('name', 'Product Name')}
          </p>
        )}
        <label>Category</label>
        <input type="text" {...register('category')} />
        {errors.category && (
          <p className="error">
            {errors.category.message.replace('category', 'Category')}
          </p>
        )}
        <label>Short Description</label>
        <textarea rows={2} {...register('shortDesc')} />
        {errors.shortDesc && (
          <p className="error">
            {errors.shortDesc.message.replace('shortDesc', 'Short Description')}
          </p>
        )}
        <label>Long Description</label>
        <textarea rows={3} {...register('longDesc')} />
        {errors.longDesc && (
          <p className="error">
            {errors.longDesc.message.replace('longDesc', 'Long Description')}
          </p>
        )}
        <label>Price (VND)</label>
        <input type="number" {...register('price')} />
        {errors.price && (
          <p className="error">
            {errors.price.message.replace('price', 'Price')}
          </p>
        )}
        <label>Count</label>
        <input type="number" {...register('count')} />
        {errors.count && (
          <p className="error">
            {errors.count.message.replace('count', 'Count')}
          </p>
        )}
        {!id && (
          <>
            <label>Upload Images (4 images)</label>
            <input
              type="file"
              multiple
              accept=".jpg,.png,.bmp,.tip,.webp.heic"
              {...register('images')}
            />
            {errors.images && <p className="error">{errors.images.message}</p>}{' '}
          </>
        )}
        <Button disabled={isLoading} type="submit">
          {isLoading ? 'Loading ...' : id ? 'Update' : 'Add Product'}
        </Button>
      </form>
      <Modal
        show={error}
        onHide={closeHandler}
        backdrop="static"
        keyboard={false}
      >
        <Modal.Header closeButton>
          <Modal.Title>Warning!</Modal.Title>
        </Modal.Header>
        <Modal.Body className="centered">{error}</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={closeHandler}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default NewProduct;
