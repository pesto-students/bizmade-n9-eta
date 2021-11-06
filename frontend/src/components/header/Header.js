import React from "react";
import "./Header.css";
import { useDispatch, useSelector } from "react-redux";
import { Route } from "react-router-dom";
import { LinkContainer } from "react-router-bootstrap";
import { Navbar, Nav, Container, NavDropdown } from "react-bootstrap";
import Search from "../Search";
import { logout } from "../../actions/userActions";

function Header() {
  const dispatch = useDispatch();

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const logoutHandler = () => {
    dispatch(logout());
  };

  return (
    <header>
      <Navbar bg="white" expand="lg" collapseOnSelect>
        <Container>
          <LinkContainer to="/">
            <Navbar.Brand>
              <h1>BizMade</h1>
            </Navbar.Brand>
          </LinkContainer>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Search />
            <Nav className="nav-links">
              {userInfo ? (
                <div className="d-flex">
                  {!userInfo.isManufacturer ? (
                    <>
                      <LinkContainer to="/wishlist">
                        <Nav.Link>
                          <i className="far fa-heart"></i> Wishlist
                        </Nav.Link>
                      </LinkContainer>
                      <LinkContainer to="/cart">
                        <Nav.Link>
                          <i className="fas fa-shopping-cart"></i> Cart
                        </Nav.Link>
                      </LinkContainer>
                    </>
                  ) : (
                    <></>
                  )}

                  <NavDropdown
                    title={
                      <span>
                        {/* <i className="far fa-user">{userInfo.name}</i> */}
                        <h6 className="d-inline-block">{userInfo.name}</h6>
                      </span>
                    }
                    id="adminmenu"
                  >
                    <LinkContainer to="/profile">
                      <NavDropdown.Item>Profile</NavDropdown.Item>
                    </LinkContainer>
                    <LinkContainer to={`/${userInfo.isManufacturer ? "manufacturer" : "dealer"}/orders/${userInfo._id}`}>
                      <NavDropdown.Item>Orders</NavDropdown.Item>
                    </LinkContainer>
                    <NavDropdown.Item onClick={logoutHandler}>
                      Logout
                    </NavDropdown.Item>
                  </NavDropdown>
                </div>
              ) : (
                <LinkContainer to="/login">
                  <Nav.Link className="auth-btn">
                    <button>Log In / Sign Up</button>
                  </Nav.Link>
                </LinkContainer>
              )}
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </header>
  );
}

export default Header;
