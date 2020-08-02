import React from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  Link,
  Divider,
  Typography,
} from "@material-ui/core";

export const InfoDialog = ({ open, onClose }) => {
  return (
    <Dialog onClose={onClose} aria-labelledby="simple-dialog-title" open={open}>
      <DialogTitle id="simple-dialog-title">About</DialogTitle>
      <DialogContent>
        <DialogContentText id="alert-dialog-description">
          <Typography variant={"h6"}> Austin </Typography>
          <Divider style={{ marginTop: "8px", marginBottom: "8px" }} />
          This data is sourced from Reddit user{" "}
          <Link href="https://www.reddit.com/user/RationalAnarchy/">
            RationalAnarchy
          </Link>
          . Many thanks to him for his daily updates!
          <br />
          <Divider style={{ marginTop: "8px", marginBottom: "8px" }} />
          The countdown timer is set to expire 24 hours after his last post.
          This is generally around 7pm Central.
          <Divider style={{ marginTop: "8px", marginBottom: "8px" }} />
          <Typography variant={"h6"}> WorldWide </Typography>
          <Divider style={{ marginTop: "8px", marginBottom: "8px" }} />
          This data is sourced from Github user{" "}
          <Link href="https://github.com/pomber/covid19">Pomber</Link>
          . It is updated 3 times per day.
          <br />
          <Divider style={{ marginTop: "8px", marginBottom: "8px" }} />
        </DialogContentText>
      </DialogContent>
    </Dialog>
  );
};
