import { useSelector } from "react-redux";
import styled from "styled-components";
import { Checkbox, Text, useDisclosure } from "@chakra-ui/react";
import oppenheimer from "./Oppenheimer.png";
import { useState } from "react";
import Button from "@components/Button/Button";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmark, faPen } from "@fortawesome/free-solid-svg-icons";
import ModifyModal from "@components/Modal/ModifyModal";
// import DeleteModal from "@components/Modal/DeleteModal";

const TodoContent = (props) => {
  const selectDate = useSelector((state) => state.todo.date);
  const allUniqueDates = useSelector(state => state.date.allUniqueDates);
  console.log(allUniqueDates);
  const [visible, setVisible] = useState(false);
  console.log(selectDate);
  // selectTag로 그룹화
  const groupedByTag = {};

  props.allData &&
    props.allData.forEach((item) => {
      const findDate = allUniqueDates.find(date=>date == selectDate[0]);
      console.log(findDate);
      if (findDate == selectDate[0]) {
        if (!groupedByTag[item.selectTag]) {
          groupedByTag[item.selectTag] = [];
        }
        groupedByTag[item.selectTag].push({
          content: item.content,
          selectTime: item.selectTime,
        });
      }
    });

  console.log(groupedByTag);

  // 투두 삭제 기능
  const deleteTodo = () => {};

  // 투두 수정 기능
  const modifyTodo = () => {
    onOpen();
  };
  const { isOpen, onOpen, onClose } = useDisclosure();
  return (
    <TodoContainer>
      {props.allData != null && selectDate[0]
        ? Object.keys(groupedByTag).map((tag) => (
            <TodoWrapper key={tag}>
              <TodoTagArea>
                {tag == "" ? <h2>✅목표</h2> : <h2>😊{tag}</h2>}
              </TodoTagArea>

              <TodoContentArea>
                {groupedByTag[tag].map((item, index) => {
                  return (
                    <Checkbox key={index}>
                      <Text>
                        <TodoContentText>
                          {item.content}
                          {item.selectTime}
                        </TodoContentText>
                        <Button name={<FontAwesomeIcon icon={faPen} size="sm" />} onClick={() => modifyTodo(item.id)} />
                        <ModifyModal isOpen={isOpen} onClose={onClose} />
                        <Button name={<FontAwesomeIcon icon={faXmark} size="sm" />} onClick={() => deleteTodo(item.id)}/>
                      </Text>
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
            top: "0",
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
            width: "5px",
            height: "5px",
            background: "#eee",
            position: "absolute",
            right: "0",
            bottom: "0",
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
  width: 99%;
  height: 100%;
  padding: 20px;
  position: relative;
  overflow-y: scroll;
  border-radius: 10px;
  
  &::-webkit-scrollbar {
      width: 5px;  /* 스크롤바의 너비 */
  }

  &::-webkit-scrollbar-thumb {
      height: 28%; /* 스크롤바의 길이 */
      background: #cecece; /* 스크롤바의 색상 */
      border-radius: 5px;
  }

  &::-webkit-scrollbar-track {
      background: none;  /*스크롤바 뒷 배경 색상*/
  }
`;

const TodoWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
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

const TodoContentText = styled.div`
  margin-right: 30px;
  text-align: left;
  display: inline-block;
`;
