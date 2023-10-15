import axios from 'axios'

export const login = ({ userName, password }) => {
  return axios.post("/api/login", {
    userName: userName,
    password: password,
  });
};