// user type
export type TUser = {
  _id: string;
  name: string;
  email: string;
  password: string;
  passwordChangedAt?: Date;
  needsPasswordChange: boolean;
  age: number | string;
  gender: "male" | "female" | "others";
  contact: string;
  address: string;
  role: "user" | "admin" | "vendor";
  status: "active" | "blocked";
  profilePicture?: string;
  isDeleted: boolean;
  createdAt: string;
  updatedAt: string;
};
