import { useState } from 'react';
import { Modal, ModalOverlay, ModalContent, ModalHeader, ModalFooter, ModalBody, ModalCloseButton } from '@chakra-ui/react';
import { Input } from '@chakra-ui/react';
import { Button } from '@chakra-ui/react';
import PropTypes from 'prop-types';

const CustomModal = ({ isOpen, onClose, onConfirm }) => {
  const [textInput, setTextInput] = useState('');

  const handleConfirm = () => {
    onConfirm(textInput);
    setTextInput(''); // 입력된 내용 초기화
    onClose();
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>투두 추가하기</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <Input placeholder="텍스트 입력" value={textInput} onChange={(e) => setTextInput(e.target.value)} />
        </ModalBody>
        <ModalFooter>
          <Button colorScheme="blue" onClick={handleConfirm}>추가</Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

CustomModal.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  onConfirm: PropTypes.func.isRequired,
};

export default CustomModal;
