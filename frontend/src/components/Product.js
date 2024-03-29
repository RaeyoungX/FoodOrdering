// Product.js
import React from 'react';
import { Card } from 'react-bootstrap';
import './Product.css';

const Product = ({ product, children }) => {
  return (
    <Card className="my-3 py-3 no-border">
      <Card.Img src={product.image} variant='top' />
      <Card.Body>
        <Card.Title>{product.name}</Card.Title>
        <Card.Text as='h3' style={{ fontSize: '15px' }}>¥ {product.price}</Card.Text>
         
      </Card.Body>
    </Card>
  )
}

export default Product;
