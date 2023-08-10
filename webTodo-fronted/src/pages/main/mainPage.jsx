import { useState } from 'react';
import { Grid, GridItem } from "@chakra-ui/react";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faHouse,
  faGear,
  faStar,
  faBell,
} from "@fortawesome/free-solid-svg-icons";
import Calendar from "react-calendar";

const mainPage = () => {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const handleDateChange = (date) => {
    setSelectedDate(date);
  };
  const iconSize = "2x"; // 아이콘 크기 설정 ("lg", "2x", "3x" 등)
  const iconMarginBottom = "3rem"; // 아이콘 간격 설정
  const iconMarginTop = "2rem";

  return (
    <div style={{ height: "100vh", width: "100vw" }}>
      <Grid
        h="100%"
        templateRows="repeat(1, 1fr)"
        templateColumns="repeat(12, 1fr)"
        gap={4}
      >
        <GridItem rowSpan={1} colSpan={1} bg="var(--mainColor)">
          <FontAwesomeIcon
            icon={faHouse}
            size={iconSize}
            style={{ marginBottom: iconMarginBottom, marginTop: iconMarginTop }}
          />
          <br />
          <FontAwesomeIcon
            icon={faStar}
            size={iconSize}
            style={{ marginBottom: iconMarginBottom }}
          />
          <br />
          <FontAwesomeIcon
            icon={faBell}
            size={iconSize}
            style={{ marginBottom: iconMarginBottom }}
          />
          <br />
          <FontAwesomeIcon
            icon={faGear}
            size={iconSize}
            style={{ marginBottom: iconMarginBottom }}
          />
          <br />
          <br />
          <Link to="/login">로그인</Link>
          <br />
          <Link to="/register"> 회원가입</Link>
          <br />
        </GridItem>
        <GridItem colSpan={3}>
          {" "}
          <h1>Your Calendar</h1>
          <Calendar onChange={handleDateChange} value={selectedDate} />
          <p>Selected date: {selectedDate.toDateString()}</p>{" "}
        </GridItem>
        <GridItem colSpan={7} />
      </Grid>
    </div>
  );
};

export default mainPage;
