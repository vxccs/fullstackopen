import {
  Dialog,
  DialogTitle,
  DialogContent,
  Divider,
  Alert,
} from '@mui/material';

// import AddPatientForm from './AddPatientForm';
import { EntryWithoutId } from '../../../types';
import AddHealthForm from './AddHealthForm';
import AddHospitalForm from './AddHospitalForm';
import AddOccupationalForm from './AddOccupationalForm';

interface Props {
  modalOpen: boolean;
  onClose: () => void;
  onSubmit: (values: EntryWithoutId) => void;
  error?: string;
  type: string;
}

const AddEntryModal = ({
  modalOpen,
  onClose,
  onSubmit,
  error,
  type,
}: Props) => (
  <Dialog fullWidth={true} open={modalOpen} onClose={() => onClose()}>
    <DialogTitle>Add a new entry</DialogTitle>
    <Divider />
    <DialogContent>
      {error && <Alert severity="error">{error}</Alert>}
      {type === 'health' && (
        <AddHealthForm onSubmit={onSubmit} onCancel={onClose} />
      )}
      {type === 'hospital' && (
        <AddHospitalForm onSubmit={onSubmit} onCancel={onClose} />
      )}
      {type === 'occupational' && (
        <AddOccupationalForm onSubmit={onSubmit} onCancel={onClose} />
      )}
    </DialogContent>
  </Dialog>
);

export default AddEntryModal;
