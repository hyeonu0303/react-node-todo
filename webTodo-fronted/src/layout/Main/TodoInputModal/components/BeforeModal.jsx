import { useDispatch } from "react-redux";
import { useState } from "react";
import { changeContent} from "@/store/todoSlice";
import styled from "styled-components";

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

export default BeforeModal;

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