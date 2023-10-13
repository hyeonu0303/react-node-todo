import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  ModalFooter,
} from "@chakra-ui/react"; // Assuming you're using Chakra UI for modal based on the given code.
// import axios from "axios";
import Button from "@components/Button/Button";

const DeleteModal = ({ isOpen, onClose,contentData }) => {
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
          <Button name="Ok" />
          <Button name="Cancle" onClick={onClose} />
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default DeleteModal;
