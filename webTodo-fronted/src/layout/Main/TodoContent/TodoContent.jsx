import { useSelector } from 'react-redux';

const TodoContent = (props) => {
  const selectDate = useSelector(state=>state.todo.date)
  console.log(props.allData)
  return (
    <div>
      {props.allData != null ? (
        <>
          {props.allData.map((item) => {
            if (selectDate == item.date) {
              return (
                <div key={item._id}>
                  <h2>{item.selectTag}</h2>
                  <hr/>
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

export default TodoContent;