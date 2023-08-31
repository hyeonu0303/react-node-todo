/*eslint-disable */
import { useState, useRef, useEffect } from "react";
import styled from "styled-components";
import PropTypes from "prop-types";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faPlus,
  faTag,
  faClock,
} from "@fortawesome/free-solid-svg-icons";

import { useDispatch, useSelector } from "react-redux";
import { changeContent } from "../../../store/todoSlice";
import axios from "axios";

const TodoDiv = styled.div`
  width:100%;
  border: 2px solid #7f7f7f48;
  border-radius: 15px;
  text-align: left;
  cursor: pointer;
  padding: 0px;
  position: relative;
  box-shadow:3px 3px 5px grey;
`;

const TodoInput = styled.input`
  width: 100%;
  padding: 35px;
  border: none;
  font-size: 20px;
  background-color: transparent;
  &:focus {
    outline: none;
    background-color: transparent;
  }

  @media screen and (max-width:996px){
    font-size: 16px;
    padding:32px;
  }

  @media screen and (max-width:768px){
    font-size: 16px;
    padding:28px;
  }
`;

const AddTodoButton = styled.button`
  font-size: 20px;
  padding: 2px 8.25px; /* 패딩을 한 줄로 정리 */
  border-radius: 5px;
  position: absolute;
  bottom: 10px; /* 아래 여백을 조절하여 위치 조정 */
  right: 10px; /*오른쪽 여백을 조절하여 위치 조정 */
  &:hover {
    background-color: var(--mainColor);
  }
`;

const SetTodoButton = styled.button`
  font-size: 20px;
  padding: 20px;
  
`;

const DropdownWrapper = styled.div`
  position: relative;
  display: inline-block;
  
`;

const DropdownMenu = styled.ul`
  width: 200px;
  position: absolute;
  top: 80%;
  left: 0;
  background-color: white;
  border: 1px solid #ccc;
  list-style: none;
  padding: 0;
  margin: 0;
  display: inline-block;
`;

const TagList = styled.li `
padding: 10px;
  
`

/* const CategoryDiv = styled.div`

`; */

const AddTagInput = styled.input`
width: 80%;

  border: none;

  background-color: transparent;
  &:focus {
    outline: none;
    background-color: transparent;
  }
`;
const AddTagButton = styled.button`
  width: 20%;
`;

function App() {
  return (
    <TodoDiv>
      <TodoContainer />
    </TodoDiv>
  );
}

function BeforeModal({ toggleModal }) {
  const dispatch = useDispatch();
  let [inputValue,setInputValue]=useState('');
  useEffect(()=>{
    dispatch(changeContent(inputValue))
  },[inputValue])

  return (
    <div style={{width:'100%'}}>
      <TodoInput
        type="text"
        placeholder="오늘의 할일은 무엇인가요?"
        onClick={toggleModal}
        value={(inputValue)}
        onChange={e=>setInputValue(e.target.value)}
      />
      <ShowCategory></ShowCategory>
    </div>
  );
}



function ExpModal({ closeModal }) {

  const todoData = useSelector(state=>state.todo);
  /**모달창닫기와 데이터POST요청 */
  const handleAddButton= () => {
    closeModal;
    axios.post('/api/todoData',{
      todoData
    })
    .then((response)=>{
      console.log('요청성공'+response);
    })
  }
  return (
    <div>
      <SetTodoButton>
        <FontAwesomeIcon icon={faClock} style={{ color: "#000000" }} />
      </SetTodoButton>
      <SetTag />

      {/* 
      * @todo post요청보내야함
      */}
      <AddTodoButton onClick={handleAddButton}>
        <FontAwesomeIcon icon={faPlus} style={{ color: "#000000" }} />
      </AddTodoButton>
    </div>
  );
}

function TodoContainer() {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const modalRef = useRef(null);

  const toggleModal = () => {
    setIsModalVisible(true);
  };

  const closeModal = () => {
    setIsModalVisible(false);
    
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
      <BeforeModal toggleModal={toggleModal} />
      {isModalVisible && <ExpModal closeModal={closeModal} />}
    </div>
  );
}

function SetTag() {
  const [isOpen, setIsOpen] = useState(false);
  const [tags, setTags] = useState([]);

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const handleTagAdd = (newTag) => {
    setTags([...tags, newTag]);
  };

  const handleKeyDown = (event) => {
    if (event.key === 'Enter') {
      const newTag = event.target.value;
      if (newTag.trim() !== "") {
        handleTagAdd(newTag);
        event.target.value = ""; // 입력 필드 초기화
      }
    }
  };

  return (
    <DropdownWrapper> 
      <SetTodoButton onClick={toggleDropdown}>
        <FontAwesomeIcon icon={faTag} style={{ color: "#000000" }} />
      </SetTodoButton>
      {isOpen && (
        <DropdownMenu>
          {tags.map((tag, index) => (
            <TagList key={index}>{tag}</TagList>
          ))}
          <TagList>
            <AddTagInput
              id="newTagInput"
              type="text"
              placeholder="추가할 태그 입력"
              onKeyDown={handleKeyDown}
            />
            <AddTagButton
              onClick={() => {
                const newTag = document.querySelector("#newTagInput").value;
                if (newTag.trim() !== "") {
                  handleTagAdd(newTag);
                  document.querySelector("#newTagInput").value = ""; 
                }
              }}
            >
              +
            </AddTagButton>
          </TagList>
        </DropdownMenu>
      )}
    </DropdownWrapper>
  );
}


function ShowCategory() {
  return <p></p>;
}



BeforeModal.propTypes = {
  toggleModal: PropTypes.func.isRequired,
};

ExpModal.propTypes = {
  closeModal: PropTypes.func.isRequired,
};

export default App;