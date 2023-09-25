/*eslint-disable */
import { changeDate } from "@/store/todoSlice";
import Calendar from "react-calendar";
import moment from 'moment';
import { useEffect,useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { styled } from "styled-components";
import { selectMonth } from "@/store/dateSlice";
import './Calendar.css'

const ReactCalendar = (props) => {
  const dispatch = useDispatch();
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [getMonthInYear, setGetMonthInYear] = useState(moment().format('YYYY-MM'));
  const [matchDateInWeek, setMatchDateInWeek] = useState([]);
  const [matchEveryDate, setMatchEveryDate] = useState([]);
  const [month, setMonth] = useState();
  const pickedDayNumber = useSelector(state=>state.date.selectDay);
  let formatdate = moment(selectedDate).format('YYYY-MM-DD');
  const selectCalendarOption = useSelector(state=>state.date);


  /**
   * 매일,주 요일 date 전역 값넣기
   */
  useEffect(()=>{
    if(selectCalendarOption.checkedType){
      dispatch(changeDate(matchDateInWeek));
    }
    if(selectCalendarOption.checkValid == false){
      dispatch(changeDate(formatdate));
    }
  },[selectCalendarOption.checkValid,formatdate,pickedDayNumber,matchDateInWeek])
  
  useEffect(()=>{
    dispatch(selectMonth(getMonthInYear))
  },[getMonthInYear]) 
  
  /**
   * react calendar option 
   * 달력의 월이 바뀔때 이벤트 발생 
   */
  const handleActiveStartDateChange = ({ activeStartDate, view }) => {
    if (view === 'month') { // 월 뷰일 때만 처리
      const newMonthYear = moment(activeStartDate).format('YYYY-MM');
      setGetMonthInYear(newMonthYear);
      const newMonth = moment(activeStartDate).format('M');
      setMonth(newMonth);
    }
  };

  /**
   * 하루씩 더해가면서 매칭되는 날짜 담는 로직
   * @param {*} calendar 캘린더 날짜 가져옴
   * @returns 매칭된 날짜 배열에 담음
   */
  const addMatchingDate = (calendar) =>{
    const matchDate = [];
    const getThisMonth = calendar.getMonth();
    
    if(selectCalendarOption.checkedType == 'daily'){
      const today = new Date();
      const startDay = today.getDate();
      
      for(let day = startDay; day <= moment(calendar).endOf('month').date(); day++){
        const dateToAdd = new Date(calendar.getFullYear(), getThisMonth, day);
        matchDate.push(moment(dateToAdd).format('YYYY-MM-DD'));
      }
    }
    
    if(selectCalendarOption.checkedType=='week'){
      
      calendar.setDate(1); //그달의 첫날부터시작
      while (calendar.getMonth() == getThisMonth){
        const formatDate = moment(calendar).format('YYYY-MM-DD');
        if(calendar.getDay()==pickedDayNumber){
          matchDate.push(formatDate);
        }
        calendar.setDate(calendar.getDate() + 1)
      }
    }

    return matchDate;
  }

  useEffect(() => {
    const calendarDate = moment(getMonthInYear).toDate();
    const isMatchDateInMonth = addMatchingDate(calendarDate);
    setMatchDateInWeek(isMatchDateInMonth);
    console.log(isMatchDateInMonth);
  }, [pickedDayNumber]);
  
  /**날짜변경 */
  const handleDateChange = (date) => {
    setSelectedDate(date);
  };

  console.log(matchDateInWeek);
  //입력한 날짜도 같이가져와서 같은날짜와 데이터면 보여줌
  const tileContent = ({ date }) => {
    if (!props.mark) {
      return null; 
    }

    if (props.mark.find((x) => x === moment(date).format("YYYY-MM-DD"))) {
      return <Dot />;
    }

    return null;
  };
  
  
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
        onActiveStartDateChange={handleActiveStartDateChange}
      />
      {/* 선택한날짜표시 */}
    </>
  );
}

export default ReactCalendar;

const Dot = styled.p`
    height: 8px;
    width: 8px;
    background-color: #f87171;
    border-radius: 50%;
    margin-left:10px;
    position:absolute;
  `