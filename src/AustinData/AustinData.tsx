import React, { useState, useEffect } from "react";
import snoowrap from "snoowrap";
import {
  Button,
  makeStyles,
  Box,
  CircularProgress,
  Link,
  AppBar,
  Toolbar,
  Typography,
} from "@material-ui/core";
import { Link as RRLink } from "react-router-dom";
import { TimeSensitiveMessage } from "./TimeSensitiveMessage";

const useStyles = makeStyles((theme) => ({
  appBar: {
    backgroundColor: "lightGrey",
  },
  pageContainer: {
    margin: "12px",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  item: {
    margin: "8px",
  },
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
    color: "black",
  },
  headerImage: {
    height: "30px",
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
  return s
    .sort((post) => post.created)
    .filter(
      (post) =>
        post.subreddit_name_prefixed === "r/Austin" &&
        post.title.includes("Travis County COVID-19")
    );
};

const getReadableDate = (timestamp: number) => {
  const date = new Date(timestamp * 1000);
  // const year = date.getFullYear();
  const month = date.getMonth() + 1;
  const day = date.getDate();
  // const hours = date.getHours();
  // const minutes = date.getMinutes();
  // const seconds = date.getSeconds();
  return `${month}/${day}`;
};

const getRedditUrl = (url) => `https://reddit.com${url}`;

export const AustinData = () => {
  const [posts, setPosts] = useState([]);
  const classes = useStyles();
  const newestPost = posts[0];

  useEffect(() => {
    getSubmissions().then(setPosts);
  }, []);

  return (
    <div>
      <AppBar className={classes.appBar} position="static">
        <Toolbar>
          <Typography variant="h6" className={classes.title}>
            Latest COVID-19 Data for Austin, TX
          </Typography>
          <Button component={RRLink} to={"/main"}>
            Main Dashboard
          </Button>
          <Button href="https://github.com/mitchelconstantin/covid-19-tracker">
            <img
              alt="github logo"
              className={classes.headerImage}
              src={"/github.png"}
            />
          </Button>
        </Toolbar>
      </AppBar>

      <Box className={classes.pageContainer}>
        {newestPost && (
          <>
            <TimeSensitiveMessage time={newestPost.created_utc} />
            <Button
              className={classes.item}
              component={Link}
              href={getRedditUrl(newestPost.permalink)}
            >
              Reddit Thread {getReadableDate(newestPost.created_utc)}
            </Button>
            <img alt="latest Austin data" src={newestPost.url} width="97%" />
          </>
        )}
        {!newestPost && <CircularProgress />}
      </Box>
    </div>
  );
};
