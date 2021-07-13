import {Address} from "./address";

export interface User {
  id: number;
  firstName?: string;
  lastName?: string;
  username: string;
  password: string;
  email: string;
  address: Address
}
