/*eslint-disable*/
import { useSelector } from "react-redux";
import styled from "styled-components";
import { Checkbox, Text, useDisclosure } from "@chakra-ui/react";
import oppenheimer from "./Oppenheimer.png";
import { useState, useEffect } from "react";
import Button from "@components/Button/Button";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmark, faPen,faEllipsisVertical } from "@fortawesome/free-solid-svg-icons";
import { faStar } from "@fortawesome/free-regular-svg-icons";

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
  const [visibleButton, setVisibleButton] = useState([]);

  const [modalInfo, setModalInfo] = useState({
    type: null,
    data: null
  })
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
        const { selectTag, _id ,content, selectTime } = curr;
        if (acc[selectTag]) acc[selectTag].push({ _id,content, time: selectTime });
        else acc[selectTag] = [{ _id,content, time: selectTime }];
        return acc;
      }, {});
      setGroupedByTag(groupedByTag);
    }
  }, [props.allData, selectCalendarDate]);

  useEffect(()=>{
    console.log(groupedByTag)
  },[])
  // 투두 수정 모달
  
  const handleOpenModal = (type, item) => {
    setModalInfo({type, data:item})
  }

  const handleCloseModal = (type,item) => {
    setModalInfo({type, data:item})
  }

  const handleMouseOver = (uniqueKey)=>{
    setVisibleButton(prev => ({ ...prev, [uniqueKey]: true }));
  }

  const handleMouseOut = (uniqueKey) => {
    setVisibleButton(prev => ({ ...prev, [uniqueKey]: false }));
  }
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
                  const uniqueKey = item._id
                  return (
                    <TodoContentBox key={uniqueKey}>
                      <TodoContentGroup>
                        <Checkbox>
                          <span>{item.content}</span>
                          <span>{item.time}</span>
                        </Checkbox>
                      </TodoContentGroup>
                      <TodoButtonGroup
                        onMouseOver={()=>{handleMouseOver(uniqueKey)}}
                        onMouseOut={()=>{handleMouseOut(uniqueKey)}}
                      >

                        <HideButton visible={visibleButton[uniqueKey]} >
                          <Button 
                            name={<FontAwesomeIcon icon={faPen} size="sm" />}
                            onClick={() => handleOpenModal('modify', item)}
                          />
                          
                          <Button 
                            name={<FontAwesomeIcon icon={faXmark} size="sm" />}
                            onClick={() => handleOpenModal('delete', item)}
                          />
                          
                          <Button name={<FontAwesomeIcon icon={faStar} size='sm'/>}/>
                        </HideButton>

                        <VisibleButton visible={visibleButton[uniqueKey]}>
                          <FontAwesomeIcon icon={faEllipsisVertical} />
                        </VisibleButton>
                        
                      </TodoButtonGroup>
                      {/* 버튼 */}
                      <ModifyModal
                        isOpen={modalInfo.type === 'modify'}
                        onClose={handleCloseModal}
                        contentData = {modalInfo.data? modalInfo.data:''}
                      />    
                      <DeleteModal
                        isOpen={modalInfo.type === 'delete'}
                        onClose={handleCloseModal}
                        contentData = {modalInfo.data? modalInfo.data:''}
                      />
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
  border-radius:4px;
  margin-left:3px;
`

const VisibleButton = styled.div`
  opacity: ${props => (props.visible ? 0 : 1)};
`;

const HideButton = styled.div`
  opacity: ${props => (props.visible ? 1 : 0)};
  visibility: ${props => (props.visible ? 'visible' : 'hidden')};
  transition: all 0.5s;
`;


