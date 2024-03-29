import React, { useState, useEffect } from 'react';
import { Row, Col, Card, Button, Form ,Alert } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import Product from '../components/Product';
import { listProducts } from '../actions/productActions';
import Loader from '../components/Loader';
import Message from '../components/Message';
import { Link } from 'react-router-dom';
import './ProductScreen.css'; 
import { addToCart } from '../actions/cartAction';



const ProductScreen = () => { 
  const dispatch = useDispatch();
  const productList = useSelector((state) => state.productList);
  const { cartItems } = useSelector(state => state.cart);

  const { loading, error, products } = productList;
  const [showAlert, setShowAlert] = useState(false);
  
  useEffect(() => {
    dispatch(listProducts());   
  }, [dispatch]);

  const addToCartHandler = (productId) => {
    // 假设默认添加1个数量到购物车，如果需要选择数量可以扩展这个逻辑
    const product = products.find(p => p._id === productId);
    const currentItem = cartItems.find(item => item.product === productId);
     const qty = currentItem ? currentItem.qty : 0;

    if (qty === product.stock) {
      // 如果尝试添加的数量超过库存，显示提示并终止
      setShowAlert(true);
      setTimeout(() => setShowAlert(false), 3000);
    } else {
      // 否则正常添加商品到购物车
    dispatch(addToCart(productId, 1, true));
    }
  };

  

  return (
    <div className="product-screen">
      {showAlert && (
        <Alert variant="danger" onClose={() => setShowAlert(false)} dismissible>
          不能添加超过库存的数量！
        </Alert>
      )}
      
      {loading ? (
        <Loader />
      ) : error ? (
        <Message variant='danger'>{error}</Message>
      ) : ( 

       

      <Row>
        {products.map((product) => (
          <Col key={product._id} sm={12} md={6} lg={4} xl={3}>
            <Card className='my-3 p-3 rounded'>
              <div className="product-image-container">
                <Link to={`/product/${product._id}`}>
                  <Card.Img src={product.image} variant='top' />
                </Link>
                <div className="product-price">
                  ${product.price}  
                </div>
                <img  
                  src="addicon.png" 
                  className="add-to-cart-icon"
                  onClick={() => addToCartHandler(product._id)}
                  alt="Add to cart"
                />
              </div>
              <Card.Body>
                 
                  <Card.Title as='div'>
                    <strong>{product.name}</strong>
                  </Card.Title>
                 
                
              </Card.Body>
            </Card>
          </Col>
        ))} 
      </Row>
       )}
    </div>
  );
};

export default ProductScreen;
