/*eslint-disable */
import { changeDate } from "../../../store/todoSlice";
import Calendar from "react-calendar";
import axios from "axios";
import moment from "moment";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { styled } from "styled-components";
import "./reactCalendar.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCalendar } from "@fortawesome/free-solid-svg-icons";

const Wrapper = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  user-select: none;
`;

const CalendarPopover = styled.div`
  position: absolute;
  top: calc(100% + 10px);
  display: ${(props) => (props.visible ? "block" : "none")};
`;

const CalendarInputBox = styled.div`
  display: flex;
  justify-content: center;
  gap: 8px;
  align-items: center;
  border: 2px solid #222222;
  border-radius: 4px;
  padding: 4px;
`;

const ReactCalendar = (props) => {
  let dispatch = useDispatch();
  /**날짜변경 */
  const handleDateChange = (date) => {
    setSelectedDate(date);
    setVisible(false);
  };
  //선택한 날짜 todoSlice에 저장
  const [selectedDate, setSelectedDate] = useState(new Date());
  let formatdate = moment(selectedDate).format("YYYY-MM-DD");
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    dispatch(changeDate(formatdate));
  }, [formatdate]);

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

  const Dot = styled.div`
    height: 8px;
    width: 8px;
    background-color: #f87171;
    border-radius: 50%;
    margin-left: 10px;
    position: absolute;
  `;
  return (
    <Wrapper>
      <CalendarInputBox
        onClick={() => {
          setVisible(!visible);
        }}
      >
        <FontAwesomeIcon icon={faCalendar} />
        {formatdate}
      </CalendarInputBox>
      <CalendarPopover visible={visible}>
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
      </CalendarPopover>
      {/* 선택한날짜표시 */}
    </Wrapper>
  );
};

export default ReactCalendar;
