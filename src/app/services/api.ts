import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class ApiService {

  currentUser = {
    id: 1,
    username: 'Jane',
    email: 'jane@mail.com',
    region: 'Almaty',
    balance: 8000,
    role: 'manager',
    totalDonated: 6200,
    avatar: 'https://via.placeholder.com/100'
  };

  users = [
    this.currentUser,
    {
      id: 2,
      username: 'John',
      email: 'john@mail.com',
      region: 'Astana',
      balance: 3000,
      role: 'user',
      totalDonated: 12000,
      avatar: 'https://via.placeholder.com/100'
    }
  ];

  charities = [
    {
      id: 1,
      title: 'Save the Forests',
      description: 'Protect forests and biodiversity across the world.',
      goal_amount: 15000,
      current_amount: 5000,
      category: { name: 'Nature' },
      created_by: 1
    },
    {
      id: 2,
      title: 'Help Homeless People',
      description: 'Provide shelter, food, and medical care.',
      goal_amount: 10000,
      current_amount: 8500,
      category: { name: 'Social' },
      created_by: 2
    }
  ];

  comments = [
    { id: 1, charityId: 1, userId: 2, user: 'John', text: 'Great cause!' }
  ];

  getCharities() {
    return this.charities;
  }

  getUser() {
    return this.currentUser;
  }

  getUserById(id: number) {
    return this.users.find(u => u.id === id);
  }

  getCommentsByCharity(id: number) {
    return this.comments.filter(c => c.charityId === id);
  }
}