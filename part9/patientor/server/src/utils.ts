import {
  Entry,
  Gender,
  PatientEntry,
  Diagnosis,
  EntryWithoutId,
  HealthCheckRating,
} from './types';

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

const isRating = (rating: unknown): rating is HealthCheckRating => {
  return Object.values(HealthCheckRating).some((v) =>
    v.toString().includes(rating as string)
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

const parseDiagnosisCodes = (object: unknown): Array<Diagnosis['code']> => {
  if (!object || typeof object !== 'object' || !('diagnosisCodes' in object)) {
    // we will just trust the data to be in correct form
    return [] as Array<Diagnosis['code']>;
  }

  return object.diagnosisCodes as Array<Diagnosis['code']>;
};

const parseDischarge = (
  discharge: unknown
): { date: string; criteria: string } => {
  if (
    typeof discharge !== 'object' ||
    !discharge ||
    !('criteria' in discharge) ||
    !('date' in discharge) ||
    !isString(discharge.criteria) ||
    !isString(discharge.date) ||
    !isDate(discharge.date)
  )
    throw new Error('invalid discharge');
  return discharge as { date: string; criteria: string };
};

const parseLeave = (leave: unknown): { startDate: string; endDate: string } => {
  if (
    typeof leave !== 'object' ||
    !leave ||
    !('startDate' in leave) ||
    !('endDate' in leave) ||
    !isString(leave.startDate) ||
    !isString(leave.endDate)
  )
    throw new Error('invalid leave');
  return leave as {
    startDate: string;
    endDate: string;
  };
};

const parseRating = (rating: unknown): HealthCheckRating => {
  if (!isString(rating) || !isRating(rating))
    throw new Error('incorrect rating');
  return rating as HealthCheckRating;
};

const toNewEntry = (object: unknown): EntryWithoutId | undefined => {
  try {
    if (!object || typeof object !== 'object')
      throw new Error('incorrect or missing data');

    if (
      'type' in object &&
      'description' in object &&
      'date' in object &&
      'specialist' in object
    ) {
      const newEntry = {
        description: parseName(object.description),
        specialist: parseName(object.specialist),
        date: parseDate(object.date),
        diagnosisCodes:
          'diagnosisCodes' in object
            ? parseDiagnosisCodes(object.diagnosisCodes)
            : [],
      };

      switch (object.type) {
        case 'Hospital':
          if ('discharge' in object) {
            return {
              ...newEntry,
              discharge: parseDischarge(object.discharge),
              type: 'Hospital',
            };
          } else {
            throw new Error('some fields are missing');
          }
        case 'OccupationalHealthcare':
          if ('employerName' in object) {
            const entry: EntryWithoutId = {
              ...newEntry,
              employerName: parseName(object.employerName),
              type: 'OccupationalHealthcare',
            };
            if ('sickLeave' in object) {
              return { ...entry, sickLeave: parseLeave(object.sickLeave) };
            } else {
              return entry;
            }
          } else {
            throw new Error('some fields are missing');
          }
        case 'HealthCheck':
          if ('healthCheckRating' in object) {
            return {
              ...newEntry,
              healthCheckRating: parseRating(object.healthCheckRating),
              type: 'HealthCheck',
            };
          } else {
            throw new Error('some fields are missing');
          }
        default:
          throw new Error('incorrect entry type');
      }
    }

    return undefined;
  } catch (error) {
    console.log(error);
    return undefined;
  }
};

export default { toNewPatientEntry, parseDiagnosisCodes, toNewEntry };
