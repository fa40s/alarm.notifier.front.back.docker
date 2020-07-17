import React, { useState, useContext } from 'react';
import { GlobalContext } from '../../context/GlobalState';

import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';

import { EditNotification } from './EditNotification';

const useStyles = makeStyles({
  root: {
    minWidth: 275
  },
  title: {
    fontSize: 13
  },
  pos: {
    marginBottom: 5
  }
});

export const Notification = ({ notification }) => {
  const { id, name, time_zone, time, status } = notification;
  const { deleteNotification } = useContext(GlobalContext);
  const classes = useStyles();
  const [modifyNotif, setModifyNotif] = useState(false);

  const showModifyForm = (showForm = true) => {
    setModifyNotif(showForm);
  };
  return (
    <>
      {modifyNotif && (
        <EditNotification
          notification={notification}
          action='MODIFY'
          closer={showModifyForm}
        />
      )}
      <Card className={classes.root} variant='outlined'>
        <CardContent>
          <Typography
            className={classes.title}
            color='textSecondary'
            gutterBottom
          >
            Name
          </Typography>
          <Typography variant='h5' component='h2'>
            {name}
          </Typography>
          <Typography className={classes.pos} color='textSecondary'>
            Timezone: {time_zone}
          </Typography>
          <Typography variant='body1' component='p'>
            Trigger Time: {time}
            <br />
          </Typography>
          <Typography variant='h5' component='h2'>
            STATUS: {status}
          </Typography>
        </CardContent>
        <CardActions>
          <Button size='small' onClick={e => showModifyForm(true)}>
            Edit
          </Button>
          <Button size='small' onClick={() => deleteNotification({ id })}>
            Remove
          </Button>
        </CardActions>
      </Card>
    </>
  );
};
