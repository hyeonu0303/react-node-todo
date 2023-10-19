/*eslint-disable */
import { useState, useRef, useEffect } from "react";
import axios from "axios";
import BeforeModal from "./components/BeforeModal";
import AfterModal from "./components/AfterModal";
import { useDispatch, useSelector } from "react-redux";
import { insertData } from "@/store/dataSlice";

const TodoInputModal = ({ getAllData })=> {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const modalRef = useRef(null);
  const todoData = useSelector((state) => state.todo);
  const dispatch = useDispatch();
  const toggleModal = () => {
    setIsModalVisible(true);
  };
  
  const closeModal = () => {
    setIsModalVisible(false);
  };

  const handleAddButton = () => {
    if (isSubmitting) return;  
    setIsSubmitting(true);
    
    closeModal();
    dispatch(insertData(todoData))
    axios.post("/api/todo", {
      todoData,
    })
    .then((response) => {
      console.log("할일 저장완료:", response.data);
    })
    .finally(() => {
      setIsSubmitting(false);  
    });
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (modalRef.current && !modalRef.current.contains(event.target)) {
        closeModal();
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <TodoDiv>
      <div ref={modalRef}>
        <BeforeModal
          handleAddButton={handleAddButton}
          toggleModal={toggleModal} 
        />
        {
          isModalVisible && 
            <AfterModal todoData={todoData} handleAddButton={handleAddButton}
          />
        }
      </div>
    </TodoDiv>
  );
}





export default TodoInputModal;

import styled from "styled-components";

export const TodoDiv = styled.div`
  margin-left: 10px;
  margin-right: 10px;
  border-radius: 15px;
  text-align: left;
  cursor: pointer;
  padding: 0px;
  position: relative;
  border:4px solid #eee;
`;

