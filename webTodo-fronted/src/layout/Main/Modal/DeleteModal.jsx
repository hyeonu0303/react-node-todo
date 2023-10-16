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

const DeleteModal = ({
  isOpen,
  onClose,
  contentData,
  getAllData,
  handleMouseOut,
  uniqueKey
}) => {

  const closeModal = () => {
  handleMouseOut(uniqueKey);
    onClose();
  }
  const deleteContent = () => {
    closeModal();
    axios
      .post("/api/delete/content", {
        _id: contentData._id,
      })
      .then(() => {
        getAllData();
      })
      .catch((error) => console.log(error));
  };

  return (
    <Modal isOpen={isOpen} onClose={closeModal}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>
          <b>
            <i>{contentData.content}</i>
          </b>{" "}
          삭제하기
        </ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <p>정말 삭제하시겠습니까?</p>
        </ModalBody>
        <ModalFooter>
          <Button name="Ok" onClick={deleteContent} />
          <Button
            name="Cancle"
            onClick={() => {
              closeModal();
            }}
          />
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default DeleteModal;
