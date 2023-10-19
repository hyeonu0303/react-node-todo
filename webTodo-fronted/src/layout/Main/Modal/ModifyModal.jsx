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
import { useDispatch } from "react-redux";
import { fetchData } from "@/store/dataSlice";

const ModifyModal = ({
  isOpen,
  onClose,
  contentData,
  handleMouseOut,
  uniqueKey

}) => {
  const inputRef = useRef();
  const [updateInputValue, setUpdateInputValue] = useState("");
  const [cautionMassage, setCautionMassage] =
    useState("수정할 내용을 입력하세요");
  const [messageColor, setMessageColor] = useState("black");
  const dispatch = useDispatch();
  const closeModal = () => {
    handleMouseOut(uniqueKey);
      onClose();
    }

  const fetchUpdateContent = () => {
    if (updateInputValue === "") {
      setCautionMassage("빈 내용은 입력할 수 없어요");
      setMessageColor("red");
    } else {
      closeModal();
      axios
        .post("/api/update/content", {
          _id: contentData._id,
          content: updateInputValue,
        })
        .then((result) => {
          console.log(result.data)
          dispatch(fetchData());
        })
        .catch((error) => console.log(error));
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={closeModal}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>
          <b>
            <i>{contentData.content}</i>
          </b>{" "}
          수정하기
        </ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <p style={{ color: messageColor }}>{cautionMassage}</p>
          <br />
          <Input
            ref={inputRef}
            size="md"
            onChange={(e) => {
              setUpdateInputValue(e.target.value);
            }}
          />
        </ModalBody>
        <ModalFooter>
          <Button name="Ok" onClick={fetchUpdateContent} />
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

export default ModifyModal;
