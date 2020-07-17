import React, { useContext } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';

import { GlobalContext } from '../context/GlobalState';

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1
  },
  paper: {
    padding: theme.spacing(2),
    textAlign: 'center',
    color: theme.palette.text.secondary
  }
}));

export const UtcPanel = () => {
  const { utc_time } = useContext(GlobalContext);
  const classes = useStyles();

  return (
    <>
      <Paper className={classes.paper}>UTC TIME: {utc_time}</Paper>
    </>
  );
};
