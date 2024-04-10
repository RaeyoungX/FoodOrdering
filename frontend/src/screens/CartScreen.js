import React from 'react';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { Row, Col, ListGroup, Image, Form, Button,Card } from 'react-bootstrap';
import Message from '../components/Message';
import { addToCart ,removeFromCart } from '../actions/cartAction';
import { useNavigate } from 'react-router-dom';  

 

const CartScreen = () => {
  const dispatch = useDispatch();
  const cartItems = useSelector(state => state.cart.cartItems);
  const navigate = useNavigate(); 
  const userLogin = useSelector(state => state.userLogin);
  const { userInfo } = userLogin;




  useEffect(() => {
    console.log(cartItems); // 这里应该打印整个购物车项的数组
    cartItems.forEach(item => {
      console.log(item); // 这里会为购物车中的每一个项目打印详细信息
    });
  }, [cartItems]);
  
  // 修改数量的处理器
  const qtyChangeHandler = (id, qty) => {
    dispatch(addToCart(id, Number(qty),false));
  };

  // 移除商品的处理器
  const removeFromCartHandler = (id) => {
    dispatch(removeFromCart(id));
    
  };
  const itemsPrice = cartItems.reduce((acc, item) => acc + item.qty * item.price, 0);
  const shippingPrice = itemsPrice > 100 ? 0 : 10; // 示例运费逻辑
  const totalPrice = itemsPrice + shippingPrice  ;

  // 然后在checkoutHandler函数中
  const checkoutHandler = () => {
    if (userInfo) {
      navigate('/shipping');
    } else {
      navigate('/login?redirect=/shipping');
    }
  }


  // 这里是 UI 
  return (
    <Row>
      <Col md={8}>
        <h1>购物车</h1>
        {cartItems.length === 0 ? (
          <Message>你的购物车是空的 <Link to='/product'>返回</Link></Message>
        ) : (
          <ListGroup variant='flush'>
            {cartItems.map((item) => (
              <ListGroup.Item key={item.product}>
                
                <Row>
                  <Col md={2}>
                    <Image src={item.image} alt={item.name} fluid rounded />
                  </Col>
                  <Col md={3}>
                    {item.name}
                  </Col>
                  <Col md={2}>${item.price}</Col>
                  <Col md={2}>
                    <Form.Control
                      as="select"
                      value={item.qty}
                      onChange={(e) => qtyChangeHandler(item.product, e.target.value)}
                    >
                      {[...Array(item.stock).keys()].map((x) => (
                        <option key={x + 1} value={x + 1}>
                          {x + 1}
                        </option>
                      ))}
                    </Form.Control>
                  </Col>
                  <Col md={2}>
                    <Button
                      type='button'
                      variant='light'
                      onClick={() => removeFromCartHandler(item.product)}
                    >
                      <i className='fas fa-trash'></i>
                    </Button>
                  </Col>
                </Row>
              </ListGroup.Item>
            ))}
          </ListGroup>
        )}
      </Col>
      <Col md={4}>
        <ListGroup variant='flush'>
          <ListGroup.Item>
            <h2>订单总计</h2>
          </ListGroup.Item>
          <ListGroup.Item>
            <Row>
              <Col>商品</Col>
              <Col>${itemsPrice.toFixed(2)}</Col>
            </Row>
          </ListGroup.Item>
          <ListGroup.Item>
            <Row>
              <Col>运费</Col>
              <Col>${shippingPrice.toFixed(2)}</Col>
            </Row>
          </ListGroup.Item>
           
          <ListGroup.Item>
            <Row>
              <Col>总计</Col>
              <Col>${totalPrice.toFixed(2)}</Col>
            </Row>
          </ListGroup.Item>
          <ListGroup.Item>
            <Button
              type='button'
              className='btn-block'
              disabled={cartItems.length === 0}
              onClick={checkoutHandler}
            >
              去结账
            </Button>
          </ListGroup.Item>
        </ListGroup>
      </Col>
    </Row>
  );
};

export default CartScreen;
