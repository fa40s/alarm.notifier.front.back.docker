import React, { useContext } from 'react';

import { TimeZone } from './TimeZone';

import { GlobalContext } from '../../context/GlobalState';

export const TimeZonesList = () => {
  const { timezones } = useContext(GlobalContext);

  return (
    <>
      {timezones.map(timezone => (
        <TimeZone key={timezone.id} timezone={timezone} />
      ))}
    </>
  );
};
