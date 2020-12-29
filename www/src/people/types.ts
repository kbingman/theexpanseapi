export interface Person {
  name: 'string';
  uuid: 'string';
  alias: string | null;
  status: 'Alive' | 'Deceased';
  gender: 'Male' | 'Female' | null;
  occupation: string | null;
}
