import styled from 'styled-components';

const TodoDiv = styled.div `
  border: 2px solid var(--mainColor);
  border-radius: 30px;
  text-align: left;

`
const TodoInput = styled.input `
  margin: 30px;
 border: none;
`

function BeforeModal() {
  return (
    <TodoDiv>
      <TodoInput type="text" placeholder="Input the Todo ..."></TodoInput>
    </TodoDiv>

  );
}


export default BeforeModal;
