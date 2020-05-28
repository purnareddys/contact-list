import React, { useState, useEffect } from "react";
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
import NavBar from "../NavBar/NavBar";
import "./CreateContact.css";
const CreateContact = () => {
  //TODO refactor the below code
  const [dataRecieved, setDataRecieved] = useState(false);
  const [data, setData] = useState([]);
  const [formDataName, setFormDataName] = useState("");
  const [formDataDate, setFormDataDate] = useState("");
  const [formDataPhone, setFormDataPhone] = useState("");
  const [formDataEmail, setFormDataEmail] = useState("");
  const [counter, UpdateCounter] = useState(1);
  //Handling the input form data
  const HandleDataName = (data) => {
    setFormDataName(data);
  };
  const HandleDataDate = (data) => {
    setFormDataDate(data);
    console.log(data);
  };
  const HandleDataPhone = (data) => {
    setFormDataPhone(data);
  };
  const HandleDataEmail = (data) => {
    setFormDataEmail(data);
  };
  //For getting the data

  useEffect(() => {
    setDataRecieved(true);

    const fetchData = async () => {
      const data = await fetch(
        "http://localhost:5000/api/contacts/user/5ecfbe181b011937684d72f3",
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      const responseData = await data.json();
      if (responseData) {
        setData(responseData.contacts);
      }
    };
    fetchData();
  }, [dataRecieved]);

  //For Sending the data on Form submit
  const submitHandler = async (event) => {
    setDataRecieved(false);
    UpdateCounter(counter + 1);
    event.preventDefault();
    try {
      const responseData = await fetch("http://localhost:5000/api/contacts", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: formDataEmail.toString(),
          DOB: formDataDate.toString(),
          Phone: formDataPhone.toString(),
          name: formDataName.toString(),
          creator: "5ecfbe181b011937684d72f3",
        }),
      });
      console.log(responseData);
      setDataRecieved(true);
    } catch (err) {
      console.log(err);
    }
  };
  //after submit
  // const getHandler = async () => {
  //   UpdateCounter(...counter+1);

  //   const data = await fetch(
  //     "http://localhost:5000/api/contacts/user/5ecfbe181b011937684d72f3",
  //     {
  //       method: "GET",
  //       headers: {
  //         "Content-Type": "application/json",
  //       },
  //     }
  //   );

  //   const responseData = await data.json();
  //   if (responseData) {
  //     setDataRecieved(true);
  //     setData(responseData.contacts);
  //   }
  //   console.log(responseData.contacts);
  // };

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
    <>
      <NavBar name="Contact List" />
      <div className="grid-container">
        <div className="main-content">
          <NavBar name="Add a new Contact" />
          <Form onSubmit={submitHandler}>
            <Form.Group controlId="formBasicEmail">
              <Form.Label>Name</Form.Label>
              <Form.Control
                onChange={(event) => {
                  HandleDataName(event.target.value);
                }}
                type="text"
                placeholder="Enter Name"
              />
              <Form.Text className="text-muted">
                This Field is Important.
              </Form.Text>
            </Form.Group>

            <Form.Group controlId="formBasicPassword">
              <Form.Label>DOB</Form.Label>
              <Form.Control
                type="date"
                onChange={(event) => {
                  HandleDataDate(event.target.value);
                }}
                placeholder="dd/mm/yyyy"
              />
            </Form.Group>
            <Form.Group>
              <Form.Row>
                <Col>
                  <Form.Label>Phone Number</Form.Label>
                  <Form.Control
                    onChange={(event) => {
                      HandleDataPhone(event.target.value);
                    }}
                    placeholder="Enter Phone Number"
                  />
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
                  <Form.Control
                    onChange={(event) => {
                      HandleDataEmail(event.target.value);
                    }}
                    type="email"
                    placeholder="Enter Email"
                  />
                </Col>
                <Col>
                  <Form.Label>Add Email</Form.Label>
                  <br />
                  <Button variant="outline-success">Add</Button>
                </Col>
              </Form.Row>
            </Form.Group>
            <Button variant="primary" type="submit">
              Submit
            </Button>
          </Form>
        </div>
        <div className="display-content">
          <NavBar name="Contacts " />

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
            {dataRecieved &&
              data.map((ele, index) => {
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
          </Accordion>
        </div>
      </div>
    </>
  );
};

export default CreateContact;
