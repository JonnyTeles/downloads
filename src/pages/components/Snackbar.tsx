import { iSnackbar } from "@/interfaces/snackbar.interface";
import { AlertProps, Snackbar, Stack, createTheme } from "@mui/material";
import MuiAlert from "@mui/material/Alert";
import Slide, { SlideProps } from "@mui/material/Slide";
import { forwardRef } from "react";

const Alert = forwardRef<HTMLDivElement, AlertProps>(function Alert(
  props,
  ref
) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

type TransitionProps = Omit<SlideProps, "direction">;

function TransitionDown(props: TransitionProps) {
  return <Slide {...props} direction="down" />;
}

export default function SnackBar(props: iSnackbar) {
    return (
        <Stack spacing={2} sx={{ width: "100%" }}>
      <Snackbar
        open={props.open}
        autoHideDuration={6000}
        onClose={props.closeSnackbar}
        anchorOrigin={{ horizontal: "center", vertical: "top" }}
        TransitionComponent={TransitionDown}
      >
        <Alert className={props.className}
          onClose={props.closeSnackbar}
          severity={props.type}
          sx={{ width: "100%" }}
        >
          {props.message}
        </Alert>
      </Snackbar>
    </Stack>
  );
}
