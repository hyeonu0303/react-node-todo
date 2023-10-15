/*eslint-disable */
import { useDispatch, useSelector } from "react-redux";
import { useState,useEffect } from "react";
import {changeCheckVaild, changeDayNum} from '@/store/dateSlice';
import styled from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCalendarPlus,faCalendar } from "@fortawesome/free-solid-svg-icons";
import {Checkbox} from '@chakra-ui/react'
const SetDay = ({isOpen, toggleDay}) => {
  const dispatch = useDispatch();
  const [selectedDay, setSelectedDay] = useState('');
  const checkedType = useSelector(state => state.date.checkedType)
  const checkedValid = useSelector(state => state.date.checkValid)

  const handleDayChange = (e) =>{
    e.stopPropagation();
    setSelectedDay(e.target.value);
  }

  const dayMapping = {
    "월": 1,
    "화": 2,
    "수": 3,
    "목": 4,
    "금": 5,
    "토": 6,
    "일": 0,
  };
  
  useEffect(()=>{
    if(selectedDay !== ''){
      const number = dayMapping[selectedDay];
      if(number !== undefined)
        dispatch(changeDayNum(number))
    }
  },[selectedDay])

  return (
    <DropdownWrapper>
      <SetTodoButton onClick={toggleDay}>
        <FontAwesomeIcon icon={faCalendarPlus} style={{ color: "#000000" }} />
      </SetTodoButton>
  
      {isOpen && (
        <DropdownMenu>
          <div style={{ display: "flex", alignItems: "center" }}>
            <DayList>
              <CheckboxContainer>
                  <Checkbox 
                    isChecked={checkedType == 'daily' && checkedValid == true}
                    onChange={(e) => {
                      dispatch(changeCheckVaild({type:'daily', checked:e.target.checked}))
                    }}
                    disabled={checkedType != 'daily' && checkedValid != false}
                    style={{ width: '110px' }}
                  >
                    매일 반복
                  </Checkbox>
                </CheckboxContainer>
                
                <CheckboxContainer>
                  <Checkbox 
                    isChecked={checkedType == 'week' && checkedValid == true}
                    onChange={(e) => {
                      dispatch(changeCheckVaild({type:'week', checked:e.target.checked}))
                      /* if (e.target.checked) {
                        setIsDailyChecked(false);
                      } */
                    }}
                    disabled={checkedType != 'week' && checkedValid != false}
                    style={{ width: '110px' }}
                  >
                    요일 반복
                  </Checkbox>
                <ComboBox 
                  disabled={!checkedValid || checkedType !== 'week'} 
                  value={selectedDay} 
                  onChange={handleDayChange}
                >
                  
                  <option value='' disabled>선택</option>
                  {["월", "화", "수", "목", "금", "토", "일"].map(day => (
                    <option key={day} value={day} >{day}</option>
                  ))}
                </ComboBox>
              </CheckboxContainer>

                <CheckboxContainer>
                  <Checkbox 
                    isChecked={checkedType == 'day' && checkedValid == true}
                    onChange={(e) => {
                      dispatch(changeCheckVaild({type:'day', checked:e.target.checked}))
                      
                      /* if (e.target.checked) {
                        setIsDailyChecked(false);
                      } */
                    }}
                    disabled={checkedType != 'day' && checkedValid != false}
                    style={{ width: '110px' }}
                  >
                    날짜 선택
                  </Checkbox>
                  <AddTagButton>
                    <FontAwesomeIcon 
                      icon={faCalendar}
                      style={{ color: checkedType == 'day' && checkedValid ? "#000000" : "#C0C0C0",  marginLeft:"7px" }}
                    />
                  </AddTagButton>
                </CheckboxContainer>
            </DayList>
          </div>
        </DropdownMenu>
      )}
    </DropdownWrapper>
  );
};

export default SetDay;

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

export const AddTagButton = styled.button`
  width: 20%;
  border-radius: 5px;

  &:hover {
    background-color: var(--mainColor);
  }
`;
