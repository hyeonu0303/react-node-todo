import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  ModalFooter,
} from "@chakra-ui/react"; 
import Button from "@components/Button/Button";
import axios from "axios";

const DeleteModal = ({ isOpen, onClose,contentData }) => {
  const deleteContent = () => {
    axios.post('/api/delete/content',{
      _id:contentData._id,
    })
    .then(()=>{window.location.href='/main'})
    .catch(error=>console.log(error))
  }

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>투두 삭제하기</ModalHeader>
        <ModalCloseButton/>
        <ModalBody>
          <p>{contentData.content}를 삭제하시겠습니까?</p>
        </ModalBody>
        <ModalFooter>
          <Button name="Ok" onClick={deleteContent} />
          <Button name="Cancle" onClick={onClose} />
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default DeleteModal;
