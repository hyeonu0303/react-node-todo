import {
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalCloseButton,
    ModalBody,
    ModalFooter,
    Input,

  } from "@chakra-ui/react";
  import Button from "@components/Button/Button";


  const ModifyModal = ({ isOpen, onClose,contentData }) => {
    return (
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>  
          <ModalHeader>
            투두 수정하기
          </ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <p>{contentData.content} 수정하시겠습니까?</p>
            <Input size='md' />
          </ModalBody>
          <ModalFooter>
          <Button name="Ok" />
          <Button name="Cancle" onClick={onClose} />
          </ModalFooter>
        </ModalContent>
      </Modal>
    );
  };
  
  export default ModifyModal;
  