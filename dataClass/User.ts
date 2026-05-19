export type User = {
  username: string;
  password: string;
  firstName: string;
  lastName: string;
  address: Address;
  emailAddress: string;
  valid: boolean;
};


export type Address = {
    country: string;
    streetAddress: string;
    zipCode: string;
    town: string;
};