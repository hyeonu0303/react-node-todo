import { useSelector } from 'react-redux';
import styled from 'styled-components';

const TodoContent = (props) => {
  const selectDate = useSelector(state => state.todo.date);
  
  // selectTag로 그룹화
  const groupedByTag = {};

  props.allData && props.allData.forEach(item => {
      if (item.date === selectDate) {
          if (!groupedByTag[item.selectTag]) {
              groupedByTag[item.selectTag] = [];
          }
          groupedByTag[item.selectTag].push(item.content);
      }
  });

  console.log(groupedByTag);

  return (
      <TodoWrapper>
          {props.allData != null && selectDate ? (
              Object.keys(groupedByTag).map(tag => (
                  <TodoContentArea key={tag}>
                    <h2>태그:{tag}</h2>
                    {groupedByTag[tag].map((content, index) => (
                        <p key={index}>컨텐츠:{content}</p>
                    ))}
                    <hr/>
                  </TodoContentArea>
              ))
          ) : null}
      </TodoWrapper>
  );
}

export default TodoContent;

const TodoWrapper = styled.div`
  width:100%;
  height: 100%;
  margin: 50px 20px;
  position: relative;
`

const TodoContentArea = styled.div`
  display:flex;
  flex-direction: column ;
  align-items: flex-start;
  position:abolute;
  gap:10px;
  border: 1px solid black;
`



