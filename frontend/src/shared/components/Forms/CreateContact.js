import React, { useState, useEffect } from "react";
import { Form, Button, Col, Row, Accordion, Card } from "react-bootstrap";
import "./CreateContact.css";
const CreateContact = () => {
  const [dataRecieved, setDataRecieved] = useState(false);
  const [data, setData] = useState({});
  useEffect(async () => {
    const data = await fetch("http://localhost:5000/api/users", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    const responseData = await data.json();
    if (responseData) {
      setDataRecieved(true);
      setData(responseData);
    }
    console.log(responseData);
  }, []);
  let DUMMY_CONTACTS = [
    {
      name: "tester",
      DOB: "28/05/2020",
      Phone: "9999999999",
      email: "testing@test.com",
      id: "c1",
      creator: "u1",
    },
    {
      name: "Devil",
      DOB: "02/12/1999",
      Phone: "123456789",
      email: "purnareddy@test.com",
      id: "c1",
      creator: "u2",
    },
  ];

  //   submitHanlder = () => {};
  const [contact, newContact] = useState({});

  return (
    <div className="main-content">
      <Form>
        <Form.Group controlId="formBasicEmail">
          <Form.Label>Name</Form.Label>
          <Form.Control type="text" placeholder="Enter Name" />
          <Form.Text className="text-muted">This Field is Important.</Form.Text>
        </Form.Group>

        <Form.Group controlId="formBasicPassword">
          <Form.Label>DOB</Form.Label>
          <Form.Control type="date" placeholder="dd/mm/yyyy" />
        </Form.Group>
        <Form.Group>
          <Form.Row>
            <Col>
              <Form.Label>Phone Number</Form.Label>
              <Form.Control placeholder="Enter Phone Number" />
            </Col>
            <Col>
              <Form.Label>Add Number</Form.Label>
              <br />
              <Button variant="outline-success">Add</Button>
            </Col>
          </Form.Row>
        </Form.Group>
        <Form.Group>
          <Form.Row>
            <Col>
              <Form.Label>Email</Form.Label>
              <Form.Control type="email" placeholder="Enter Email" />
            </Col>
            <Col>
              <Form.Label>Add Email</Form.Label>
              <br />
              <Button variant="outline-success">Add</Button>
            </Col>
          </Form.Row>
        </Form.Group>
        <Button
          variant="primary"
          type="submit"
          onSubmit={(e) => {
            e.preventDefault();
          }}
        >
          Submit
        </Button>
      </Form>
      <div className="display-content">
        <Accordion>
          {!dataRecieved &&
            DUMMY_CONTACTS.map((ele, index) => {
              return (
                <>
                  <Card>
                    <Card.Header>
                      <Accordion.Toggle
                        as={Button}
                        variant="link"
                        eventKey={index}
                      >
                        {ele.name}
                      </Accordion.Toggle>
                    </Card.Header>
                    <Accordion.Collapse eventKey={index}>
                      <Card.Body>
                        <Card style={{ width: "18rem" }}>
                          <Card.Body>
                            <Card.Title>{ele.name}</Card.Title>
                            <Card.Subtitle className="mb-2 text-muted">
                              Date-of-birth :{ele.DOB}
                            </Card.Subtitle>
                            <Card.Text>
                              phoneNumber:{ele.Phone}
                              <br />
                              Email:{ele.email}
                              <br />
                            </Card.Text>
                            <Card.Link href="#">Card Link</Card.Link>
                            <Card.Link href="#">Another Link</Card.Link>
                          </Card.Body>
                        </Card>
                      </Card.Body>
                    </Accordion.Collapse>
                  </Card>
                </>
              );
            })}
          {/* {dataRecieved &&
            data.map((ele, index) => {
              console.log(ele);
            })} */}
          {console.log(data)}
        </Accordion>
      </div>
    </div>
  );
};

export default CreateContact;
