import { Component } from '@angular/core';
import { ApiService } from '../../services/api';
import { Charity } from '../../models/charity.model';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './home.html',
})
export class HomeComponent {

  charities: Charity[] = [];
  filtered: Charity[] = [];

  constructor(private api: ApiService, private router: Router) {}

  ngOnInit() {
    this.charities = this.api.getCharities();
    this.filtered = this.charities;
  }


  openCharity(id: number) {
    this.router.navigate(['/charity', id]);
  }

  search: string = '';

  searchClick() {
    this.filtered = this.charities.filter(c =>
    c.name.toLowerCase().includes(this.search.toLowerCase()));
  }
}