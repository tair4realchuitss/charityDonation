import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiService } from '../../services/api';
import { FormsModule } from '@angular/forms';

@Component({
  standalone: true,
  imports: [FormsModule],
  templateUrl: './charity-detail.html'
})
export class CharityDetailComponent {

  charity: any;
  comments: any[] = [];
  newComment = '';
  currentUserId = 1;

  constructor(private route: ActivatedRoute, private api: ApiService, private router: Router) {

    const id = Number(this.route.snapshot.paramMap.get('id'));

    this.charity = this.api.getCharities().find(c => c.id === id);
    this.comments = this.api.getCommentsByCharity(id);
  }

  goUser(id: number) {
    this.router.navigate(['/user', id]);
  }

  addComment() {
    this.comments.push({
      id: this.comments.length + 1,
      user: 'You',
      userId: 1,
      text: this.newComment
    });
    this.newComment = '';
  }
}