import React from 'react'
import { Container, Row, Col } from 'react-bootstrap'
 
const Footer = () => {
  return (
    <footer style={{ backgroundColor: '#fdfcfa' }}>
       <Container>
        <Row>
            <Col className='text-center oy-3'>CopyRight &copy; 破店小酒馆</Col>
        </Row>
       </Container>
    </footer>
  )
}

export default Footer
