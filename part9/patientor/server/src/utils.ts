import { Entry, Gender, PatientEntry } from './types';

const isString = (text: unknown): text is string => {
  return typeof text === 'string' || text instanceof String;
};

const isGender = (gender: string): gender is Gender => {
  return Object.values(Gender).some((v) => v.toString().includes(gender));
};

const isDate = (date: string): boolean => {
  return Boolean(Date.parse(date));
};

const isEntry = (entries: unknown): entries is Entry[] => {
  return (
    entries instanceof Array &&
    entries.every(
      (entry) =>
        isString(entry.id) &&
        isString(entry.description) &&
        isDate(entry.date as string) &&
        isString(entry.specialist)
    )
  );
};

const parseName = (name: unknown): string => {
  if (!isString(name)) throw new Error('name is invalid');
  return name;
};

const parseDate = (date: unknown): string => {
  if (!isString(date) || !isDate(date)) throw new Error('date is invalid');
  return date;
};

const parseGender = (gender: unknown): Gender => {
  if (!isString(gender) || !isGender(gender))
    throw new Error('incorrect gender');
  return gender;
};

const parseSsn = (ssn: unknown): string => {
  if (!isString(ssn)) throw new Error('ssn is invalid');
  return ssn;
};

const parseOccupation = (occupation: unknown): string => {
  if (!isString(occupation)) throw new Error('occupation is invalid');
  return occupation;
};

const parseEntries = (entries: unknown): Entry[] => {
  if (!isEntry(entries)) throw new Error('entries required');
  return entries;
};

const toNewPatientEntry = (object: unknown): PatientEntry => {
  if (!object || typeof object !== 'object')
    throw new Error('incorrect or missing data');

  if (
    'name' in object &&
    'dateOfBirth' in object &&
    'gender' in object &&
    'occupation' in object &&
    'ssn' in object &&
    'entries' in object
  ) {
    const newEntry: PatientEntry = {
      name: parseName(object.name),
      dateOfBirth: parseDate(object.dateOfBirth),
      ssn: parseSsn(object.ssn),
      gender: parseGender(object.gender),
      occupation: parseOccupation(object.occupation),
      entries: parseEntries(object.entries),
    };

    return newEntry;
  }

  throw new Error('some fields are missing');
};

export default toNewPatientEntry;
