import axios from 'axios';
import React from 'react';
import { Icon, Segment } from 'semantic-ui-react';
import { useParams } from 'react-router-dom';
import { apiBaseUrl } from '../constants';
import {
  useStateValue,
  getPatient,
  getDiagnosisList,
  addEntry,
} from '../state';
import { Diagnoses, Entry, Patient } from '../types';
import EntryDetails from '../components/EntryDetails';
import AddEntryForm, { EntryFormValues } from '../AddEntryForm';

interface RouteParams {
  id: string;
}

const PatientPage = () => {
  const [{ patient, entry }, dispatch] = useStateValue();
  const { id } = useParams<RouteParams>();

  const [error, setError] = React.useState<string | undefined>();

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
  }, [dispatch, entry]);

  const submitNewEntry = async (values: EntryFormValues) => {
    console.log('entry from form', values);
    try {
      const { data: newEntry } = await axios.post<Entry>(
        `${apiBaseUrl}/patients/${id}/entries`,
        values
      );
      console.log(newEntry);
      dispatch(addEntry(newEntry));
    } catch (e) {
      console.error(e.response?.data || 'Unknown Error');
      setError(e.response?.data?.error || 'Unknown error');
    }
  };

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
        {error && <Segment inverted color="red">{`Error: ${error}`}</Segment>}
        <AddEntryForm onSubmit={submitNewEntry} />
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
