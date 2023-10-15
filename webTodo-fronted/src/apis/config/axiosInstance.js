
import axios from 'axios';

const axiosInstance = axios.create({
  baseURL: 'http://api.todo.com',
});



// const todoState = {};

/* 
const todo_state = {
  name_type: '',
  age_type: 23,
};
 */

axiosInstance.interceptors.response(() => {
  // deep copy
  /* 
  todoState = {
    nameType: '12',
    ageType: 23
  }
  */

  // 에러 처리
  // .catch((error) => {
  //   if (error.response) {
  //     console.error(
  //       "서버로부터의 응답:",
  //       error.response.data.message
  //     );
  //     alert('아이디 또는 비밀번호를 확인해주세요');
  //   } else {
  //     console.error("Axios 요청 오류:", error.message);
  //   }
  // });

});


export default axiosInstance;