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
import AlertNotification from "../Alert";
import "./CreateContact.css";
const CreateContact = () => {
  //TODO refactor the below code
  const [dataRecieved, setDataRecieved] = useState(false);
  const [data, setData] = useState([]);
  const [formDataName, setFormDataName] = useState("");
  const [formDataDate, setFormDataDate] = useState("");
  const [formDataPhone, setFormDataPhone] = useState("");
  const [formDataEmail, setFormDataEmail] = useState("");
  const [editContactBtn, setEditContactBtn] = useState(false);
  const [updateDom, toUpdateDome] = useState(true);
  //Handling the input form data
  const HandleDataName = (data) => {
    setFormDataName(data);
  };
  const HandleDataDate = (data) => {
    setFormDataDate(data);
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
        // setDataRecieved(true);
        setData(responseData.contacts);
        console.log(responseData.contacts);
      }
    };
    fetchData();
  }, []);

  //For Sending the data on Form submit
  const submitHandler = async (event) => {
    toUpdateDome(true);
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
      if (responseData) {
        toUpdateDome(true);
        console.log(updateDom);
      }
    } catch (err) {
      console.log(err);
    }
  };
  //delete request handler
  const delteHandler = async (id) => {
    toUpdateDome(true);
    try {
      const responseData = await fetch(
        `http://localhost:5000/api/contacts/${id}`,
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      if (responseData) {
        toUpdateDome(true);
        console.log(updateDom);
      }
    } catch (err) {
      console.log(err);
    }
  };

  //Updating the contact
  const updateHandler = async (id) => {
    toUpdateDome(true);
    try {
      const responseData = await fetch(
        `http://localhost:5000/api/contacts/${id}`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            email: formDataEmail.toString(),
            Phone: formDataPhone.toString(),
          }),
        }
      );
      if (responseData) {
        toUpdateDome(true);
      }
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

  //for sorting the arrays
  function dynamicSort(property) {
    var sortOrder = 1;

    if (property[0] === "-") {
      sortOrder = -1;
      property = property.substr(1);
    }

    return function (a, b) {
      if (sortOrder == -1) {
        return b[property].localeCompare(a[property]);
      } else {
        return a[property].localeCompare(b[property]);
      }
    };
  }

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
      <AlertNotification />
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
          <FormControl type="text" placeholder="Search" className="mr-sm-2" />
          <Accordion>
            {!dataRecieved &&
              DUMMY_CONTACTS.sort(dynamicSort("name")).map((ele, index) => {
                return (
                  <>
                    <Card key={ele._id}>
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
                              <Button variant="danger">Delete Contact</Button>
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
              data.sort(dynamicSort("name")).map((ele, index) => {
                return (
                  <>
                    <Card key={ele._id}>
                      <Card.Header as="h5">
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
                          <Card>
                            <Card.Body>
                              <Row>
                                <Col>
                                  <Card.Title as="h3"> {ele.name}</Card.Title>
                                </Col>
                                <Col>
                                  <Button
                                    onClick={() => {
                                      setEditContactBtn(true);
                                    }}
                                    variant="outline-dark"
                                  >
                                    Edit Contact
                                    {console.log(formDataPhone)}
                                  </Button>
                                </Col>
                              </Row>

                              <Card.Subtitle className="mb-2 text-muted">
                                Date-of-birth :{ele.DOB}
                              </Card.Subtitle>

                              <Form.Label />
                              <h5>Phone: {ele.Phone}</h5>
                              <Form.Control
                                disabled={!editContactBtn}
                                placeholder="Edit Phone Number"
                                onChange={(e) => {
                                  HandleDataPhone(e.target.value);
                                }}
                              />

                              <h5>Email: {ele.email}</h5>
                              <Form.Control
                                disabled={!editContactBtn}
                                placeholder="Edit Email address"
                                onChange={(e) => {
                                  HandleDataEmail(e.target.value);
                                }}
                              />

                              <Button
                                variant="danger"
                                onClick={() => {
                                  delteHandler(ele._id);
                                }}
                              >
                                Delete Contact
                              </Button>
                              <Button
                                variant="success"
                                disabled={!editContactBtn}
                                onClick={() => {
                                  updateHandler(ele._id);
                                }}
                              >
                                Update Contact
                              </Button>
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
