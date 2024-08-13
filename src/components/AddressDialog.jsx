import React, { useState } from "react";
import { Button, Dialog, DialogTitle, DialogContent, DialogActions, TextField } from "@mui/material";
import { useFirebase } from "../context/Firebase";

const AddressDialog = ({ open, onClose }) => {
    const {addAddressForCurrentUser} = useFirebase();
  const [address, setAddress] = useState("");

  const handleClose = () => {
    onClose();
    setAddress(""); 
  };

  const handleAddAddress = () => {
    if (address.trim() !== "") {
    //   console.log("Address added:", address.trim());
      addAddressForCurrentUser(address.trim())
      handleClose(); 
    }
  };

  return (
    <Dialog open={open} onClose={handleClose}>
      <DialogTitle>Add Address</DialogTitle>
      <DialogContent>
        <TextField
          label="Address"
          variant="outlined"
          fullWidth
          value={address}
          onChange={(e) => setAddress(e.target.value)}
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose}>Cancel</Button>
        <Button onClick={handleAddAddress}>Add</Button>
      </DialogActions>
    </Dialog>
  );
};

export default AddressDialog;
