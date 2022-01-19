import { Form, Field, Formik } from 'formik';
import React from 'react';
import { Button, Segment } from 'semantic-ui-react';
import { DiagnosisSelection } from '../AddPatientModal/FormField';
import { useStateValue } from '../state';
import { HealthCheck } from '../types';
import { TextField, NumberField } from '../AddPatientModal/FormField';

export type EntryFormValues = Omit<HealthCheck, 'id'>;

interface Props {
  onSubmit: (values: EntryFormValues) => void;
}

export const AddEntryForm = ({ onSubmit }: Props) => {
  const [{ diagnosisCodes }] = useStateValue();
  return (
    <Segment>
      <h3>Add New Entry</h3>
      <Formik
        initialValues={{
          type: 'HealthCheck',
          date: '',
          description: '',
          specialist: '',
          healthCheckRating: 0,
          diagnosisCodes: [],
        }}
        onSubmit={onSubmit}
        validate={(values) => {
          const requiredError = 'Field is required';
          const errors: { [field: string]: string } = {};
          if (!values.date) {
            errors.date = requiredError;
          }
          if (!values.specialist) {
            errors.specialist = requiredError;
          }
          if (!values.description) {
            errors.description = requiredError;
          }
          if (!values.healthCheckRating) {
            errors.healthCheckRating = requiredError;
          }
          return errors;
        }}
      >
        {({ isValid, dirty, setFieldValue, setFieldTouched }) => {
          return (
            <Form className="form ui">
              <Field
                label="Date"
                placeholder="YYYY-MM-DD"
                name="date"
                component={TextField}
              />
              <Field
                label="Description"
                placeholder="Description"
                name="description"
                component={TextField}
              />
              <Field
                label="Specialist"
                placeholder="Specialist"
                name="specialist"
                component={TextField}
              />
              <Field
                label="Health Check Rating"
                name="healthCheckRating"
                component={NumberField}
                min={0}
                max={3}
              />
              <DiagnosisSelection
                setFieldValue={setFieldValue}
                setFieldTouched={setFieldTouched}
                diagnoses={Object.values(diagnosisCodes)}
              />
              <Button type="submit" color="green" disabled={!dirty || !isValid}>
                Add
              </Button>
            </Form>
          );
        }}
      </Formik>
    </Segment>
  );
};

export default AddEntryForm;
