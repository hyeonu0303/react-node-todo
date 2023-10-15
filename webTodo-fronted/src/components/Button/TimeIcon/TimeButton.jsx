import { useDispatch } from "react-redux";
import { useState } from "react";
import { setTime, clearTime } from "@/store/todoSlice";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faClock } from "@fortawesome/free-solid-svg-icons";
import styled from "styled-components";

const SetTime = ({isOpen,toggleTime}) => {
  const [selectedTime, setSelectedTime] = useState("");

  const dispatch = useDispatch();

  const handleTimeChange = (event) => {
    const newTime = event.target.value;
    setSelectedTime(newTime);
  };

  const addTime = () => {
    // 시간 데이터를 state.todo.selectTime로 보내기
    dispatch(setTime(selectedTime));
    toggleTime();
  };

  const deleteTime = () => {
    dispatch(clearTime());
    
  }

  return (
    <DropdownWrapper>
      <SetTodoButton onClick={toggleTime}>
        <FontAwesomeIcon icon={faClock} style={{ color: "#000000" }} />
      </SetTodoButton>
      {isOpen && (
        <DropdownMenu>
          <div style={{ display: "flex", alignItems: "center" }}>
            <TimeInput
              type="time"
              value={selectedTime}
              onChange={handleTimeChange}
            />
            <AddTagButton onClick={addTime}>+</AddTagButton>
            <AddTagButton onClick={deleteTime}>x</AddTagButton>
          </div>
        </DropdownMenu>
      )}
    </DropdownWrapper>
    
  );
};

export default SetTime;

export const DropdownWrapper = styled.div`
  position: relative;
  display: inline-block;
`;

export const SetTodoButton = styled.button`
  font-size: 20px;
  padding: 20px;
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

export const TimeInput = styled.input`
  margin: 10px;
  width: 80%;
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