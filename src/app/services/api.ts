//data simulation 
//testing if site works
import { Injectable } from '@angular/core';
import { Charity } from '../models/charity.model';
import { User } from '../models/user.model';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  private charities: Charity[] = [
    {
      id: 1,
      name: 'Save Children',
      description: 'Helping kids',
      goal: 10000,
      raised: 2500,
      category: { id: 1, name: 'Education' }
    },
    {
      id: 2,
      name: 'Food for All',
      description: 'Feeding people',
      goal: 5000,
      raised: 3000,
      category: { id: 2, name: 'Food' }
    }
  ];

  private users: User[] = [
    { id: 1, username: 'john', email: 'john@mail.com' }
  ];

  getCharities() {
    return this.charities;
  }

  getCharityById(id: number) {
    return this.charities.find(c => c.id === id);
  }

  getUserById(id: number) {
    return this.users.find(u => u.id === id);
  }
}