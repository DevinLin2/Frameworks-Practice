import Head from 'next/head';
import React, { useState } from 'react';
import styles from '../styles/Home.module.css';
import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';
import Button from 'react-bootstrap/Button';
import Table from 'react-bootstrap/Table';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faBars,
  faPlusCircle,
  faEdit,
  faTrash,
} from '@fortawesome/free-solid-svg-icons';
import Popup from '../pages/popup.js';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import moment from 'moment';
import { toast, ToastContainer } from 'react-nextjs-toast';

export default function Home() {
  const [showAdd, setShowAdd] = useState(false);
  const [showEdit, setShowEdit] = useState(false);
  const [table, setTable] = useState([]);
  const [formIndex, setFormIndex] = useState(0);
  const handleShowAdd = () => setShowAdd(true);
  const handleCloseAdd = () => setShowAdd(false);
  const handleShowEdit = (index) => {
    setShowEdit(true);
    setFormIndex(index);
  };
  const handleCloseEdit = () => setShowEdit(false);

  const handleSubmit = (formData) => {
    // this needs to check if the title is unique
    let date = formData.date;
    formData.date = moment(date).format('MM/DD/YYYY');
    formData.isComplete = false;
    setTable([...table, formData]);
    toast.notify('Task successfully Added', {
      duration: 3,
      type: 'success',
    });
  };

  function handleEditSubmit(index, formData) {
    console.log(index);
    let date = formData.date;
    let data = [...table];
    formData.date = moment(date).format('MM/DD/YYYY');
    formData.isComplete = false;
    formData.title = data[index].title;
    data[index] = formData;
    setTable(data);
    toast.notify('Task successfully updated', {
      duration: 3,
      type: 'success',
    });
  }

  function handleCheck(index, event) {
    let data = [...table];
    data[index].isComplete = event.target.checked;
    setTable(data);
  }

  function handleDelete(index) {
    let data = [...table];
    data.splice(index, 1);
    setTable(data);
    toast.notify('Task successfully deleted', {
      duration: 3,
      type: 'success',
    });
  }

  return (
    <div>
      <ToastContainer />
      <Navbar bg="info">
        <Container>
          <Navbar.Brand className="mx-auto text-light">
            <FontAwesomeIcon icon={faBars} />
            FRAMEWORKS
          </Navbar.Brand>
          <Button className="float-end" onClick={handleShowAdd}>
            <FontAwesomeIcon icon={faPlusCircle} /> Add
          </Button>
        </Container>
      </Navbar>
      <Popup
        show={showAdd}
        handleShow={() => setShowAdd(false)}
        handleSubmit={handleSubmit}
        handleClosePopup={handleCloseAdd}
        data={table}
        isEdit={false}
      ></Popup>
      <div className="text-center">
        <Table>
          <thead>
            <tr>
              <th>Title</th>
              <th>Description</th>
              <th>Deadline</th>
              <th>Priority</th>
              <th>Is Complete</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {table.map((data, index) => {
              return (
                <tr key={index}>
                  <td>{data.title}</td>
                  <td>{data.description}</td>
                  <td>{data.date}</td>
                  <td>{data.priority}</td>
                  <td>
                    <Form>
                      <Form.Group className="mb-3" controlId="isComplete">
                        <Form.Check
                          type="checkbox"
                          onChange={(event) => handleCheck(index, event)}
                        />
                      </Form.Group>
                    </Form>
                  </td>
                  <td>
                    {!data.isComplete && (
                      <Row>
                        <Col md={{ span: 6, offset: 3 }}>
                          <Button
                            variant="primary"
                            onClick={() => handleShowEdit(index)}
                          >
                            <FontAwesomeIcon icon={faEdit} /> Update
                          </Button>
                        </Col>
                      </Row>
                    )}
                    <Row>
                      <Col md={{ span: 6, offset: 3 }}>
                        <Button
                          variant="danger"
                          onClick={() => handleDelete(index)}
                        >
                          <FontAwesomeIcon icon={faTrash} />
                          Delete
                        </Button>
                      </Col>
                    </Row>
                  </td>
                  <Popup
                    show={showEdit}
                    handleShow={() => setShowEdit(false)}
                    handleSubmit={handleEditSubmit}
                    handleClosePopup={handleCloseEdit}
                    index={formIndex}
                    isEdit={true}
                  ></Popup>
                </tr>
              );
            })}
          </tbody>
        </Table>
      </div>
    </div>
  );
}
