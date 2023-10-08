/*eslint-disable*/
import { useSelector } from "react-redux";
import styled from "styled-components";
import { Checkbox, Text, useDisclosure } from "@chakra-ui/react";
import oppenheimer from "./Oppenheimer.png";
import { useState, useEffect } from "react";
import Button from "@components/Button/Button";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmark, faPen } from "@fortawesome/free-solid-svg-icons";
import ModifyModal from "@components/Modal/ModifyModal";
import DeleteModal from "@components/Modal/DeleteModal";

const TodoContent = (props) => {
  const dateArr = useSelector((state) => state.todo.date);
  const allUniqueDates = useSelector((state) => state.date.allUniqueDates);
  const selectCalendarDate = useSelector(
    (state) => state.date.selectCalendarDate
  );
  const [visible, setVisible] = useState(false);
  const [groupedByTag, setGroupedByTag] = useState({});
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

  const { isOpen, onOpen, onClose } = useDisclosure();
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
                    <Checkbox key={uniqueKey}>
                      <span>{item.content}</span>
                      <span>{item.time}</span>
                      <Button
                        name={<FontAwesomeIcon icon={faPen} size="sm" />}
                        onClick={() => openModal(tag, index)}
                      />
                      <ModifyModal
                        isOpen={modalOpenStates[uniqueKey]}
                        onClose={() => closeModal(tag, index)}
                      />
                      <Button
                        name={<FontAwesomeIcon icon={faXmark} size="sm" />}
                        onClick={() => openDeleteModal(tag, index)}
                      />

                      <DeleteModal
                        isOpen={deleteModalOpenStates[uniqueKey]}
                        onClose={() => closeDeleteModal(tag, index)}
                      />
                    </Checkbox>
                  );
                })}
              </TodoContentArea>
            </TodoWrapper>
          ))
        : null}
      {visible == true ? (
        <div
          style={{
            position: "absolute",
            right: "0",
            bottom: "0",
          }}
          onClick={() => {
            setVisible(false);
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
            setVisible(true);
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
  gap: 10px;
`;
