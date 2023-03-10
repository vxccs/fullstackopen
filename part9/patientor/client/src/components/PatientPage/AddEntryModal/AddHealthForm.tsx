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

interface HealthCheckRatingOption {
  value: HealthCheckRating;
  label: string;
}

const healthCheckRatingOptions: HealthCheckRatingOption[] = Object.values(
  HealthCheckRating
)
  .map((v) => ({
    value: v as HealthCheckRating,
    label: v.toString(),
  }))
  .filter((v) => typeof v.value === 'number');

const AddHealthForm = ({ onCancel, onSubmit }: Props) => {
  const [description, setDescription] = useState('');
  const [date, setDate] = useState('');
  const [specialist, setSpecialist] = useState('');
  const [diagnoses, setDiagnoses] = useState('');
  const [healthCheckRating, setHealthCheckRating] = useState(
    HealthCheckRating.Healthy
  );

  const onHealthRatingChange = (event: SelectChangeEvent<string>) => {
    event.preventDefault();
    const value = String(event.target.value);
    if (typeof value === 'string') {
      const rating = Object.values(HealthCheckRating).find(
        (g) => g.toString() === value
      );
      if (rating !== undefined && typeof rating !== 'string') {
        setHealthCheckRating(rating);
      }
    }
  };

  const addPatient = (event: SyntheticEvent) => {
    event.preventDefault();

    const diagnosisCodes: Array<Diagnosis['code']> = diagnoses
      ? diagnoses.split(', ')
      : [];
    onSubmit({
      type: 'HealthCheck',
      description,
      date,
      specialist,
      diagnosisCodes,
      healthCheckRating,
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

        <InputLabel style={{ marginTop: 8 }}>Health Check Rating</InputLabel>
        <Select
          style={{ marginTop: 8, marginBottom: 24 }}
          fullWidth
          value={healthCheckRating as unknown as string}
          onChange={onHealthRatingChange}
        >
          {healthCheckRatingOptions.map((option) => (
            <MenuItem key={option.label} value={option.value}>
              {option.label}
            </MenuItem>
          ))}
        </Select>

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

export default AddHealthForm;
