//model of the charity
//foreign keys
import { CharityCategory } from './charity-category.model';

export interface Charity {
  id: number;
  name: string;
  description: string;
  goal: number;
  raised: number;
  category: CharityCategory;
}