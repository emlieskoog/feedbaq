import React from "react";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import Button from "@mui/material/Button";
import { useTranslations } from "next-intl";

interface DialogBoxProps {
  open: boolean;
  handleClose: () => void;
  dialogTitle: string;
  dialogMessage: string;
}

const DialogBox: React.FC<DialogBoxProps> = ({
  open,
  handleClose,
  dialogTitle,
  dialogMessage,
}) => {
  const t = useTranslations("DialogBoxCForm");

  return (
    <Dialog open={open} onClose={handleClose}>
      <DialogTitle>{dialogTitle}</DialogTitle>
      <DialogContent>
        <DialogContentText sx={{ whiteSpace: "pre-wrap" }}>
          {dialogMessage}
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose} color="primary" autoFocus>
          {t("close")}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default DialogBox;
