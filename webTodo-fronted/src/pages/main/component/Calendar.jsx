/*eslint-disable */
import { changeDate } from "../../../store/todoSlice";
import Calendar from "react-calendar";
import axios from 'axios';
import moment from 'moment';
import { useEffect,useState } from "react";
import { useDispatch } from "react-redux";
import { styled } from "styled-components";
import './reactCalendar.css'

const ReactCalendar = () => {

  let dispatch = useDispatch();
  /**날짜변경 */
  const handleDateChange = (date) => {
    setSelectedDate(date);
  };
  //선택한 날짜 todoSlice에 저장
  const [selectedDate, setSelectedDate] = useState(new Date());
  let formatdate = moment(selectedDate).format('YYYY-MM-DD');
  
  useEffect(()=>{
    dispatch(changeDate(formatdate));
  },[formatdate])

  //이사람에대한 date들을 다 보내서 배열에 저장한다..
  const [mark, setMark] = useState();
  
  /**날짜정보가져옴 */
  useEffect(()=>{
    axios.get('/api/data')
      .then((result)=>{
        setMark(result.data.dates);
      })
  },[])

  const tileContent = ({ date }) => {
    if (!mark) {
      return null; // Return null when data is not loaded
    }

    if (mark.find((x) => x === moment(date).format("YYYY-MM-DD"))) {
      return <Dot />;
    }

    return null; // No Dot for this date
  };

  const Dot = styled.div`
    height: 8px;
    width: 8px;
    background-color: #f87171;
    border-radius: 50%;
    display: flex;
    position:absolute;
  `
  return(
    <>
      <Calendar 
        calendarType="hebrew" //일요일부터시작 지우면 월요일부터
        onChange={handleDateChange} //선택날짜 selectedDate변수에담아줌
        value={selectedDate} //날짜 선택
        minDetail="month" // 상단 네비게이션에서 '월' 단위만 보이게 설정
        maxDetail="month" // 상단 네비게이션에서 '월' 단위만 보이게 설정
        showNeighboringMonth={false} //  이전, 이후 달의 날짜는 보이지 않도록 설정
        next2Label={null} //>>모양제거
        prev2Label={null} //<<모양제거
        formatDay={(locale, date) => moment(date).format("DD")} //날짜 뒤 '일'제거
        tileContent={tileContent} //Dot넣어주기 위한것(Dot필요없으면 생략!)
      />
      {/* 선택한날짜표시 */}
      <span>{moment(selectedDate).format('YYYY년 MM월 DD일')}</span>
    </>
  );
}

export default ReactCalendar;