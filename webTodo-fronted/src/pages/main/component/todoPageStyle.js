import styled from "styled-components";

export const TodoDiv = styled.div`
  border: 2px solid #7f7f7f48;
  border-radius: 15px;
  text-align: left;
  cursor: pointer;
  padding: 0px;
  position: relative;
  box-shadow: 5px 5px 20px grey;
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

export const DropdownMenu = styled.ul`
width: 200px;

  position: absolute;
  top: 80%;
  left: 0;
  background-color: white;
  border: 1px solid #ccc;
  list-style: none;
  padding: 0;
  margin: 0;
  display: inline-block;
`;

export const TagList = styled.li `
padding: 10px;
  
`

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
`;