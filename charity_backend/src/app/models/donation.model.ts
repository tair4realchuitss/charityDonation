//model of the donations
//foreign keys
import { User } from './user.model';
import { Charity } from './charity.model';

export interface Donation {
  id: number;
  amount: number;
  user: User;
  charity: Charity;
}