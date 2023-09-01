/*eslint-disable */
import { useState, useRef, useEffect } from "react";

import PropTypes from "prop-types";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus, faTag, faClock } from "@fortawesome/free-solid-svg-icons";

import { useDispatch, useSelector } from "react-redux";
import {
  changeContent,
  addTag,
  changeSelectTag,
} from "../../../store/todoSlice";
import axios from "axios";
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
} from "./todoPageStyle";

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
      <ShowCategory />

      <SetTodoButton>
        <FontAwesomeIcon icon={faClock} style={{ color: "#000000" }} />
      </SetTodoButton>
      <SetTag />

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
  const [tags, setTags] = useState([]);
  const [newTagInputValue, setNewTagInputValue] = useState("");
  const dispatch = useDispatch();
  const stateTags = useSelector((state) => state.todo.tags);

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const handleTagAdd = (newTag) => {
    setTags([...tags,newTag]);
    dispatch(addTag(newTag));
  };

  /**태그저장요청 */
  const handleTagPost = () => {
    axios.post('/api/tags',{
      tags:stateTags
    })
    .then((response)=>{'태그저장완료'})
  }

  const handleKeyDown = (event) => {
    if (event.key === "Enter") {
      const newTag = event.target.value.trim();
      if (newTag !== "") {
        handleTagAdd(newTag);
        setNewTagInputValue("");
        handleTagPost();
      }
    }
  };

  const handleInputChange = (event) => {
    setNewTagInputValue(event.target.value);
  };

  return (
    <DropdownWrapper>
      <SetTodoButton onClick={toggleDropdown}>
        <FontAwesomeIcon
          icon={faTag}
          style={{ color: "#000000" }}
          onClick={() => {}}
        />
      </SetTodoButton>
      {isOpen && (
        <DropdownMenu>
          {tags.map((tag) => (
            /**선택한 태그로직 */

            <TagList
              key={tag}
              onClick={() => {
                dispatch(changeSelectTag(tag)); //전역변수에 선택한태그넣어줌
              }}
            >
              {tag}
            </TagList>
          ))}

          <TagList>
            <AddTagInput
              id="newTagInput"
              type="text"
              placeholder="추가할 태그 입력"
              value={newTagInputValue}
              onChange={handleInputChange}
              onKeyDown={handleKeyDown}
            />

            <AddTagButton
              onClick={() => {
                const newTag = newTagInputValue.trim();
                if (newTag !== "") {
                  handleTagAdd(newTag);
                  setNewTagInputValue("");
                  handleTagPost();
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
};

function ShowCategory() {
  const todoData = useSelector((state) => state.todo);
  return <p>{todoData.selectTag}</p>;
}

BeforeModal.propTypes = {
  toggleModal: PropTypes.func.isRequired,
};

ExpModal.propTypes = {
  closeModal: PropTypes.func.isRequired,
};

export default App;
