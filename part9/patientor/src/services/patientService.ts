import uuid = require('uuid');
import { NonSensitivePatient, Patient, NewPatient } from "../types";
import patients from "../../data/patients";


const getNonSensitivePatients = (): Array<NonSensitivePatient> => {
  return patients.map(({ id, name, dateOfBirth, gender, occupation }) => ({
    id,
    name,
    dateOfBirth,
    gender,
    occupation
  }));
};

const addPatient = ( patient: NewPatient ): Patient => {
  const newPatient = {
    id: uuid.v4(),
    ...patient
  };

  patients.push(newPatient);
  return newPatient;
};

export default { getNonSensitivePatients, addPatient };