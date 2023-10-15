/*eslint-disable */
import { useState, useRef, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import axios from "axios";
import SetTime from "@components/Button/TimeIcon/TimeButton";
import SetTag from "@components/Button/TagIcon/TagButton";
import SetDay from "@components/Button/CalendarIcon/CalndarButton";
import { useDispatch, useSelector } from "react-redux";
import { changeContent} from "@/store/todoSlice";

const TodoInputModal = ({ getAllData })=> {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const modalRef = useRef(null);
  const todoData = useSelector((state) => state.todo);

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
    axios
    .post("/api/todo", {
      todoData,
    })
    .then((response) => {
      console.log("할일 저장완료:", response.data);
      getAllData();
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

const BeforeModal = ({ handleAddButton, toggleModal }) => {
  const dispatch = useDispatch();
  const [inputValue, setInputValue] = useState('')

  const handleInputChange = (e) => {
    dispatch(changeContent(e.target.value))
    setInputValue(e.target.value)
  }
  const handleEnterPress = (e) => {
    if (e.key === 'Enter' && !e.defaultPrevented) {
      e.preventDefault()
      handleAddButton()
      setInputValue('')
    }
  }

  return (
    <div style={{ width: "100%" }}>
      <TodoInput
        type="text"
        placeholder="오늘의 할일은 무엇인가요?"
        onClick={toggleModal}
        value={inputValue}
        onChange={handleInputChange}
        onKeyDown={handleEnterPress}
      />
    </div>
  );
}

const AfterModal = ({ handleAddButton, todoData }) => {

  const [isTagOpen, setIsTagOpen] = useState(false);
  const [isTimeOpen, setIsTimeOpen] = useState(false);
  const [isDayOpen, setIsDayOpen] = useState(false);

  const toggleTag = () => {
    setIsDayOpen(false); 
    setIsTimeOpen(false); 
    setIsTagOpen(!isTagOpen);
  };

  const toggleTime = () => {
    setIsDayOpen(false); 
    setIsTimeOpen(!isTimeOpen);
    setIsTagOpen(false); 
  };

  const toggleDay = () => {
    setIsDayOpen(!isDayOpen);
    setIsTimeOpen(false);
    setIsTagOpen(false); 
  };

  return (
    <div>
      <SelectDiv
        hascontent={
          (!!todoData.selectTag && todoData.selectTag.trim().length > 0) ||
          (!!todoData.selectTime && todoData.selectTime.trim().length > 0)
          ?"true": undefined
        }
      >
        <SelectTag hascontent={!!todoData.selectTime && todoData.selectTime.trim().length > 0 ? "true" : undefined}>
          {todoData.selectTime}
        </SelectTag>
        <SelectTag hascontent={!!todoData.selectTag && todoData.selectTag.trim().length > 0 ? "true" : undefined}>
          {todoData.selectTag}
        </SelectTag>

      </SelectDiv>
        
      <SetDay isOpen={isDayOpen} toggleDay={toggleDay}/>
      <SetTime isOpen={isTimeOpen} toggleTime={toggleTime}/>
      <SetTag isOpen={isTagOpen} toggleTag={toggleTag}/>
      

      <AddTodoButton onClick={handleAddButton}>
        <FontAwesomeIcon icon={faPlus} style={{ color: "#000000" }} />
      </AddTodoButton>
    </div>
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

export const TodoInput = styled.input`
  padding: 35px;
  border: none;
  font-size: 20px;
  background-color: transparent;
  width: 100%;
  &:focus {
    outline: none;
    background-color: transparent;
  }
`;

export const AddTodoButton = styled.button`
  font-size: 20px;
  padding: 2px 8.25px; /* 패딩을 한 줄로 정리 */
  border-radius: 5px;
  position: absolute;
  bottom: 10px; /* 아래 여백을 조절하여 위치 조정 */
  right: 10px; /* 오른쪽 여백을 조절하여 위치 조정 */
  &:hover {
    background-color: var(--mainColor);
  }
`;


export const SetTodoButton = styled.button`
  font-size: 20px;
  padding: 20px;
`;

export const DropdownWrapper = styled.div`
  position: relative;
  display: inline-block;
`;

export const DropdownMenu = styled.div`
  width: 200px;
  position: absolute;
  top: 80%;
  left: 0;
  background-color: white;
  border: 1px solid #ccc;
  list-style: none;
  padding: 0;
  margin: 0;
  display: flex;
  flex-direction: column;
  z-index:1;
`;

export const TagContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  padding: 10px;
`;

export const TagList = styled.li`
  padding: 10px;
  display: flex;
  justify-content: space-between;
`;

export const AddTagInput = styled.input`
  width: 80%;
  border: none;

  background-color: transparent;
  &:focus {
    outline: none;
    background-color: transparent;
  }
`;
export const AddTagButton = styled.button`
  width: 20%;
  border-radius: 5px;

  &:hover {
    background-color: var(--mainColor);
  }
`;

export const SelectTag = styled.p`
  background-color: ${(props) => (props.hascontent ? "#d9d9d9" : "transparent")};
  display: inline-block;
  margin: 20px;
  padding: 2px 5px;
  border-radius: 5px;
  line-height: 1.5;
  vertical-align: top; 
`;


export const SelectDay = styled.p`
  background-color: #d9d9d9;
  display: inline-block;
  margin: 20px;
  padding: 2px 5px;
  border-radius: 5px;
`;

export const TimeInput = styled.input`
  margin: 10px;
  width: 80%;
  &:focus {
    outline: none;
    background-color: transparent;
  }
`;

export const SelectDiv = styled.div`
  height: ${(props) => (props.hascontent ? "50px" : "0px")};
  overflow: hidden;
  transition: height 0.3s ease-out;
`;

// SetDay Style
export const DayList = styled.li`
  padding: 10px;
  line-height: 40px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`;

export const CheckboxContainer = styled.div`
  display: inline-flex;
  align-items: center;
  gap: 10px;
`;

export const ComboBox = styled.select`
  margin-left: 10px;
  width: 50px;
`;
