import React, { useContext } from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormControl from '@material-ui/core/FormControl';
import TextField from '@material-ui/core/TextField';

import { GlobalContext } from '../../context/GlobalState';

import { SelectTimezone } from '../utils/SelectTimezone';

export const EditTimeZone = ({ timezone, action, externalClose }) => {
  const [timeZone, setTimeZone] = React.useState({
    ...timezone
  });
  const { name, time_zone } = timeZone;
  const [open, setOpen] = React.useState(true);

  const { addTimeZone, modifyTimeZone } = useContext(GlobalContext);

  const handleApply = () => {
    if (action === 'MODIFY') modifyTimeZone(timeZone);
    else if (action === 'CREATE') addTimeZone(timeZone);
    externalClose(false);
    setOpen(false);
  };

  const handleChange = e => {
    const { name, value } = e.target;
    setTimeZone({ ...timeZone, [name]: value });
  };

  const handleClose = () => {
    externalClose(false);
    setOpen(false);
  };

  return (
    <div>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby='alert-dialog-title'
        aria-describedby='alert-dialog-description'
      >
        <DialogTitle id='alert-dialog-title'>{'Time zone'}</DialogTitle>
        <DialogContent>
          <DialogContentText id='alert-dialog-description'>
            Modify your Time zone
          </DialogContentText>
          <form>
            <FormControl>
              <FormHelperText>Name</FormHelperText>
              <TextField
                id='standard'
                name='name'
                onChange={e => handleChange(e)}
                value={name}
              />
            </FormControl>
            <SelectTimezone time_zone={time_zone} handleFunc={handleChange} />
            <br />
          </form>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color='primary'>
            Close
          </Button>
          <Button onClick={handleApply} color='primary' autoFocus>
            Apply
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};
