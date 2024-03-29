import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import {  NavDropdown } from 'react-bootstrap'
import {LinkContainer} from 'react-router-bootstrap'
import { logout } from '../actions/userActions'

import '../index.css';

const Header = () => {
  const dispatch = useDispatch()
  const userLogin = useSelector((state) => state.userLogin)
  const { userInfo } = userLogin
    //退出函数
   const logoutHandler = () => {
      dispatch(logout())
    }
  return (
    <header className='header pt-0'>
      <Navbar bg="lg" variant="light" expand="lg" collapseOnSelect style={{ backgroundColor: '#fdfcfc' }}>
        <Container>
          <LinkContainer to = '/'>
            <Navbar.Brand>
              <img
                src="/header.png"  
                alt="小酒馆"
                width="140"
                height="auto"
              /> 
            </Navbar.Brand>
          </LinkContainer>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
          <Nav style={{ marginLeft: 'auto' }}>
            <LinkContainer to='/product'>
              <Nav.Link>  
              <img
                src="/menu.png"  
                alt="menu"
                width="40"
                height="auto"
              /> 
              </Nav.Link>
            </LinkContainer>
            <LinkContainer to='/cart'>
              <Nav.Link>
              <img
                src="/cart.png"  
                alt="cart"
                width="60"
                height="auto"
              /> 
              </Nav.Link>
            </LinkContainer>
            {userInfo ? (
                <NavDropdown title={userInfo.name} id='username'>
                  <LinkContainer to='/profile'>
                    <NavDropdown.Item>个人详情</NavDropdown.Item>
                  </LinkContainer>
                  <NavDropdown.Item onClick={logoutHandler}>
                    退出
                  </NavDropdown.Item>
                </NavDropdown>
              ) : (
            <LinkContainer to='/login'>
              <Nav.Link>
              <img
                src="/login.png"  
                alt="login"
                width="40"
                height="auto"
              /> 
              </Nav.Link>
            </LinkContainer>)}
          </Nav>
        </Navbar.Collapse>

        </Container>
      </Navbar>
    </header>
  );
};

export default Header;
