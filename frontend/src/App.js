import React from 'react';

import NavBar from './components/NavBar';
import Grid from '@material-ui/core/Grid';

import { AddTimeZone } from './components/TimeZones/AddTimeZone';
import { TimeZonesList } from './components/TimeZones/TimeZonesList';

import { AddNotification } from './components/Notifications/AddNotification';
import { NotificationsList } from './components/Notifications/NotificationsList';
import { UtcPanel } from './components/UtcPanel';

import { GlobalProvider } from './context/GlobalState';

import './App.css';

import { makeStyles } from '@material-ui/core/styles';

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

function App() {
  const classes = useStyles();

  return (
    <GlobalProvider>
      <div className={classes.root}>
        <NavBar />
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <UtcPanel />
          </Grid>
          <Grid item xs={5}>
            <AddTimeZone />
            <TimeZonesList />
          </Grid>
          <Grid item xs={5}>
            <AddNotification />
            <NotificationsList />
          </Grid>
        </Grid>
      </div>
    </GlobalProvider>
  );
}

export default App;
