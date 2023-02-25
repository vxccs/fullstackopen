export const assertError = (value: never): never => {
  throw new Error(
    `unhandled discriminated union member: ${JSON.stringify(value)}`
  );
};
