import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { useDispatch } from 'react-redux';
import { deleteUser } from '../Redux/Slices/userSlice';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const DeleteModal = ({id}) => {

    const dispatch = useDispatch()

    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const handleDelete = (id)=>{
     
        dispatch(deleteUser(id))
        
        handleClose()
    }

  return (
    <>
    <Button variant="danger" onClick={handleShow}>
      Delete
    </Button>

    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Alert...</Modal.Title>
      </Modal.Header>
      <Modal.Body>Are you sure you want to delete the selected item?</Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>
          No
        </Button>
        <Button variant="primary" onClick={(e)=>handleDelete(id)}>
          Yes
        </Button>
      </Modal.Footer>
    </Modal>
   
  </>  )
}

export default DeleteModal