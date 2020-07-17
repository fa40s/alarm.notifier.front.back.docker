import React, { useState } from 'react';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core/styles';

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

export const AddTimeZone = () => {
  const [modifyTimezone, setModifyTimezone] = useState(false);
  const classes = useStyles();

  const editTimezoneForm = (showForm = true) => {
    setModifyTimezone(showForm);
  };
  return (
    <>
      <Card className={classes.root}>
        <CardContent>
          <Button onClick={editTimezoneForm} color='primary'>
            Add Time zone
          </Button>
        </CardContent>
      </Card>
      <br />
      {modifyTimezone && (
        <EditTimeZone
          timezone={null}
          action='CREATE'
          externalClose={editTimezoneForm}
        />
      )}
    </>
  );
};
