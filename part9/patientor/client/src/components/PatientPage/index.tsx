import { useParams } from 'react-router-dom';
import { Diagnosis, EntryWithoutId, Patient } from '../../types';
import FemaleIcon from '@mui/icons-material/Female';
import MaleIcon from '@mui/icons-material/Male';
import {
  Box,
  List,
  ListItem,
  ListItemText,
  Typography,
  Button,
} from '@mui/material';
import EntryDetails from './EntryDetails';
import { useState } from 'react';
import AddEntryModal from './AddEntryModal';
import patientService from '../../services/patients';
import axios from 'axios';

const PatientPage = ({
  patients,
  diagnoses,
}: {
  patients: Patient[];
  diagnoses: Diagnosis[];
}) => {
  const [modalOpen, setModalOpen] = useState<boolean>(false);
  const [error, setError] = useState<string>('');
  const [type, setType] = useState<string>('');
  const { id } = useParams();
  const patient = patients.find((p) => p.id === id);

  const openModal = (type: string) => {
    setType(type);
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
    setError('');
  };

  if (!patient) return null;

  const submitNewEntry = async (values: EntryWithoutId) => {
    try {
      const newEntry = await patientService.addEntry(patient.id, values);
      patient.entries = [...patient.entries, newEntry];
      setModalOpen(false);
    } catch (e: unknown) {
      if (axios.isAxiosError(e)) {
        if (e?.response?.data && typeof e?.response?.data === 'string') {
          const message = e.response.data.replace(
            'Something went wrong. Error: ',
            ''
          );
          console.error(message);
          setError(message);
        } else {
          setError('Unrecognized axios error');
        }
      } else {
        console.error('Unknown error', e);
        setError('Unknown error');
      }
    }
  };

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
      <Typography variant="h5" gutterBottom>
        entries
      </Typography>
      <Box sx={{ display: 'flex', gap: '8px', marginBottom: '16px' }}>
        <Button variant="contained" onClick={() => openModal('occupational')}>
          Occupational Healthcare
        </Button>
        <Button variant="contained" onClick={() => openModal('health')}>
          Health Check
        </Button>
        <Button variant="contained" onClick={() => openModal('hospital')}>
          Hospital
        </Button>
      </Box>
      {patient.entries.length > 0 && (
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          {patient.entries.map((entry) => (
            <EntryDetails entry={entry} diagnoses={diagnoses} key={entry.id} />
          ))}
        </Box>
      )}
      <AddEntryModal
        modalOpen={modalOpen}
        onSubmit={submitNewEntry}
        error={error}
        onClose={closeModal}
        type={type}
      />
    </div>
  );
};
export default PatientPage;
