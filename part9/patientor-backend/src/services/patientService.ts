import uuid = require('uuid');
import { NonSensitivePatient, Patient, NewPatient, Entry } from '../types';
import patients from '../../data/patients';

const getNonSensitivePatients = (): Array<NonSensitivePatient> => {
  return patients.map(
    ({ id, name, dateOfBirth, gender, occupation, entries }) => ({
      id,
      name,
      dateOfBirth,
      gender,
      occupation,
      entries,
    })
  );
};

const getNonSensitivePatient = (
  id: string
): NonSensitivePatient | undefined => {
  return patients.find((patient) => patient.id === id);
};

const addPatient = (patient: NewPatient): Patient => {
  const newPatient = {
    id: uuid.v4(),
    ...patient,
  };

  patients.push(newPatient);
  return newPatient;
};

const addEntry = (patientId: string, entry: Entry): Entry => {
  const id = uuid.v4();

  const newEntry = {
    ...entry,
    id,
  };

  const patient = patients.find((patient) => patient.id === patientId);
  if (patient) {
    patient.entries.push(newEntry);
    return newEntry;
  } else {
    throw new Error('Could not find patient');
  }
};

export default {
  getNonSensitivePatients,
  getNonSensitivePatient,
  addPatient,
  addEntry,
};
