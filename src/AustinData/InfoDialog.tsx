import React from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  Link,
  Divider,
} from "@material-ui/core";

export const InfoDialog = ({ open, onClose }) => {
  return (
    <Dialog onClose={onClose} aria-labelledby="simple-dialog-title" open={open}>
      <DialogTitle id="simple-dialog-title">About</DialogTitle>
      <DialogContent>
        <DialogContentText id="alert-dialog-description">
          This data is sourced from Reddit user{" "}
          <Link href="https://www.reddit.com/user/RationalAnarchy/">
            RationalAnarchy
          </Link>
          . Many thanks to him for his daily updates.
          <br />
          <Divider style={{ marginTop: "8px", marginBottom: "8px" }} />
          The countdown timer is set to expire 24 hours after his last post.
          This is generally around 7pm Central.
        </DialogContentText>
      </DialogContent>
    </Dialog>
  );
};
