/*eslint-disable*/
import { useSelector } from "react-redux";
import styled from "styled-components";
import { Checkbox, Text, useDisclosure } from "@chakra-ui/react";
import oppenheimer from "./Oppenheimer.png";
import { useState, useEffect } from "react";
import Button from "@components/Button/Button";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmark, faPen,faEllipsisVertical } from "@fortawesome/free-solid-svg-icons";
import ModifyModal from "@components/Modal/ModifyModal";
import DeleteModal from "@components/Modal/DeleteModal";

const TodoContent = (props) => {
  const dateArr = useSelector((state) => state.todo.date);
  const allUniqueDates = useSelector((state) => state.date.allUniqueDates);
  const selectCalendarDate = useSelector(
    (state) => state.date.selectCalendarDate
  );

  const [hiddenVisible, setHiddenVisible] = useState(false);
  const [groupedByTag, setGroupedByTag] = useState({});
  const [buttonVisible, setButtonVisible] = useState(false);
  const [modalOpenStates, setModalOpenStates] = useState({});
  const [deleteModalOpenStates, setDeleteModalOpenStates] = useState({});

  // selectTag로 그룹화
  useEffect(() => {
    if (props.allData) {
      const findMatchDate = allUniqueDates.find(
        (element) => element === dateArr[0]
      );
      const filteredData = props.allData.filter((data) =>
        data.date.includes(findMatchDate)
      );

      const groupedByTag = filteredData.reduce((acc, curr) => {
        const { selectTag, content, selectTime } = curr;
        if (acc[selectTag]) acc[selectTag].push({ content, time: selectTime });
        else acc[selectTag] = [{ content, time: selectTime }];
        return acc;
      }, {});
      setGroupedByTag(groupedByTag);
    }
  }, [props.allData, selectCalendarDate]);

  // 투두 수정 모달
  
  const openModal = (tag, index) => {
    const uniqueKey = `${tag}-${index}`;
    setModalOpenStates((prevState) => ({
      ...prevState,
      [uniqueKey]: true,
    }));
  };

  const closeModal = (tag, index) => {
    const uniqueKey = `${tag}-${index}`;
    setModalOpenStates((prevState) => ({
      ...prevState,
      [uniqueKey]: false,
    }));
  };

  // 투두 삭제 모달

  const openDeleteModal = (tag, index) => {
    const uniqueKey = `${tag}-${index}`;
    setDeleteModalOpenStates((prevState) => ({
      ...prevState,
      [uniqueKey]: true,
    }));
  };

  const closeDeleteModal = (tag, index) => {
    const uniqueKey = `${tag}-${index}`;
    setDeleteModalOpenStates((prevState) => ({
      ...prevState,
      [uniqueKey]: false,
    }));
  };

  return (
    <TodoContainer>
      {props.allData != undefined
        ? Object.keys(groupedByTag).map((tag) => (
            <TodoWrapper key={tag}>
              <TodoTagArea>
                {tag == "" ? (
                  <h2 style={{ fontSize: "1.4rem" }}>😚할일</h2>
                ) : (
                  <h2 style={{ fontSize: "1.4rem" }}>😊{tag}</h2>
                )}
              </TodoTagArea>
              
              <TodoContentArea>
                {groupedByTag[tag].map((item, index) => {
                  const uniqueKey = `${tag}-${index}`;
                  return (
                    <TodoContentBox key={uniqueKey}>
                      <TodoContentGroup>
                        <Checkbox>
                          <span>{item.content}</span>
                          <span>{item.time}</span>
                        </Checkbox>
                      </TodoContentGroup>
                      <TodoButtonGroup
                        onMouseOver={()=>{setButtonVisible(true)}}
                        onMouseOut={()=>{setButtonVisible(false)}}
                      >
                        <VisibleButton setButtonVisible={buttonVisible}>
                          <FontAwesomeIcon icon={faEllipsisVertical} />
                        </VisibleButton>
                        
                        <HideButton setButtonVisible={buttonVisible} >
                          <TodoButton buttoncolor='red'>수정</TodoButton>
                          <TodoButton buttoncolor='blue'>삭제</TodoButton>
                          <TodoButton>중요</TodoButton>
                        </HideButton>
                      </TodoButtonGroup>
                    </TodoContentBox>
                  );
                })}
              </TodoContentArea>
            </TodoWrapper>
          ))
        : null}
      {hiddenVisible == true ? (
        <div
          style={{
            position: "absolute",
            right: "0",
            bottom: "0",
          }}
          onClick={() => {
            setHiddenVisible(false);
          }}
        >
          <img
            src={oppenheimer}
            style={{ borderRadius: "20px", boxShadow: "10px" }}
            alt="oppenheimer"
          />
          <em style={{ fontSize: "20px", fontWeight: "bold" }}>
            &quot;Now I am become Death, the destroyer of worlds.&quot;
          </em>
        </div>
      ) : (
        <div
          style={{
            borderRadius: "50%",
            width: "10px",
            height: "10px",
            background: "#eee",
            position: "absolute",
            right: "0",
            bottom: "20px",
          }}
          onClick={() => {
            setHiddenVisible(true);
          }}
        ></div>
      )}
    </TodoContainer>
  );
};

export default TodoContent;

const TodoContainer = styled.div`
  width: 100%;
  height: 100%;
  padding: 20px;
  position: relative;
  overflow-y: scroll;
  border-radius: 10px;

  &::-webkit-scrollbar {
    width: 5px; /* 스크롤바의 너비 */
  }

  &::-webkit-scrollbar-thumb {
    height: 28%; /* 스크롤바의 길이 */
    background: #cecece; /* 스크롤바의 색상 */
    border-radius: 5px;
  }

  &::-webkit-scrollbar-track {
    background: none; /*스크롤바 뒷 배경 색상*/
  }
`;

const TodoWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  flex-wrap: nowrap;
  gap: 10px;
`;

const TodoTagArea = styled.div`
  margin-top: 10px;
  font-size: 20px;
`;

const TodoContentArea = styled.div`
  display: flex;
  flex-direction: column;
  width:100%;
  gap:10px;
`;


const TodoContentBox = styled.div`
  width:100%;
  align-items: center;
  display:flex;
  justify-content: space-between;
  gap:10px;
`


const TodoContentGroup = styled.div`
  padding:10px;
`
const TodoButtonGroup = styled.div`
  display:flex;
  align-items: center;
`

const TodoButton = styled.button`
  padding:10px;
  background: ${({ buttoncolor }) => (buttoncolor ? buttoncolor : '')};
  margin-left:3px;
`

const VisibleButton = styled.div`
  display: ${props=>props.setButtonVisible == false ? 'block': 'none'};
`

const HideButton = styled.div`
  display: ${props=>props.setButtonVisible == true ? 'block': 'none'};
  transition: all 1s;
  position:relative;
`

