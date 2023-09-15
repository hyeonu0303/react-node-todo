import { useSelector } from 'react-redux';
import styled from 'styled-components';
import {Checkbox, Text} from '@chakra-ui/react'
import oppenheimer from './Oppenheimer.png'
import { useState } from 'react';
const TodoContent = (props) => {
  const selectDate = useSelector(state => state.todo.date);
  const [visible, setVisible] = useState(false);

  // selectTag로 그룹화
  const groupedByTag = {};

  props.allData && props.allData.forEach(item => {
      if (item.date === selectDate) {
          if (!groupedByTag[item.selectTag]) {
              groupedByTag[item.selectTag] = [];
          }
          groupedByTag[item.selectTag].push({
            content:item.content,
            selectTime:item.selectTime
            }
          );
      }
  });


  console.log(groupedByTag);

  return (
      <TodoContainer>
          {props.allData != null && selectDate ? (
              Object.keys(groupedByTag).map(tag => (
              <TodoWrapper key={tag}>

                <TodoTagArea>
                  {
                    tag == ''? <h2>✅목표</h2>:<h2>😊{tag}</h2>
                  }
                </TodoTagArea>

                <TodoContentArea>
                {
                  groupedByTag[tag].map((array, index) => {
                    return(
                      <Checkbox 
                      key={index}
                      >
                      <Text>
                        {array.content}
                        {array.selectTime}
                        <p>깃허브연동체크</p>
                      </Text>
                    </Checkbox>
                  )})
                  }
                </TodoContentArea>
                
              </TodoWrapper>
              ))
          ) : null}
          
          {
            visible==true?
            <div style={{
              position:'absolute',
              right:'0',
              top:'0',
            }}
            onClick={()=>{setVisible(false)}}
            >
              <img src={oppenheimer} style={{borderRadius:'20px', boxShadow:'10px'}}/>
              <em style={{fontSize:'20px',fontWeight:'bold',}}>"Now I am become Death, the destroyer of worlds."</em>
            </div>
            : 
            <div style={{
              borderRadius:'50%',
              width:'5px',
              height:'5px',
              background:'#eee',
              position:'absolute',
              right:'0',
              bottom:'0'
            }}
            onClick={()=>{setVisible(true)}}
            >
            </div>
          }
      </TodoContainer>
  );
}

export default TodoContent;



const TodoContainer = styled.div`
  width:99%;
  height: 100%;
  margin: 50px 10px;
  position: relative;
  border:4px solid #eee;
  border-radius: 10px;
`

const TodoWrapper = styled.div`
  display:flex;
  flex-direction: column;
  align-items: flex-start;
  gap:10px;
  `

const TodoTagArea = styled.div`
  font-size:20px;
`

const TodoContentArea = styled.div`
  display:flex;
  flex-direction: column;
  gap:10px;
`



