/*eslint-disable*/
import { useSelector } from "react-redux";
import { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Checkbox } from "@chakra-ui/react";
import {
  faXmark,
  faPen,
  faEllipsisVertical,
} from "@fortawesome/free-solid-svg-icons";
import { faStar as emptyStar } from "@fortawesome/free-regular-svg-icons";
import { faStar as fullStar } from "@fortawesome/free-solid-svg-icons";
import { useDispatch } from "react-redux";
import styled from "styled-components";
import oppenheimer from "./Oppenheimer.png";
import Button from "@components/Button/Button";
import ModifyModal from "@layout/Main/Modal/ModifyModal";
import DeleteModal from "@layout/Main/Modal/DeleteModal";
import Loading from "@components/Loading/Loading";
import  importance, { addImportanceContent, fetchImportanceContent, removeImportanceContent } from "@/store/importance";
import axios from "axios";

const TodoContent = (props) => {
  const dateArr = useSelector((state) => state.todo.date);
  const allUniqueDates = useSelector((state) => state.date.allUniqueDates);
  const selectCalendarDate = useSelector(
    (state) => state.date.selectCalendarDate
  );
  
  const [hiddenVisible, setHiddenVisible] = useState(false);
  const [groupedByTag, setGroupedByTag] = useState({});
  const [visibleButton, setVisibleButton] = useState([]);
  const allData = useSelector(state=>state.data.data)
  const [modalInfo, setModalInfo] = useState({
    type: null,
    data: null,
  });
  const importanceContent = useSelector(state=>state.importance.importanceContent)
  const dispatch = useDispatch();
  // selectTag로 그룹화
  useEffect(() => {
    if (allData) {
      const findMatchDate = allUniqueDates.find(
        (element) => element === dateArr[0]
      );
      const filteredData = allData.filter((data) =>
        data.date.includes(findMatchDate)
      );

      const groupedByTag = filteredData.reduce((acc, curr) => {
        const { selectTag, _id, content, selectTime } = curr;
        if (acc[selectTag])
          acc[selectTag].push({ _id, content, time: selectTime });
        else acc[selectTag] = [{ _id, content, time: selectTime }];
        return acc;
      }, {});
      setGroupedByTag(groupedByTag);
    }
  }, [allData, selectCalendarDate]);

  useEffect(()=>{
    dispatch(fetchImportanceContent())
    
  },[dispatch])

    // 투두 설정 버튼 visible
  const handleMouseOver = (uniqueKey) => {
    setVisibleButton((prev) => ({ ...prev, [uniqueKey]: true }));
  };

  const handleMouseOut = (uniqueKey) => {
    setVisibleButton((prev) => ({ ...prev, [uniqueKey]: false }));
  };
  // 투두 수정삭제 모달 open / close
  const handleOpenModal = (type, item) => {
    setModalInfo({ type, data: item, id: item._id });
  };

  const handleCloseModal = () => {
    setModalInfo((prev) => ({ ...prev, type: null })); 
  };
  console.log(importanceContent);
  
  if(allData.length == 0){
    return(
      <Loading></Loading>
    )
  }
  
  return (
    <TodoContainer>
      {allData.length != 0
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
                  const uniqueKey = item._id;
                  const importantItem = importanceContent.find(content => content.contentId === item._id);
                  const isItemVisible = importantItem && importantItem.visible;
                  return (
                    <TodoContentBox key={uniqueKey}>
                      <TodoContentGroup>
                        <Checkbox>
                          <span>{item.content}</span>
                          <span>{item.time}</span>
                        </Checkbox>
                      </TodoContentGroup>
                      <TodoButtonGroup
                        onMouseOver={() => {
                          handleMouseOver(uniqueKey);
                        }}
                        onMouseOut={() => {
                          handleMouseOut(uniqueKey);
                        }}
                      >
                        <HideButton visible={visibleButton[uniqueKey]}>
                          <Button
                            name={<FontAwesomeIcon icon={faPen} size="sm" />}
                            onClick={() => handleOpenModal("modify", item)}
                          />

                          <Button
                            name={<FontAwesomeIcon icon={faXmark} size="sm" />}
                            onClick={() => handleOpenModal("delete", item)}
                          />
                          
                          <Button
                            name={
                              isItemVisible ?
                              <FontAwesomeIcon icon={fullStar} size='sm'/>:
                              <FontAwesomeIcon icon={emptyStar} size="sm" />
                            }
                            onClick={async () => {
                              const existContent = importanceContent.find(content => content.contentId == item._id);
                              const importanceData = {
                                contentId: item._id,
                                content: item.content,
                                time: item.time,
                                visible:true
                              };
                              if (existContent){
                                dispatch(removeImportanceContent(item._id));
                                axios.post('api/delete/importance/content', { importanceData })
                                  .then(result=>{console.log(result.data)})
                                  .catch(error=>console.log(error))
                              }
                              else {
                                dispatch(addImportanceContent(importanceData));
                                axios.post('/api/importance/content', { importanceData })
                                  .then(result=>{console.log(result.data)})
                                  .catch(error=>console.log(error))
                              }
                            }}
                          />
                        </HideButton>

                        <VisibleButton visible={visibleButton[uniqueKey]}>
                          <FontAwesomeIcon icon={faEllipsisVertical} />
                        </VisibleButton>

                        <ModifyModal
                          isOpen={
                            modalInfo.type === "modify" &&
                            modalInfo.id === item._id
                          }
                          onClose={handleCloseModal}
                          contentData={modalInfo.data || ""}
                          getAllData={props.getAllData}
                          handleMouseOut={handleMouseOut}
                          uniqueKey={uniqueKey}
                        />
                        <DeleteModal
                          isOpen={
                            modalInfo.type === "delete" &&
                            modalInfo.id === item._id
                          }
                          onClose={handleCloseModal}
                          contentData={modalInfo.data || ""}
                          getAllData={props.getAllData}
                          handleMouseOut={handleMouseOut}
                          uniqueKey={uniqueKey}
                          
                        />
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
  width: 100%;
  gap: 10px;
`;

const TodoContentBox = styled.div`
  width: 100%;
  align-items: center;
  display: flex;
  justify-content: space-between;
  gap: 10px;
`;

const TodoContentGroup = styled.div`
  padding: 10px;
`;
const TodoButtonGroup = styled.div`
  display: flex;
  align-items: center;
`;

/* const TodoButton = styled.button`
  padding: 10px;
  background: ${({ buttoncolor }) => (buttoncolor ? buttoncolor : "")};
  border-radius: 4px;
  margin-left: 3px;
`; */

const VisibleButton = styled.div`
  opacity: ${(props) => (props.visible ? 0 : 1)};
`;

const HideButton = styled.div`
  opacity: ${(props) => (props.visible ? 1 : 0)};
  visibility: ${(props) => (props.visible ? "visible" : "hidden")};
  transition: all 0.5s;
`;


