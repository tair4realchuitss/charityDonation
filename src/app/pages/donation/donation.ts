import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiService } from '../../services/api';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './donation.html'
})
export class DonationComponent implements OnInit {
  campaignId!: number;
  amount: number = 25;

  cardName = '';
  cardNumber = '';
  cardExpiry = '';
  cardCvv = '';

  constructor(
    private route: ActivatedRoute,
    private api: ApiService,
    private router: Router
  ) {}

  ngOnInit() {
    this.campaignId = Number(this.route.snapshot.paramMap.get('id'));
    const amountFromQuery = Number(this.route.snapshot.queryParamMap.get('amount'));

    if (amountFromQuery > 0) {
      this.amount = amountFromQuery;
    }
  }

  confirm() {
    if (this.amount <= 0) {
      alert('Please enter a valid amount');
      return;
    }

    if (!this.cardName || !this.cardNumber || !this.cardExpiry || !this.cardCvv) {
      alert('Please fill in all payment fields.');
      return;
    }

    this.api.makeDonation(this.campaignId, this.amount).subscribe({
      next: () => {
        this.router.navigate(['/success']);
      },
      error: (err: any) => {
        alert(err.error?.error || 'Donation failed');
      }
    });
  }

  goHome() {
    this.router.navigate(['/']);
  }
}