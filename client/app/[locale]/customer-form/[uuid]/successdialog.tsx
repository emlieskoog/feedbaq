import React from "react";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import Button from "@mui/material/Button";

interface SuccessDialogProps {
  open: boolean;
  handleClose: () => void;
}

const SuccessDialog: React.FC<SuccessDialogProps> = ({ open, handleClose }) => {
  return (
    <Dialog open={open} onClose={handleClose}>
      <DialogTitle>Kvalitetsuppföljning inskickad</DialogTitle>
      <DialogContent>
        <DialogContentText>
          Tack! Kvalitetsuppföljningen har skickats in till HiQ.
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose} color="primary" autoFocus>
          Stäng
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default SuccessDialog;
