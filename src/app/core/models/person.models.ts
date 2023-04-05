enum Gender {
  MALE = "male",
  FEMALE = "female",
}
export class IPerson {
  id: number;
  name: string;
  dateOfBirth: string;
  email: string;
  cellPhone: string;
  phoneNumber: string;
  address: string;
  description: string;
  pCode: string;
  gender: Gender;
}
