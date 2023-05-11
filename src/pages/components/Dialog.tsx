import * as React from "react";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import Button from "./Button";
import { createTheme } from "@mui/material/styles";
import { ThemeProvider } from "@emotion/react";

export default function AlertDialog(props: any) {
  const [open, setOpen] = React.useState(false);

  const customTheme = createTheme({
    palette: {
      text: {
        primary: "#8B5CF6",
      },
    },
  });

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div>
      <Button
        color="purple"
        className="hover:bg-purple-500"
        onClick={handleClickOpen}
      >
        {props.buttonText}
      </Button>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle
          id="alert-dialog-title"
          className="text-2xl mb-1 text-purple-700 font-bold text-center"
        >
          {props.dialogTitle}
          <hr className="border-2 border-purple-500" />
        </DialogTitle>
        <DialogContent className="text-purple-500 mb-1">
          <ThemeProvider theme={customTheme}>
            <DialogContentText id="alert-dialog-description" color="#a855f7">
              {props.dialog}
            </DialogContentText>
          </ThemeProvider>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="purple" colorVariant="500">
            Cancelar
          </Button>
          <Button
            onClick={() => {
              handleClickOpen();
              props.onClose();
            }}
            color="purple"
            colorVariant="800"
          >
            {props.dialogButton}
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
