import React from 'react';
import { Icon } from 'semantic-ui-react';
import { Entry } from '../types';
import DiagnosisCode from './DiagnosisCode';
import { Segment } from 'semantic-ui-react';

const EntryDetails = ({ entry }: { entry: Entry }) => {
  const HospitalEntry = () => {
    return (
      <Segment>
        <Icon name="hospital outline" size="big" />

        <h3>{entry.description}</h3>
        <p>{entry.date}</p>
        <ul>
          {entry.diagnosisCodes?.map((code) => (
            <li key={code}>
              <DiagnosisCode code={code} />
            </li>
          ))}
        </ul>
      </Segment>
    );
  };

  const OccupationalHealthCareEntry = () => {
    return (
      <Segment>
        <Icon name="book" size="big" />
        <h3>{entry.description}</h3>
        <p>{entry.date}</p>
        <ul>
          {entry.diagnosisCodes?.map((code) => (
            <li key={code}>
              <DiagnosisCode code={code} />
            </li>
          ))}
        </ul>
      </Segment>
    );
  };

  const HealthCheck = () => {
    return (
      <Segment>
        <Icon name="user doctor" size="big" />
        <h3>{entry.description}</h3>
        <p>{entry.date}</p>
        <ul>
          {entry.diagnosisCodes?.map((code) => (
            <li key={code}>
              <DiagnosisCode code={code} />
            </li>
          ))}
        </ul>
      </Segment>
    );
  };

  switch (entry.type) {
    case 'Hospital':
      return <HospitalEntry />;
    case 'OccupationalHealthcare':
      return <OccupationalHealthCareEntry />;
    case 'HealthCheck':
      return <HealthCheck />;
  }
};

export default EntryDetails;
