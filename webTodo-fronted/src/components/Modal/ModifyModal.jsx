import {
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalCloseButton,
    ModalBody,
    ModalFooter,
    Input
  } from "@chakra-ui/react"; // Assuming you're using Chakra UI for modal based on the given code.
  import Button from "@components/Button/Button";

  const ModifyModal = ({ isOpen, onClose }) => {
    return (
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>  
          <ModalHeader>투두 수정하기</ModalHeader>
          <ModalCloseButton />
          <ModalBody><Input placeholder='medium size' size='md' /></ModalBody>
          <ModalFooter>
          <Button colorScheme="blue" mr={3}>
              Accept
            </Button>
            <Button colorScheme="blue" mr={3} onClick={onClose}>
              Close
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    );
  };
  
  export default ModifyModal;
  