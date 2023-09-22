/*eslint-disable */
import { useState, useRef, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus, faTag, faClock, faCalendarPlus, faCalendar } from "@fortawesome/free-solid-svg-icons";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import {changeDayNum} from '@/store/dateSlice';
import { changeContent, addTag, changeSelectTag, setTime, clearTime } from "@/store/todoSlice";
import { Checkbox } from "@chakra-ui/react";

function App({getAllData}) {
  return (
    <TodoDiv>
      <TodoContainer getAllData={getAllData}/>
    </TodoDiv>
  );
}

function TodoContainer({ getAllData }) {
  const [isModalVisible, setIsModalVisible] = useState(false);
  let [inputValue, setInputValue] = useState("");
  const modalRef = useRef(null);
  const todoData = useSelector((state) => state.todo);
  console.log(todoData);

  const toggleModal = () => {
    setIsModalVisible(true);
  };
  
    const closeModal = () => {
      setIsModalVisible(false);
    };

    const handleAddButton = () => {
      closeModal();
      axios
        .post("/api/todoData", {
          todoData,
        })
        .then((response) => {
          console.log("요청성공" + response.data);
        });
      getAllData();
      setInputValue('');
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
    <div ref={modalRef}>
      <BeforeModal
      inputValue={inputValue}
      setInputValue={setInputValue}
        handleAddButton={handleAddButton}
        toggleModal={toggleModal} />
      {isModalVisible && <ExpModal todoData={todoData} handleAddButton={handleAddButton}/>}
    </div>
  );
}


function BeforeModal({ inputValue, setInputValue, handleAddButton, toggleModal }) {
  // 마우스 클릭 이벤트 전 모달
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(changeContent(inputValue));
  }, [inputValue]);

  return (
    <div style={{ width: "100%" }}>
      <TodoInput
        type="text"
        placeholder="오늘의 할일은 무엇인가요?"
        onClick={toggleModal}
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
        onKeyDown={(e) => {
          if (e.key === 'Enter') {
            handleAddButton();
          }
        }
        }
      />
    </div>
  );
}

function ExpModal({ handleAddButton, todoData }) {

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

const SetTag = ({isOpen, toggleTag}) => {
  const [tagInputValue, setTagInputValue] = useState("");
  const dispatch = useDispatch();
  const tags = useSelector((state) => state.todo.tags);
  const [tagData,setTagData] = useState([]);
  const selectTag = useSelector(state=>state.todo.selectTag);
  const [isSubmitting, setIsSubmitting] = useState(false);
  /**태그 데이터 */
  useEffect(() => {
    axios.get("/api/tags").then((result) => {
      setTagData(result.data.tags);
    });
  }, [tags]);

  /**태그추가기능 */
  const addNewTag = () => {
    if (tagInputValue !== "" && !isSubmitting) {
      dispatch(addTag(tagInputValue)); //전역변수 따로저장
      setIsSubmitting(true);
      axios.post('/api/tags', {
        tags: tagInputValue
      })
      .then(response => {
        setTagData(prevTags => [...prevTags, tagInputValue]);
        setTagInputValue('');
      })
      .catch((error) => {
        if(error) console.log("태그저장요청에러" + error);
      })
      .finally(()=>{
        setIsSubmitting(false);
      })
      
    }
  };

  /**태그삭제 */
  const handleTagDeletion = (index) => {
    axios.post('/api/tags/delete',{
      deleteIndex: index
    })
    .then(response=>{
      setTagData(response.data.tags)
    })
    .catch()    
  }

  /**엔터키입력시 태그추가기능 */
  const handleEnterKey = (event) => {
    if (event.key === "Enter") {
      addNewTag();
    }
  };

  return (
    <DropdownWrapper>
      <SetTodoButton onClick={toggleTag}>
        <FontAwesomeIcon icon={faTag} style={{ color: "#000000" }} />
      </SetTodoButton>
      {/* todoData가 있으면 todoData.map  */}
      {isOpen && (
        <DropdownMenu>
          {tagData.map((tag, index) => (
            /**선택한 태그로직 */
            <TagContainer key={index}>
              <Checkbox
                colorScheme="red"
                value={tag}
                isChecked={selectTag == tag}
                disabled={selectTag && selectTag !== tag}
                onChange={(e) => {
                  if (e.target.checked == true) dispatch(changeSelectTag(tag));
                  else dispatch(changeSelectTag(""));
                }}
              >
                {tag}
              </Checkbox>
              <AddTagButton
                onClick={(e) => {
                  e.stopPropagation();
                  handleTagDeletion(index);
                }}
              >
                x
              </AddTagButton>
            </TagContainer>
          ))}

          <TagList>
            <AddTagInput
              id="newTagInput"
              type="text"
              placeholder="추가할 태그 입력"
              value={tagInputValue}
              onChange={(e) => {
                setTagInputValue(e.target.value);
              }}
              onKeyDown={handleEnterKey}
            />

            <AddTagButton onClick={addNewTag}>+</AddTagButton>
          </TagList>
        </DropdownMenu>
      )}
    </DropdownWrapper>
  );
};

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

const SetDay = ({isOpen, toggleDay}) => {

  const dispatch = useDispatch();
  const [isDailyChecked, setIsDailyChecked] = useState(false); // 매일
  const [isWeekChecked, setIsWeekChecked] = useState(false);  // 요일
  const [isDayChecked, setIsDayChecked] = useState(false); // 특정 날짜
  const [selectedDay, setSelectedDay] = useState('');
  
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
                    checked={isDailyChecked}
                    onChange={(e) => setIsDailyChecked(e.target.checked)}
                    disabled={isWeekChecked || isDayChecked}
                    style={{ width: '110px' }}
                  >
                    매일 반복
                  </Checkbox>
                </CheckboxContainer>
                
                <CheckboxContainer>
                  <Checkbox 
                    checked={isWeekChecked}
                    onChange={(e) => {
                      setIsWeekChecked(e.target.checked);
                      if (e.target.checked) {
                        setIsDailyChecked(false);
                      }
                    }}
                    disabled={isDailyChecked || isDayChecked}
                    style={{ width: '110px' }}
                  >
                    요일 반복
                  </Checkbox>
                <ComboBox disabled={!isWeekChecked} value={selectedDay} onChange={handleDayChange}>
                  <option value='' disabled>선택</option>
                  {["월", "화", "수", "목", "금", "토", "일"].map(day => (
                    <option key={day} value={day} >{day}</option>
                  ))}
                </ComboBox>
              </CheckboxContainer>

                <CheckboxContainer>
                  <Checkbox 
                    checked={isDayChecked}
                    onChange={(e) => {
                      setIsDayChecked(e.target.checked);
                      if (e.target.checked) {
                        setIsDailyChecked(false);
                      }
                    }}
                    disabled={isDailyChecked || isWeekChecked}
                    style={{ width: '110px' }}
                  >
                    날짜 선택
                  </Checkbox>
                  <AddTagButton>
                    <FontAwesomeIcon 
                      icon={faCalendar}
                      style={{ color: isDayChecked ? "#000000" : "#C0C0C0",  marginLeft:"7px" }}
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

export default App;

import styled from "styled-components";

export const TodoDiv = styled.div`
  margin-left: 10px;
  margin-right: 10px;
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
