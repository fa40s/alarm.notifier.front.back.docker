import React, { useState } from 'react';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core/styles';

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

export const AddNotification = () => {
  const [modifyNotif, setModifyNotif] = useState(false);
  const classes = useStyles();

  const showModifyForm = (showForm = true) => {
    setModifyNotif(showForm);
  };
  return (
    <>
      <Card className={classes.root}>
        <CardContent>
          <Button onClick={showModifyForm} color='primary'>
            Add Notification
          </Button>
        </CardContent>
      </Card>
      <br />
      {modifyNotif && (
        <EditNotification
          notification={null}
          action='CREATE'
          closer={showModifyForm}
        />
      )}
    </>
  );
};
