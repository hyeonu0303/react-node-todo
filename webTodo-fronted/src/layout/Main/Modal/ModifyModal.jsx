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
  import { useRef } from "react";
  import { useState } from "react";
import axios from "axios";

  const ModifyModal = ({ isOpen, onClose,contentData }) => {
    const inputRef = useRef()
    const [updateInputValue,setUpdateInputValue] = useState('')

    const fetchUpdateContent = () => {
      axios.post('/api/update/content',{
        _id:contentData._id,
        content:updateInputValue
      })
      .then(()=>{window.location.href='/main'})
      .catch(error=>console.log(error))
    }

    return (
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>  
          <ModalHeader>
          <b><i>{contentData.content}</i></b> 수정하기
          </ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <p>수정할 내용을 입력하세요.</p><br/>
            <Input ref={inputRef} size='md' onChange={(e)=>{setUpdateInputValue(e.target.value)}}/>
          </ModalBody>
          <ModalFooter>
          <Button 
            name="Ok" 
            onClick={fetchUpdateContent}
          />
          <Button name="Cancle" onClick={onClose} />
          </ModalFooter>
        </ModalContent>
      </Modal>
    );
  };
  
  export default ModifyModal;
  