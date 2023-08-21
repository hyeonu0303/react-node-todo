import { useState, useRef, useEffect } from "react";
import styled from "styled-components";
import PropTypes from "prop-types";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheck } from "@fortawesome/free-solid-svg-icons";

/* 문제점 
1. TodoDiv 영역의 padding을 준 부분을 클릭하면 form 확장이 안 됨
*/

const TodoDiv = styled.div`
  border: 2px solid var(--mainColor);
  border-radius: 15px;
  text-align: left;
  cursor: pointer;
  padding: 10px;
  position: relative;
`;

const TodoInput = styled.input`
  padding: 30px;
  border: none;
  &:focus {
    outline: none;
  }
`;

const TodoButton = styled.button`
  font-size: 20px;
  background-color: var(--mainColor);
  padding: 2px 8.25px; /* 패딩을 한 줄로 정리 */
  border-radius: 5px;
  position: absolute;
  bottom: 10px; /* 아래 여백을 조절하여 위치 조정 */
  right: 10px; /* 오른쪽 여백을 조절하여 위치 조정 */
`;
function App() {
  return (
    <TodoDiv>
      <TodoContainer />
    </TodoDiv>
  );
}

function BeforeModal({ toggleModal }) {
  return (
    <TodoInput
      type="text"
      placeholder="Input the Todo ..."
      onClick={toggleModal}
    />
  );
}

BeforeModal.propTypes = {
  toggleModal: PropTypes.func.isRequired,
};

function ExpModal({ closeModal }) {
  return (
    <div>
      <p>123</p><p>123</p><p>123</p><p>123</p>
      <TodoButton onClick={closeModal}>
      <FontAwesomeIcon icon={faCheck} style={{color: "#000000",}} />
      </TodoButton>
    </div>
  );
}

ExpModal.propTypes = {
  closeModal: PropTypes.func.isRequired,
};

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

export default App;
