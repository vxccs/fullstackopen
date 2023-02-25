export interface Diagnose {
  code: string;
  name: string;
  latin?: string;
}

type Gender = 'male' | 'female' | 'other';

export interface Patient {
  id: string;
  name: string;
  dateOfBirth: string;
  ssn: string;
  gender: Gender;
  occupation: string;
}

export type PatientNoSSN = Omit<Patient, 'ssn'>;
