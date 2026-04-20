import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { ApiService } from '../../services/api';
import { CommonModule } from '@angular/common';

@Component({
  standalone: true,
  imports: [RouterModule, CommonModule],
  templateUrl: './user-profile.html'
})
export class UserProfileComponent implements OnInit {
  userProfile: any;
  donations: any[] = [];
  tab = 'profile';

  constructor(private route: ActivatedRoute, private api: ApiService) {}

  ngOnInit() {
    this.api.getUserProfile().subscribe({
      next: (data: any) => {
        this.userProfile = data;
        this.donations = data.donations || [];
      },
      error: (err: any) => console.error('Not logged in or API error', err)
    });
  }
}