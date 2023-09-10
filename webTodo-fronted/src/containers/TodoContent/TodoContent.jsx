import PropTypes from 'prop-types';
import { useSelector } from 'react-redux';


const TodoContent = (props) => {
  const selectDate = useSelector(state=>state.todo.date)
  /**
   * @todo 날짜에 맞는 데이터보여주기
   */
  return (
    <div>
      {props.allData != null ? (
        <>
          {props.allData.map((item) => {
            if (selectDate == item.date) {
              return (
                <div key={item._id}>
                  <h2>{item.selectTag}</h2>
                  <hr />
                  <p>{item.content}</p>
                </div>
              );
            }
          })}
        </>
      ) : null
      }
    </div>
  );
}

TodoContent.propTypes = {
  allData: PropTypes.array
}


export default TodoContent;