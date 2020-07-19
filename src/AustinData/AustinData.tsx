import React, { useState, useEffect } from "react";
import snoowrap from "snoowrap";
import {
  Button,
  Grid,
  makeStyles,
  Box,
  CircularProgress,
  Link,
} from "@material-ui/core";
import { Link as RRLink } from "react-router-dom";

const useStyles = makeStyles(() => ({
  appBar: {
    backgroundColor: "lightGrey",
  },
  tabs: {
    color: "black",
  },
  dataTab: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    marginTop: "20px",
  },
  loading: {
    marginTop: "35vh",
  },
}));

const r = new snoowrap({
  userAgent: process.env.REACT_APP_USER_AGENT,
  clientId: process.env.REACT_APP_CLIENT_ID,
  clientSecret: process.env.REACT_APP_CLIENT_SECRET,
  username: process.env.REACT_APP_USER_NAME,
  password: process.env.REACT_APP_PASSWORD,
});

const getSubmissions = async () => {
  const s = await r.getUser("RationalAnarchy").getSubmissions();
  return s.sort((post) => post.created);
};

const getReadableDate = (timestamp: number) => {
  const date = new Date(timestamp * 1000);
  const year = date.getFullYear();
  const month = date.getMonth() + 1;
  const day = date.getDate();
  // const hours = date.getHours();
  // const minutes = date.getMinutes();
  // const seconds = date.getSeconds();

  return `${month}-${day}-${year}`;
};

const getRedditUrl = (url) => `https://reddit.com${url}`;

export const AustinData = ({}) => {
  const [posts, setPosts] = useState([]);
  const classes = useStyles();
  const newestPost = posts[0];

  useEffect(() => {
    getSubmissions().then(setPosts);
  }, []);

  return (
    <div>
      <Button component={RRLink} to={"/main"}>
        Main Dashboard
      </Button>
      <Box className={classes.dataTab}>
        {newestPost && (
          <>
            accurate as of {getReadableDate(newestPost.created)}
            <Link href={getRedditUrl(newestPost.permalink)}>
              See Reddit Thread
            </Link>
            {/* TODO: put time until 7pm central here */}
            <img src={newestPost.url} width="100%" />
          </>
        )}
        {!newestPost && <CircularProgress />}
      </Box>
    </div>
  );
};
