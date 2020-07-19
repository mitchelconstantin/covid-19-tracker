import React from "react";
import Countdown from "react-countdown";
import { Paper } from "@material-ui/core";

const datesAreOnSameDay = (first, second) =>
  first.getFullYear() === second.getFullYear() &&
  first.getMonth() === second.getMonth() &&
  first.getDate() === second.getDate();

const updatedToday = (time) => datesAreOnSameDay(new Date(), new Date(time));

const ONE_DAY = 86400000;

export const TimeSensitiveMessage = ({ time }) => {
  const upToDate = updatedToday(time);
  const twentyFourHoursSinceLastPost = time * 1000 + ONE_DAY;
  const pastTwentyFourHours = Date.now() > twentyFourHoursSinceLastPost;

  if (upToDate) {
    return (
      <Paper style={{ backgroundColor: "#81c784", padding: "8px" }}>
        data has been updated today
      </Paper>
    );
  }
  if (pastTwentyFourHours) {
    return (
      <>
        <Paper style={{ backgroundColor: "#f44336", padding: "8px" }}>
          it has been more than 24 hours since the last post, you should see an
          update soon
        </Paper>
      </>
    );
  }
  return (
    <Paper style={{ backgroundColor: "#ffb74d", padding: "8px" }}>
      data will refresh in approximately{" "}
      <Countdown date={twentyFourHoursSinceLastPost}>
        <div> please refresh</div>
      </Countdown>
    </Paper>
  );
};
