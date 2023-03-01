import { useParams } from 'react-router-dom';
import { Diagnosis, Patient } from '../../types';
import FemaleIcon from '@mui/icons-material/Female';
import MaleIcon from '@mui/icons-material/Male';
import { Box, List, ListItem, ListItemText, Typography } from '@mui/material';
import EntryDetails from './EntryDetails';

const PatientPage = ({
  patients,
  diagnoses,
}: {
  patients: Patient[];
  diagnoses: Diagnosis[];
}) => {
  const { id } = useParams();
  const patient = patients.find((p) => p.id === id);

  if (!patient) return null;

  return (
    <div>
      <Box
        sx={{ display: 'flex', alignItems: 'center', gap: '.5rem', mt: '1rem' }}
      >
        <Typography variant="h4">{patient.name}</Typography>
        {patient.gender.toString() === 'male' ? (
          <MaleIcon />
        ) : patient.gender.toString() === 'female' ? (
          <FemaleIcon />
        ) : null}
      </Box>
      <List>
        <ListItem disableGutters sx={{ py: 0 }}>
          <ListItemText primary={`ssn: ${patient.ssn}`} />
        </ListItem>
        <ListItem disableGutters sx={{ py: 0 }}>
          <ListItemText primary={`occupation: ${patient.occupation}`} />
        </ListItem>
      </List>
      {patient.entries.length > 0 && (
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          <Typography variant="h5" gutterBottom>
            entries
          </Typography>
          {patient.entries.map((entry) => (
            <EntryDetails entry={entry} diagnoses={diagnoses} key={entry.id} />
          ))}
        </Box>
      )}
    </div>
  );
};
export default PatientPage;
