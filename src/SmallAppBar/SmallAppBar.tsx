import React, { useState } from "react";
import {
  AppBar,
  Toolbar,
  Typography,
  IconButton,
  makeStyles,
} from "@material-ui/core";
import { InfoOutlined, GitHub } from "@material-ui/icons";
import { InfoDialog } from "../AustinData/InfoDialog";

const useStyles = makeStyles((theme) => ({
  appBar: {
    backgroundColor: "lightGrey",
  },
  title: {
    flexGrow: 1,
    color: "black",
  },
}));

interface Props {
  label: string;
}

export const SmallAppBar = ({ label }: Props) => {
  const [open, setOpen] = useState(false);
  const classes = useStyles();

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  return (
    <>
      <AppBar className={classes.appBar} position="static">
        <Toolbar>
          <Typography variant="h6" className={classes.title}>
            {label}
          </Typography>
          <IconButton onClick={handleClickOpen}>
            <InfoOutlined />
          </IconButton>
          <IconButton href="https://github.com/mitchelconstantin/covid-19-tracker">
            <GitHub />
          </IconButton>
        </Toolbar>
      </AppBar>
      <InfoDialog open={open} onClose={handleClose} />
    </>
  );
};
