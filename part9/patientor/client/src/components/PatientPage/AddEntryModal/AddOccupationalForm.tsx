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
  Typography,
} from '@mui/material';

import { Diagnosis, EntryWithoutId, HealthCheckRating } from '../../../types';

interface Props {
  onCancel: () => void;
  onSubmit: (values: EntryWithoutId) => void;
}

const AddOccupationalForm = ({ onCancel, onSubmit }: Props) => {
  const [description, setDescription] = useState('');
  const [date, setDate] = useState('');
  const [specialist, setSpecialist] = useState('');
  const [diagnoses, setDiagnoses] = useState('');
  const [employerName, setEmployerName] = useState('');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');

  const addPatient = (event: SyntheticEvent) => {
    event.preventDefault();

    const diagnosisCodes: Array<Diagnosis['code']> = diagnoses
      ? diagnoses.split(', ')
      : [];
    onSubmit({
      type: 'OccupationalHealthcare',
      description,
      date,
      specialist,
      diagnosisCodes,
      employerName,
      sickLeave: { startDate, endDate },
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
          label="Employer Name"
          fullWidth
          variant="outlined"
          value={employerName}
          onChange={({ target }) => setEmployerName(target.value)}
        />

        <InputLabel style={{ marginTop: 8 }}>Sick Leave</InputLabel>

        <TextField
          type="date"
          label="Start Date"
          fullWidth
          variant="outlined"
          value={startDate}
          onChange={({ target }) => setStartDate(target.value)}
          InputLabelProps={{
            shrink: true,
          }}
        />
        <TextField
          type="date"
          label="End Date"
          fullWidth
          variant="outlined"
          value={endDate}
          onChange={({ target }) => setEndDate(target.value)}
          InputLabelProps={{
            shrink: true,
          }}
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

export default AddOccupationalForm;
