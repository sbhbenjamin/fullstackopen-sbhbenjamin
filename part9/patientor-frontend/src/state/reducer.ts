import { State } from './state';
import { Diagnoses, Entry, Patient } from '../types';

export type Action =
  | {
      type: 'SET_PATIENT_LIST';
      payload: Patient[];
    }
  | {
      type: 'ADD_PATIENT';
      payload: Patient;
    }
  | {
      type: 'SET_PATIENT';
      payload: Patient;
    }
  | {
      type: 'SET_DIAGNOSIS_LIST';
      payload: Diagnoses[];
    }
  | {
      type: 'ADD_ENTRY';
      payload: Entry;
    };

export const reducer = (state: State, action: Action): State => {
  switch (action.type) {
    case 'SET_PATIENT_LIST':
      return {
        ...state,
        patients: {
          ...action.payload.reduce(
            (memo, patient) => ({ ...memo, [patient.id]: patient }),
            {}
          ),
          ...state.patients,
        },
      };
    case 'ADD_PATIENT':
      return {
        ...state,
        patients: {
          ...state.patients,
          [action.payload.id]: action.payload,
        },
      };
    case 'SET_PATIENT':
      return {
        ...state,
        patient: action.payload,
      };
    case 'SET_DIAGNOSIS_LIST':
      return {
        ...state,
        diagnosisCodes: action.payload,
      };
    case 'ADD_ENTRY':
      return {
        ...state,
        entry: action.payload,
      };
    default:
      return state;
  }
};

export const getPatient = (patient: Patient): Action => {
  return {
    type: 'SET_PATIENT',
    payload: patient,
  };
};

export const addPatient = (newPatient: Patient): Action => {
  return {
    type: 'ADD_PATIENT',
    payload: newPatient,
  };
};

export const setPatientList = (patientList: Array<Patient>): Action => {
  return {
    type: 'SET_PATIENT_LIST',
    payload: patientList,
  };
};

export const getDiagnosisList = (diagnosisList: Array<Diagnoses>): Action => {
  return {
    type: 'SET_DIAGNOSIS_LIST',
    payload: diagnosisList,
  };
};

export const addEntry = (entry: Entry): Action => {
  return {
    type: 'ADD_ENTRY',
    payload: entry,
  };
};
