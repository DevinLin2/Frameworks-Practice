import Modal from 'react-bootstrap/Modal';
import React, { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit, faPlusCircle, faBan } from '@fortawesome/free-solid-svg-icons';
import Form from 'react-bootstrap/Form';
import Container from 'react-bootstrap/Container';
import Button from 'react-bootstrap/Button';

export default function Popup({
  show,
  handleSubmit,
  handleClosePopup,
  index,
  data,
  isEdit,
}) {
  const [validated, setValidated] = useState(false);
  const [addFormData, setAddFormData] = useState({
    title: '',
    description: '',
    date: '',
    priority: '',
  });
  const [hasDuplicate, setHasDuplicate] = useState(false);

  function handleClose() {
    handleClosePopup();
    setAddFormData({
      title: '',
      description: '',
      date: '',
      priority: '',
    });
    setValidated(false);
    setHasDuplicate(false);
  }

  function checkDuplicate() {
    if (hasDuplicate) {
      setHasDuplicate(false);
    }
    if (!isEdit) {
      for (var i = 0; i < data.length; i++) {
        console.log(data[i].title);
        console.log(addFormData.title);
        if (data[i].title === addFormData.title) {
          setHasDuplicate(true);
          return true;
        }
      }
    }
    return false;
  }

  function submit(event) {
    // use if statement tp check if add or edit modal is in use
    event.preventDefault();
    const form = event.currentTarget;
    // console.log(form.checkValidity());
    if (form.checkValidity() && !isEdit && !checkDuplicate()) {
      console.log(hasDuplicate);
      handleSubmit(addFormData);
      setAddFormData({
        title: '',
        description: '',
        date: '',
        priority: '',
      });
      setValidated(false);
      handleClosePopup();
    } else if (form.checkValidity() && isEdit) {
      handleSubmit(index, addFormData);
      setAddFormData({
        title: '',
        description: '',
        date: '',
        priority: '',
      });
      setValidated(false);
      handleClosePopup();
    } else {
      setValidated(true);
    }
  }

  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        {isEdit ? (
          <Modal.Title>
            <FontAwesomeIcon icon={faEdit} /> Edit Task
          </Modal.Title>
        ) : (
          <Modal.Title>
            <FontAwesomeIcon icon={faPlusCircle} /> Add Task
          </Modal.Title>
        )}
      </Modal.Header>
      <Modal.Body>
        <Form noValidate validated={validated} onSubmit={submit}>
          <Container>
            {!isEdit && (
              <Form.Group className="mb-3" controlId="Title">
                <Form.Control
                  type="text"
                  placeholder="Title"
                  value={addFormData.title}
                  onChange={(e) =>
                    setAddFormData({ ...addFormData, title: e.target.value })
                  }
                  isInvalid={hasDuplicate}
                  required
                />
                {hasDuplicate ? (
                  <Form.Control.Feedback type="invalid">
                    Please enter a unique title.
                  </Form.Control.Feedback>
                ) : (
                  <Form.Control.Feedback type="invalid">
                    Please enter a title.
                  </Form.Control.Feedback>
                )}
              </Form.Group>
            )}
            <Form.Group className="mb-3" controlId="description">
              <Form.Control
                type="text"
                placeholder="Description"
                value={addFormData.description}
                onChange={(e) =>
                  setAddFormData({
                    ...addFormData,
                    description: e.target.value,
                  })
                }
                required
              />
              <Form.Control.Feedback type="invalid">
                Please enter a description.
              </Form.Control.Feedback>
            </Form.Group>
            <Form.Group className="mb-3" controlId="deadline">
              <Form.Control
                type="date"
                placeholder="deadline"
                value={addFormData.date}
                onChange={(e) =>
                  setAddFormData({ ...addFormData, date: e.target.value })
                }
                required
              />
              <Form.Control.Feedback type="invalid">
                Please enter a deadline.
              </Form.Control.Feedback>
            </Form.Group>
            <Form.Group>
              <Form.Check
                inline
                type="radio"
                label="Low"
                name="priority"
                onChange={(e) =>
                  setAddFormData({ ...addFormData, priority: 'Low' })
                }
                required
              />
              <Form.Check
                inline
                type="radio"
                label="Med"
                name="priority"
                onChange={(e) =>
                  setAddFormData({ ...addFormData, priority: 'Med' })
                }
                required
              />
              <Form.Check
                inline
                type="radio"
                label="high"
                name="priority"
                onChange={(e) =>
                  setAddFormData({ ...addFormData, priority: 'High' })
                }
                required
              />
            </Form.Group>
            <Button className="float-end" type="submit">
              <FontAwesomeIcon icon={faPlusCircle} /> Add
            </Button>
            <Button
              className="float-end mr-1"
              variant="danger"
              onClick={handleClose}
            >
              <FontAwesomeIcon icon={faBan} /> Cancel
            </Button>
          </Container>
        </Form>
      </Modal.Body>
    </Modal>
  );
}
