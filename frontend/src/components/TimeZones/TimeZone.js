import React, { useState, useContext } from 'react';
import { GlobalContext } from '../../context/GlobalState';

import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';

import { EditTimeZone } from './EditTimeZone';

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

export const TimeZone = ({ timezone }) => {
  const { id, name, time_zone, time } = timezone;
  const classes = useStyles();
  const [modifyTimeZone, setModifyTimeZone] = useState(false);
  const { deleteTimeZone } = useContext(GlobalContext);

  const handleModifyTimeZone = (showForm = true) => {
    setModifyTimeZone(showForm);
  };
  return (
    <>
      {modifyTimeZone && (
        <EditTimeZone
          timezone={timezone}
          action='MODIFY'
          externalClose={handleModifyTimeZone}
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
          <Typography variant='h5' component='h2'>
            Time: {time}
          </Typography>
        </CardContent>
        <CardActions>
          <Button size='small' onClick={e => handleModifyTimeZone(e)}>
            Edit
          </Button>
          <Button size='small' onClick={() => deleteTimeZone({ id })}>
            Remove
          </Button>
        </CardActions>
      </Card>
    </>
  );
};
