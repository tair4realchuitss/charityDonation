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
  amount: number = 0;
  msg: string = ''; 

  constructor(
    private route: ActivatedRoute,
    private api: ApiService,
    private router: Router
  ) {}

  ngOnInit() {
    this.campaignId = Number(this.route.snapshot.paramMap.get('id'));
  }

  confirm() {
    if (this.amount <= 0) {
      alert('Please enter a valid amount');
      return;
    }

    this.api.makeDonation(this.campaignId, this.amount).subscribe({
      next: (res: any) => {
        this.router.navigate(['/success']);
      },
      error: (err: any) => {
        alert(err.error?.error || 'Donation failed');
      }
    });
  }
}