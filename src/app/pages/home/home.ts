import { Component } from '@angular/core';
import { ApiService } from '../../services/api';
import { Charity } from '../../models/charity.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html'
})
export class HomeComponent {

  charities: Charity[] = [];

  constructor(private api: ApiService, private router: Router) {}

  ngOnInit() {
    this.charities = this.api.getCharities();
  }

  openCharity(id: number) {
    this.router.navigate(['/charity', id]);
  }
}