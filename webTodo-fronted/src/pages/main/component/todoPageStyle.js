import styled from "styled-components";

export const TodoDiv = styled.div`
  border-radius: 15px;
  text-align: left;
  cursor: pointer;
  padding: 0px;
  position: relative;
  box-shadow: 1px 1px 10px grey;
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
  display:flex;
  flex-direction: column;
  
`;

export const TagContainer = styled.div`
  display:flex;
  justify-content: space-between;
  align-items: center;
  width:100%;
  padding:10px;
`

export const TagList = styled.li `
  padding: 10px;
  display:flex;
  justify-content: space-between;
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
&:hover {
    background-color: var(--mainColor);
  }
`;

export const SelectTag = styled.p`
  background-color: #d9d9d9;
  display: inline-block;
  margin: 20px;
  padding: 2px 5px;
  border-radius: 5px;
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

  export const SelectDiv = styled.div `
  height: 50px;
  `