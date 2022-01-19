import React from 'react';
// import * as yup from 'yup';
import { Grid, Button } from 'semantic-ui-react';
import { Field, Formik, Form, ErrorMessage } from 'formik';

import { TextField, SelectField, GenderOption } from './FormField';
import { Gender, Patient } from '../types';

/*
 * use type Patient, but omit id and entries,
 * because those are irrelevant for new patient object.
 */
export type PatientFormValues = Omit<Patient, 'id' | 'entries'>;

interface Props {
  onSubmit: (values: PatientFormValues) => void;
  onCancel: () => void;
  // validationSchema: yup.ObjectSchema;
}

const genderOptions: GenderOption[] = [
  { value: Gender.Male, label: 'Male' },
  { value: Gender.Female, label: 'Female' },
  { value: Gender.Other, label: 'Other' },
];

export const AddPatientForm = ({
  onSubmit,
  onCancel,
}: // validationSchema,
Props) => {
  return (
    <Formik
      initialValues={{
        name: '',
        ssn: '',
        dateOfBirth: '',
        occupation: '',
        gender: Gender.Other,
      }}
      onSubmit={onSubmit}
      // validationSchema={validationSchema}
    >
      {({ isValid, dirty }) => {
        return (
          <Form className="form ui">
            <ErrorMessage name="name" />
            <Field
              label="Name"
              placeholder="Name"
              name="name"
              component={TextField}
            />
            <ErrorMessage name="ssn" />
            <Field
              label="Social Security Number"
              placeholder="SSN"
              name="ssn"
              component={TextField}
            />
            <ErrorMessage name="dateOfBirth" />
            <Field
              label="Date Of Birth"
              placeholder="YYYY-MM-DD"
              name="dateOfBirth"
              component={TextField}
            />
            <ErrorMessage name="occupation" />
            <Field
              label="Occupation"
              placeholder="Occupation"
              name="occupation"
              component={TextField}
            />
            <ErrorMessage name="gender" />
            <SelectField label="Gender" name="gender" options={genderOptions} />
            <Grid>
              <Grid.Column floated="left" width={5}>
                <Button type="button" onClick={onCancel} color="red">
                  Cancel
                </Button>
              </Grid.Column>
              <Grid.Column floated="right" width={5}>
                <Button
                  type="submit"
                  floated="right"
                  color="green"
                  disabled={!dirty || !isValid}
                >
                  Add
                </Button>
              </Grid.Column>
            </Grid>
          </Form>
        );
      }}
    </Formik>
  );
};

export default AddPatientForm;
