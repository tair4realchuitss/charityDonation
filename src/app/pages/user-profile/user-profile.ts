import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ApiService } from '../../services/api';
@Component({
  standalone: true,
  templateUrl: './user-profile.html',
})
export class UserProfileComponent {

  user: any;
  charities: any[] = [];
  donations = [
  { id: 1, amount: 100 },
  { id: 2, amount: 300 }
];
tab: string = 'profile';

  constructor(private route: ActivatedRoute, private api: ApiService) {
    const id = Number(this.route.snapshot.paramMap.get('id'));

    this.user = this.api.getUserById(id);
    this.charities = this.api.getCharities();
  }
}