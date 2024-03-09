import React, { useEffect, useState } from "react";
import { Col, Row } from "react-bootstrap";
import Card from "react-bootstrap/Card";
import ListGroup from "react-bootstrap/ListGroup";
import Form from "react-bootstrap/Form";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import avatar from "../Assets/avatar.png";
import { addUser } from "../Redux/Slices/userSlice";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Add = () => {
  const dispatch = useDispatch();
  const UserData = useSelector((state) => state.userReducer);

  const [data, setData] = useState({
    id: UserData.length+2,
    email: "",
    first_name: "",
    last_name: "",
    avatar: "",
  });

  const [preview, setPreview] = useState("");

  useEffect(() => {
    if (data.avatar) {
      setPreview(URL.createObjectURL(data.avatar));
    }
  }, [data.avatar]);

  const handleUpload = (e) => {
    e.preventDefault();
    const { id, email, first_name, last_name, avatar } = data;
    if (!id || !email || !first_name || !last_name || !avatar) {
      toast.warning(`Pls Fill the Form Completely..`);
    } else {
      const existEmail = UserData.find((user) => user.email === email);
      const uid = UserData.find((user) => user.id === id);
      if (!uid) {
        if (!existEmail) {
          if (email.match(/^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/)) {
            dispatch(addUser({ ...data, avatar: preview }));
            toast.success(`The data has been successfully added..`);
            setData({
              id: UserData.length+2,
              email: "",
              first_name: "",
              last_name: "",
              avatar: "",
            });
            setPreview("");
          } else {
            toast.warning(`Invalid Email`);
          }
        } else {
          toast.warning(`All Ready Exist..`);
        }
      } else {
        toast.warning(`User Id Already Exists.. Pls Provide Unique Id`);
      }
    }
  };

  return (
    <div className="container d-flex justify-content-center align-items-center my-5 ">
      <Card className=" w-100 ">
        <Row>
          <Col className="col-xs-6 col-md-4">
            {" "}
            <label className="w-100 h-100">
              <Card.Img
                className="img-fluid w-100 h-100"
                variant="top"
                src={preview ? preview : avatar}
              />
              <input
                type="file"
                hidden
                onChange={(e) =>
                  setData({ ...data, avatar: e.target.files[0] })
                }
              />
            </label>
          </Col>
          <Col className="col-xs-12 col-md-8">
            <Form>
              <Card.Body>
                <Card.Title>
                  {" "}
                  <input
                    type="text"
                    className="border-0"
                    onChange={(e) => setData({ ...data, id: e.target.value })}
                    value={data.id}
                    // readOnly
                  />
                </Card.Title>
                <Card.Text>
                  <h1>
                    {data.first_name
                      ? data.first_name + " " + data.last_name
                      : "Name"}
                  </h1>
                </Card.Text>
              </Card.Body>
              <ListGroup className="list-group-flush">
                <ListGroup.Item>
                  <Form.Group as={Row} controlId="formPlaintextEmail">
                    <Form.Label column sm="2">
                      First Name :
                    </Form.Label>
                    <Col sm="10">
                      <Form.Control
                        className="border-bottom"
                        onChange={(e) =>
                          setData({ ...data, first_name: e.target.value })
                        }
                        plaintext
                        value={data.first_name}
                      />
                    </Col>
                  </Form.Group>
                </ListGroup.Item>
                <ListGroup.Item>
                  <Form.Group as={Row} controlId="anu">
                    <Form.Label column sm="2">
                      Last Name :
                    </Form.Label>
                    <Col sm="10">
                      <Form.Control
                        className="border-bottom"
                        onChange={(e) =>
                          setData({ ...data, last_name: e.target.value })
                        }
                        plaintext
                        value={data.last_name}
                      />
                    </Col>
                  </Form.Group>
                </ListGroup.Item>
                <ListGroup.Item>
                  <Form.Group as={Row} controlId="anu">
                    <Form.Label column sm="2">
                      Email:
                    </Form.Label>
                    <Col sm="10" className="ms-0">
                      <Form.Control
                        className="border-bottom"
                        onChange={(e) =>
                          setData({ ...data, email: e.target.value })
                        }
                        plaintext
                        value={data.email}
                      />
                    </Col>
                  </Form.Group>
                </ListGroup.Item>
              </ListGroup>
              <Card.Body>
                <button onClick={handleUpload} className="btn btn-success me-4">
                  Add
                </button>
                <Link to={"/"} className="btn btn-primary">
                  Back to Home
                </Link>
              </Card.Body>
            </Form>
          </Col>
        </Row>
      </Card>
      <ToastContainer position="top-center" autoClose={2000} />
    </div>
  );
};

export default Add;
