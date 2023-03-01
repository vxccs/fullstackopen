import { List, ListItem, ListItemText, Typography } from '@mui/material';
import { Box } from '@mui/system';
import { Diagnosis, Entry } from '../../types';
import LocalHospitalIcon from '@mui/icons-material/LocalHospital';
import HealthAndSafetyIcon from '@mui/icons-material/HealthAndSafety';
import MedicalInformationIcon from '@mui/icons-material/MedicalInformation';
import HealthRatingBar from '../HealthRatingBar';

const DiagnosesList = ({
  diagnoses,
  entryDiagnoses,
}: {
  diagnoses: Diagnosis[];
  entryDiagnoses: string[];
}) => {
  return (
    <List>
      {entryDiagnoses.map((diagnose) => (
        <ListItem key={diagnose} sx={{ py: 0 }}>
          <ListItemText>
            {`${diagnose} ${diagnoses.find((d) => d.code === diagnose)?.name}`}
          </ListItemText>
        </ListItem>
      ))}
    </List>
  );
};

const HospitalDetails = ({
  entry,
  diagnoses,
}: {
  entry: Entry;
  diagnoses: Diagnosis[];
}) => {
  if (entry.type !== 'Hospital') return null;

  return (
    <Box
      sx={{
        border: '1px solid #b3b3b3',
        padding: '1rem',
        borderRadius: '.5rem',
      }}
    >
      <Box sx={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
        <Typography variant="body1">{entry.date}</Typography>
        <LocalHospitalIcon />
      </Box>
      <Typography variant="body1">
        <em>{entry.description}</em>
      </Typography>
      {Boolean(entry.diagnosisCodes?.length) && (
        <DiagnosesList
          diagnoses={diagnoses}
          entryDiagnoses={entry.diagnosisCodes as string[]}
        />
      )}
      <Typography variant="body1">diagnosed by {entry.specialist}</Typography>
    </Box>
  );
};

const OccupationalHealthcareDetails = ({
  entry,
  diagnoses,
}: {
  entry: Entry;
  diagnoses: Diagnosis[];
}) => {
  if (entry.type !== 'OccupationalHealthcare') return null;

  return (
    <Box
      sx={{
        border: '1px solid #b3b3b3',
        padding: '1rem',
        borderRadius: '.5rem',
      }}
    >
      <Box sx={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
        <Typography variant="body1">{entry.date}</Typography>
        <HealthAndSafetyIcon />
        <Typography variant="body1">
          <em>{entry.employerName}</em>
        </Typography>
      </Box>
      <Typography variant="body1">
        <em>{entry.description}</em>
      </Typography>
      {Boolean(entry.diagnosisCodes?.length) && (
        <DiagnosesList
          diagnoses={diagnoses}
          entryDiagnoses={entry.diagnosisCodes as string[]}
        />
      )}
      <Typography variant="body1">diagnosed by {entry.specialist}</Typography>
    </Box>
  );
};

const HealthCheckDetails = ({
  entry,
  diagnoses,
}: {
  entry: Entry;
  diagnoses: Diagnosis[];
}) => {
  if (entry.type !== 'HealthCheck') return null;

  return (
    <Box
      sx={{
        border: '1px solid #b3b3b3',
        padding: '1rem',
        borderRadius: '.5rem',
      }}
    >
      <Box sx={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
        <Typography variant="body1">{entry.date}</Typography>
        <MedicalInformationIcon />
      </Box>
      <Typography variant="body1">
        <em>{entry.description}</em>
      </Typography>
      {Boolean(entry.diagnosisCodes?.length) && (
        <DiagnosesList
          diagnoses={diagnoses}
          entryDiagnoses={entry.diagnosisCodes as string[]}
        />
      )}
      <HealthRatingBar rating={entry.healthCheckRating} showText={false} />
      <Typography variant="body1">diagnosed by {entry.specialist}</Typography>
    </Box>
  );
};

const EntryDetails = ({
  entry,
  diagnoses,
}: {
  entry: Entry;
  diagnoses: Diagnosis[];
}) => {
  const assertNever = (value: never): never => {
    throw new Error(
      `Unhandled discriminated union member: ${JSON.stringify(value)}`
    );
  };

  switch (entry.type) {
    case 'Hospital':
      return <HospitalDetails entry={entry} diagnoses={diagnoses} />;
    case 'OccupationalHealthcare':
      return (
        <OccupationalHealthcareDetails entry={entry} diagnoses={diagnoses} />
      );
    case 'HealthCheck':
      return <HealthCheckDetails entry={entry} diagnoses={diagnoses} />;
    default:
      return assertNever(entry);
  }
};
export default EntryDetails;
