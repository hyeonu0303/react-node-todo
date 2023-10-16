import SetTime from "@components/Button/TimeIcon/TimeButton";
import SetTag from "@components/Button/TagIcon/TagButton";
import SetDay from "@components/Button/CalendarIcon/CalndarButton";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import styled from "styled-components";
import { useState } from "react";
const AfterModal = ({ handleAddButton, todoData }) => {

  const [isTagOpen, setIsTagOpen] = useState(false);
  const [isTimeOpen, setIsTimeOpen] = useState(false);
  const [isDayOpen, setIsDayOpen] = useState(false);

  const toggleTag = () => {
    setIsDayOpen(false) 
    setIsTimeOpen(false)
    setIsTagOpen(!isTagOpen)
  };

  const toggleTime = () => {
    setIsDayOpen(false) 
    setIsTimeOpen(!isTimeOpen)
    setIsTagOpen(false) 
  };

  const toggleDay = () => {
    setIsDayOpen(!isDayOpen)
    setIsTimeOpen(false)
    setIsTagOpen(false) 
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

export default AfterModal;

export const SelectDiv = styled.div`
  height: ${(props) => (props.hascontent ? "50px" : "0px")};
  overflow: hidden;
  transition: height 0.3s ease-out;
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

