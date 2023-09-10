/*eslint-disable */
import { useState, useRef, useEffect } from "react";

import PropTypes from "prop-types";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus, faTag, faClock } from "@fortawesome/free-solid-svg-icons";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";

import {
  changeContent,
  addTag,
  changeSelectTag,
} from "@/store/todoSlice";
import {
  TodoDiv,
  TodoInput,
  AddTodoButton,
  SetTodoButton,
  DropdownWrapper,
  DropdownMenu,
  TagList,
  AddTagInput,
  AddTagButton,
} from "./TodoInputModal.styles";

function App() {
  return (
    <TodoDiv>
      <TodoContainer />
    </TodoDiv>
  );
}

function BeforeModal({ toggleModal }) {
  // 마우스 클릭 이벤트 전 모달
  const dispatch = useDispatch();
  let [inputValue, setInputValue] = useState("");
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
      />
    </div>
  );
}

function ExpModal({ closeModal }) {
  const todoData = useSelector((state) => state.todo);
  // console.log(todoData);

  /**모달창닫기와 데이터POST요청 */
  const handleAddButton = () => {
    closeModal;
    axios
      .post("/api/todoData", {
        todoData,
      })
      .then((response) => {
        console.log("요청성공" + response);
      });
  };

  return (
    <div>
      <p>{todoData.selectTag}</p>

      <SetTodoButton>
        <FontAwesomeIcon icon={faClock} style={{ color: "#000000" }} />
      </SetTodoButton>
      <SetTag/>

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

const SetTag = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [tagInputValue, setTagInputValue] = useState('');
  const dispatch = useDispatch();
  const tags = useSelector((state) => state.todo.tags);
  const [tagData,setTagData] = useState([]);

  /**태그 데이터 */
  useEffect(()=>{
    axios.get('/api/tags')
      .then(result=>{
        setTagData(result.data.tags)
      })
    },[tags])

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };
  

  
  
  /**태그추가기능 */
  const addNewTag = () => {
    if (tagInputValue !== "") {
      dispatch(addTag(tagInputValue)); //전역변수 따로저장
      
      axios.post('/api/tags', {
        tags: tagInputValue
      })
      .then(response => {
        setTagData(prevTags => [...prevTags, tagInputValue]);
      })
      .catch((error) => {
        if(error) console.log("태그저장요청에러" + error);
      })
      
      setTagInputValue('');
    }
  };
  /**태그삭제 */
  const handleTagDeletion = (index) => {
    axios.post('/api/tags/delete',{
      deleteIndex: index
    })
    .then(response=>{
      console.log(response.data)
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
      <SetTodoButton onClick={toggleDropdown}>
        <FontAwesomeIcon
          icon={faTag}
          style={{ color: "#000000" }}

        />
      </SetTodoButton>
      {/* todoData가 있으면 todoData.map  */}
      {isOpen && (
        <DropdownMenu>
          {
            tagData.map((tag,index) => (
              /**선택한 태그로직 */
              <TagList
                key={index}
                onClick={() => {
                  dispatch(changeSelectTag(tag)); //전역변수에 선택한태그넣어줌
                }}
              >
                {tag}
              <AddTagButton
              onClick={(e)=>{
                e.stopPropagation();
                handleTagDeletion(index);
              }}
            >
              x
            </AddTagButton>
              </TagList>
            ))
          }

          <TagList>
            <AddTagInput
              id="newTagInput"
              type="text"
              placeholder="추가할 태그 입력"
              value={tagInputValue}
              onChange={(e)=>{setTagInputValue(e.target.value)}}
              onKeyDown={handleEnterKey}
            />

            <AddTagButton
              onClick={addNewTag}
            >
              +
            </AddTagButton>
          </TagList>
        </DropdownMenu>
      )}
    </DropdownWrapper>
  );
};

BeforeModal.propTypes = {
  toggleModal: PropTypes.func.isRequired,
};

ExpModal.propTypes = {
  closeModal: PropTypes.func.isRequired,
};

export default App;
