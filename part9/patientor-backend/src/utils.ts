import { NewPatient, Gender, Entry, Diagnose } from './types';

const isString = (text: unknown): text is string => {
  return typeof text === 'string' || text instanceof String;
};

const parseName = (name: unknown): string => {
  if (!name || !isString(name)) {
    throw new Error('Incorrect or missing name');
  }
  return name;
};

const parseSSN = (ssn: unknown): string => {
  if (!ssn || !isString(ssn)) {
    throw new Error('Incorrect or missing ssn');
  }
  return ssn;
};

const parseOccupation = (occupation: unknown): string => {
  if (!occupation || !isString(occupation)) {
    throw new Error('Incorrect or missing occupation');
  }
  return occupation;
};

const isDate = (date: string): boolean => {
  return Boolean(Date.parse(date));
};

const parseDate = (date: unknown): string => {
  if (!date || !isString(date) || !isDate(date)) {
    throw new Error('Incorrect or missing date: ' + date);
  }
  return date;
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const isGender = (param: any): param is Gender => {
  // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
  return Object.values(Gender).includes(param);
};

const parseGender = (gender: unknown): Gender => {
  if (!gender || !isGender(gender)) {
    throw new Error('Incorrect or missing gender: ' + gender);
  }
  return gender;
};

// const isDiagnosis = (diagnosis: any): diagnosis is Diagnose => {
//   return 'code' in diagnosis && 'name' in diagnosis;
// };

const isDiagnosisCode = (diagnosis: any): diagnosis is Diagnose['code'] => {
  return isString(diagnosis);
};

const parseDiagnosis = (diagnosis: any): Array<Diagnose> => {
  if (Array.isArray(diagnosis) && diagnosis.every((d) => isDiagnosisCode(d))) {
    return diagnosis as Array<Diagnose>;
  }
  throw new Error('Incorrect diagnose ' + diagnosis);
};

const isEntry = (newEntry: any): newEntry is Entry => {
  if (
    !(
      'date' in newEntry &&
      'specialist' in newEntry &&
      'description' in newEntry &&
      (newEntry.diagnosisCodes
        ? parseDiagnosis(newEntry.diagnosisCodes) !== undefined
        : true)
    )
  )
    return false;

  switch (newEntry.type) {
    case 'OccupationalHealthcare':
      return 'employerName' in newEntry;
    case 'Hospital':
      return 'discharge' in newEntry
        ? 'date' in newEntry.discharge && 'criteria' in newEntry.criteria
        : false;
    case 'HealthCheck':
      return 'healthCheckRating' in newEntry;
    default:
      return false;
  }
};

export const parseEntry = (entry: unknown): Entry => {
  if (isEntry(entry)) {
    return entry;
  }
  throw new Error('Incorrect entry ' + entry);
};

export const assertNever = (value: never): never => {
  throw new Error(
    `Unhandled discriminated union member: ${JSON.stringify(value)}`
  );
};

type Fields = {
  name: unknown;
  dateOfBirth: unknown;
  ssn: unknown;
  gender: unknown;
  occupation: unknown;
  entries: unknown;
};

const toNewPatient = ({
  name,
  dateOfBirth,
  ssn,
  gender,
  occupation,
}: Fields): NewPatient => {
  const newPatient: NewPatient = {
    name: parseName(name),
    dateOfBirth: parseDate(dateOfBirth),
    ssn: parseSSN(ssn),
    gender: parseGender(gender),
    occupation: parseOccupation(occupation),
    entries: [],
  };
  return newPatient;
};

export default toNewPatient;
