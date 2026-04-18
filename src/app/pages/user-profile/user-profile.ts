import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ApiService } from '../../services/api';
import { User } from '../../models/user.model';
import { Charity } from '../../models/charity.model';

@Component({
  selector: 'app-user-profile',
  standalone: true,
  templateUrl: './user-profile.html',
})
export class UserProfileComponent {

  user?: User;
  charities: Charity[] = [];
  tab: string = 'profile';

  constructor(private route: ActivatedRoute, private api: ApiService) {}

  ngOnInit() {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    this.user = this.api.getUserById(id);

    this.charities = this.api.getCharities();
  }
}