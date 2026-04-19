import { Component } from '@angular/core';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { ApiService } from '../../services/api';

@Component({
  standalone: true,
  imports: [RouterModule],
  templateUrl: './user-profile.html'
})
export class UserProfileComponent {

  user: any;
  tab = 'profile';

  donations = [
    { id: 1, amount: 500 },
    { id: 2, amount: 700 }
  ];

  constructor(private route: ActivatedRoute, private api: ApiService) {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    this.user = this.api.getUserById(id);
  }
}