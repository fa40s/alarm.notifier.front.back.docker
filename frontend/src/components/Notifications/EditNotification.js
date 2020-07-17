import React, { useContext, useState } from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormControl from '@material-ui/core/FormControl';
import TextField from '@material-ui/core/TextField';
import TextareaAutosize from '@material-ui/core/TextareaAutosize';
import MomentUtils from '@date-io/moment';
import moment from 'moment-timezone';
import { TimePicker, MuiPickersUtilsProvider } from '@material-ui/pickers';

import { GlobalContext } from '../../context/GlobalState';

import { SelectTimezone } from '../utils/SelectTimezone';

export const EditNotification = ({ notification, action, closer }) => {
  const [notif, setNotif] = useState({
    ...notification
  });
  const { name, comment, time_zone } = notif;
  const [open, setOpen] = useState(true);

  const { addNotification, modifyNotification } = useContext(GlobalContext);
  const [selectedDate, setSelectedDate] = useState(new Date());

  const handleDateChange = time => {
    setSelectedDate(time);
    const selectedTimeStr = time.format('YYYY-MM-DD HH:mm:ss');
    const convertedTime = moment.tz(selectedTimeStr, time_zone);
    const finalTimestamp = moment.tz(convertedTime, 'UTC').unix();
    setNotif({ ...notif, timestamp: finalTimestamp });
  };

  const handleApply = () => {
    console.log(notif);
    if (action === 'MODIFY') modifyNotification(notif);
    else if (action === 'CREATE') addNotification(notif);
    closer(false);
    setOpen(false);
  };

  const handleChange = e => {
    const { name, value } = e.target;
    setNotif({ ...notif, [name]: value });
  };

  const handleClose = () => {
    closer(false);
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
        <DialogTitle id='alert-dialog-title'>{'Notification'}</DialogTitle>
        <DialogContent>
          <DialogContentText id='alert-dialog-description'>
            Modify your Notification
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
            <br />
            <br />
            <FormControl>
              <FormHelperText>Comment</FormHelperText>
              <TextareaAutosize
                aria-label='comment textarea'
                rowsMin={3}
                rowsMax={6}
                name='comment'
                onChange={e => handleChange(e)}
                value={comment}
                placeholder='Your comment goes here...'
              />
            </FormControl>
            <SelectTimezone time_zone={time_zone} handleFunc={handleChange} />
            <br />
            <FormControl>
              <FormHelperText>Notification Time</FormHelperText>
              <MuiPickersUtilsProvider utils={MomentUtils}>
                <TimePicker
                  ampm={false}
                  value={selectedDate}
                  onChange={handleDateChange}
                />
              </MuiPickersUtilsProvider>
            </FormControl>
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
