import { useState, SyntheticEvent } from 'react';

import {
  TextField,
  InputLabel,
  MenuItem,
  Select,
  Grid,
  Button,
  SelectChangeEvent,
  Box,
} from '@mui/material';

import { Diagnosis, EntryWithoutId, HealthCheckRating } from '../../../types';

interface Props {
  onCancel: () => void;
  onSubmit: (values: EntryWithoutId) => void;
}

const AddHospitalForm = ({ onCancel, onSubmit }: Props) => {
  const [description, setDescription] = useState('');
  const [date, setDate] = useState('');
  const [specialist, setSpecialist] = useState('');
  const [diagnoses, setDiagnoses] = useState('');
  const [dispatchDate, setDispatchDate] = useState('');
  const [dispatchCriteria, setDispatchCriteria] = useState('');

  const addPatient = (event: SyntheticEvent) => {
    event.preventDefault();

    const diagnosisCodes: Array<Diagnosis['code']> = diagnoses
      ? diagnoses.split(', ')
      : [];
    onSubmit({
      type: 'Hospital',
      description,
      date,
      specialist,
      diagnosisCodes,
      discharge: {
        date: dispatchDate,
        criteria: dispatchCriteria,
      },
    });
  };

  return (
    <div>
      <Box
        component="form"
        sx={{
          '& .MuiTextField-root': { marginBlock: 1 },
        }}
        onSubmit={addPatient}
      >
        <TextField
          label="Description"
          fullWidth
          variant="outlined"
          value={description}
          onChange={({ target }) => setDescription(target.value)}
        />
        <TextField
          type="date"
          label="Date"
          fullWidth
          variant="outlined"
          value={date}
          onChange={({ target }) => setDate(target.value)}
          InputLabelProps={{
            shrink: true,
          }}
        />
        <TextField
          label="Specialist"
          fullWidth
          variant="outlined"
          value={specialist}
          onChange={({ target }) => setSpecialist(target.value)}
        />
        <TextField
          label="Diagnosis Codes"
          fullWidth
          variant="outlined"
          value={diagnoses}
          onChange={({ target }) => setDiagnoses(target.value)}
        />
        <TextField
          label="Dispatch Date"
          type="date"
          fullWidth
          variant="outlined"
          value={dispatchDate}
          onChange={({ target }) => setDispatchDate(target.value)}
          InputLabelProps={{
            shrink: true,
          }}
        />
        <TextField
          label="Dispatch Criteria"
          fullWidth
          variant="outlined"
          value={dispatchCriteria}
          onChange={({ target }) => setDispatchCriteria(target.value)}
        />

        <Grid>
          <Grid item>
            <Button
              color="secondary"
              variant="contained"
              style={{ float: 'left' }}
              type="button"
              onClick={onCancel}
            >
              Cancel
            </Button>
          </Grid>
          <Grid item>
            <Button
              style={{
                float: 'right',
              }}
              type="submit"
              variant="contained"
            >
              Add
            </Button>
          </Grid>
        </Grid>
      </Box>
    </div>
  );
};

export default AddHospitalForm;
