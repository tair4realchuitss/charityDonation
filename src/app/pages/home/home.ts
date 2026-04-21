import { Component, OnInit } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { ApiService } from '../../services/api';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [RouterModule, CommonModule, FormsModule],
  templateUrl: './home.html',
  styleUrl: './home.css'
})
export class HomeComponent implements OnInit {
  charities: any[] = [];
  filteredCharities: any[] = [];
  categories: any[] = [];

  selectedCategory = 'all';
  selectedAmount = 25;
  customAmount: number | null = null;

  constructor(private api: ApiService, private router: Router) {}

  ngOnInit() {
    this.api.getCampaigns().subscribe({
      next: (data: any) => {
        this.charities = data;
        this.applyFilter();
      },
      error: (err: any) => console.error(err)
    });

    this.api.getCategories().subscribe({
      next: (data: any) => this.categories = data,
      error: (err: any) => console.error(err)
    });
  }

  updateSelectedAmount(amount: number) {
    this.selectedAmount = amount;
  }

  applyCustomAmount() {
    if (!this.customAmount || this.customAmount < 1) {
      alert('Please enter a valid custom amount.');
      return;
    }

    this.selectedAmount = this.customAmount;
  }

  setCategory(category: string) {
    this.selectedCategory = category;
    this.applyFilter();
  }

  applyFilter() {
    if (this.selectedCategory === 'all') {
      this.filteredCharities = [...this.charities];
      return;
    }

    this.filteredCharities = this.charities.filter((item: any) => {
      const categoryName = item.category?.name?.toLowerCase?.() || '';
      return categoryName === this.selectedCategory.toLowerCase();
    });
  }

  donate(id: number) {
    this.router.navigate(['/donate', id], {
      queryParams: { amount: this.selectedAmount }
    });
  }

  openCharity(id: number) {
    this.router.navigate(['/charity', id]);
  }
}