import {
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalCloseButton,
    ModalBody,
    ModalFooter,
    Input,
  } from "@chakra-ui/react"; // Assuming you're using Chakra UI for modal based on the given code.
  // import axios from "axios";
  import Button from "@components/Button/Button";
  
  const Modal = ({ isOpen, onClose }) => {
    return (
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>투두 삭제하기</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <p>투두를 삭제하시겠습니까?</p>
          </ModalBody>
          <ModalFooter>
            <Button name="Ok" />
            <Button name="Cancle" onClick={onClose} />
          </ModalFooter>
        </ModalContent>
      </Modal>
    );
  };
  
  export default Modal;
  