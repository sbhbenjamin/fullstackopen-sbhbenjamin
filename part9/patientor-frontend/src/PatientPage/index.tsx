import axios from 'axios';
import React from 'react';
import { Icon } from 'semantic-ui-react';
import { useParams } from 'react-router-dom';
import { apiBaseUrl } from '../constants';
import { useStateValue, getPatient, getDiagnosisList } from '../state';
import { Diagnoses, Patient } from '../types';
import EntryDetails from '../components/EntryDetails';

interface RouteParams {
  id: string;
}

const PatientPage = () => {
  const [{ patient }, dispatch] = useStateValue();
  const { id } = useParams<RouteParams>();

  React.useEffect(() => {
    const fetchPatient = async () => {
      try {
        const { data } = await axios.get<Patient>(
          `${apiBaseUrl}/patients/${id}`
        );

        dispatch(getPatient(data));
      } catch (e) {
        console.error(e);
      }
    };

    const fetchDiagnosisCodes = async () => {
      try {
        const { data } = await axios.get<Diagnoses[]>(
          `${apiBaseUrl}/diagnoses/`
        );

        dispatch(getDiagnosisList(data));
      } catch (e) {
        console.error(e);
      }
    };

    void fetchPatient();
    void fetchDiagnosisCodes();
  }, [dispatch]);

  const renderGender = (gender: string) => {
    switch (gender) {
      case 'male':
        return <Icon name="venus" />;
      case 'female':
        return <Icon name="mars" />;
      case 'other':
        return <Icon name="genderless" />;
    }
  };

  if (!patient) {
    return <div>Patient not found</div>;
  } else {
    return (
      <div>
        <h2>
          {patient.name} {renderGender(patient.gender)}
        </h2>
        <p>ssn: {patient.ssn}</p>
        <p>occupation: {patient.occupation}</p>
        <h2>entries</h2>
        <div>
          {patient.entries.map((entry) => (
            <div key={entry.id}>
              <EntryDetails entry={entry} />
            </div>
          ))}
        </div>
      </div>
    );
  }
};

export default PatientPage;
