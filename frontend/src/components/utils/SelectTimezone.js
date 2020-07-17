import React from 'react';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(theme => ({
  formControl: {
    margin: theme.spacing(1),
    minWidth: 250
  },
  selectEmpty: {
    marginTop: theme.spacing(2)
  }
}));

export const SelectTimezone = ({ time_zone, handleFunc }) => {
  const classes = useStyles();
  const tz_array = require('./timezones.json');
  const getKeybyvalue = (object, value) => {
    return Object.keys(object).find(key => object[key] === value);
  };

  return (
    <div>
      <FormControl className={classes.formControl}>
        <FormHelperText>Time zone</FormHelperText>
        <Select
          name='time_zone'
          value={time_zone}
          renderValue={time_zone => getKeybyvalue(tz_array, time_zone)}
          onChange={e => handleFunc(e)}
        >
          {Object.keys(tz_array).map((key, i) => (
            <MenuItem key={i} value={tz_array[key]}>
              {key}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </div>
  );
};
