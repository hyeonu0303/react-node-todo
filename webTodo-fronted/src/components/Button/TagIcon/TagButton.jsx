import { useState,useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTag } from "@fortawesome/free-solid-svg-icons";
import styled from "styled-components";
import axios from "axios";
import { addTag,changeSelectTag } from "@/store/todoSlice";
import { Checkbox } from "@chakra-ui/react";

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
      .then(() => {
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

export default SetTag;


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

export const AddTagButton = styled.button`
  width: 20%;
  border-radius: 5px;

  &:hover {
    background-color: var(--mainColor);
  }
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