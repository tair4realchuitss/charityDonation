import { Component } from '@angular/core';
import { ApiService } from '../../services/api';

@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html'
})
export class CategoriesComponent {

  categories: any[] = [];

  constructor(private api: ApiService) {}

  ngOnInit() {
    const charities = this.api.getCharities();
    this.categories = [...new Set(charities.map(c => c.category.name))];
  }
}