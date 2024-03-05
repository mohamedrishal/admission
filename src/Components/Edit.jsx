import React, { useState,useEffect } from "react";
import { Col, Row } from "react-bootstrap";
import Card from "react-bootstrap/Card";
import ListGroup from "react-bootstrap/ListGroup";
import { useDispatch, useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom";
import Form from "react-bootstrap/Form";
import { editUser } from "../Redux/Slices/userSlice";

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Edit = () => {
  const { id } = useParams();

  console.log(id);

  const data = useSelector((state) =>
    state.userReducer.find((item) => item.id == id)
  );

  const allData = useSelector(state=>state.userReducer)

  const dispatch = useDispatch()


  // const userData = data.find(item=>item.id == id)
  // console.log(userData);

  const [updateData, setUpdateData] = useState({
    id: data?.id,
    email: data?.email,
    first_name: data?.first_name,
    last_name: data?.last_name,
    avatar: "",
  });


  const [preview, setPreview] = useState("");

  useEffect(() => {
    if (updateData.avatar) {
      setPreview(URL.createObjectURL(updateData.avatar));
    }
  }, [updateData.avatar]);



  const handleUpdate = (e) => {
    e.preventDefault();
    const { id, email, first_name, last_name } = updateData;
    if (!id || !email || !first_name || !last_name ) {
      toast.warning("Pls Fill the Form Completely..");
    } else {
      const existEmail = data.email === updateData.email ? null : allData.find((user) => user.email === email);
      if (!existEmail) {
        if (email.match(/^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/)) {
          dispatch(editUser({ ...updateData, avatar: preview ? preview : data.avatar }));
          toast.success(`The data has been successfully Updated..`);
          setPreview("");
        } else {
          toast.warning("Invalid Email ID..");
        }
      } else {
        toast.warning("All Ready Exists..");
      }
    }
  };

  return (
    <div className="container d-flex justify-content-center align-items-center my-5 ">
      <Card className=" w-100 ">
        <Row>
          <Col className="col-xs-6 col-md-4">
            <label className="w-100 h-100">
              <Card.Img
                className="img-fluid w-100 h-100"
                variant="top"
                src={ preview ? preview : data?.avatar}
              />
              <input type="file" hidden   onChange={(e) =>
                  setUpdateData({ ...updateData, avatar: e.target.files[0] })
                } />
            </label>
          </Col>
          <Col className="col-xs-12 col-md-8">
            <Card.Body>
              <Card.Title>{data?.id}</Card.Title>
              <Card.Text>
                <h1>{updateData?.first_name + " " + updateData?.last_name}</h1>
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
                          setUpdateData({ ...updateData, first_name: e.target.value })
                        }
                        plaintext
                        value={updateData.first_name}
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
                          setUpdateData({ ...updateData, last_name: e.target.value })
                        }
                        plaintext
                        value={updateData.last_name}
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
                          setUpdateData({ ...updateData, email: e.target.value })
                        }
                        plaintext
                        value={updateData.email}
                      />
                    </Col>
                  </Form.Group>
                </ListGroup.Item>
              </ListGroup>
            <Card.Body>
              <button className="btn btn-success me-4" onClick={handleUpdate}>
                Update
              </button>
              <Link to={"/"} className="btn btn-primary">
                Back to Home
              </Link>
            </Card.Body>
          </Col>
        </Row>
      </Card>

    <ToastContainer position="top-center" autoClose={2000} />

    </div>
  );
};

export default Edit;
