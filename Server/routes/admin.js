const express = require('express');
const { dashboard } = require('../controllers/admin/history');
const {
  getAllProduct,
  getOneProduct,
  deleteProduct,
  addProduct,
  updateProduct,
} = require('../controllers/admin/product');
const { login, check } = require('../controllers/admin/user');
const { isAdmin, isLogin } = require('../middleware/auth');

const router = express.Router();

router.post('/user/login', login);
router.get('/user/check', check);

router.get('/', isLogin, isAdmin, dashboard);
router.get('/product', isLogin, isAdmin, getAllProduct);
router.get('/product/find/:id', isLogin, isAdmin, getOneProduct);
router.get('/product/delete/:id', isLogin, isAdmin, deleteProduct);
router.post('/product/add', isLogin, isAdmin, addProduct);
router.post('/product/update/:id', isLogin, isAdmin, updateProduct);

module.exports = router;
