import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';

@Component({
  standalone: true,
  imports: [FormsModule],
  templateUrl: './donation.html'
})
export class DonationComponent {

  amount = 0;
  msg = '';

  constructor(private router: Router) {}

  confirm() {
    this.router.navigate(['/success']);
  }
}