import React from "react";
import {
  Form,
  Button,
  Col,
  Row,
  Accordion,
  Card,
  Nav,
  Navbar,
  FormControl,
} from "react-bootstrap";
const NavBar = (props) => {
  return (
    <>
      <Navbar bg="dark" variant="dark">
        <Navbar.Brand>{props.name}</Navbar.Brand>
        <Nav className="mr-auto"></Nav>
      </Navbar>
    </>
  );
};

export default NavBar;
