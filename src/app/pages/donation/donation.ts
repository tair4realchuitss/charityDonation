import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FormsModule } from '@angular/forms';

@Component({
  standalone: true,
  imports: [FormsModule],
  templateUrl: './donation.html'
})
export class DonationComponent {

  amount = 0;
  message = '';
  balance = 5000; // fake balance

  constructor(private route: ActivatedRoute) {}

  sendDonation() {
    if (this.amount > this.balance) {
      alert('Not enough balance');
      return;
    }

    this.balance -= this.amount;
    alert('Donation sent (simulation)');
  }
}