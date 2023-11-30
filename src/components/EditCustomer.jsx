import React from "react";


import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';

export default function EditCustomer(data) {
    const [customer, setCustomer] = React.useState({
        firstname: '', 
        lastname: '', 
        email: '', 
        phone: '', 
        streetaddress: '',
        postcode: '', 
        city: ''
    });
    const [open, setOpen] = React.useState(false);
  const handleClickOpen = () => {
    console.log(data.data.firstname);
    console.log("testi");
    const { firstname } = data;
console.log(firstname);

    setCustomer({
            firstname: data.data.firstname,
            lastname: data.data.lastname,
            email: data.data.email,
            phone: data.data.phone,
            streetaddress: data.data.streetaddress,
            postcode: data.data.postcode,
            city: data.data.city
    });
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  

  const handleInputChange = (e) => {
    setCustomer({...customer,[e.target.name]: e.target.value})
  }

  const updateCustomer = () => {
    
    data.updateCustomer(customer, data.data.links[0].href);
    handleClose();
  }
    
    return(
        <div>
    <React.Fragment>
      <Button variant="outlined" onClick={handleClickOpen}>
        Edit Customer
      </Button>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Edit Customer</DialogTitle>
        <DialogContent>
          <TextField
            
            margin="dense"
            name="firstname"
            value={customer.firstname}
            onChange={e => handleInputChange(e)}
            label="First Name"
            fullWidth
          />
          <TextField
            
            margin="dense"
            name="lastname"
            value={customer.lastname}
            onChange={e => handleInputChange(e)}
            label="Last Name"
            fullWidth
          />
          <TextField
            
            margin="dense"
            name="email"
            value={customer.email}
            onChange={e => handleInputChange(e)}
            label="Email"
            fullWidth
          />
          <TextField
            
            margin="dense"
            name="phone"
            value={customer.phone}
            onChange={e => handleInputChange(e)}
            label="Phone"
            fullWidth
          />
          <TextField
            
            margin="dense"
            name="streetaddress"
            value={customer.streetaddress}
            onChange={e => handleInputChange(e)}
            label="Street Address"
            fullWidth
          />
          <TextField
            
            margin="dense"
            name="postcode"
            value={customer.postcode}
            onChange={e => handleInputChange(e)}
            label="Postcode"
            fullWidth
          />
          <TextField
            
            margin="dense"
            name="city"
            value={customer.city}
            onChange={e => handleInputChange(e)}
            label="City"
            fullWidth
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={updateCustomer}>Save</Button>
        </DialogActions>
      </Dialog>
    </React.Fragment>
        </div>
    );
}