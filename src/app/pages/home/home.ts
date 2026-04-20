import { Component, OnInit } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { ApiService } from '../../services/api';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [RouterModule, CommonModule],
  templateUrl: './home.html',
  styleUrl: './home.css'
})
export class HomeComponent implements OnInit {
  charities: any[] = [];
  categories: any[] = [];

  constructor(private api: ApiService, private router: Router) {}

  ngOnInit() {
    this.api.getCampaigns().subscribe({
      next: (data: any) => this.charities = data,
      error: (err: any) => console.error(err)
    });

    this.api.getCategories().subscribe({
      next: (data: any) => this.categories = data,
      error: (err: any) => console.error(err)
    });
  }

  donate(id: number) {
    this.router.navigate(['/donate', id]);
  }

  openCharity(id: number) {
    this.router.navigate(['/charity', id]);
  }
}