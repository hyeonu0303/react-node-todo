import { useState } from "react";
import { Grid, GridItem, Flex } from "@chakra-ui/react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHouse, faGear, faStar, faBell } from "@fortawesome/free-solid-svg-icons";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import UserStatus from "../../components/UserStatus";

import OriginModal from "./Modal/originModal";

const MainPage = () => {
  const [selectedDate, setSelectedDate] = useState(new Date());


  const handleDateChange = (date) => {
    setSelectedDate(date);
  };

  const iconSize = "2x";
  const iconMarginBottom = "1rem";


  return (
    <div style={{ height: "100vh", width: "100vw" }}>
      <Grid
        h="100%"
        templateRows="repeat(12, 1fr)"
        templateColumns="repeat(12, 1fr)"
        gap={4}
      >
        <GridItem
          rowSpan={[1, 12, 12]}
          colSpan={[12, 1, 1]}
          bg="var(--mainColor)"
          textAlign={["center", "left"]}
          padding="2rem"
        >
          <Flex
            direction={["row", "column"]}
            alignItems={["center", "flex-start"]}
            justifyContent={["space-between", "flex-start"]}
            h="100%"
          >
            <FontAwesomeIcon
              icon={faHouse}
              size={iconSize}
              style={{ marginBottom: iconMarginBottom }}
            />
            <FontAwesomeIcon
              icon={faStar}
              size={iconSize}
              style={{ marginBottom: iconMarginBottom }}
            />
            <FontAwesomeIcon
              icon={faBell}
              size={iconSize}
              style={{ marginBottom: iconMarginBottom, marginLeft: 4 }}
            />
            <FontAwesomeIcon
              icon={faGear}
              size={iconSize}
              style={{ marginBottom: iconMarginBottom, marginLeft: 2.7 }}
            />
            <UserStatus />
          </Flex>
        </GridItem>
        <GridItem
          rowSpan={[3, 5, 12]}
          colSpan={[12, 11, 3]}
          padding={["1rem", "2rem"]}
        >
          <h1>Your Calendar</h1>
          <Calendar onChange={handleDateChange} value={selectedDate} />
          <p>Selected date: {selectedDate.toDateString()}</p>
        </GridItem>
        <GridItem rowSpan={[7, 7, 12]} colSpan={[12, 11, 7]} padding={["1rem", "2rem"]}>
          <OriginModal></OriginModal>
        </GridItem>
      </Grid>
    </div>
  );
};

export default MainPage;