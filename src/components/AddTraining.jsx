import React from "react";


import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';


export default function AddTraining(data) {
    const [open, setOpen] = React.useState(false);
    const [training, setTraining] = React.useState({
        date: new Date(), activity: '', duration: '', customer: ''})

  const handleClickOpen = () => {
    console.log(data.data.firstname);
    console.log("testi");

    setTraining({
      customer: data.data.links[0].href
});
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleInputChange = (e) => {
    setTraining({...training,[e.target.name]: e.target.value})
  }

  const addTraining = () => {
    data.saveTraining(training);
    handleClose();
  }

   const handleDateChange = (date) => {
    setTraining({
      ...training,
      date,
    });
  };
    
    return(
        <div>
    <React.Fragment>
      
      <Button variant="outlined" onClick={handleClickOpen}>
        Add Training
      </Button>
      <Dialog open={open} onClose={handleClose} >
        <DialogTitle>New Training</DialogTitle>
        <DialogContent>
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <DateTimePicker
            onChange={handleDateChange}
            value={training.date}
            />
          </LocalizationProvider>
          <TextField
            
            margin="dense"
            name="activity"
            value={training.activity}
            onChange={e => handleInputChange(e)}
            label="Activity"
            fullWidth
          />
          <TextField
            
            margin="dense"
            name="duration"
            value={training.duration}
            onChange={e => handleInputChange(e)}
            label="Duration"
            fullWidth
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={addTraining}>Save</Button>
        </DialogActions>
      </Dialog>
    </React.Fragment>
        </div>
    );
}