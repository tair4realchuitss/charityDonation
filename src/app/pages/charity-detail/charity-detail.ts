import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiService } from '../../services/api';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './charity-detail.html'
})
export class CharityDetailComponent implements OnInit {
  charity: any;
  comments: any[] = [];
  newComment = '';

  constructor(
    private route: ActivatedRoute,
    private api: ApiService,
    private router: Router
  ) {}

  ngOnInit() {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    this.api.getCampaignById(id).subscribe((data: any) => {
      this.charity = data;
      this.comments = data.comments || [];
    });
  }

  addComment() {
    const id = Number(this.route.snapshot.paramMap.get('id'));

    if (!this.newComment.trim()) return;

    const commentData = {
      campaign: id,
      text: this.newComment
    };

    this.api.postComment(commentData).subscribe(() => {
      this.ngOnInit();
      this.newComment = '';
    });
  }

  donate() {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    this.router.navigate(['/donate', id]);
  }

  goBack() {
    this.router.navigate(['/']);
  }
}