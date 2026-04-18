import { Component } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { ApiService } from '../../services/api';

@Component({
  standalone: true,
  imports: [RouterModule],
  templateUrl: './home.html'
})
export class HomeComponent {

  charities: any[] = [];
  categories: string[] = [];
  isLoggedIn = false;

  constructor(private api: ApiService, private router: Router) {}

  ngOnInit() {
    this.charities = this.api.getCharities();
    this.categories = [...new Set(this.charities.map(c => c.category.name))];
  }

  openCharity(id: number) {
    this.router.navigate(['/charity', id]);
  }

  donate(id: number) {
    this.router.navigate(['/donate', id]);
  }
}